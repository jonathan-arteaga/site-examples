# Working in site-examples

This is a public collection of fictional static websites. Preserve each app's distinct design and the working gallery routes. Read the root README and the relevant app instructions before editing.

- Use only fictional property, person, and business details. Do not add client data, credentials, analytics, live submissions, or paid services.
- Keep demo routes under their existing `/examples/<slug>/` prefixes. The gallery is indexable and the demos are noindex.
- `pnpm build` creates `.vercel/output` without server functions. Keep route/CSP generation and the static artifact budget working.
- Run focused app checks while iterating and `pnpm verify` before a consequential PR. Inspect rendered pages and links for design or navigation changes.
- Preserve source licenses and asset provenance. Keep environment files, `.vercel/`, generated output, and local machine evidence out of Git.
- Use focused branches and PRs for substantive work. Record actual checks; do not infer a live deployment from a local build.

`apps/hearthmere-residential/AGENTS.md` holds the fictional property's locked data. `apps/practice-studio/AGENTS.md` holds its local-only form and standalone packaging rules.
