import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { parse } from "parse5";
const output = ".vercel/output";
const config = JSON.parse(readFileSync(`${output}/config.json`));
test("deployment is entirely static, bounded, and covers every catalog destination", () => {
  assert.equal(config.version, 3);
  assert.ok(!existsSync(`${output}/functions`));
  assert.ok(
    config.routes.every((r) => !r.middlewarePath && !r.middlewareRawSrc),
  );
  assert.ok(!config.images);
  assert.ok(config.routes.length <= 2048);
  const report = JSON.parse(readFileSync(`${output}/build-report.json`));
  assert.ok(report.staticBytes < 100 * 1024 * 1024);
  for (const p of JSON.parse(readFileSync("examples.json")))
    for (const link of p.links) {
      const route = p.basePath + link.path;
      assert.ok(
        config.routes.some(
          (r) =>
            r.dest?.endsWith("index.html") && new RegExp(r.src).test(route),
        ),
        route,
      );
    }
});
test("every executable inline script in exported HTML has an exact CSP hash", () => {
  const htmlRoutes = config.routes.filter(
    (r) => r.headers?.["Content-Security-Policy"],
  );
  assert.ok(htmlRoutes.length >= 60);
  for (const route of htmlRoutes) {
    const document = parse(
      readFileSync(`${output}/static${route.dest}`, "utf8"),
    );
    function visit(n) {
      if (n.tagName === "script" && !n.attrs.some((a) => a.name === "src")) {
        const text = (n.childNodes || []).map((c) => c.value || "").join("");
        if (text)
          assert.ok(
            route.headers["Content-Security-Policy"].includes(
              `'sha256-${createHash("sha256").update(text).digest("base64")}'`,
            ),
            route.dest,
          );
      }
      for (const child of n.childNodes || []) visit(child);
    }
    visit(document);
  }
});
