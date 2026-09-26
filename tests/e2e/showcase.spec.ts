import {
  expect,
  test,
  type Page,
  type Request,
  type TestInfo,
} from '@playwright/test';

const DISCLOSURE =
  'Portfolio demonstration — all properties, pricing, availability, and contact details are fictional.';
const LOCAL_PREFERENCE_KEY = 'portfolio-demo-notice-dismissed';
const PUBLIC_ORIGIN = `${process.env.PORTFOLIO_ORIGIN || 'https://website-examples-alpha.vercel.app'}/examples/property-management`;
const MOUNT = '/examples/property-management';
const gatewayPort = Number(process.env.SHOWCASE_GATEWAY_PORT ?? '3000');

if (!Number.isInteger(gatewayPort) || gatewayPort < 1 || gatewayPort > 65_535) {
  throw new Error('SHOWCASE_GATEWAY_PORT must be a valid TCP port');
}

const corporateRoutes = [
  '/',
  '/about',
  '/contact',
  '/privacy-policy',
  '/properties',
  '/terms-of-service',
] as const;

const propertyRoutes = [
  '/',
  '/accessibility',
  '/amenities',
  '/applicants',
  '/contact',
  '/floor-plans',
  '/gallery',
  '/listings',
  '/neighborhood',
  '/privacy-policy',
  '/resident-portal',
  '/schedule-tour',
  '/terms-of-service',
] as const;

const sites = [
  {
    name: 'Hearthmere Residential',
    origin: `http://127.0.0.1:${gatewayPort}`,
    basePath: '',
    routes: corporateRoutes,
    property: false,
  },
  {
    name: 'Alderwyck Apartments',
    origin: `http://127.0.0.1:${gatewayPort}`,
    basePath: '/alderwyck',
    routes: propertyRoutes,
    property: true,
  },
  {
    name: 'Norvale Commons',
    origin: `http://127.0.0.1:${gatewayPort}`,
    basePath: '/norvale',
    routes: propertyRoutes,
    property: true,
  },
  {
    name: 'Larkmere Gardens',
    origin: `http://127.0.0.1:${gatewayPort}`,
    basePath: '/larkmere',
    routes: propertyRoutes,
    property: true,
  },
  {
    name: 'Caldridge Townhomes',
    origin: `http://127.0.0.1:${gatewayPort}`,
    basePath: '/caldridge',
    routes: propertyRoutes,
    property: true,
  },
] as const;

function siteUrl(site: (typeof sites)[number], route = '/') {
  const mountedOrigin = `${site.origin}${MOUNT}${site.basePath}`;
  return route === '/' ? mountedOrigin : `${mountedOrigin}${route}`;
}

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 1000 },
] as const;

async function dismissPreferenceNotice(page: Page) {
  await page.addInitScript(
    ({ key }) => window.localStorage.setItem(key, 'yes'),
    { key: LOCAL_PREFERENCE_KEY }
  );
}

function isSameOriginNextRscRequest(request: Request, origin: string) {
  const url = new URL(request.url());
  return (
    request.method() === 'GET' &&
    url.origin === origin &&
    url.searchParams.has('_rsc')
  );
}

function monitorPage(page: Page, origin: string) {
  const consoleProblems: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  const foreignRequests: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      consoleProblems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => {
    const errorText = request.failure()?.errorText;
    const isCancelledNextPrefetch =
      isSameOriginNextRscRequest(request, origin) &&
      errorText === 'net::ERR_ABORTED';

    const requestUrl = new URL(request.url());
    const isCancelledStaticProbe = request.method() === 'HEAD' && requestUrl.origin === origin && requestUrl.pathname === `${MOUNT}/` && errorText === 'net::ERR_ABORTED';
    if (!isCancelledNextPrefetch && !isCancelledStaticProbe) {
      failedRequests.push(`${request.method()} ${request.url()}: ${errorText}`);
    }
  });
  page.on('request', (request) => {
    const url = new URL(request.url());
    if ((url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== origin) {
      foreignRequests.push(`${request.method()} ${request.url()}`);
    }
  });

  return () => {
    expect(consoleProblems, 'browser console warnings or errors').toEqual([]);
    expect(pageErrors, 'uncaught browser errors').toEqual([]);
    expect(failedRequests, 'failed runtime requests').toEqual([]);
    expect(foreignRequests, 'requests to a non-demo origin').toEqual([]);
  };
}

