import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';

const ROOT = process.cwd();
const DEPLOYED_APP_NAME = 'hearthmere-residential';
const SOURCE_SCAN_EXCLUDED_DIRECTORIES = new Set([
  '.next',
  '.turbo',
  'out',
  'dist',
  'node_modules',
]);

function read(relativePath) {
  return readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function listFiles(directory, predicate) {
  const results = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (SOURCE_SCAN_EXCLUDED_DIRECTORIES.has(entry.name)) {
        continue;
      }
      results.push(...listFiles(absolutePath, predicate));
    } else if (predicate(absolutePath)) {
      results.push(absolutePath);
    }
  }
  return results;
}

const sourceFiles = [
  ...listFiles(path.join(ROOT, 'apps'), (file) => /\.(?:ts|tsx|js|mjs)$/.test(file)),
  ...listFiles(path.join(ROOT, 'packages'), (file) => /\.(?:ts|tsx|js|mjs)$/.test(file)),
];

const source = sourceFiles.map((file) => readFileSync(file, 'utf8')).join('\n');

test('the production environment contract requires only one HTTPS site URL', () => {
  const envSource = read('packages/utils/src/env.ts');
  assert.match(
    envSource,
    /REQUIRED_PRODUCTION_ENV_KEYS\s*=\s*\['NEXT_PUBLIC_SITE_URL'\]\s+as const/
  );
  assert.match(envSource, /url\.protocol !== 'https:'/);
  assert.match(envSource, /isBlockedSourceHostname\(url\.hostname\)/);
  assert.match(envSource, /must not use a source-client hostname/);

  const publicEnvReferences = [
    ...source.matchAll(/process\.env\.(NEXT_PUBLIC_[A-Z0-9_]+)/g),
  ].map((match) => match[1]);
  assert.deepEqual([...new Set(publicEnvReferences)], ['NEXT_PUBLIC_SITE_URL']);
});

