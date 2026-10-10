# Site Examples maintenance review

Reviewed October 10, 2026. Systematic dependency, documentation, runtime, and static-deployment review; not an exhaustive security or architecture scan.

## Executive summary

- Node 24 now matches local version files, repository engine, CI, and existing Vercel runtime. The existing runtime contract assertion is updated to the intended requirement; identity, privacy, and route contracts are preserved.
- Refreshed compatible dependency resolutions and patched Sharp to 0.35.5. Targeted overrides cover supported transitive fixes without upgrading the direct Vercel or Vite major versions.
- Vite and its React compiler plugin are correctly classified as development/build tools. Production dependency audit reports zero alerts.
- React and React DOM are pinned to one matching 19.2.8 patch across apps and shared packages; workspace overrides prevent automatic peer installation from introducing a mismatched renderer.
- Full tooling audit still reports development dependency alerts. Major toolchain updates and unavailable same-major fixes are explicitly separate follow-up work.
- The README leads with the live gallery. GitHub monitoring is enabled, with existing CI and its existing audit schedule retained; no new schedule was introduced.

## Mental model

The gallery and both concepts build into a single static Vercel Build Output API artifact. The fictional property-management experience includes four communities, and Practice Studio retains its separate optional Sites packaging. Gallery pages are indexable, demos are noindex, and forms are local-only. No runtime server functions, real analytics, or live submissions are added.

## Findings

| ID | Category | Evidence | Severity | Status | Recommendation |
| --- | --- | --- | --- | --- | --- |
| S1 | Consistency | `.nvmrc:1`, `.node-version:1`, CI workflow, root `package.json` | Medium | RESOLVED in PR | Node 24 throughout the tested deployment toolchain. |
| S2 | Dependencies | App/shared manifests and `pnpm-workspace.yaml` | Medium | RESOLVED in PR | Matching React and renderer versions across the workspace. |
| S3 | Dependencies | Committed lockfile; full `pnpm audit` | High | OPEN | Remaining packages include `@fastify/busboy`, `basic-ftp`, `braces`, `esbuild`, `undici`. Follow supported upstream replacements/major tool updates separately; do not hide the alerts or force incompatible versions. |

## Priority and quick wins

Review this PR after complete verification. Production dependency auditing is clear; the full tooling exceptions are not a claim of exploitable public routes. A separate Vercel CLI/Vite toolchain review should address advisories that have no published compatible replacement.

## Deepening candidates

No site redesign or workspace split is proposed. The single static artifact already publishes every gallery destination, and optional standalone Practice Studio packaging is preserved.

## Looks bad but is fine

- The Other framework preset is correct for this custom static Build Output API pipeline.
- Different frameworks and visual identities are intentional across concepts.
- Build tools belong in development dependencies even though they are needed to generate the deployable artifact.
- A public repository has `private: true` package manifests to prevent accidental npm publication.

## Verification

Node 24.21.0 and pinned pnpm 11.9.0 were used. The full verification gate includes lint/types, static build, media/privacy audits, contract tests, standalone packaging, and 205 browser scenarios. Its results apply to this source revision, not to a new production deployment.

| Check | Result |
| --- | --- |
| `pnpm install` | Passed |
| `pnpm verify` | Passed |
| `pnpm peers check` | Passed |
| `pnpm audit --prod --json` | Passed |
| `pnpm audit --json` | 18 development-tool alerts; zero critical |

The public `main` branch has no branch protection or rulesets configured; CI is not an enforced merge requirement.

## Open questions and coverage gaps

Remaining development-tool advisories need their own compatible/upstream or major-version decisions. This pass did not redesign the applications, add live services, disable privacy checks, or perform a complete architecture/security audit. Production was inspected independently; the PR revision becomes live only after review and merge.

## Next actions

Review and merge after the checks pass; verify the exact deployed SHA and anonymous gallery/demo routes afterward. Keep fictional content, local-only forms, and noindex demo routes intact.
