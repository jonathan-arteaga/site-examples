import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { parse } from "parse5";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);
const catalog = JSON.parse(readFileSync("examples.json", "utf8"));
const origin = (
  process.env.PORTFOLIO_ORIGIN || "https://website-examples-alpha.vercel.app"
).replace(/\/$/, "");
if (!/^https:\/\/[^/]+$/.test(origin))
  throw new Error("PORTFOLIO_ORIGIN must be an HTTPS origin");
const run = (args, env = {}) =>
  execFileSync("pnpm", args, {
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
const publicDir = "apps/hearthmere-residential/public";
const variants = `${publicDir}/_responsive`;
mkdirSync(variants, { recursive: true });
const images = files(publicDir).filter(
  (f) => !f.startsWith(variants + "/") && /\.(jpe?g|png|webp|avif)$/i.test(f),
);
const imageInputs = createHash("sha256");
for (const file of images.sort())
  imageInputs.update(file).update(readFileSync(file));
const fingerprint = imageInputs
  .update(sharp.versions.sharp)
  .update("webp-75-widths-32-64-128-256-640-960-1440-1920-v1")
  .digest("hex");
if (
  !existsSync(`${variants}/manifest.json`) ||
  JSON.parse(readFileSync(`${variants}/manifest.json`)).fingerprint !==
    fingerprint
) {
  rmSync(variants, { recursive: true, force: true });
  mkdirSync(variants, { recursive: true });
  for (const file of images) {
    for (const width of [32, 64, 128, 256, 640, 960, 1440, 1920]) {
      const dest = `${variants}/${path.relative(publicDir, file)}.w${width}.webp`;
      mkdirSync(path.dirname(dest), { recursive: true });
      await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(dest);
    }
  }
  writeFileSync(`${variants}/manifest.json`, JSON.stringify({ fingerprint }));
}
console.log(`Prepared responsive variants for ${images.length} local images`);
for (const project of catalog) {
  run(["exec", "turbo", "run", "build", `--filter=${project.workspace}`], {
    NEXT_PUBLIC_SITE_URL: origin + project.basePath,
    PORTFOLIO_BASE_PATH: project.basePath + "/",
    PORTFOLIO_ORIGIN: origin,
  });
}
run(["--filter", "gallery", "build"], { PORTFOLIO_ORIGIN: origin });
const output = ".vercel/output";
rmSync(output, { recursive: true, force: true });
mkdirSync(`${output}/static`, { recursive: true });
cpSync("apps/gallery/dist", `${output}/static`, { recursive: true });
const claimedPaths = new Set();
for (const p of catalog) {
  if (
    !/^\/examples\/[a-z0-9-]+$/.test(p.basePath) ||
    claimedPaths.has(p.basePath)
  )
    throw new Error(`Invalid or duplicate base path: ${p.basePath}`);
  claimedPaths.add(p.basePath);
  const source = path.resolve(p.output);
  if (
    !source.startsWith(root + path.sep) ||
    !existsSync(path.join(source, "index.html"))
  )
    throw new Error(`Missing static output: ${p.id}`);
  const dest = `${output}/static${p.basePath}`;
  mkdirSync(dest, { recursive: true });
  cpSync(source, dest, { recursive: true });
}
writeFileSync(
  `${output}/static/robots.txt`,
  "User-agent: *\nAllow: /\nDisallow: /examples/\n",
);
writeFileSync(
  `${output}/static/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`,
);
writeFileSync(
  `${output}/static/404.html`,
  '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found</title><body><main><h1>Page not found</h1><p>This example or page does not exist.</p><a href="/">Back to examples</a></main></body></html>',
);
const escapeRE = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function csp(html) {
  const hashes = new Set();
  const visit = (node) => {
    if (
      node.tagName === "script" &&
      !node.attrs?.some((a) => a.name === "src")
    ) {
      const text = (node.childNodes || []).map((n) => n.value || "").join("");
      if (text)
        hashes.add(
          `'sha256-${createHash("sha256").update(text).digest("base64")}'`,
        );
    }
    for (const n of node.childNodes || []) visit(n);
  };
  visit(parse(html));
  return [
    `default-src 'self'`,
    `script-src 'self' ${[...hashes].join(" ")}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:`,
    `font-src 'self' data:`,
    `connect-src 'self'`,
    `frame-src 'none'`,
    `form-action 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `frame-ancestors 'none'`,
  ].join("; ");
}
const routes = [
  {
    src: "^/.*",
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      "Strict-Transport-Security":
        "max-age=63072000; includeSubDomains; preload",
    },
    continue: true,
  },
  {
    src: "^/examples/.*",
    headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
    continue: true,
  },
  {
    src: "^/.*?/_next/static/.*",
    headers: { "Cache-Control": "public, max-age=31536000, immutable" },
    continue: true,
  },
  {
    src: "^/.*?/_responsive/.*",
    headers: { "Cache-Control": "public, max-age=3600" },
    continue: true,
  },
];
for (const file of files(`${output}/static`)
  .filter((f) => f.endsWith(".html"))
  .sort()) {
  const url =
    "/" + path.relative(`${output}/static`, file).split(path.sep).join("/");
  const clean = url.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  const src =
    clean === ""
      ? "^/(?:index\\.html)?$"
      : url.endsWith("/index.html")
        ? `^${escapeRE(clean)}(?:/(?:index\\.html)?)?$`
        : `^${escapeRE(clean)}(?:\\.html)?/?$`;
  routes.push({
    src,
    dest: url,
    headers: {
      "Content-Security-Policy": csp(readFileSync(file, "utf8")),
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
routes.push(
  { handle: "filesystem" },
  { src: "^/.*", status: 404, dest: "/404.html" },
);
const config = { version: 3, routes };
writeFileSync(`${output}/config.json`, JSON.stringify(config, null, 2) + "\n");
const totalBytes = files(`${output}/static`).reduce(
  (n, f) => n + statSync(f).size,
  0,
);
writeFileSync(
  `${output}/build-report.json`,
  JSON.stringify(
    {
      origin,
      projects: catalog.map((p) => p.id),
      staticBytes: totalBytes,
      staticFiles: files(`${output}/static`).length,
      routes: routes.length,
      functions: 0,
    },
    null,
    2,
  ),
);
if (routes.length > 2048) throw new Error("Vercel route limit exceeded");
if (totalBytes > 100 * 1024 * 1024)
  throw new Error(`Static output exceeds 100 MiB budget: ${totalBytes}`);
console.log(
  `Static portfolio ready: ${(totalBytes / 1024 / 1024).toFixed(1)} MiB, ${routes.length} routes, no functions`,
);