test('the production environment validator rejects missing, malformed, and non-HTTPS URLs', () => {
  const moduleUrl = pathToFileURL(path.join(ROOT, 'packages/utils/src/env.ts')).href;
  const evaluation = `
    import(${JSON.stringify(moduleUrl)}).then(({ validateProductionEnv }) => {
      const values = [undefined, 'not-a-url', 'http://hearthmere.example', 'https://hearthmere.example'];
      const results = values.map((value) => validateProductionEnv({
        env: { NODE_ENV: 'production', NEXT_PUBLIC_SITE_URL: value },
      }));
      process.stdout.write(JSON.stringify(results));
    });
  `;
  const results = JSON.parse(
    execFileSync(process.execPath, ['--experimental-strip-types', '-e', evaluation], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  );

  assert.equal(results[0].ok, false);
  assert.deepEqual(results[0].missingKeys, ['NEXT_PUBLIC_SITE_URL']);
  assert.equal(results[1].ok, false);
  assert.match(results[1].message, /valid absolute URL/);
  assert.equal(results[2].ok, false);
  assert.match(results[2].message, /must use HTTPS/);
  assert.equal(results[3].ok, true);
});

test('server actions and network-capable form submission code are absent', () => {
  assert.doesNotMatch(source, /['"]use server['"]/);

  const formFiles = sourceFiles.filter((file) =>
    /(?:forms\/|Form\.tsx$|PropertyContactForm|PropertyScheduleTourForm)/.test(file)
  );
  assert.ok(formFiles.length >= 10);

  for (const file of formFiles) {
    const value = readFileSync(file, 'utf8');
    assert.doesNotMatch(value, /\bfetch\s*\(/, file);
    assert.doesNotMatch(value, /\bXMLHttpRequest\b/, file);
    assert.doesNotMatch(value, /\bsendBeacon\b/, file);
    assert.doesNotMatch(value, /\bFormData\b/, file);
    assert.doesNotMatch(value, /\b(?:local|session)Storage\b/, file);
    assert.doesNotMatch(value, /\bconsole\.(?:log|info|warn|error)\b/, file);
    assert.doesNotMatch(value, /<form[^>]*\saction\s*=/s, file);
  }

  const simulatedForms = formFiles.filter((file) => {
    const value = readFileSync(file, 'utf8');
    return value.includes('window.setTimeout') && value.includes('.reset()');
  });
  assert.equal(simulatedForms.length, 3);
});

test('all external-looking contact and map actions are intercepted locally', () => {
  const actionableSource = sourceFiles
    .filter((file) => !file.endsWith('DemoSafetyNotice.tsx'))
    .map((file) => readFileSync(file, 'utf8'))
    .join('\n');

  assert.doesNotMatch(actionableSource, /href\s*=\s*[`{('"]*tel:/i);
  assert.doesNotMatch(actionableSource, /href\s*=\s*[`{('"]*mailto:/i);
  assert.doesNotMatch(actionableSource, /<iframe\b/i);

  const notice = read('packages/ui/src/components/DemoSafetyNotice.tsx');
  for (const action of ['phone', 'email', 'map', 'portal']) {
    assert.match(notice, new RegExp(`${action}:\\s*'Demo only:`));
  }
  assert.match(notice, /event\.preventDefault\(\)/);
});

test('the single deployed app emits the locked no-index and self-only response policy', () => {
  const csp = read('packages/config/src/demo-security.ts');
  for (const directive of [
    "default-src 'self'",
    "connect-src 'self'",
    "frame-src 'none'",
    "form-action 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
  ]) {
    assert.ok(csp.includes(directive), directive);
  }

  const config = JSON.parse(read('.vercel/output/config.json'));
  const demoRoute = config.routes.find(route => route.headers?.['X-Robots-Tag']);
  assert.equal(demoRoute.headers['X-Robots-Tag'], 'noindex, nofollow, noarchive');
  const htmlRoutes = config.routes.filter(route => route.headers?.['Content-Security-Policy']);
  assert.ok(htmlRoutes.length >= 58);
  for (const route of htmlRoutes) {
    const policy = route.headers['Content-Security-Policy'];
    assert.ok(policy.includes("form-action 'none'"));
    assert.ok(policy.includes("frame-ancestors 'none'"));
    assert.ok(!policy.includes("'unsafe-eval'"));
    assert.ok(!policy.includes("'nonce-"));
  }

  const robots = read(`apps/${DEPLOYED_APP_NAME}/src/app/robots.ts`);
  assert.match(robots, /userAgent:\s*'\*'/);
  assert.match(robots, /disallow:\s*'\//);

  const rootMetadata = read(
    'apps/hearthmere-residential/src/app/(portfolio)/layout.tsx'
  );
  const propertyMetadata = read('packages/ui/src/components/PropertyRootLayout.tsx');
  for (const metadata of [rootMetadata, propertyMetadata]) {
    assert.match(metadata, /index:\s*false/);
    assert.match(metadata, /follow:\s*false/);
  }
});

test('structured data is demo-labelled WebSite data only', () => {
  const schema = read('packages/ui/src/components/DemoWebsiteStructuredData.tsx');
  assert.match(schema, /'@type': 'WebSite'/);
  assert.match(schema, /Portfolio Demonstration/);
  assert.match(schema, /Fictional property-management website/);
  assert.doesNotMatch(schema, /'@type':\s*'(?:Offer|Apartment|Residence|Place)'/);
  assert.doesNotMatch(schema, /\bgeo\b|\blatitude\b|\blongitude\b/);

  const jsonLdWriters = sourceFiles.filter((file) =>
    readFileSync(file, 'utf8').includes('dangerouslySetInnerHTML')
  );
  assert.deepEqual(
    jsonLdWriters.map((file) => path.relative(ROOT, file)),
    ['packages/ui/src/components/DemoWebsiteStructuredData.tsx']
  );
});

test('images are local-only and remote image configuration is absent', () => {
  const imageConfig = read('packages/config/src/next-image.ts');
  assert.doesNotMatch(imageConfig, /\bremotePatterns\b|\bdomains\b/);

  const nextConfig = read(`apps/${DEPLOYED_APP_NAME}/next.config.ts`);
  assert.match(nextConfig, /createNextImageConfig\(\)/);
  assert.doesNotMatch(nextConfig, /\bremotePatterns\b|\bdomains\b/);
});
