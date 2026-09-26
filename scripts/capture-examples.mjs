import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1040 },
    deviceScaleFactor: 1,
  });
  await page.addInitScript(() =>
    localStorage.setItem("portfolio-demo-notice-dismissed", "yes"),
  );
  await mkdir("apps/gallery/public/screenshots", { recursive: true });
  for (const id of ["property-management", "practice-studio"]) {
    await page.goto(`http://127.0.0.1:3000/examples/${id}/`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot();
    await sharp(png)
      .webp({ quality: 85 })
      .toFile(`apps/gallery/public/screenshots/${id}.webp`);
  }
} finally {
  await browser.close();
}