async function assertRoute(
  page: Page,
  site: (typeof sites)[number],
  route: string,
  viewport: (typeof viewports)[number],
  testInfo: TestInfo
) {
  await page.setViewportSize(viewport);
  await dismissPreferenceNotice(page);
  const assertCleanRuntime = monitorPage(page, site.origin);

  const response = await page.goto(siteUrl(site, route), {
    waitUntil: 'networkidle',
  });
  expect(response, 'document response').not.toBeNull();
  expect(response?.status()).toBe(200);
  expect(response?.headers()['x-robots-tag']).toBe('noindex, nofollow, noarchive');
  expect(response?.headers()['x-frame-options']).toBe('DENY');

  const csp = response?.headers()['content-security-policy'] ?? '';
  expect(csp).toContain("connect-src 'self'");
  expect(csp).toContain("frame-src 'none'");
  expect(csp).toContain("form-action 'none'");

  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByLabel('Portfolio demonstration disclosure')).toContainText(
    DISCLOSURE
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/i
  );
  const canonicalPath = `${site.basePath}${route === '/' ? '' : route}`;
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `${PUBLIC_ORIGIN}${canonicalPath}/`
  );

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(horizontalOverflow, 'horizontal layout overflow').toBeLessThanOrEqual(1);

  const brokenImages = await page.locator('img').evaluateAll((images) =>
    images
      .filter((image) => image.getBoundingClientRect().top < window.innerHeight * 1.5)
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.getAttribute('src') ?? image.getAttribute('alt') ?? 'unknown image')
  );
  expect(brokenImages, 'broken rendered images').toEqual([]);

  const hydrationProblems = await page.locator('body').evaluate(() => {
    const text = document.body.innerText;
    return /hydration failed|server rendered html didn't match|content does not match/i.test(text);
  });
  expect(hydrationProblems, 'visible hydration error').toBe(false);

  await testInfo.attach(`${site.name}-${viewport.name}-${route.replaceAll('/', '-') || 'home'}`, {
    body: Buffer.from(await page.screenshot({ fullPage: false })),
    contentType: 'image/png',
  });
  assertCleanRuntime();
}

for (const site of sites) {
  for (const viewport of viewports) {
    for (const route of site.routes) {
      test(`${site.name} ${route} is clean at ${viewport.width}px`, async ({
        page,
      }, testInfo) => {
        await assertRoute(page, site, route, viewport, testInfo);
      });
    }
  }
}

for (const site of sites.filter((candidate) => candidate.property)) {
  test(`${site.name} gallery, application dialog, and resident portal stay local`, async ({
    page,
  }) => {
    await dismissPreferenceNotice(page);
    const assertCleanRuntime = monitorPage(page, site.origin);

    await page.goto(siteUrl(site, '/gallery'), { waitUntil: 'networkidle' });
    await page.locator('#gallery-grid button').first().click();
    const lightbox = page.getByRole('dialog', {
      name: /fictional property photo viewer/i,
    });
    await expect(lightbox).toBeVisible();
    await page.getByRole('button', { name: 'Next image' }).click();
    await page.getByRole('button', { name: 'Close gallery' }).click();
    await expect(lightbox).toBeHidden();

    await page.goto(siteUrl(site, '/listings'), { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Preview Application' }).first().click();
    const applyDialog = page.getByRole('dialog', { name: /application preview only/i });
    await expect(applyDialog).toBeVisible();
    await expect(applyDialog).toContainText('No application data is requested');
    await page.getByRole('button', { name: 'Close Demo' }).click();
    await expect(applyDialog).toBeHidden();

    await page.goto(siteUrl(site, '/resident-portal'), { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: /resident portal/i })).toBeVisible();
    assertCleanRuntime();
  });
}

for (const site of sites) {
  test(`${site.name} contact form submits with zero network requests`, async ({ page }) => {
    await dismissPreferenceNotice(page);
    const assertCleanRuntime = monitorPage(page, site.origin);
    await page.goto(siteUrl(site, '/contact'), { waitUntil: 'networkidle' });

    await page.getByLabel(/First Name/).fill('Demo');
    await page.getByLabel(/Last Name/).fill('Visitor');
    await page.getByLabel(/^Email/).fill('visitor@example.test');
    await page.getByLabel(/^Phone/).fill('(555) 555-0199');
    await page.getByLabel(/^Message/).fill('This value must remain in the browser.');
    if (!site.property) {
      await page.getByLabel(/^Subject/).selectOption('general');
    }

    const requestsAfterSubmit: string[] = [];
    const recordRequest = (request: Request) => {
      if (!isSameOriginNextRscRequest(request, site.origin)) {
        requestsAfterSubmit.push(`${request.method()} ${request.url()}`);
      }
    };
    page.on('request', recordRequest);
    await page
      .getByRole('button', {
        name: site.property ? 'Run Contact Demo' : 'Send Message',
      })
      .click();
    await expect(page.getByRole('heading', { name: 'Demo Complete' })).toBeVisible();
    page.off('request', recordRequest);

    expect(requestsAfterSubmit, 'form-triggered requests').toEqual([]);
    assertCleanRuntime();
  });
}

for (const site of sites.filter((candidate) => candidate.property)) {
  test(`${site.name} tour form submits with zero network requests`, async ({ page }) => {
    await dismissPreferenceNotice(page);
    const assertCleanRuntime = monitorPage(page, site.origin);
    await page.goto(siteUrl(site, '/schedule-tour'), { waitUntil: 'networkidle' });

    await page.getByLabel(/First Name/).fill('Demo');
    await page.getByLabel(/Last Name/).fill('Visitor');
    await page.getByLabel(/^Email/).fill('visitor@example.test');
    await page.getByLabel(/^Phone/).fill('(555) 555-0199');
    await page.getByLabel(/Preferred Date/).fill('2099-01-15');
    await page.getByLabel(/Preferred Time/).selectOption('morning');

    const requestsAfterSubmit: string[] = [];
    const recordRequest = (request: Request) => {
      if (!isSameOriginNextRscRequest(request, site.origin)) {
        requestsAfterSubmit.push(`${request.method()} ${request.url()}`);
      }
    };
    page.on('request', recordRequest);
    await page.getByRole('button', { name: 'Run Tour Demo' }).click();
    await expect(page.getByRole('heading', { name: 'Demo Complete' })).toBeVisible();
    page.off('request', recordRequest);

    expect(requestsAfterSubmit, 'form-triggered requests').toEqual([]);
    assertCleanRuntime();
  });
}

for (const site of sites) {
  test(`${site.name} mobile navigation and demo phone notice work`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await dismissPreferenceNotice(page);
    const assertCleanRuntime = monitorPage(page, site.origin);
    await page.goto(siteUrl(site), { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
    const targetName = site.property ? 'Gallery' : 'Properties';
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: targetName, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`/${targetName.toLowerCase()}/?$`));

    await page
      .getByRole('contentinfo')
      .locator('[data-demo-action="phone"]')
      .first()
      .click();
    await expect(page.getByText(/calling is disabled/)).toBeVisible();
    assertCleanRuntime();
  });
}

