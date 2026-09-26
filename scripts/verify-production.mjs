import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const origin =
  process.env.PORTFOLIO_ORIGIN || "https://website-examples-alpha.vercel.app";
const catalog = JSON.parse(readFileSync("examples.json", "utf8"));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1040 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.addInitScript(() =>
    localStorage.setItem("portfolio-demo-notice-dismissed", "yes"),
  );
  const routes = [
    "/",
    ...catalog.flatMap((p) => p.links.map((l) => p.basePath + l.path)),
  ];
  for (const route of routes) {
    const response = await page.goto(origin + route, {
      waitUntil: "networkidle",
    });
    assert.equal(response.status(), 200, route);
    assert.ok(await page.locator("main").isVisible(), route);
    assert.ok(
      await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs
            .filter((i) => i.getBoundingClientRect().top < innerHeight)
            .every((i) => i.complete && i.naturalWidth > 0),
        ),
      `Visible images ${route}`,
    );
    if (route !== "/")
      assert.match(response.headers()["x-robots-tag"], /noindex/);
    console.log("Public route verified:", route);
  }
  await page.goto(origin + "/examples/practice-studio/");
  await page
    .getByRole("button", { name: "Get your launch roadmap", exact: true })
    .first()
    .click();
  assert.ok(await page.getByRole("dialog").isVisible());
  await page.keyboard.press("Escape");
  assert.ok(!(await page.getByRole("dialog").isVisible()));
  const missing = await page.request.get(
    origin + "/examples/practice-studio/does-not-exist",
  );
  assert.equal(missing.status(), 404);
  await page.goto(origin + "/examples/property-management/alderwyck/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Gallery", exact: true })
    .click();
  await page.locator("#gallery-grid").waitFor({ state: "visible" });
  assert.ok(await page.locator("#gallery-grid").isVisible());
  assert.deepEqual(errors, []);
  console.log(
    "Production browser smoke passed: six demos, gallery, navigation, modal, assets, headers, 404, no console errors.",
  );
} finally {
  await browser.close();
}
