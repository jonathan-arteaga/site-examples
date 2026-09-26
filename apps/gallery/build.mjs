import {
  cpSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
export function buildGallery() {
  const examples = JSON.parse(
    readFileSync(path.join(root, "../../examples.json"), "utf8"),
  );
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const origin =
    process.env.PORTFOLIO_ORIGIN || "https://website-examples-alpha.vercel.app";
  const cards = examples
    .map(
      (p) =>
        `<article class="project"><a class="preview" href="${esc(p.basePath)}/" aria-label="Explore ${esc(p.title)}"><img src="${esc(p.thumbnail)}" width="1440" height="1040" alt="${esc(p.title)} website preview" decoding="async"></a><div class="project-heading"><h2>${esc(p.title)}</h2><a class="open" href="${esc(p.basePath)}/" aria-label="Open ${esc(p.title)}">Explore <span aria-hidden="true">↗</span></a></div><p class="category">${esc(p.category)}</p><p class="description">${esc(p.description)}</p>${p.links.length > 1 ? `<nav class="project-links" aria-label="${esc(p.title)} examples">${p.links.map((l) => `<a href="${esc(p.basePath + l.path)}">${esc(l.label)}</a>`).join("")}</nav>` : ""}</article>`,
    )
    .join("");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Website &amp; Design Examples — Jonathan Arteaga</title><meta name="description" content="A personal collection of fictional website and interface concepts by Jonathan Arteaga. Explore the designs and try the interactions."><link rel="canonical" href="${esc(origin)}/"><link rel="stylesheet" href="/styles.css"><link rel="icon" href="/favicon.svg" type="image/svg+xml"></head><body><a class="skip" href="#examples">Skip to examples</a><header class="masthead"><a href="/" class="creator">Jonathan Arteaga<span>Design collection</span></a><a class="index-link" href="#examples">Browse examples <span aria-hidden="true">↓</span></a></header><main><section class="intro" aria-labelledby="page-title"><p class="intro-note">A personal collection, always in progress.</p><h1 id="page-title">Website &amp; Design<br>Examples<span class="period">.</span></h1><p class="intro-copy">Different businesses. Different possibilities.<br>Explore the websites, and try the details.</p></section><section id="examples" class="collection" aria-label="Website examples"><div class="collection-heading"><p>Selected concepts</p><span>${String(examples.length).padStart(2, "0")} projects</span></div><div class="grid">${cards}</div></section></main><footer><p>Made by Jonathan Arteaga.</p><p>Fictional concepts for personal exploration.<br>Forms are demonstrations and do not send information.</p><a href="#page-title">Back to top ↑</a></footer></body></html>`;
  rmSync(path.join(root, "dist"), { recursive: true, force: true });
  mkdirSync(path.join(root, "dist"), { recursive: true });
  cpSync(path.join(root, "public"), path.join(root, "dist"), {
    recursive: true,
  });
  writeFileSync(path.join(root, "dist/index.html"), html);
}
buildGallery();
