import { defineConfig } from '@playwright/test';

const gatewayPort = Number(process.env.SHOWCASE_GATEWAY_PORT ?? '3000');

if (!Number.isInteger(gatewayPort) || gatewayPort < 1 || gatewayPort > 65_535) {
  throw new Error('SHOWCASE_GATEWAY_PORT must be a valid TCP port');
}

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  timeout: 30_000,
  expect: {
    timeout: 8_000,
  },
  use: {
    browserName: 'chromium',
    colorScheme: 'light',
    locale: 'en-US',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: `node scripts/preview-portfolio.mjs`,
    env: {
      SHOWCASE_GATEWAY_PORT: String(gatewayPort),
    },
    url: `http://127.0.0.1:${gatewayPort}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
