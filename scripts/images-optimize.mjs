#!/usr/bin/env node
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  IMAGE_POLICY,
  buildOgFallbackCandidates,
  formatBytes,
  getAppAssetsRoot,
  getAppImageInventory,
  getAppPublicRoot,
  isPropertyApp,
  isRasterFile,
  listApps,
  maxLongEdge,
  relToPublicAbs,
  readImageDimensions,
} from './images-lib.mjs';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const appFilters = args
  .filter((arg) => arg.startsWith('--app='))
  .map((arg) => arg.slice('--app='.length).trim())
  .filter(Boolean);

if (!dryRun) {
  try {
    execFileSync('which', ['sips'], { stdio: 'ignore' });
  } catch {
    console.error('images-optimize requires the `sips` command (available on macOS).');
    process.exit(1);
  }
}

const tempDir = mkdtempSync(path.join(os.tmpdir(), 'hearthmere-image-opt-'));
const actions = [];

function pushAction(message) {
  actions.push(message);
  console.log(message);
}

function runSips(argsList) {
  execFileSync('sips', argsList, { stdio: 'ignore' });
}

function nextTempFile(extension = '.jpg') {
  return path.join(tempDir, `${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`);
}

function ensureBackup(appDir, relPath, sourceAbsPath) {
  const backupAbsPath = path.join(
    getAppAssetsRoot(appDir),
    'originals',
    relPath.replace(/^\//, '')
  );
  if (existsSync(backupAbsPath)) {
    return backupAbsPath;
  }

  if (dryRun) {
    pushAction(`[dry-run] backup ${relPath} -> ${path.relative(appDir, backupAbsPath)}`);
    return backupAbsPath;
  }

  mkdirSync(path.dirname(backupAbsPath), { recursive: true });
  copyFileSync(sourceAbsPath, backupAbsPath);
  return backupAbsPath;
}

function replaceFile(appDir, relPath, sourceTempPath) {
  const targetAbsPath = relToPublicAbs(appDir, relPath);
  if (existsSync(targetAbsPath)) {
    ensureBackup(appDir, relPath, targetAbsPath);
  }

  if (dryRun) {
    pushAction(`[dry-run] replace ${relPath}`);
    return;
  }

  mkdirSync(path.dirname(targetAbsPath), { recursive: true });
  renameSync(sourceTempPath, targetAbsPath);
}

function moveArchiveDirectoryOutsidePublic(app) {
  const sourceDir = path.join(getAppPublicRoot(app.dir), 'images', 'archive');
  if (!existsSync(sourceDir)) {
    return;
  }

  const destinationDir = path.join(
    getAppAssetsRoot(app.dir),
    'originals',
    'images',
    'archive'
  );

  function moveTree(srcDir, dstDir) {
    mkdirSync(dstDir, { recursive: true });

    for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
      const srcPath = path.join(srcDir, entry.name);
      const dstPath = path.join(dstDir, entry.name);

      if (entry.isDirectory()) {
        moveTree(srcPath, dstPath);
        if (!dryRun) {
          const remaining = readdirSync(srcPath);
          if (remaining.length === 0) {
            rmSync(srcPath, { recursive: true, force: true });
          }
        }
        continue;
      }

      if (dryRun) {
        pushAction(`[dry-run] move ${path.relative(app.dir, srcPath)} -> ${path.relative(app.dir, dstPath)}`);
        continue;
      }

      mkdirSync(path.dirname(dstPath), { recursive: true });
      if (existsSync(dstPath)) {
        rmSync(srcPath, { force: true });
      } else {
        renameSync(srcPath, dstPath);
      }
    }
  }

  pushAction(`${app.name}: moving /public/images/archive to /assets/originals/images/archive`);
  moveTree(sourceDir, destinationDir);

  if (!dryRun && existsSync(sourceDir) && readdirSync(sourceDir).length === 0) {
    rmSync(sourceDir, { recursive: true, force: true });
  }
}

