#!/usr/bin/env node

import {
  copyFileSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  IMAGE_POLICY,
  classifyImageRole,
  collectPublicImageFiles,
  detectImageMime,
  getRolePolicy,
  getAppPublicRoot,
  listApps,
  maxLongEdge,
  readImageDimensions,
} from './images-lib.mjs';

const ROOT = process.cwd();
const TEMP_DIR = mkdtempSync(path.join(os.tmpdir(), 'hearthmere-image-sanitize-'));

function stripJpegMetadata(filePath) {
  const buffer = readFileSync(filePath);
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error(`Not a JPEG: ${filePath}`);
  }

  const chunks = [buffer.subarray(0, 2)];
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) throw new Error(`Malformed JPEG: ${filePath}`);
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

    if (offset + 2 > buffer.length) throw new Error(`Truncated JPEG: ${filePath}`);
    const length = buffer.readUInt16BE(offset);
    const end = offset + length;
    if (length < 2 || end > buffer.length) throw new Error(`Invalid JPEG segment: ${filePath}`);

    if (!((marker >= 0xe1 && marker <= 0xef) || marker === 0xfe)) {
      chunks.push(buffer.subarray(start, end));
    }
    offset = end;
  }
  writeFileSync(filePath, Buffer.concat(chunks));
}

function stripPngMetadata(filePath) {
  const buffer = readFileSync(filePath);
  if (buffer.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    throw new Error(`Not a PNG: ${filePath}`);
  }

  const keep = new Set(['IHDR', 'PLTE', 'IDAT', 'IEND', 'tRNS']);
  const chunks = [buffer.subarray(0, 8)];
  let offset = 8;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const end = offset + length + 12;
    if (end > buffer.length) throw new Error(`Malformed PNG: ${filePath}`);
    if (keep.has(type)) chunks.push(buffer.subarray(offset, end));
    offset = end;
    if (type === 'IEND') break;
  }
  writeFileSync(filePath, Buffer.concat(chunks));
}

function reencodeJpeg(filePath, maxLongEdge, quality) {
  const tempPath = path.join(
    TEMP_DIR,
    `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
  );
  execFileSync(
    'sips',
    [
      '-s',
      'format',
      'jpeg',
      '-s',
      'formatOptions',
      String(quality),
      ...(maxLongEdge ? ['-Z', String(maxLongEdge)] : []),
      '--deleteColorManagementProperties',
      filePath,
      '--out',
      tempPath,
    ],
    { stdio: 'ignore' }
  );
  stripJpegMetadata(tempPath);
  copyFileSync(tempPath, filePath);
}

function publicRelative(appDir, filePath) {
  return `/${path.relative(getAppPublicRoot(appDir), filePath).split(path.sep).join('/')}`;
}

const expectedMime = new Map([
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp'],
  ['.svg', 'image/svg+xml'],
]);

let jpegCount = 0;
let pngCount = 0;
let svgCount = 0;
let optimizedCount = 0;
const failures = [];

for (const app of listApps()) {
  for (const filePath of collectPublicImageFiles(app.dir)) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = detectImageMime(filePath);
    if (expectedMime.get(ext) !== mime) {
      failures.push(
        `${path.relative(ROOT, filePath)} extension ${ext} contains ${mime}`
      );
      continue;
    }

    if (mime === 'image/jpeg') {
      jpegCount += 1;
      stripJpegMetadata(filePath);

      const relPath = publicRelative(app.dir, filePath);
      const role = classifyImageRole(relPath);
      const policy = getRolePolicy(role);
      const dimensions = readImageDimensions(filePath);
      const record = {
        width: dimensions?.width ?? null,
        height: dimensions?.height ?? null,
      };
      const longEdge = maxLongEdge(record);
      const maxEdge =
        role === 'og'
          ? null
          : policy?.maxLongEdge ?? IMAGE_POLICY.photo.maxLongEdge;
      const maxBytes = policy?.maxBytes ?? IMAGE_POLICY.photo.maxBytes;

      if (
        (maxEdge && longEdge && longEdge > maxEdge) ||
        statSync(filePath).size > maxBytes
      ) {
        reencodeJpeg(
          filePath,
          maxEdge,
          role === 'og' ? IMAGE_POLICY.og.quality : IMAGE_POLICY.photo.quality
        );
        optimizedCount += 1;
      }
      stripJpegMetadata(filePath);
      continue;
    }

    if (mime === 'image/png') {
      pngCount += 1;
      stripPngMetadata(filePath);
      continue;
    }

    if (mime === 'image/svg+xml') {
      svgCount += 1;
      const contents = readFileSync(filePath, 'utf8');
      if (/<metadata(?:\s|>)/i.test(contents) || /<image[^>]+href=["']https?:/i.test(contents)) {
        failures.push(`${path.relative(ROOT, filePath)} contains embedded metadata or remote media`);
      }
    }
  }
}

rmSync(TEMP_DIR, { recursive: true, force: true });

console.log(`JPEG sanitized: ${jpegCount}`);
console.log(`PNG sanitized: ${pngCount}`);
console.log(`SVG checked: ${svgCount}`);
console.log(`JPEG re-encoded for policy: ${optimizedCount}`);

if (failures.length > 0) {
  console.error('\nSanitization failures:');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exitCode = 1;
}
