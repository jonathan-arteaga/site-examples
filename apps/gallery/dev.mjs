import http from "node:http";
import { readFileSync } from "node:fs";
import path from "node:path";
import { buildGallery } from "./build.mjs";
http
  .createServer((req, res) => {
    buildGallery();
    const p = new URL(req.url, "http://localhost").pathname;
    const file = path.resolve("dist", "." + (p === "/" ? "/index.html" : p));
    if (!file.startsWith(path.resolve("dist") + path.sep)) {
      res.writeHead(404);
      res.end();
      return;
    }
    try {
      res.setHeader(
        "Content-Type",
        p.endsWith(".css")
          ? "text/css"
          : p.endsWith(".webp")
            ? "image/webp"
            : p.endsWith(".svg")
              ? "image/svg+xml"
              : "text/html",
      );
      res.end(readFileSync(file));
    } catch {
      res.writeHead(404);
      res.end("Run pnpm build and pnpm preview for demo routes.");
    }
  })
  .listen(3001, "127.0.0.1", () =>
    console.log(
      "Gallery http://127.0.0.1:3001; use pnpm preview for the complete collection",
    ),
  );
