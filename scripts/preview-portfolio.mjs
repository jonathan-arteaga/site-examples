import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, statSync, createReadStream } from "node:fs";
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.vercel/output",
);
const staticRoot = path.join(root, "static");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};
function fileFor(url) {
  const file = path.resolve(staticRoot, "." + url);
  if (!file.startsWith(staticRoot + path.sep)) return null;
  try {
    return statSync(file).isFile() ? file : null;
  } catch {
    return null;
  }
}
const server = http.createServer((req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405);
    res.end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
  } catch {
    res.writeHead(400);
    res.end();
    return;
  }
  let dest = null,
    status = 200;
  const config = JSON.parse(readFileSync(path.join(root, "config.json")));
  for (const route of config.routes) {
    if (route.handle === "filesystem") {
      if (fileFor(pathname)) {
        dest = pathname;
        break;
      }
      continue;
    }
    if (!new RegExp(route.src).test(pathname)) continue;
    for (const [k, v] of Object.entries(route.headers || {}))
      res.setHeader(k, v);
    if (route.continue) continue;
    dest = route.dest || pathname;
    status = route.status || 200;
    break;
  }
  const file = fileFor(dest || pathname);
  if (!file) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  res.setHeader(
    "Content-Type",
    types[path.extname(file)] || "application/octet-stream",
  );
  res.writeHead(status);
  if (req.method === "HEAD") res.end();
  else createReadStream(file).pipe(res);
});
const port = Number(
  process.env.PORT || process.env.SHOWCASE_GATEWAY_PORT || 3000,
);
server.listen(port, "127.0.0.1", () =>
  console.log(`Portfolio preview http://127.0.0.1:${port}`),
);
