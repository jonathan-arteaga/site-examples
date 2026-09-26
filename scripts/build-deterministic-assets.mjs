#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { getAppPublicRoot, readImageDimensions } from './images-lib.mjs';

const ROOT = process.cwd();
const TEMP_DIR = mkdtempSync(path.join(os.tmpdir(), 'hearthmere-deterministic-assets-'));

const BRANDS = {
  'hearthmere-residential': {
    name: 'Hearthmere Residential',
    short: 'Hearthmere',
    descriptor: 'MULTIFAMILY MANAGEMENT',
    primary: '#526778',
    accent: '#83A08B',
    ink: '#26343E',
    mark: 'hearth',
  },
  'alderwyck-apartments': {
    name: 'Alderwyck Apartments',
    short: 'Alderwyck',
    descriptor: 'APARTMENT HOMES',
    primary: '#176F70',
    accent: '#D78B45',
    ink: '#164C4C',
    mark: 'alder',
  },
  'norvale-commons': {
    name: 'Norvale Commons',
    short: 'Norvale',
    descriptor: 'APARTMENT HOMES',
    primary: '#8B3F3F',
    accent: '#B88A67',
    ink: '#3F3838',
    mark: 'norvale',
  },
  'larkmere-gardens': {
    name: 'Larkmere Gardens',
    short: 'Larkmere',
    descriptor: 'GARDEN APARTMENTS',
    primary: '#587866',
    accent: '#B09A69',
    ink: '#344B40',
    mark: 'lark',
  },
  'caldridge-townhomes': {
    name: 'Caldridge Townhomes',
    short: 'Caldridge',
    descriptor: 'TOWNHOME LIVING',
    primary: '#96523B',
    accent: '#C58A61',
    ink: '#403A37',
    mark: 'caldridge',
  },
};

const PROPERTY_APPS = [
  'alderwyck-apartments',
  'norvale-commons',
  'larkmere-gardens',
  'caldridge-townhomes',
];

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function markPaths(mark, color, accent) {
  if (mark === 'hearth') {
    return `
      <path d="M18 55 60 18l42 37" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M29 50v48h62V50M48 98V67h24v31" fill="none" stroke="${color}" stroke-width="9" stroke-linejoin="round"/>
      <path d="M60 39c9 10 11 17 7 24-3 6-11 7-16 2-7-8 1-18 9-26Z" fill="${accent}"/>`;
  }
  if (mark === 'alder') {
    return `
      <path d="m18 100 40-82h6l40 82M36 68h49" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M66 52c16-19 31-16 38-24-1 20-12 34-38 30Z" fill="${accent}"/>
      <path d="M64 55c8-8 18-15 29-20" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`;
  }
  if (mark === 'norvale') {
    return `
      <rect x="15" y="15" width="90" height="90" rx="18" fill="none" stroke="${color}" stroke-width="8"/>
      <path d="M34 88V32l52 56V32" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 101h56" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>`;
  }
  if (mark === 'lark') {
    return `
      <path d="M30 20v74h65" fill="none" stroke="${color}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M48 67c5-29 24-41 49-43-3 28-18 47-49 43Z" fill="${accent}"/>
      <path d="M46 70c13-18 28-30 45-38" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`;
  }
  return `
    <path d="M96 32c-9-10-21-15-36-15-27 0-46 19-46 43s19 43 46 43c15 0 27-5 36-15" fill="none" stroke="${color}" stroke-width="11" stroke-linecap="round"/>
    <path d="m34 49 26-22 26 22M45 45v33h30V45" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function brandmarkSvg(brand, dark = false) {
  const color = dark ? brand.ink : '#FFFFFF';
  const accent = brand.accent;
  const background = dark ? '#FFFFFF' : brand.primary;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 120 120" role="img" aria-label="${escapeXml(brand.name)} brand mark">
  <rect width="120" height="120" rx="24" fill="${background}"/>
  ${markPaths(brand.mark, color, accent)}
</svg>
`;
}