for (const site of sites.filter((candidate) => candidate.property)) {
  test(`${site.name} is served by the single Hearthmere build`, async ({ page }) => {
    await dismissPreferenceNotice(page);
    const assertCleanRuntime = monitorPage(page, site.origin);
    const mountedUrl = `${site.origin}${MOUNT}${site.basePath}`;

    const response = await page.goto(mountedUrl, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    expect(response?.headers()['x-robots-tag']).toBe(
      'noindex, nofollow, noarchive'
    );
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveTitle(new RegExp(site.name));

    const resourcePaths = await page
      .locator('script[src], link[rel="stylesheet"][href], img[src]')
      .evaluateAll((elements) =>
        elements.flatMap((element) => {
          const value =
            element.getAttribute('src') ?? element.getAttribute('href');
          if (!value) return [];
          const url = new URL(value, window.location.href);
          return url.protocol === 'http:' || url.protocol === 'https:'
            ? [url.pathname]
            : [];
        })
      );
    expect(resourcePaths.length).toBeGreaterThan(0);
    expect(
      resourcePaths.every(
        (path) =>
          path.startsWith(`${MOUNT}/_next/`) || path.startsWith(`${MOUNT}/_responsive/`) ||
          path.startsWith(`${MOUNT}${site.basePath}/images/`)
      ),
      'community assets come from the one Next.js build'
    ).toBe(true);

    const optimizedImagePaths = await page.locator('img').evaluateAll((images) =>
      images.flatMap((image) => {
        const value = image.currentSrc || image.src;
        return value ? [new URL(value, window.location.href).pathname] : [];
      })
    );
    expect(
      optimizedImagePaths.some(
        (path) => path.startsWith(`${MOUNT}/_responsive/`)
      ),
      'Images use prebuilt static variants'
    ).toBe(true);

    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Gallery', exact: true })
      .click();
    await expect(page).toHaveURL(`${mountedUrl}/gallery/`);
    await expect(page.locator('#gallery-grid')).toBeVisible();
    assertCleanRuntime();
  });
}

test('cookie notice stores only its local dismissal preference', async ({ page }) => {
  const site = sites[0];
  const assertCleanRuntime = monitorPage(page, site.origin);
  await page.goto(siteUrl(site), { waitUntil: 'networkidle' });
  const notice = page.getByRole('dialog', { name: 'Local Demo Preference' });
  await expect(notice).toBeVisible();
  await page.getByRole('button', { name: 'Remember My Preference' }).click();
  await expect(notice).toBeHidden();

  const storedValues = await page.evaluate(() => ({ ...window.localStorage }));
  expect(storedValues).toEqual({ [LOCAL_PREFERENCE_KEY]: 'yes' });
  assertCleanRuntime();
});
