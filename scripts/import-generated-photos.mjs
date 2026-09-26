#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { PHOTO_MANIFEST } from './imagegen-photo-manifest.mjs';
import { getAppPublicRoot, readImageDimensions } from './images-lib.mjs';

const ROOT = process.cwd();
const TEMP_DIR = mkdtempSync(path.join(os.tmpdir(), 'hearthmere-photo-import-'));

function readArg(name) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function stripJpegMetadata(filePath) {
  const buffer = readFileSync(filePath);
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error(`Not a JPEG: ${filePath}`);
  }

  const chunks = [buffer.subarray(0, 2)];
  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      throw new Error(`Malformed JPEG marker at byte ${offset}: ${filePath}`);
    }

    const segmentStart = offset;
    while (offset < buffer.length && buffer[offset] === 0xff) {
      offset += 1;
    }
    if (offset >= buffer.length) break;

    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xda) {
      chunks.push(buffer.subarray(segmentStart));
      break;
    }

    if (marker === 0xd9) {
      chunks.push(buffer.subarray(segmentStart, offset));
      break;
    }

    if (marker === 0x00 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      chunks.push(buffer.subarray(segmentStart, offset));
      continue;
    }

    if (offset + 2 > buffer.length) {
      throw new Error(`Truncated JPEG segment: ${filePath}`);
    }

    const segmentLength = buffer.readUInt16BE(offset);
    const segmentEnd = offset + segmentLength;
    if (segmentLength < 2 || segmentEnd > buffer.length) {
      throw new Error(`Invalid JPEG segment length: ${filePath}`);
    }

    const isMetadata = (marker >= 0xe1 && marker <= 0xef) || marker === 0xfe;
    if (!isMetadata) {
      chunks.push(buffer.subarray(segmentStart, segmentEnd));
    }
    offset = segmentEnd;
  }

  writeFileSync(filePath, Buffer.concat(chunks));
}

function convertCover(sourcePath, targetPath, width, height, quality = 76) {
  const sourceDimensions = readImageDimensions(sourcePath);
  if (!sourceDimensions) {
    throw new Error(`Cannot read source dimensions: ${sourcePath}`);
  }

  mkdirSync(path.dirname(targetPath), { recursive: true });
  const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const resizedPath = path.join(TEMP_DIR, `${token}-resized.jpg`);
  const sourceAspect = sourceDimensions.width / sourceDimensions.height;
  const targetAspect = width / height;

  const resizeArgs =
    sourceAspect > targetAspect
      ? ['--resampleHeight', String(height)]
      : ['--resampleWidth', String(width)];

  execFileSync(
    'sips',
    [
      ...resizeArgs,
      '-s',
      'format',
      'jpeg',
      '-s',
      'formatOptions',
      String(quality),
      '--deleteColorManagementProperties',
      sourcePath,
      '--out',
      resizedPath,
    ],
    { stdio: 'ignore' }
  );

  execFileSync(
    'sips',
    [
      '-c',
      String(height),
      String(width),
      '-s',
      'format',
      'jpeg',
      '-s',
      'formatOptions',
      String(quality),
      '--deleteColorManagementProperties',
      resizedPath,
      '--out',
      targetPath,
    ],
    { stdio: 'ignore' }
  );

  stripJpegMetadata(targetPath);
  const dimensions = readImageDimensions(targetPath);
  if (!dimensions || dimensions.width !== width || dimensions.height !== height) {
    throw new Error(
      `Unexpected output dimensions for ${targetPath}: ${dimensions?.width}x${dimensions?.height}`
    );
  }
}

function normalizeSources(value) {
  if (Array.isArray(value)) {
    return Object.fromEntries(
      value.map((item) => [item.id ?? `${item.app}:${item.publicPath}`, item.generatedSource])
    );
  }
  return value;
}

const sourcesPath = readArg('sources');
const extraSources = sourcesPath
  ? normalizeSources(JSON.parse(readFileSync(path.resolve(sourcesPath), 'utf8')))
  : {};
const selectedApp = readArg('app');
const completedOnly = process.argv.includes('--completed');
const strict = process.argv.includes('--strict');

let imported = 0;
const missing = [];

for (const item of PHOTO_MANIFEST) {
  if (selectedApp && item.app !== selectedApp) continue;
  if (completedOnly && item.status !== 'complete') continue;

  const sourcePath = extraSources[item.id] ?? item.generatedSource;
  if (!sourcePath) {
    if (strict) missing.push(item.id);
    continue;
  }
  if (!existsSync(sourcePath)) {
    missing.push(`${item.id} -> ${sourcePath}`);
    continue;
  }

  const appDir = path.join(ROOT, 'apps', item.app);
  const targetPath = path.join(
    getAppPublicRoot(appDir),
    item.publicPath.replace(/^\//, '')
  );
  convertCover(sourcePath, targetPath, item.width, item.height);
  imported += 1;
  console.log(
    `${item.id} -> ${path.relative(ROOT, targetPath)} ` +
      `(${item.width}x${item.height}, ${statSync(targetPath).size} bytes)`
  );
}

if (missing.length > 0) {
  console.error('\nMissing generated sources:');
  for (const item of missing) console.error(`  - ${item}`);
  process.exitCode = 1;
}

const portfolioCards = [
  ['alderwyck-apartments', '/images/exterior/exterior-pool.jpg'],
  ['caldridge-townhomes', '/images/exterior/primary-1.jpg'],
  ['norvale-commons', '/images/exterior/hero.jpg'],
  ['larkmere-gardens', '/images/exterior/building-front.jpg'],
];

for (const [app, relPath] of portfolioCards) {
  const appDir = path.join(ROOT, 'apps', app);
  const sourcePath = path.join(getAppPublicRoot(appDir), relPath.replace(/^\//, ''));
  if (!existsSync(sourcePath)) continue;
  const targetPath = path.join(
    ROOT,
    'apps',
    'hearthmere-residential',
    'public',
    'images',
    'properties',
    `${app}.jpg`
  );
  convertCover(sourcePath, targetPath, 1200, 900, 74);
}

const ogSources = {
  'alderwyck-apartments': '/images/exterior/exterior-pool.jpg',
  'caldridge-townhomes': '/images/exterior/primary-1.jpg',
  'norvale-commons': '/images/exterior/hero.jpg',
  'larkmere-gardens': '/images/exterior/building-front.jpg',
};

for (const [app, relPath] of Object.entries(ogSources)) {
  const appDir = path.join(ROOT, 'apps', app);
  const sourcePath = path.join(getAppPublicRoot(appDir), relPath.replace(/^\//, ''));
  if (!existsSync(sourcePath)) continue;
  const targetPath = path.join(getAppPublicRoot(appDir), 'images', 'og-image.jpg');

  for (const quality of [70, 64, 58, 52, 46]) {
    convertCover(sourcePath, targetPath, 1200, 630, quality);
    if (statSync(targetPath).size <= 256_000) break;
  }
}

rmSync(TEMP_DIR, { recursive: true, force: true });

console.log(`\nImported generated photos: ${imported}`);
