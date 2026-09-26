import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

export const ROOT = process.cwd();
export const APPS_DIR = path.join(ROOT, 'apps');
export const POLICY_PATH = path.join(ROOT, 'packages', 'config', 'src', 'image-policy-shared.json');
export const IMAGE_POLICY = JSON.parse(readFileSync(POLICY_PATH, 'utf8'));

const SOURCE_FILE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.mdx', '.json']);
const IMAGE_FILE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg']);
const RASTER_FILE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const IMAGE_REF_PATTERN = /['"`](\/images\/[^'"`\)\s]+\.(?:jpg|jpeg|png|webp|avif|svg))['"`]/gi;

const PROPERTY_APPS = new Set(['larkmere-gardens', 'alderwyck-apartments', 'caldridge-townhomes', 'norvale-commons']);
const PROPERTY_SITE_SLUGS = new Map([
  ['alderwyck-apartments', 'alderwyck'],
  ['norvale-commons', 'norvale'],
  ['larkmere-gardens', 'larkmere'],
  ['caldridge-townhomes', 'caldridge'],
]);
const DEPLOYED_APP_DIR = path.join(APPS_DIR, 'hearthmere-residential');

export function isPropertyApp(appName) {
  return PROPERTY_APPS.has(appName);
}

export function normalizeImagePath(relPath) {
  return relPath.startsWith('/') ? relPath : `/${relPath}`;
}

export function getAppSourceRoot(appDir) {
  const siteSlug = PROPERTY_SITE_SLUGS.get(path.basename(appDir));
  return siteSlug
    ? path.join(DEPLOYED_APP_DIR, 'src', 'sites', siteSlug)
    : path.join(appDir, 'src');
}

export function getAppPublicRoot(appDir) {
  const siteSlug = PROPERTY_SITE_SLUGS.get(path.basename(appDir));
  return siteSlug
    ? path.join(DEPLOYED_APP_DIR, 'public', siteSlug)
    : path.join(appDir, 'public');
}

export function getAppAssetsRoot(appDir) {
  const siteSlug = PROPERTY_SITE_SLUGS.get(path.basename(appDir));
  return siteSlug
    ? path.join(DEPLOYED_APP_DIR, 'assets', siteSlug)
    : path.join(appDir, 'assets');
}

export function relToPublicAbs(appDir, relPath) {
  return path.join(getAppPublicRoot(appDir), relPath.replace(/^\//, ''));
}

export function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${bytes} B`;
}

export function isImageFile(filePath) {
  return IMAGE_FILE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

export function isRasterFile(filePath) {
  return RASTER_FILE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function walkFiles(dir, predicate, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_responsive') continue;
      walkFiles(fullPath, predicate, out);
      continue;
    }
    if (entry.isFile() && predicate(fullPath)) {
      out.push(fullPath);
    }
  }
  return out;
}

export function listApps({ propertyOnly = false } = {}) {
  const apps = [];
  for (const appName of [
    'hearthmere-residential',
    ...PROPERTY_SITE_SLUGS.keys(),
  ]) {
    if (propertyOnly && !isPropertyApp(appName)) {
      continue;
    }

    const appDir = path.join(APPS_DIR, appName);
    if (
      !existsSync(getAppSourceRoot(appDir)) ||
      !existsSync(getAppPublicRoot(appDir))
    ) {
      continue;
    }

    apps.push({
      name: appName,
      dir: appDir,
    });
  }

  apps.sort((a, b) => a.name.localeCompare(b.name));
  return apps;
}

export function collectSourceFiles(appDir) {
  const sourceRoot = getAppSourceRoot(appDir);
  if (!existsSync(sourceRoot)) {
    return [];
  }

  const mountedSitesRoot = path.join(DEPLOYED_APP_DIR, 'src', 'sites');
  return walkFiles(
    sourceRoot,
    (filePath) =>
      SOURCE_FILE_EXTENSIONS.has(path.extname(filePath).toLowerCase()) &&
      !(
        path.basename(appDir) === 'hearthmere-residential' &&
        filePath.startsWith(`${mountedSitesRoot}${path.sep}`)
      )
  );
}

export function collectPublicImageFiles(appDir) {
  const publicImagesDir = path.join(getAppPublicRoot(appDir), 'images');
  if (!existsSync(publicImagesDir)) {
    return [];
  }

  return walkFiles(publicImagesDir, (filePath) => isImageFile(filePath));
}