function horizontalLogoSvg(brand, dark = false) {
  const text = dark ? brand.ink : '#FFFFFF';
  const markColor = dark ? brand.primary : '#FFFFFF';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="140" viewBox="0 0 600 140" role="img" aria-label="${escapeXml(brand.name)}">
  <g transform="translate(16 10)">${markPaths(brand.mark, markColor, brand.accent)}</g>
  <text x="150" y="67" fill="${text}" font-family="Georgia, 'Times New Roman', serif" font-size="39" font-weight="700" letter-spacing=".3">${escapeXml(brand.short)}</text>
  <text x="151" y="99" fill="${dark ? brand.primary : brand.accent}" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="3.1">${escapeXml(brand.descriptor)}</text>
</svg>
`;
}

function stackedLogoSvg(brand, dark = false) {
  const text = dark ? brand.ink : '#FFFFFF';
  const markColor = dark ? brand.primary : '#FFFFFF';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="280" viewBox="0 0 360 280" role="img" aria-label="${escapeXml(brand.name)}">
  <g transform="translate(120 20)">${markPaths(brand.mark, markColor, brand.accent)}</g>
  <text x="180" y="183" text-anchor="middle" fill="${text}" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="700">${escapeXml(brand.short)}</text>
  <text x="180" y="218" text-anchor="middle" fill="${dark ? brand.primary : brand.accent}" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" letter-spacing="2.8">${escapeXml(brand.descriptor)}</text>
</svg>
`;
}

function stripPngMetadata(filePath) {
  const buffer = readFileSync(filePath);
  if (buffer.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    throw new Error(`Not a PNG: ${filePath}`);
  }

  const chunks = [buffer.subarray(0, 8)];
  const keep = new Set(['IHDR', 'PLTE', 'IDAT', 'IEND', 'tRNS']);
  let offset = 8;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const end = offset + 12 + length;
    if (end > buffer.length) throw new Error(`Malformed PNG: ${filePath}`);
    if (keep.has(type)) chunks.push(buffer.subarray(offset, end));
    offset = end;
    if (type === 'IEND') break;
  }
  writeFileSync(filePath, Buffer.concat(chunks));
}

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

function rasterizeSvg(svgPath, targetPath, width, height, format) {
  mkdirSync(path.dirname(targetPath), { recursive: true });
  execFileSync(
    'sips',
    [
      '-s',
      'format',
      format,
      ...(format === 'jpeg' ? ['-s', 'formatOptions', '88'] : []),
      '-z',
      String(height),
      String(width),
      '--deleteColorManagementProperties',
      svgPath,
      '--out',
      targetPath,
    ],
    { stdio: 'ignore' }
  );
  if (format === 'jpeg') stripJpegMetadata(targetPath);
  if (format === 'png') stripPngMetadata(targetPath);
}

function buildLogos() {
  let svgCount = 0;
  let pngCount = 0;

  for (const [app, brand] of Object.entries(BRANDS)) {
    const appDir = path.join(ROOT, 'apps', app);
    const imageDir = path.join(getAppPublicRoot(appDir), 'images');
    mkdirSync(imageDir, { recursive: true });
    const variants = {
      'logo.svg': stackedLogoSvg(brand, false),
      'logo-dark.svg': stackedLogoSvg(brand, true),
      'logo-horizontal.svg': horizontalLogoSvg(brand, false),
      'logo-horizontal-dark.svg': horizontalLogoSvg(brand, true),
      'logo-brandmark.svg': brandmarkSvg(brand, false),
      'logo-brandmark-dark.svg': brandmarkSvg(brand, true),
    };
    if (app === 'hearthmere-residential') {
      variants['logo-stacked.svg'] = stackedLogoSvg(brand, false);
    }

    for (const [filename, contents] of Object.entries(variants)) {
      writeFileSync(path.join(imageDir, filename), contents);
      svgCount += 1;
    }

    const brandmarkPath = path.join(imageDir, 'logo-brandmark.svg');
    for (const size of [192, 512]) {
      const targetPath = path.join(imageDir, `logo-brandmark-${size}.png`);
      rasterizeSvg(brandmarkPath, targetPath, size, size, 'png');
      pngCount += 1;
    }
  }

  return { svgCount, pngCount };
}

