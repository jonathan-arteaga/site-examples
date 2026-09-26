# Add a website example

1. Create `apps/<name>/package.json` with a unique `name`, `private: true`, and a `build` script that emits static HTML, CSS, JS, and assets. Keep its styles and dependencies in its own workspace.
2. Add an entry to `examples.json`: `id`, `title`, `description`, `category`, `thumbnail`, `workspace`, `output`, `basePath`, and `links` (each with a `label` and relative `path`). Use a unique `/examples/<slug>` prefix. `workspace` must match the package name. `output` is the repository-relative static build directory, containing `index.html`.
3. Make all navigation and public assets work at that prefix. Vite receives `PORTFOLIO_BASE_PATH` during the combined build; configure `base` from it. A Next.js example must set its matching `basePath`, use `output: 'export'`, and avoid request-time APIs. The build supplies `NEXT_PUBLIC_SITE_URL` as the portfolio origin plus the example prefix.
4. Add a real, optimized screenshot under `apps/gallery/public/screenshots/` and reference it in the catalog. Keep descriptions factual and explicitly label fictional concepts. No live forms, tracking, payments, or private client data.
5. Run `pnpm install`, `pnpm verify`, and review the combined preview. Add browser coverage for the new example's main interaction. Commit the source, catalog, screenshot, and root lockfile together.

The gallery is generated from the catalog. The assembly script builds every registered workspace through Turborepo (unchanged tasks can use cache), mounts its output, hashes inline scripts for CSP, and generates static route mappings. A new example must produce a real 404 for unknown paths; a catch-all SPA fallback is not part of this collection.

Server-backed examples require a separate architecture decision. Do not quietly add functions or external services to this static collection.
