import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const ROOT = process.cwd();
const read = (relativePath) =>
  readFileSync(path.join(ROOT, relativePath), 'utf8');

const apps = [
  {
    id: 'hearthmere-residential',
    port: 3000,
    name: 'Hearthmere Residential',
    address: '100 Portfolio Way, Suite 400, Example City, TX 00000',
    phone: '(214) 555-0100',
    units: 544,
    url: 'https://hearthmere.example',
  },
  {
    id: 'alderwyck-apartments',
    slug: 'alderwyck',
    name: 'Alderwyck Apartments',
    address: '1420 Lantern Walk, Example City, TX 00000',
    phone: '(682) 555-0111',
    units: 148,
    url: 'https://hearthmere.example/alderwyck',
    gallery: 10,
    floorPlans: 2,
    amenities: 18,
    pois: 19,
    sqft: [575, 820],
    price: [1245, 1495],
    bedroomBaths: ['1/1', '2/1'],
    featuredGalleryIds: ['ext-1', 'ext-4', 'int-kitchen-1', 'amen-pool-1'],
  },
  {
    id: 'norvale-commons',
    slug: 'norvale',
    name: 'Norvale Commons',
    address: '2875 Juniper Loop, Sample City, TN 00000',
    phone: '(615) 555-0122',
    units: 112,
    url: 'https://hearthmere.example/norvale',
    gallery: 22,
    floorPlans: 6,
    amenities: 24,
    pois: 19,
    sqft: [680, 1395],
    price: [1045, 1840],
    bedroomBaths: ['1/1', '2/1', '2/1.5', '2/2', '3/2', '3/2.5'],
    featuredGalleryIds: ['ext-hero', 'ext-entry-sign', 'int-kitchen', 'amen-pool'],
  },
  {
    id: 'larkmere-gardens',
    slug: 'larkmere',
    name: 'Larkmere Gardens',
    address: '3640 Garden Terrace, Demo City, KS 00000',
    phone: '(785) 555-0133',
    units: 128,
    url: 'https://hearthmere.example/larkmere',
    gallery: 24,
    floorPlans: 4,
    amenities: 16,
    pois: 19,
    sqft: [625, 985],
    price: [995, 1530],
    bedroomBaths: ['1/1', '2/1', '2/1', '3/1'],
    featuredGalleryIds: [
      'ext-1',
      'ext-7',
      'int-living-1',
      'int-kitchen-1',
      'amen-playground-1',
    ],
  },
  {
    id: 'caldridge-townhomes',
    slug: 'caldridge',
    name: 'Caldridge Townhomes',
    address: '4812 Foundry Row, Example Heights, TN 00000',
    phone: '(423) 555-0144',
    units: 156,
    url: 'https://hearthmere.example/caldridge',
    gallery: 30,
    floorPlans: 6,
    amenities: 16,
    pois: 22,
    sqft: [745, 1895],
    price: [1325, 2580],
    bedroomBaths: ['1/1', '2/1', '2/1.5', '3/2.5', '3/3', '4/3'],
    featuredGalleryIds: ['amen-pool-1', 'ext-primary-1', 'int-2', 'int-new-1'],
  },
];

const propertyApps = apps.slice(1);
const deployedAppRoot = 'apps/hearthmere-residential';

function sourceRoot(app) {
  return app.slug
    ? `${deployedAppRoot}/src/sites/${app.slug}`
    : `${deployedAppRoot}/src`;
}

function routeRoot(app) {
  return app.slug
    ? `${deployedAppRoot}/src/app/(${app.slug})/${app.slug}`
    : `${deployedAppRoot}/src/app/(portfolio)`;
}

function exportBlock(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(start, -1, `Missing export marker: ${startMarker}`);
  assert.notEqual(end, -1, `Missing export marker: ${endMarker}`);
  return source.slice(start, end);
}

function idsIn(block) {
  return [...block.matchAll(/\bid:\s*'([^']+)'/g)].map(([, id]) => id);
}

function floorPlanPairs(block) {
  const bedroomValues = [...block.matchAll(/\bbedrooms:\s*(\d+(?:\.\d+)?)/g)].map(
    ([, value]) => Number(value)
  );
  const bathroomValues = [...block.matchAll(/\bbathrooms:\s*(\d+(?:\.\d+)?)/g)].map(
    ([, value]) => Number(value)
  );
  assert.equal(bedroomValues.length, bathroomValues.length);
  return bedroomValues.map((bedrooms, index) => `${bedrooms}/${bathroomValues[index]}`);
}

function numericRange(block, field) {
  const pattern = new RegExp(
    `\\b${field}:\\s*\\{\\s*min:\\s*(\\d+),\\s*max:\\s*(\\d+)\\s*\\}`,
    'g'
  );
  const ranges = [...block.matchAll(pattern)].map(([, min, max]) => [
    Number(min),
    Number(max),
  ]);
  return [
    Math.min(...ranges.map(([min]) => min)),
    Math.max(...ranges.map(([, max]) => max)),
  ];
}