const FLOOR_PLANS = [
  ['alderwyck-apartments', '1br-1ba.jpg', '1 Bedroom / 1 Bath', 1, 1, '546 sq ft', false],
  ['alderwyck-apartments', '2br-1ba.jpg', '2 Bedroom / 1 Bath', 2, 1, '795 sq ft', false],
  ['norvale-commons', '1br-1ba.jpg', '1 Bedroom / 1 Bath', 1, 1, '660 sq ft', false],
  ['norvale-commons', '2br-1ba.jpg', '2 Bedroom / 1 Bath', 2, 1, '880 sq ft', false],
  ['norvale-commons', '2br-1.5ba.jpg', '2 Bedroom / 1.5 Bath', 2, 1.5, '906 sq ft', true],
  ['norvale-commons', '2br-2ba.jpg', '2 Bedroom / 2 Bath', 2, 2, '1,000 sq ft', false],
  ['norvale-commons', '3br-2ba-flat.jpg', '3 Bedroom / 2 Bath Flat', 3, 2, '1,120 sq ft', false],
  ['norvale-commons', '3br-2.5ba-townhome.jpg', '3 Bedroom / 2.5 Bath Townhome', 3, 2.5, '1,375 sq ft', true],
  ['larkmere-gardens', '1br-1ba.jpg', '1 Bedroom / 1 Bath', 1, 1, '615–700 sq ft', false],
  ['larkmere-gardens', '2br-1ba.jpg', '2 Bedroom / 1 Bath', 2, 1, '750 sq ft', false],
  ['larkmere-gardens', '2br-xl-1ba.jpg', '2 Bedroom XL / 1 Bath', 2, 1, '930 sq ft', false],
  ['larkmere-gardens', '3br-1ba.jpg', '3 Bedroom / 1 Bath', 3, 1, '930 sq ft', false],
  ['caldridge-townhomes', '1br-1ba.jpg', '1 Bedroom / 1 Bath', 1, 1, '750–850 sq ft', true],
  ['caldridge-townhomes', '2br-1ba.jpg', '2 Bedroom / 1 Bath', 2, 1, '950–1,050 sq ft', true],
  ['caldridge-townhomes', '2br-1.5ba-townhome.jpg', '2 Bedroom / 1.5 Bath Townhome', 2, 1.5, '1,050–1,150 sq ft', true],
  ['caldridge-townhomes', '3br-2.5ba-townhome.jpg', '3 Bedroom / 2.5 Bath Townhome', 3, 2.5, '1,300–1,500 sq ft', true],
  ['caldridge-townhomes', '3br-3ba-townhome.jpg', '3 Bedroom / 3 Bath Townhome', 3, 3, '1,600 sq ft', true],
  ['caldridge-townhomes', '4br-3ba-townhome.jpg', '4 Bedroom / 3 Bath Townhome', 4, 3, '1,600–1,900 sq ft', true],
];

function roomRect(x, y, width, height, label, fill, stroke, subtitle = '') {
  const fontSize = Math.max(16, Math.min(27, Math.floor(width / 9)));
  return `<g>
  <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="8"/>
  <text x="${x + width / 2}" y="${y + height / 2 - (subtitle ? 7 : 0)}" text-anchor="middle" fill="#34404A" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="1">${escapeXml(label)}</text>
  ${subtitle ? `<text x="${x + width / 2}" y="${y + height / 2 + 23}" text-anchor="middle" fill="#65727B" font-family="Arial, Helvetica, sans-serif" font-size="16">${escapeXml(subtitle)}</text>` : ''}
</g>`;
}

function windowLine(x1, y1, x2, y2) {
  return `<path d="M${x1} ${y1}H${x2}" stroke="#7EA4AF" stroke-width="13" stroke-linecap="round"/>`;
}

