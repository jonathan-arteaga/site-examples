#!/usr/bin/env node
/**
 * Generate blur-placeholder data URLs for every referenced gallery/photo image
 * in each app, and write a manifest keyed by public-relative path to
 * `apps/hearthmere-residential/src/sites/<site>/config/gallery-blur-manifest.json`.
 *
 * The manifest is imported by each app's `gallery.ts` to enrich every
 * `GalleryImage` with a `blurDataURL`. The shared `PropertyGalleryPage`
 * component uses that to render a Next/Image `placeholder="blur"`, which
 * replaces the empty grey box with a soft LQIP while the real image loads.
 *
 * Uses macOS `sips` (already required by images-optimize.mjs).
 */
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  getAppImageInventory,
  getAppSourceRoot,
  listApps,
} from './images-lib.mjs';

const BLUR_LONG_EDGE = 16;
const BLUR_QUALITY = 30;
const MANIFEST_FILENAME = 'gallery-blur-manifest.json';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const force = args.includes('--force');
const appFilters = args
  .filter((arg) => arg.startsWith('--app='))
  .map((arg) => arg.slice('--app='.length).trim())
  .filter(Boolean);

if (!dryRun) {
  try {
    execFileSync('which', ['sips'], { stdio: 'ignore' });
  } catch {
    console.error('images-blur requires the `sips` command (available on macOS).');
    process.exit(1);
  }
}

const tempDir = mkdtempSync(path.join(os.tmpdir(), 'hearthmere-image-blur-'));

function runSips(argsList) {
  execFileSync('sips', argsList, { stdio: 'ignore' });
}

function generateBlurDataURL(absPath) {
  const outPath = path.join(
    tempDir,
    `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
  );
  runSips([
    '-s',
    'format',
    'jpeg',
    '-s',
    'formatOptions',
    String(BLUR_QUALITY),
    '-Z',
    String(BLUR_LONG_EDGE),
    absPath,
    '--out',
    outPath,
  ]);
  const buf = stripJpegMetadata(readFileSync(outPath));
  rmSync(outPath, { force: true });
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

function stripJpegMetadata(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error('Blur source conversion did not produce a JPEG.');
  }

  const chunks = [buffer.subarray(0, 2)];
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      throw new Error('Malformed JPEG while stripping blur metadata.');
    }
    const start = offset;
    while (offset < buffer.length && buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xda) {
      chunks.push(buffer.subarray(start));
      break;
    }
    if (marker === 0xd9) {
      chunks.push(buffer.subarray(start, offset));
      break;
    }
    if (marker === 0x00 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      chunks.push(buffer.subarray(start, offset));
      continue;
    }

    const length = buffer.readUInt16BE(offset);
    const end = offset + length;
    if (length < 2 || end > buffer.length) {
      throw new Error('Invalid JPEG segment while stripping blur metadata.');
    }

    if (!((marker >= 0xe1 && marker <= 0xef) || marker === 0xfe)) {
      chunks.push(buffer.subarray(start, end));
    }
    offset = end;
  }

  return Buffer.concat(chunks);
}

function sortedEntries(obj) {
  const out = {};
  for (const key of Object.keys(obj).sort()) {
    out[key] = obj[key];
  }
  return out;
}

let apps = listApps({ propertyOnly: true });
if (appFilters.length > 0) {
  const selected = new Set(appFilters);
  apps = apps.filter((app) => selected.has(app.name));
}

let totalWritten = 0;
let totalImages = 0;

for (const app of apps) {
  console.log(`\n--- ${app.name} ---`);

  const inventory = getAppImageInventory(app.dir);
  const photoRecords = inventory.referenced.filter(
    (record) => record.role === 'photo'
  );

  if (photoRecords.length === 0) {
    console.log(`${app.name}: no referenced photos, skipping`);
    continue;
  }

  const configDir = path.join(getAppSourceRoot(app.dir), 'config');
  if (!existsSync(configDir)) {
    console.log(`${app.name}: no src/config directory, skipping`);
    continue;
  }

  const manifestPath = path.join(configDir, MANIFEST_FILENAME);
  const existing = !force && existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8'))
    : {};

  const next = {};
  let regenerated = 0;
  let reused = 0;

  for (const record of photoRecords) {
    totalImages += 1;
    // Re-use existing entry when the file hasn't changed. For simplicity we
    // key on src path; run `--force` semantics by deleting the manifest.
    if (existing[record.relPath]) {
      next[record.relPath] = existing[record.relPath];
      reused += 1;
      continue;
    }

    if (dryRun) {
      console.log(`[dry-run] ${record.relPath}`);
      next[record.relPath] = 'data:image/jpeg;base64,DRY_RUN';
      regenerated += 1;
      continue;
    }

    next[record.relPath] = generateBlurDataURL(record.absPath);
    regenerated += 1;
  }

  const sorted = sortedEntries(next);
  const serialized = `${JSON.stringify(sorted, null, 2)}\n`;
  const previous = existsSync(manifestPath)
    ? readFileSync(manifestPath, 'utf8')
    : '';

  if (serialized === previous) {
    console.log(`${app.name}: manifest unchanged (${reused} entries)`);
    continue;
  }

  if (dryRun) {
    console.log(
      `[dry-run] ${app.name}: would write manifest with ${
        Object.keys(sorted).length
      } entries (${regenerated} new, ${reused} reused)`
    );
    continue;
  }

  mkdirSync(configDir, { recursive: true });
  writeFileSync(manifestPath, serialized);
  totalWritten += 1;
  console.log(
    `${app.name}: wrote ${MANIFEST_FILENAME} with ${
      Object.keys(sorted).length
    } entries (${regenerated} new, ${reused} reused)`
  );
}

if (!dryRun) {
  rmSync(tempDir, { recursive: true, force: true });
}

console.log(`\nBlur manifest generation complete.`);
console.log(`apps updated: ${totalWritten}`);
console.log(`images processed: ${totalImages}`);
console.log(`mode: ${dryRun ? 'dry-run' : 'write'}`);