function featuredGalleryIds(block) {
  return block
    .split(/\n\s*\{\s*\n/)
    .filter((entry) => /\bfeatured:\s*true/.test(entry))
    .map((entry) => entry.match(/\bid:\s*'([^']+)'/)?.[1])
    .filter(Boolean);
}

test('the workspace has one deployed app containing five locked identities', () => {
  const appDirectories = readdirSync(path.join(ROOT, 'apps'), {
    withFileTypes: true,
  })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        existsSync(path.join(ROOT, 'apps', entry.name, 'package.json'))
    )
    .map((entry) => entry.name)
    .sort();

  assert.deepEqual(appDirectories, ['gallery', 'hearthmere-residential', 'practice-studio']);

  const rootPackage = JSON.parse(read('package.json'));
  assert.equal(rootPackage.name, 'site-examples');
  assert.equal(rootPackage.private, true);
  assert.equal(rootPackage.packageManager, 'pnpm@11.9.0');
  assert.equal(rootPackage.engines.node, '>=24 <25');
  assert.equal(existsSync(path.join(ROOT, 'LICENSE')), true);

  const appPackage = JSON.parse(read(`${deployedAppRoot}/package.json`));
  assert.equal(appPackage.name, 'hearthmere-residential');
  assert.match(appPackage.scripts.dev, /--port 3000$/);

  for (const packageName of ['config', 'hooks', 'ui', 'utils']) {
    const packageJson = JSON.parse(read(`packages/${packageName}/package.json`));
    assert.equal(packageJson.name, `@hearthmere/${packageName}`);
  }
});

test('all locked fictional identities and facts are present', () => {
  const corporateConfig = read('apps/hearthmere-residential/src/config/company.ts');
  assert.match(corporateConfig, /Hearthmere Residential/);
  assert.ok(corporateConfig.includes(apps[0].address));
  assert.ok(corporateConfig.includes(apps[0].phone));
  assert.match(corporateConfig, /\btotalUnits:\s*['"]?544['"]?/);
  assert.match(corporateConfig, /\bpropertiesManaged:\s*4\b/);

  for (const app of propertyApps) {
    const propertyConfig = read(`${sourceRoot(app)}/config/property.ts`);
    assert.ok(propertyConfig.includes(app.name));
    assert.ok(propertyConfig.includes(app.address));
    assert.ok(propertyConfig.includes(app.phone));
    assert.match(propertyConfig, new RegExp(`\\bunitCount:\\s*${app.units}\\b`));
    assert.match(propertyConfig, /\bcoordinates:\s*null\b/);
    assert.match(propertyConfig, /\bresidentPortalPath:\s*'\/resident-portal'/);
  }
});

test('local canonical defaults use only the locked example hosts', () => {
  for (const app of apps) {
    const appRoot = path.join(ROOT, sourceRoot(app));
    const source = readdirSync(appRoot, { recursive: true })
      .filter((entry) => /\.(?:ts|tsx)$/.test(entry))
      .map((entry) => read(path.join(sourceRoot(app), entry)))
      .join('\n');
    assert.ok(
      source.includes(app.url),
      `${app.id} should include its locked local canonical URL`
    );
  }
});

test('property content cardinality, ranges, and featured positions stay locked', () => {
  for (const app of propertyApps) {
    const configRoot = `${sourceRoot(app)}/config`;
    const galleryBlock = exportBlock(
      read(`${configRoot}/gallery.ts`),
      'export const galleryImages',
      'export const getFeaturedImages'
    );
    const floorPlansBlock = exportBlock(
      read(`${configRoot}/floor-plans.ts`),
      'export const floorPlans',
      'export const getPriceRange'
    );
    const amenitiesBlock = exportBlock(
      read(`${configRoot}/amenities.ts`),
      'export const amenityCategories',
      'export const allAmenities'
    );
    const neighborhoodBlock = exportBlock(
      read(`${configRoot}/neighborhood.ts`),
      'export const neighborhoodSections',
      'export const walkScore'
    );

    assert.equal(idsIn(galleryBlock).length, app.gallery, `${app.id} gallery count`);
    assert.equal(idsIn(floorPlansBlock).length, app.floorPlans, `${app.id} floor plan count`);
    assert.equal(
      idsIn(amenitiesBlock).length - 2,
      app.amenities,
      `${app.id} amenity count`
    );
    assert.equal(
      (neighborhoodBlock.match(/\btype:\s*'/g) ?? []).length,
      app.pois,
      `${app.id} POI count`
    );
    assert.deepEqual(numericRange(floorPlansBlock, 'sqft'), app.sqft);
    assert.deepEqual(numericRange(floorPlansBlock, 'price'), app.price);
    assert.deepEqual(floorPlanPairs(floorPlansBlock), app.bedroomBaths);
    assert.deepEqual(featuredGalleryIds(galleryBlock), app.featuredGalleryIds);
  }
});

test('all apps expose the local resident portal and portfolio disclosure', () => {
  const disclosure =
    'Portfolio demonstration — all properties, pricing, availability, and contact details are fictional.';

  for (const app of propertyApps) {
    assert.equal(
      existsSync(path.join(ROOT, `${routeRoot(app)}/resident-portal/page.tsx`)),
      true,
      `${app.id} resident portal route`
    );
  }

  const notice = read('packages/ui/src/components/DemoSafetyNotice.tsx');
  const propertyFooter = read('packages/ui/src/components/PropertyFooter.tsx');
  const propertyLayout = read('packages/ui/src/components/PropertyRootLayout.tsx');
  const corporateLayout = read(
    'apps/hearthmere-residential/src/app/(portfolio)/layout.tsx'
  );

  assert.ok(notice.includes(disclosure));
  assert.match(propertyFooter, /PORTFOLIO_DISCLOSURE/);
  assert.match(propertyLayout, /<DemoSafetyNotice \/>/);
  assert.match(corporateLayout, /<DemoSafetyNotice \/>/);
});