function flatPlanSvg(plan, brand) {
  const [app, filename, title, bedrooms, bathrooms, sqft] = plan;
  const bedCells = [];
  const bedRegion = { x: 86, y: 245, width: 548, height: 730 };
  const columns = bedrooms >= 3 ? 2 : 1;
  const rows = Math.ceil(bedrooms / columns);
  const cellWidth = bedRegion.width / columns;
  const cellHeight = bedRegion.height / rows;
  for (let index = 0; index < bedrooms; index += 1) {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const x = bedRegion.x + col * cellWidth;
    const y = bedRegion.y + row * cellHeight;
    bedCells.push(
      roomRect(
        x,
        y,
        cellWidth,
        cellHeight,
        index === 0 ? 'PRIMARY BEDROOM' : `BEDROOM ${index + 1}`,
        index % 2 ? '#F4F0E9' : '#F8F5EF',
        brand.ink,
        index === 0 ? '11′ × 12′' : '10′ × 11′'
      )
    );
  }

  const bathCount = Math.ceil(bathrooms);
  const bathWidth = 480 / bathCount;
  const baths = Array.from({ length: bathCount }, (_, index) =>
    roomRect(
      634 + index * bathWidth,
      245,
      bathWidth,
      190,
      index === 0 ? 'BATH' : `BATH ${index + 1}`,
      '#EAF1F1',
      brand.ink,
      bathrooms % 1 && index === bathCount - 1 ? 'HALF' : ''
    )
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-label="${escapeXml(title)} conceptual floor plan">
  <rect width="1200" height="1200" fill="#FFFFFF"/>
  <rect x="34" y="34" width="1132" height="1132" rx="24" fill="#FCFBF8" stroke="${brand.primary}" stroke-width="5"/>
  <text x="70" y="104" fill="${brand.ink}" font-family="Georgia, 'Times New Roman', serif" font-size="46" font-weight="700">${escapeXml(title)}</text>
  <text x="73" y="145" fill="${brand.primary}" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" letter-spacing="3">${escapeXml(brand.name.toUpperCase())}</text>
  <text x="1127" y="104" text-anchor="end" fill="#59666F" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">${escapeXml(sqft)}</text>
  <text x="1127" y="139" text-anchor="end" fill="#7B858C" font-family="Arial, Helvetica, sans-serif" font-size="15">FICTIONAL CONCEPT • NOT TO SCALE</text>
  <path d="M66 194H1134" stroke="${brand.accent}" stroke-width="3"/>
  ${bedCells.join('')}
  ${baths}
  ${roomRect(634, 435, 480, 235, 'KITCHEN + DINING', '#F3EEE5', brand.ink, 'OPEN PLAN')}
  ${roomRect(634, 670, 480, 305, 'LIVING ROOM', '#F8F5EF', brand.ink, 'PATIO / ENTRY')}
  ${windowLine(696, 976, 1042, 976)}
  <path d="M1037 925v50m0-50a50 50 0 0 1 50 50" fill="none" stroke="${brand.accent}" stroke-width="5"/>
  <text x="1067" y="1044" text-anchor="end" fill="${brand.primary}" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">ENTRY</text>
  <path d="M72 1059H1128" stroke="#D8D4CB" stroke-width="2"/>
  <g transform="translate(77 1082)">
    <rect width="18" height="18" rx="3" fill="#F8F5EF" stroke="${brand.ink}" stroke-width="2"/>
    <text x="31" y="15" fill="#647079" font-family="Arial, Helvetica, sans-serif" font-size="15">LIVING / BEDROOM</text>
    <rect x="250" width="18" height="18" rx="3" fill="#EAF1F1" stroke="${brand.ink}" stroke-width="2"/>
    <text x="281" y="15" fill="#647079" font-family="Arial, Helvetica, sans-serif" font-size="15">BATH</text>
    <rect x="410" width="18" height="18" rx="3" fill="#F3EEE5" stroke="${brand.ink}" stroke-width="2"/>
    <text x="441" y="15" fill="#647079" font-family="Arial, Helvetica, sans-serif" font-size="15">KITCHEN</text>
  </g>
</svg>
`;
}

function townhomePlanSvg(plan, brand) {
  const [, , title, bedrooms, bathrooms, sqft] = plan;
  const secondFloorBaths = Math.max(1, Math.floor(bathrooms));
  const bedroomRects = [];
  const bedroomWidth = 456 / Math.min(2, bedrooms);
  const rows = Math.ceil(bedrooms / 2);
  const bedroomHeight = 430 / rows;
  for (let index = 0; index < bedrooms; index += 1) {
    const col = index % 2;
    const row = Math.floor(index / 2);
    bedroomRects.push(
      roomRect(
        650 + col * bedroomWidth,
        245 + row * bedroomHeight,
        bedroomWidth,
        bedroomHeight,
        index === 0 ? 'PRIMARY BED' : `BED ${index + 1}`,
        index % 2 ? '#F4F0E9' : '#F8F5EF',
        brand.ink
      )
    );
  }
  const bathWidth = 456 / secondFloorBaths;
  const upperBaths = Array.from({ length: secondFloorBaths }, (_, index) =>
    roomRect(
      650 + index * bathWidth,
      675,
      bathWidth,
      180,
      index === 0 ? 'BATH' : `BATH ${index + 1}`,
      '#EAF1F1',
      brand.ink
    )
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-label="${escapeXml(title)} conceptual floor plan">
  <rect width="1200" height="1200" fill="#FFFFFF"/>
  <rect x="34" y="34" width="1132" height="1132" rx="24" fill="#FCFBF8" stroke="${brand.primary}" stroke-width="5"/>
  <text x="70" y="104" fill="${brand.ink}" font-family="Georgia, 'Times New Roman', serif" font-size="43" font-weight="700">${escapeXml(title)}</text>
  <text x="73" y="145" fill="${brand.primary}" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" letter-spacing="3">${escapeXml(brand.name.toUpperCase())}</text>
  <text x="1127" y="104" text-anchor="end" fill="#59666F" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">${escapeXml(sqft)}</text>
  <text x="1127" y="139" text-anchor="end" fill="#7B858C" font-family="Arial, Helvetica, sans-serif" font-size="15">FICTIONAL CONCEPT • NOT TO SCALE</text>
  <path d="M66 194H1134" stroke="${brand.accent}" stroke-width="3"/>
  <text x="314" y="225" text-anchor="middle" fill="${brand.primary}" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" letter-spacing="2">LEVEL ONE</text>
  <text x="878" y="225" text-anchor="middle" fill="${brand.primary}" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" letter-spacing="2">LEVEL TWO</text>
  ${roomRect(86, 245, 456, 230, 'KITCHEN + DINING', '#F3EEE5', brand.ink)}
  ${roomRect(86, 475, 456, 380, 'LIVING ROOM', '#F8F5EF', brand.ink, 'PATIO')}
  ${roomRect(86, 855, 228, 120, 'ENTRY', '#F4F0E9', brand.ink)}
  ${roomRect(314, 855, 228, 120, bathrooms % 1 ? 'POWDER' : 'STAIR', '#EAF1F1', brand.ink)}
  ${bedroomRects.join('')}
  ${upperBaths}
  ${roomRect(650, 855, 456, 120, 'LANDING + STORAGE', '#F4F0E9', brand.ink)}
  ${windowLine(154, 976, 472, 976)}
  ${windowLine(714, 976, 1040, 976)}
  <path d="M574 245V975" stroke="${brand.accent}" stroke-width="3" stroke-dasharray="9 10"/>
  <text x="590" y="610" transform="rotate(90 590 610)" text-anchor="middle" fill="#8A8178" font-family="Arial, Helvetica, sans-serif" font-size="14" letter-spacing="2">TWO-LEVEL HOME</text>
  <path d="M72 1059H1128" stroke="#D8D4CB" stroke-width="2"/>
  <text x="72" y="1096" fill="#647079" font-family="Arial, Helvetica, sans-serif" font-size="16">Concept diagram for website demonstration only. Dimensions and room arrangement are illustrative.</text>
</svg>
`;
}

function buildFloorPlans() {
  for (const plan of FLOOR_PLANS) {
    const [app, filename, , , , , townhome] = plan;
    const brand = BRANDS[app];
    const svg = townhome ? townhomePlanSvg(plan, brand) : flatPlanSvg(plan, brand);
    const svgPath = path.join(TEMP_DIR, `${app}-${filename}.svg`);
    const appDir = path.join(ROOT, 'apps', app);
    const targetPath = path.join(
      getAppPublicRoot(appDir),
      'images',
      'floor-plans',
      filename
    );
    writeFileSync(svgPath, svg);
    rasterizeSvg(svgPath, targetPath, 1200, 1200, 'jpeg');

    const dimensions = readImageDimensions(targetPath);
    if (!dimensions || dimensions.width !== 1200 || dimensions.height !== 1200) {
      throw new Error(`Floor plan has wrong dimensions: ${targetPath}`);
    }
  }
  return FLOOR_PLANS.length;
}

const logoCounts = buildLogos();
const floorPlanCount = buildFloorPlans();

console.log(`SVG logo variants: ${logoCounts.svgCount}`);
console.log(`PNG logo variants: ${logoCounts.pngCount}`);
console.log(`Floor-plan diagrams: ${floorPlanCount}`);
console.log(`Temporary source directory: ${TEMP_DIR}`);

if (logoCounts.svgCount !== 31 || logoCounts.pngCount !== 10 || floorPlanCount !== 18) {
  throw new Error('Deterministic asset count invariant failed.');
}

for (const app of PROPERTY_APPS) {
  const appDir = path.join(ROOT, 'apps', app);
  const floorDir = path.join(getAppPublicRoot(appDir), 'images', 'floor-plans');
  if (!existsSync(floorDir)) throw new Error(`Missing floor-plan directory: ${floorDir}`);
}