function optimizePhotoRecord(app, record) {
  const longEdge = maxLongEdge(record);
  const currentOverBudget =
    record.bytes > IMAGE_POLICY.photo.maxBytes ||
    (longEdge !== null && longEdge > IMAGE_POLICY.photo.maxLongEdge);

  const isJpeg = record.ext === '.jpg' || record.ext === '.jpeg';
  if (!isJpeg || !currentOverBudget) {
    return;
  }

  const outPath = nextTempFile('.jpg');
  const quality = String(IMAGE_POLICY.photo.quality);
  const maxEdge = String(IMAGE_POLICY.photo.maxLongEdge);

  if (!dryRun) {
    runSips(['-s', 'format', 'jpeg', '-s', 'formatOptions', quality, '-Z', maxEdge, record.absPath, '--out', outPath]);
  }

  const newSize = dryRun ? Math.max(0, Math.floor(record.bytes * 0.45)) : statSync(outPath).size;
  const shouldReplace = newSize < record.bytes || (longEdge !== null && longEdge > IMAGE_POLICY.photo.maxLongEdge);

  if (!shouldReplace) {
    if (!dryRun && existsSync(outPath)) {
      rmSync(outPath, { force: true });
    }
    return;
  }

  pushAction(`${app.name}: optimize photo ${record.relPath} (${formatBytes(record.bytes)} -> ${formatBytes(newSize)})`);
  replaceFile(app.dir, record.relPath, outPath);
}

function optimizeFloorPlanRecord(app, record) {
  const longEdge = maxLongEdge(record);
  const overBudget =
    record.bytes > IMAGE_POLICY.floorPlan.maxBytes ||
    (longEdge !== null && longEdge > IMAGE_POLICY.floorPlan.maxLongEdge);

  if (!overBudget) {
    return;
  }

  const outPath = nextTempFile('.png');

  if (!dryRun) {
    runSips([
      '-s',
      'format',
      'png',
      '-Z',
      String(IMAGE_POLICY.floorPlan.maxLongEdge),
      record.absPath,
      '--out',
      outPath,
    ]);
  }

  const newSize = dryRun ? Math.max(0, Math.floor(record.bytes * 0.8)) : statSync(outPath).size;
  pushAction(`${app.name}: optimize floor plan ${record.relPath} (${formatBytes(record.bytes)} -> ${formatBytes(newSize)})`);
  replaceFile(app.dir, record.relPath, outPath);
}

function buildOgFromSource(app, sourceAbsPath, targetRelPath) {
  const sourceDimensions = readImageDimensions(sourceAbsPath);
  if (!sourceDimensions) {
    pushAction(`${app.name}: skip OG generation for ${targetRelPath} (unsupported source format)`);
    return;
  }

  const resizedPath = nextTempFile(path.extname(sourceAbsPath).toLowerCase() || '.jpg');
  const croppedPath = nextTempFile(path.extname(sourceAbsPath).toLowerCase() || '.jpg');
  const targetAspect = IMAGE_POLICY.og.width / IMAGE_POLICY.og.height;
  const sourceAspect = sourceDimensions.width / sourceDimensions.height;

  if (!dryRun) {
    if (sourceAspect > targetAspect) {
      runSips(['--resampleHeight', String(IMAGE_POLICY.og.height), sourceAbsPath, '--out', resizedPath]);
    } else {
      runSips(['--resampleWidth', String(IMAGE_POLICY.og.width), sourceAbsPath, '--out', resizedPath]);
    }

    runSips(['-c', String(IMAGE_POLICY.og.height), String(IMAGE_POLICY.og.width), resizedPath, '--out', croppedPath]);
  }

  const qualities = [
    IMAGE_POLICY.og.quality,
    70,
    65,
    60,
    55,
  ];

  let selectedPath = null;
  let selectedSize = Number.MAX_SAFE_INTEGER;

  for (const quality of qualities) {
    const candidatePath = nextTempFile('.jpg');

    if (!dryRun) {
      runSips([
        '-s',
        'format',
        'jpeg',
        '-s',
        'formatOptions',
        String(quality),
        croppedPath,
        '--out',
        candidatePath,
      ]);
    } else {
      writeFileSync(candidatePath, readFileSync(sourceAbsPath));
    }

    const candidateSize = dryRun
      ? Math.max(0, Math.floor(statSync(sourceAbsPath).size * 0.12))
      : statSync(candidatePath).size;

    if (candidateSize < selectedSize) {
      selectedSize = candidateSize;
      selectedPath = candidatePath;
    }

    if (candidateSize <= IMAGE_POLICY.og.maxBytes) {
      selectedPath = candidatePath;
      selectedSize = candidateSize;
      break;
    }
  }

  if (!selectedPath) {
    pushAction(`${app.name}: failed to generate OG image for ${targetRelPath}`);
    return;
  }

  const targetAbsPath = relToPublicAbs(app.dir, targetRelPath);
  const hadTarget = existsSync(targetAbsPath);
  const beforeSize = hadTarget ? statSync(targetAbsPath).size : 0;

  pushAction(
    `${app.name}: build OG ${targetRelPath} from ${path.relative(app.dir, sourceAbsPath)} ` +
      `(${hadTarget ? `${formatBytes(beforeSize)} -> ` : ''}${formatBytes(selectedSize)})`
  );

  replaceFile(app.dir, targetRelPath, selectedPath);

  if (!dryRun) {
    if (existsSync(resizedPath)) {
      rmSync(resizedPath, { force: true });
    }
    if (existsSync(croppedPath)) {
      rmSync(croppedPath, { force: true });
    }
  }
}