export function extractImageReferences(appDir) {
  const refs = new Set();

  for (const filePath of collectSourceFiles(appDir)) {
    const contents = readFileSync(filePath, 'utf8');
    let match = IMAGE_REF_PATTERN.exec(contents);

    while (match) {
      refs.add(normalizeImagePath(match[1]));
      match = IMAGE_REF_PATTERN.exec(contents);
    }

    IMAGE_REF_PATTERN.lastIndex = 0;
  }

  return refs;
}

function parseJpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  const sofMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3,
    0xc5, 0xc6, 0xc7,
    0xc9, 0xca, 0xcb,
    0xcd, 0xce, 0xcf,
  ]);

  let offset = 2;
  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    let marker = buffer[offset + 1];
    while (marker === 0xff) {
      offset += 1;
      marker = buffer[offset + 1];
    }

    if (marker === 0xd8 || marker === 0x01) {
      offset += 2;
      continue;
    }

    if (marker === 0xd9 || marker === 0xda) {
      break;
    }

    if (offset + 3 >= buffer.length) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset + 2);
    if (segmentLength < 2 || offset + segmentLength + 1 >= buffer.length) {
      break;
    }

    if (sofMarkers.has(marker)) {
      if (offset + 8 >= buffer.length) {
        break;
      }
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }

    offset += 2 + segmentLength;
  }

  return null;
}

function parsePngDimensions(buffer) {
  if (buffer.length < 24) {
    return null;
  }

  const signature = '89504e470d0a1a0a';
  if (buffer.subarray(0, 8).toString('hex') !== signature) {
    return null;
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

function parseWebpDimensions(buffer) {
  if (buffer.length < 30) {
    return null;
  }

  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    return null;
  }

  const chunkType = buffer.toString('ascii', 12, 16);

  if (chunkType === 'VP8X') {
    const width = 1 + (buffer[24] | (buffer[25] << 8) | (buffer[26] << 16));
    const height = 1 + (buffer[27] | (buffer[28] << 8) | (buffer[29] << 16));
    return { width, height };
  }

  if (chunkType === 'VP8L') {
    if (buffer[20] !== 0x2f) {
      return null;
    }
    const b0 = buffer[21];
    const b1 = buffer[22];
    const b2 = buffer[23];
    const b3 = buffer[24];
    const width = 1 + (((b1 & 0x3f) << 8) | b0);
    const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
    return { width, height };
  }

  if (chunkType === 'VP8 ') {
    if (buffer[23] !== 0x9d || buffer[24] !== 0x01 || buffer[25] !== 0x2a) {
      return null;
    }
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { width, height };
  }

  return null;
}

export function readImageDimensions(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const buffer = readFileSync(filePath);

  if (ext === '.jpg' || ext === '.jpeg') {
    return parseJpegDimensions(buffer);
  }
  if (ext === '.png') {
    return parsePngDimensions(buffer);
  }
  if (ext === '.webp') {
    return parseWebpDimensions(buffer);
  }

  return null;
}

export function classifyImageRole(relPath) {
  const normalized = normalizeImagePath(relPath);
  const ext = path.extname(normalized).toLowerCase();

  if (normalized === IMAGE_POLICY.og.path) {
    return 'og';
  }

  if (normalized.includes('/images/floor-plans/') && RASTER_FILE_EXTENSIONS.has(ext)) {
    return 'floorPlan';
  }

  if (ext === '.jpg' || ext === '.jpeg' || ext === '.webp' || ext === '.avif') {
    return 'photo';
  }

  return 'other';
}

function toImageRecord(appDir, relPath) {
  const absPath = relToPublicAbs(appDir, relPath);
  const stats = statSync(absPath);
  const dimensions = isRasterFile(absPath) ? readImageDimensions(absPath) : null;

  return {
    relPath,
    absPath,
    ext: path.extname(absPath).toLowerCase(),
    role: classifyImageRole(relPath),
    bytes: stats.size,
    width: dimensions?.width ?? null,
    height: dimensions?.height ?? null,
  };
}

export function getAppImageInventory(appDir) {
  const refs = extractImageReferences(appDir);
  const referenced = [];
  const missing = [];

  for (const relPath of refs) {
    const absPath = relToPublicAbs(appDir, relPath);
    if (!existsSync(absPath)) {
      missing.push(relPath);
      continue;
    }
    referenced.push(toImageRecord(appDir, relPath));
  }

  referenced.sort((a, b) => b.bytes - a.bytes);

  const publicImagesRoot = path.join(getAppPublicRoot(appDir), 'images');
  const publicImages = collectPublicImageFiles(appDir);
  const referencedSet = new Set(referenced.map((item) => item.relPath));
  const unreferenced = [];

  for (const absPath of publicImages) {
    const relPath = normalizeImagePath(
      path.posix.join(
        'images',
        path.relative(publicImagesRoot, absPath).split(path.sep).join('/')
      )
    );
    if (!referencedSet.has(relPath)) {
      unreferenced.push(toImageRecord(appDir, relPath));
    }
  }

  unreferenced.sort((a, b) => b.bytes - a.bytes);

  return {
    refs,
    referenced,
    unreferenced,
    missing,
  };
}

export function sumBytes(records) {
  return records.reduce((total, record) => total + record.bytes, 0);
}

export function maxLongEdge(record) {
  if (!record.width || !record.height) {
    return null;
  }
  return Math.max(record.width, record.height);
}

export function getRolePolicy(role) {
  if (role === 'photo') {
    return IMAGE_POLICY.photo;
  }
  if (role === 'floorPlan') {
    return IMAGE_POLICY.floorPlan;
  }
  if (role === 'og') {
    return IMAGE_POLICY.og;
  }
  return null;
}

export function isRoleBudgetViolation(record) {
  const policy = getRolePolicy(record.role);
  if (!policy) {
    return false;
  }

  if (record.role === 'og') {
    if (record.bytes > policy.maxBytes) {
      return true;
    }
    if (record.width !== null && record.width !== policy.width) {
      return true;
    }
    if (record.height !== null && record.height !== policy.height) {
      return true;
    }
    return false;
  }

  if (record.bytes > policy.maxBytes) {
    return true;
  }

  const longEdge = maxLongEdge(record);
  if (longEdge !== null && longEdge > policy.maxLongEdge) {
    return true;
  }

  return false;
}

export function buildOgFallbackCandidates(appName) {
  return [
    '/images/exterior/exterior-building.jpg',
    '/images/exterior/hero.jpg',
    '/images/exterior/building-front.jpg',
    '/images/exterior/exterior-pool.jpg',
    '/images/exterior/primary-1.jpg',
    '/images/exterior/aerial.jpg',
  ].concat(appName === 'larkmere-gardens' ? ['/images/og-image.jpg'] : []);
}

export function detectImageMime(filePath) {
  const buffer = readFileSync(filePath);

  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }

  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).toString('hex') === '89504e470d0a1a0a'
  ) {
    return 'image/png';
  }

  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return 'image/webp';
  }

  const prefix = buffer.subarray(0, Math.min(buffer.length, 512)).toString('utf8').trimStart();
  if (prefix.startsWith('<svg') || (prefix.startsWith('<?xml') && prefix.includes('<svg'))) {
    return 'image/svg+xml';
  }

  return 'application/octet-stream';
}

