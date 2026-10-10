# Site Examples maintenance review

Reviewed October 10, 2026. Systematic dependency, documentation, runtime, and static-deployment review; not an exhaustive security or architecture scan.

## Executive summary

- Node 24 now matches local version files, repository engine, CI, and existing Vercel runtime. The existing runtime contract assertion is updated to the intended requirement; identity, privacy, and route contracts are preserved.
- Refreshed compatible dependency resolutions and patched Sharp to 0.35.5. The follow-up removes the unused Vercel CLI dependency and upgrades Practice Studio to Vite 8.3.4 with its matching React plugin 6.1.2. Existing supported transitive overrides are preserved.
- Vite and its React compiler plugin are correctly classified as development/build tools. Production dependency audit reports zero alerts.
- React and React DOM are pinned to one matching 19.2.8 patch across apps and shared packages; workspace overrides prevent automatic peer installation from introducing a mismatched renderer.
- The full audit dropped from 18 development-tool advisories to one: the unpatched braces 3.0.3 advisory. CI now audits the complete dependency tree and fails on any unexpected advisory, including production findings; the temporary development-only exception stays visible.
- The README leads with the live gallery. GitHub monitoring is enabled, with existing CI and its existing audit schedule retained; no new schedule was introduced.

## Mental model

The gallery and both concepts build into a single static Vercel Build Output API artifact. The fictional property-management experience includes four communities, and Practice Studio retains its separate optional Sites packaging. Gallery pages are indexable, demos are noindex, and forms are local-only. No runtime server functions, real analytics, or live submissions are added.

## Findings

| ID | Category | Evidence | Severity | Status | Recommendation |
| --- | --- | --- | --- | --- | --- |
| S1 | Consistency | `.nvmrc:1`, `.node-version:1`, CI workflow, root `package.json` | Medium | RESOLVED in PR | Node 24 throughout the tested deployment toolchain. |
| S2 | Dependencies | App/shared manifests and `pnpm-workspace.yaml` | Medium | RESOLVED in PR | Matching React and renderer versions across the workspace. |
| S3 | Dependencies | Committed lockfile; full `pnpm audit` | High | PARTIALLY RESOLVED | Removing the unused CLI and upgrading Vite/its supported peers clears the available tooling fixes. Only braces 3.0.3 remains; npm has no published patched release for GHSA-vfj7-8cjw-p6xm. Keep its GitHub alert visible. |

## Priority and quick wins

Production auditing is clear. The Vercel Git integration builds the static artifact without a repository-installed CLI. Practice Studio explicitly pins Vite-supported esbuild 0.28.2 and tsx 4.23.15 peers so the lockfile cannot retain their vulnerable older optional resolutions. Its build target preserves the Vite 6 browser baseline (Chrome 87, Edge 88, Firefox 78, Safari 14). The remaining braces finding concerns development tooling; no public server functions are emitted.

## Deepening candidates

No site redesign or workspace split is proposed. The single static artifact already publishes every gallery destination, and optional standalone Practice Studio packaging is preserved.

## Looks bad but is fine

- The Other framework preset is correct for this custom static Build Output API pipeline.
- Different frameworks and visual identities are intentional across concepts.
- Build tools belong in development dependencies even though they are needed to generate the deployable artifact.
- A public repository has `private: true` package manifests to prevent accidental npm publication.

## Verification

The initial maintenance gate passed with Node 24.21.0. This toolchain follow-up was tested locally with Node 24.19.0 and pinned pnpm 11.9.0. The full verification gate includes lint/types, static build, media/privacy audits, contract tests, standalone packaging, and browser scenarios. Local results below cover the non-browser checks; GitHub runs the complete browser suite on the PR revision before merge.

| Check | Result |
| --- | --- |
| `pnpm install --frozen-lockfile` | Passed |
| Lint, types, build, media/privacy audits | Passed |
| `pnpm test` | 29 tests passed, including seven audit-gate regressions |
| Practice Studio standalone packaging tests | Passed |
| Complete `pnpm verify` | Hosted CI must pass on the PR head before merge |
| `pnpm peers check` | Passed |
| `pnpm audit --prod --json` | Passed |
| `pnpm audit --json` | One development-only braces advisory; no unexpected advisories |
| `node scripts/audit-dependencies.mjs` | Passed with the explicit unpatched development exception |

The public `main` branch has no branch protection or rulesets configured; CI is not an enforced merge requirement.

## Open questions and coverage gaps

The braces upstream exception remains open. The audit gate rejects a production path, a different advisory/version/severity, malformed audit data, or a newly published braces release that needs review. It does not dismiss GitHub alerts. This pass did not redesign the applications, add live services, disable privacy checks, or perform a complete architecture/security audit. Production was inspected independently; the PR revision becomes live only after review and merge.

## Next actions

Review and merge after the checks pass; verify the exact deployed SHA and anonymous gallery/demo routes afterward. Keep fictional content, local-only forms, and noindex demo routes intact.