function ensureOgImage(app, inventory) {
  const targetRelPath = IMAGE_POLICY.og.path;
  const targetAbsPath = relToPublicAbs(app.dir, targetRelPath);

  if (existsSync(targetAbsPath)) {
    const dimensions = readImageDimensions(targetAbsPath);
    const bytes = statSync(targetAbsPath).size;
    const isCompliant =
      dimensions &&
      dimensions.width === IMAGE_POLICY.og.width &&
      dimensions.height === IMAGE_POLICY.og.height &&
      bytes <= IMAGE_POLICY.og.maxBytes;

    if (isCompliant) {
      return;
    }

    buildOgFromSource(app, targetAbsPath, targetRelPath);
    return;
  }

  const candidates = buildOgFallbackCandidates(app.name);

  for (const relPath of candidates) {
    const absPath = relToPublicAbs(app.dir, relPath);
    if (existsSync(absPath) && isRasterFile(absPath)) {
      buildOgFromSource(app, absPath, targetRelPath);
      return;
    }
  }

  const firstReferencedPhoto = inventory.referenced.find((record) => record.role === 'photo');
  if (firstReferencedPhoto) {
    buildOgFromSource(app, firstReferencedPhoto.absPath, targetRelPath);
    return;
  }

  pushAction(`${app.name}: no source image found to build ${targetRelPath}`);
}

function prioritizeApps(apps) {
  const priority = ['larkmere-gardens', 'hearthmere-residential', 'alderwyck-apartments', 'caldridge-townhomes', 'norvale-commons'];
  const index = new Map(priority.map((name, order) => [name, order]));

  return [...apps].sort((a, b) => {
    const left = index.get(a.name) ?? Number.MAX_SAFE_INTEGER;
    const right = index.get(b.name) ?? Number.MAX_SAFE_INTEGER;
    if (left !== right) {
      return left - right;
    }
    return a.name.localeCompare(b.name);
  });
}

let apps = listApps();
if (appFilters.length > 0) {
  const selected = new Set(appFilters);
  apps = apps.filter((app) => selected.has(app.name));
}

apps = prioritizeApps(apps);

let optimizedCount = 0;
let floorPlanCount = 0;

for (const app of apps) {
  pushAction(`\n--- ${app.name} ---`);

  moveArchiveDirectoryOutsidePublic(app);

  const inventory = getAppImageInventory(app.dir);

  for (const record of inventory.referenced) {
    if (record.role === 'photo') {
      const beforeActions = actions.length;
      optimizePhotoRecord(app, record);
      if (actions.length > beforeActions) {
        optimizedCount += 1;
      }
      continue;
    }

    if (record.role === 'floorPlan') {
      const beforeActions = actions.length;
      optimizeFloorPlanRecord(app, record);
      if (actions.length > beforeActions) {
        floorPlanCount += 1;
      }
    }
  }

  if (isPropertyApp(app.name)) {
    ensureOgImage(app, inventory);
  }
}

pushAction('\nOptimization complete.');
pushAction(`photo updates: ${optimizedCount}`);
pushAction(`floor-plan updates: ${floorPlanCount}`);
pushAction(`mode: ${dryRun ? 'dry-run' : 'write'}`);
