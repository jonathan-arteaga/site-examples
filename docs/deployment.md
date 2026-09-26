# Static deployment

The repository builds a Vercel Build Output API v3 artifact under `.vercel/output`. `scripts/build-portfolio.mjs` assembles the gallery and both apps into exact HTML routes with CSP hashes, demo noindex headers, and a 404 fallback. It emits no server functions or runtime image optimizer. The static artifact must stay below the repository's 100 MiB budget and Vercel's route limit.

## Build and release

Run `pnpm verify` on the exact commit. The `site-examples` Vercel project in Jonathan's personal team is connected to `jonathan-arteaga/site-examples`, uses the repository root, and runs `pnpm build` with the Other preset. Vercel consumes the generated `.vercel/output` artifact. Production tracks `main`. Read back each deployed SHA, routes, headers, image assets, and anonymous browser behavior before treating a new revision as live.

`PORTFOLIO_ORIGIN` is the canonical HTTPS origin used by the gallery and demos. Its default is the verified [production domain](https://site-examples-ebon.vercel.app/). Set it explicitly for another environment; do not carry over project IDs or tokens from the old repository. The GitHub workflow runs source and browser verification without a Vercel token. If Vercel uses a deployment check, point it at the new repository's passing `verify` job.

`pnpm smoke:production` checks the gallery and six demo routes on the live domain. A ready build is only one part of cutover: verify the public URL and any controlled links before deleting an old Vercel project.

Practice Studio's standalone Sites worker is maintained separately from this gallery deployment. A new server-backed example requires its own architecture and hosting decision.
