import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';

const ROOT = process.cwd();
const read = (relativePath) =>
  readFileSync(path.join(ROOT, relativePath), 'utf8');

const expectedSites = {
  hearthmere: { basePath: '' },
  alderwyck: { basePath: '/alderwyck' },
  norvale: { basePath: '/norvale' },
  larkmere: { basePath: '/larkmere' },
  caldridge: { basePath: '/caldridge' },
};

const retiredProjectNames = [
  'alderwyck-apartments',
  'norvale-commons',
  'larkmere-gardens',
  'caldridge-townhomes',
];

function evaluateShowcaseConfig() {
  const moduleUrl = pathToFileURL(
    path.join(ROOT, 'packages/config/src/showcase-sites.ts')
  ).href;
  const evaluation = `
    import(${JSON.stringify(moduleUrl)}).then(({
      COMMUNITY_SHOWCASE_SITE_KEYS,
      SHOWCASE_PROJECT,
      SHOWCASE_SITES,
      withSiteBasePath,
      withSiteBaseUrl,
    }) => {
      process.stdout.write(JSON.stringify({
        communityKeys: COMMUNITY_SHOWCASE_SITE_KEYS,
        project: SHOWCASE_PROJECT,
        sites: SHOWCASE_SITES,
        pathCases: [
          withSiteBasePath('/alderwyck', '/images/hero.jpg'),
          withSiteBasePath('/alderwyck', '/alderwyck/images/hero.jpg'),
          withSiteBasePath('', '/images/hero.jpg'),
          withSiteBasePath('/alderwyck', 'https://example.com/image.jpg'),
          withSiteBasePath('/alderwyck', '//example.com/image.jpg'),
        ],
        urlCases: [
          withSiteBaseUrl('https://hearthmere.example', '/alderwyck'),
          withSiteBaseUrl('https://hearthmere.example/', '/norvale'),
        ],
      }));
    });
  `;

  return JSON.parse(
    execFileSync(
      process.execPath,
      ['--experimental-strip-types', '--input-type=module', '-e', evaluation],
      {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }
    )
  );
}

test('one Next.js project exposes all five unique mounted paths', () => {
  const result = evaluateShowcaseConfig();
  const entries = Object.entries(result.sites);

  assert.deepEqual(Object.keys(result.sites), Object.keys(expectedSites));
  assert.deepEqual(result.communityKeys, [
    'alderwyck',
    'norvale',
    'larkmere',
    'caldridge',
  ]);
  assert.equal(
    new Set(entries.map(([, site]) => site.basePath)).size,
    entries.length
  );
  assert.equal(result.project.appName, 'hearthmere-residential');
  assert.equal(result.project.localOrigin, 'http://127.0.0.1:3000');
  assert.equal(
    result.project.productionOrigin,
    'https://hearthmere-residential.vercel.app'
  );

  for (const [key, expected] of Object.entries(expectedSites)) {
    const site = result.sites[key];
    assert.equal(site.basePath, expected.basePath);
    assert.deepEqual(Object.keys(site), ['basePath']);
  }
});

test('base-path helpers produce mounted paths and URLs', () => {
  const { pathCases, urlCases } = evaluateShowcaseConfig();
  assert.deepEqual(pathCases, [
    '/alderwyck/images/hero.jpg',
    '/alderwyck/images/hero.jpg',
    '/images/hero.jpg',
    'https://example.com/image.jpg',
    '//example.com/image.jpg',
  ]);
  assert.deepEqual(urlCases, [
    'https://hearthmere.example/alderwyck',
    'https://hearthmere.example/norvale',
  ]);
});

test('community routes are compiled inside Hearthmere without multi-zone rewrites', () => {
  const nextConfig = read('apps/hearthmere-residential/next.config.ts');
  assert.doesNotMatch(nextConfig, /\brewrites\s*\(/);
  assert.match(nextConfig, /basePath: '\/examples\/property-management'/);
  assert.doesNotMatch(nextConfig, /productionOrigin|localOrigin/);

  for (const [key, site] of Object.entries(expectedSites).slice(1)) {
    const siteConfig = read(
      `apps/hearthmere-residential/src/sites/${key}/config/site.ts`
    );
    assert.ok(
      existsSync(
        path.join(
          ROOT,
          `apps/hearthmere-residential/src/app/(${key})/${key}/page.tsx`
        )
      )
    );
    assert.ok(
      existsSync(
        path.join(
          ROOT,
          `apps/hearthmere-residential/src/app/(${key})/layout.tsx`
        )
      )
    );
    assert.ok(siteConfig.includes(`SHOWCASE_SITES.${key}.basePath`));
    assert.ok(siteConfig.includes(`https://hearthmere.example${site.basePath}`));
  }

  for (const projectName of retiredProjectNames) {
    assert.equal(
      existsSync(path.join(ROOT, `apps/${projectName}/package.json`)),
      false
    );
  }
});

test('Hearthmere exposes community paths instead of external site URLs', () => {
  const properties = read(
    'apps/hearthmere-residential/src/config/properties.ts'
  );
  const card = read(
    'apps/hearthmere-residential/src/components/cards/PropertyCard.tsx'
  );

  assert.match(properties, /\bpath:\s*string/);
  assert.doesNotMatch(properties, /\burl:\s*string/);
  assert.doesNotMatch(properties, /\.vercel\.app/);
  assert.match(card, /href=\{property\.path\}/);
  assert.doesNotMatch(card, /target="_blank"/);
  assert.doesNotMatch(card, /ExternalLinkIcon/);
});
