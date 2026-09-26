#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
  IMAGE_POLICY,
  ROOT,
  collectPublicImageFiles,
  detectImageMime,
  formatBytes,
  getAppImageInventory,
  getAppPublicRoot,
  getAppSourceRoot,
  isRoleBudgetViolation,
  listApps,
  listJpegMetadataSegments,
  listPngMetadataChunks,
  maxLongEdge,
  readImageDimensions,
  sumBytes,
} from './images-lib.mjs';
import { PHOTO_MANIFEST } from './imagegen-photo-manifest.mjs';

const args = new Set(process.argv.slice(2));
const jsonOutput = args.has('--json');
const strict = args.has('--strict');

const apps = listApps();
const report = [];
let hasMissing = false;
let hasViolation = false;
const appRecords = new Map();

for (const app of apps) {
  const inventory = getAppImageInventory(app.dir);
  appRecords.set(app.name, { app, inventory });
  const budgetViolations = inventory.referenced.filter((record) => isRoleBudgetViolation(record));
  const largeUnreferenced = inventory.unreferenced.filter(
    (record) => record.bytes > IMAGE_POLICY.unreferenced.maxBytes
  );

  if (inventory.missing.length > 0) {
    hasMissing = true;
  }
  if (budgetViolations.length > 0) {
    hasViolation = true;
  }

  report.push({
    app: app.name,
    referencedCount: inventory.referenced.length,
    referencedBytes: sumBytes(inventory.referenced),
    unreferencedCount: inventory.unreferenced.length,
    unreferencedBytes: sumBytes(inventory.unreferenced),
    missing: inventory.missing,
    budgetViolations: budgetViolations.map((record) => ({
      relPath: record.relPath,
      role: record.role,
      bytes: record.bytes,
      width: record.width,
      height: record.height,
    })),
    topReferenced: inventory.referenced.slice(0, 8),
    topUnreferenced: inventory.unreferenced.slice(0, 8),
    largeUnreferenced: largeUnreferenced.map((record) => ({
      relPath: record.relPath,
      bytes: record.bytes,
    })),
  });
}

const strictFailures = [];
const strictSummary = {
  generatedPhotos: 0,
  distinctPropertyPhotos: 0,
  floorPlans: 0,
  distinctFloorPlans: 0,
  propertyOgImages: 0,
  svgLogoVariants: 0,
  pngLogoVariants: 0,
  blurManifests: 0,
  publicImagesChecked: 0,
  metadataViolations: 0,
  mimeViolations: 0,
};

function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

function fail(message) {
  strictFailures.push(message);
}