export function listJpegMetadataSegments(filePath) {
  const buffer = readFileSync(filePath);
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return [];
  }

  const segments = [];
  let offset = 2;

  while (offset + 1 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const segmentStart = offset;
    while (offset < buffer.length && buffer[offset] === 0xff) {
      offset += 1;
    }
    if (offset >= buffer.length) {
      break;
    }

    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xda || marker === 0xd9) {
      break;
    }

    if (marker === 0x00 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      continue;
    }

    if (offset + 2 > buffer.length) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset);
    const segmentEnd = offset + segmentLength;
    if (segmentLength < 2 || segmentEnd > buffer.length) {
      break;
    }

    if ((marker >= 0xe1 && marker <= 0xef) || marker === 0xfe) {
      const payload = buffer.subarray(offset + 2, segmentEnd);
      segments.push({
        marker: marker === 0xfe ? 'COM' : `APP${marker - 0xe0}`,
        offset: segmentStart,
        bytes: segmentEnd - segmentStart,
        signature: payload.subarray(0, 48).toString('latin1').replace(/[^\x20-\x7e]/g, '.'),
      });
    }

    offset = segmentEnd;
  }

  return segments;
}

export function listPngMetadataChunks(filePath) {
  const buffer = readFileSync(filePath);
  if (
    buffer.length < 8 ||
    buffer.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a'
  ) {
    return [];
  }

  const metadataTypes = new Set(['eXIf', 'iTXt', 'tEXt', 'zTXt']);
  const chunks = [];
  let offset = 8;

  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const chunkEnd = offset + 12 + length;
    if (chunkEnd > buffer.length) {
      break;
    }

    if (metadataTypes.has(type)) {
      chunks.push({ type, offset, bytes: 12 + length });
    }

    offset = chunkEnd;
    if (type === 'IEND') {
      break;
    }
  }

  return chunks;
}
