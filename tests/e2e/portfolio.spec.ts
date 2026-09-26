import { test, expect } from "@playwright/test";
const origin = `http://127.0.0.1:${process.env.SHOWCASE_GATEWAY_PORT || 3000}`;
for (const width of [320, 375, 414, 768, 1440]) {
  test(`gallery is usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(origin, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Website & Design",
    );
    await expect(page.locator("article")).toHaveCount(2);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator("article img")
        .evaluateAll((imgs) =>
          imgs.every((i) => (i as HTMLImageElement).naturalWidth > 0),
        ),
    ).toBe(true);
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to examples" }),
    ).toBeFocused();
    expect(errors).toEqual([]);
  });
}
test("gallery links, community links, and browser Back stay within the collection", async ({
  page,
}) => {
  await page.goto(origin);
  await page
    .getByRole("link", { name: "Open Property Management", exact: true })
    .click();
  await expect(page).toHaveURL(origin + "/examples/property-management/");
  await page
    .getByRole("link", { name: "View Property", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(
    origin + "/examples/property-management/alderwyck/",
  );
  await page.reload();
  await expect(page.locator("main")).toBeVisible();
  await page.getByRole("link", { name: "Back to examples" }).click();
  await expect(page).toHaveURL(origin + "/");
  await page.goBack();
  await expect(page).toHaveURL(
    origin + "/examples/property-management/alderwyck/",
  );
});
test("missing pages, assets, and writes cannot become a demo page", async ({
  request,
}) => {
  for (const p of [
    "/missing",
    "/examples/practice-studio/missing",
    "/examples/property-management/missing",
    "/examples/practice-studio/assets/missing.js",
    "/examples/property-management/_next/image",
  ]) {
    expect((await request.get(origin + p)).status(), p).toBe(404);
  }
  expect(
    (await request.post(origin + "/examples/practice-studio/")).status(),
  ).toBe(405);
  expect(
    (await request.head(origin + "/examples/property-management/")).status(),
  ).toBe(200);
  await expect(
    (await request.get(origin + "/robots.txt")).text(),
  ).resolves.toContain("Disallow: /examples/");
});
test("Practice Studio roadmap is keyboard accessible and never transmits or persists data", async ({
  page,
}) => {
  const writes: string[] = [];
  const errors: string[] = [];
  page.on("request", (r) => {
    if (!["GET", "HEAD"].includes(r.method())) writes.push(r.url());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(origin + "/examples/practice-studio/", {
    waitUntil: "networkidle",
  });
  const trigger = page
    .getByRole("button", { name: "Get your launch roadmap", exact: true })
    .first();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByLabel("Name", { exact: true }).fill("Portfolio Visitor");
  await dialog.getByLabel("Email", { exact: true }).fill("visitor@example.com");
  await dialog.getByLabel("Primary state", { exact: true }).fill("Texas");
  await dialog.getByRole("combobox").selectOption({ index: 1 });
  await dialog
    .getByRole("button", { name: "Request your roadmap call", exact: true })
    .click();
  await expect(dialog).toContainText(/demo|prototype|not sent|not.*saved/i);
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(() =>
      JSON.stringify({ ...localStorage, ...sessionStorage }),
    ),
  ).not.toContain("visitor@example.com");
});