if (strict) {
  const expectedMime = new Map([
    ['.jpg', 'image/jpeg'],
    ['.jpeg', 'image/jpeg'],
    ['.png', 'image/png'],
    ['.webp', 'image/webp'],
    ['.svg', 'image/svg+xml'],
  ]);

  for (const { app } of appRecords.values()) {
    for (const filePath of collectPublicImageFiles(app.dir)) {
      strictSummary.publicImagesChecked += 1;
      const ext = path.extname(filePath).toLowerCase();
      const mime = detectImageMime(filePath);
      if (expectedMime.get(ext) !== mime) {
        strictSummary.mimeViolations += 1;
        fail(
          `${path.relative(ROOT, filePath)} has extension ${ext} but MIME signature ${mime}`
        );
      }

      if (mime === 'image/jpeg') {
        const segments = listJpegMetadataSegments(filePath);
        if (segments.length > 0) {
          strictSummary.metadataViolations += 1;
          fail(
            `${path.relative(ROOT, filePath)} retains JPEG metadata: ${segments
              .map((segment) => `${segment.marker}:${segment.signature}`)
              .join(', ')}`
          );
        }
      }

      if (mime === 'image/png') {
        const chunks = listPngMetadataChunks(filePath);
        if (chunks.length > 0) {
          strictSummary.metadataViolations += 1;
          fail(
            `${path.relative(ROOT, filePath)} retains PNG metadata chunks: ${chunks
              .map((chunk) => chunk.type)
              .join(', ')}`
          );
        }
      }
    }
  }

  const generatedHashes = new Set();
  const propertyPhotoHashes = new Set();
  for (const item of PHOTO_MANIFEST) {
    const appDir = path.join(ROOT, 'apps', item.app);
    const absPath = path.join(
      getAppPublicRoot(appDir),
      item.publicPath.replace(/^\//, '')
    );
    const displayPath = path.relative(ROOT, absPath);
    if (!existsSync(absPath)) {
      fail(`missing generated photo target ${displayPath}`);
      continue;
    }

    strictSummary.generatedPhotos += 1;
    const dimensions = readImageDimensions(absPath);
    if (!dimensions || dimensions.width !== item.width || dimensions.height !== item.height) {
      fail(
        `${displayPath} expected ${item.width}x${item.height}, got ` +
          `${dimensions?.width ?? '?'}x${dimensions?.height ?? '?'}`
      );
    }

    const hash = sha256(absPath);
    generatedHashes.add(hash);
    if (item.app !== 'hearthmere-residential') {
      propertyPhotoHashes.add(hash);
    }
  }
  strictSummary.distinctPropertyPhotos = propertyPhotoHashes.size;
  if (PHOTO_MANIFEST.length !== 87 || strictSummary.generatedPhotos !== 87) {
    fail(
      `generated photo invariant expected 87/87, got manifest=${PHOTO_MANIFEST.length} files=${strictSummary.generatedPhotos}`
    );
  }
  if (propertyPhotoHashes.size !== 86) {
    fail(`expected 86 distinct property photos, got ${propertyPhotoHashes.size}`);
  }
  if (generatedHashes.size !== 87) {
    fail(`expected 87 distinct generated-photo hashes including corporate hero, got ${generatedHashes.size}`);
  }

  const floorPlanFiles = [];
  const svgLogos = [];
  const pngLogos = [];
  let propertyOgImages = 0;

  for (const { app } of appRecords.values()) {
    for (const filePath of collectPublicImageFiles(app.dir)) {
      const normalized = filePath.split(path.sep).join('/');
      const filename = path.basename(filePath);
      if (/\/public\/(?:[^/]+\/)?images\/floor-plans\//.test(normalized)) {
        floorPlanFiles.push(filePath);
      }
      if (/^logo.*\.svg$/i.test(filename)) svgLogos.push(filePath);
      if (/^logo.*\.png$/i.test(filename)) pngLogos.push(filePath);
    }

    if (app.name !== 'hearthmere-residential') {
      const ogPath = path.join(getAppPublicRoot(app.dir), 'images', 'og-image.jpg');
      if (existsSync(ogPath)) {
        propertyOgImages += 1;
        const dimensions = readImageDimensions(ogPath);
        if (!dimensions || dimensions.width !== 1200 || dimensions.height !== 630) {
          fail(`${app.name} OG image is not 1200x630`);
        }
        if (readFileSync(ogPath).byteLength > IMAGE_POLICY.og.maxBytes) {
          fail(`${app.name} OG image exceeds ${IMAGE_POLICY.og.maxBytes} bytes`);
        }
      } else {
        fail(`${app.name} is missing /images/og-image.jpg`);
      }
    }
  }

  strictSummary.floorPlans = floorPlanFiles.length;
  strictSummary.distinctFloorPlans = new Set(floorPlanFiles.map(sha256)).size;
  strictSummary.propertyOgImages = propertyOgImages;
  strictSummary.svgLogoVariants = svgLogos.length;
  strictSummary.pngLogoVariants = pngLogos.length;

  if (floorPlanFiles.length !== 18) fail(`expected 18 floor-plan diagrams, got ${floorPlanFiles.length}`);
  if (strictSummary.distinctFloorPlans !== 18) {
    fail(`expected 18 distinct floor-plan hashes, got ${strictSummary.distinctFloorPlans}`);
  }
  if (propertyOgImages !== 4) fail(`expected 4 property OG images, got ${propertyOgImages}`);
  if (svgLogos.length !== 31) fail(`expected 31 SVG logo variants, got ${svgLogos.length}`);
  if (pngLogos.length !== 10) fail(`expected 10 PNG logo variants, got ${pngLogos.length}`);

  for (const appName of [
    'alderwyck-apartments',
    'caldridge-townhomes',
    'larkmere-gardens',
    'norvale-commons',
  ]) {
    const record = appRecords.get(appName);
    if (!record) {
      fail(`missing property app inventory for ${appName}`);
      continue;
    }

    const manifestPath = path.join(
      getAppSourceRoot(record.app.dir),
      'config',
      'gallery-blur-manifest.json'
    );
    if (!existsSync(manifestPath)) {
      fail(`${appName} is missing gallery-blur-manifest.json`);
      continue;
    }

    strictSummary.blurManifests += 1;
    const blurManifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    const expectedPhotoPaths = record.inventory.referenced
      .filter((item) => item.role === 'photo')
      .map((item) => item.relPath)
      .sort();
    const actualPaths = Object.keys(blurManifest).sort();
    if (JSON.stringify(actualPaths) !== JSON.stringify(expectedPhotoPaths)) {
      fail(
        `${appName} blur manifest coverage mismatch: expected ${expectedPhotoPaths.length}, got ${actualPaths.length}`
      );
    }

    for (const [relPath, value] of Object.entries(blurManifest)) {
      if (!value.startsWith('data:image/jpeg;base64,')) {
        fail(`${appName} blur entry ${relPath} is not a JPEG data URL`);
        continue;
      }
      const payload = Buffer.from(value.slice('data:image/jpeg;base64,'.length), 'base64');
      const text = payload.toString('latin1');
      if (
        text.includes('Exif') ||
        text.includes('http://ns.adobe.com/xap') ||
        text.includes('Photoshop 3.0')
      ) {
        fail(`${appName} blur entry ${relPath} retains metadata`);
      }
    }
  }
}

if (jsonOutput) {
  process.stdout.write(
    `${JSON.stringify(strict ? { apps: report, strictSummary, strictFailures } : report, null, 2)}\n`
  );
} else {
  for (const appReport of report) {
    console.log(`\n=== ${appReport.app} ===`);
    console.log(`referenced: ${appReport.referencedCount} files (${formatBytes(appReport.referencedBytes)})`);
    console.log(`unreferenced: ${appReport.unreferencedCount} files (${formatBytes(appReport.unreferencedBytes)})`);

    if (appReport.missing.length > 0) {
      console.log('missing references:');
      for (const missing of appReport.missing) {
        console.log(`  - ${missing}`);
      }
    }

    if (appReport.budgetViolations.length > 0) {
      console.log('budget violations:');
      for (const violation of appReport.budgetViolations) {
        const dims = violation.width && violation.height ? `${violation.width}x${violation.height}` : '-';
        console.log(`  - ${violation.relPath} [${violation.role}] ${formatBytes(violation.bytes)} ${dims}`);
      }
    }

    if (appReport.topReferenced.length > 0) {
      console.log('largest referenced:');
      for (const record of appReport.topReferenced) {
        const dims = record.width && record.height ? `${record.width}x${record.height}` : '-';
        const longEdge = maxLongEdge(record);
        console.log(`  - ${record.relPath}: ${formatBytes(record.bytes)} ${dims}${longEdge ? ` longEdge=${longEdge}` : ''}`);
      }
    }

    if (appReport.largeUnreferenced.length > 0) {
      const thresholdLabel = formatBytes(IMAGE_POLICY.unreferenced.maxBytes);
      console.log(`large unreferenced (>${thresholdLabel}):`);
      for (const record of appReport.largeUnreferenced.slice(0, 10)) {
        console.log(`  - ${record.relPath}: ${formatBytes(record.bytes)}`);
      }
    }
  }

  if (strict) {
    console.log('\n=== strict image invariants ===');
    console.log(`generated photos: ${strictSummary.generatedPhotos}/87`);
    console.log(`distinct property photos: ${strictSummary.distinctPropertyPhotos}/86`);
    console.log(`floor plans: ${strictSummary.floorPlans}/18 (${strictSummary.distinctFloorPlans} distinct)`);
    console.log(`property OG images: ${strictSummary.propertyOgImages}/4`);
    console.log(`logo variants: ${strictSummary.svgLogoVariants}/31 SVG, ${strictSummary.pngLogoVariants}/10 PNG`);
    console.log(`blur manifests: ${strictSummary.blurManifests}/4`);
    console.log(`public images checked: ${strictSummary.publicImagesChecked}`);
    console.log(`metadata violations: ${strictSummary.metadataViolations}`);
    console.log(`MIME violations: ${strictSummary.mimeViolations}`);
    if (strictFailures.length > 0) {
      console.log('strict failures:');
      for (const failure of strictFailures) console.log(`  - ${failure}`);
    }
  }
}

if (hasMissing || (strict && (hasViolation || strictFailures.length > 0))) {
  process.exitCode = 1;
}
