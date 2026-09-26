# Repository Guidance

Treat this repository as a public-source, fictional portfolio showcase. Never add real client,
resident, owner, vendor, school, business, location, credential, analytics, or leasing
data. Do not connect demo experiences to live submissions or third-party property systems.

## Locked portfolio data

- Hearthmere Residential: 100 Portfolio Way, Suite 400, Example City, TX 00000;
  (214) 555-0100; 544 homes across 4 communities.
- Alderwyck Apartments: 1420 Lantern Walk, Example City, TX 00000;
  (682) 555-0111; 148 homes; 575–820 sq ft; $1,245–$1,495.
- Norvale Commons: 2875 Juniper Loop, Sample City, TN 00000;
  (615) 555-0122; 112 homes; 680–1,395 sq ft; $1,045–$1,840.
- Larkmere Gardens: 3640 Garden Terrace, Demo City, KS 00000;
  (785) 555-0133; 128 homes; 625–985 sq ft; $995–$1,530.
- Caldridge Townhomes: 4812 Foundry Row, Example Heights, TN 00000;
  (423) 555-0144; 156 homes; 745–1,895 sq ft; $1,325–$2,580.

Keep these collection sizes unchanged unless the repository owner explicitly changes the
showcase brief:

| Community | Gallery | Floor plans | Amenities | Points of interest |
| --- | ---: | ---: | ---: | ---: |
| Alderwyck Apartments | 10 | 2 | 18 | 19 |
| Norvale Commons | 22 | 6 | 24 | 19 |
| Larkmere Gardens | 24 | 4 | 16 | 19 |
| Caldridge Townhomes | 30 | 6 | 16 | 22 |

Preserve the existing bedroom and bathroom combinations. Neighborhood place names and
distances must remain generic, fictional, and explicitly illustrative. Do not add real
coordinates, schools, businesses, maps, reviews, availability, or endorsements.

## Implementation rules

- Keep fallback site URLs on `.example`.
- Keep property coordinates absent rather than inventing plausible coordinates.
- Keep the showcase non-indexable and free of live verification tokens.
- Preserve component structure and responsive behavior when changing content.
- Preserve the imported license; do not expand its scope to third-party assets.
- Run the narrowest relevant lint, type-check, test, and build checks after changes.

Use the root build and preview commands. The application is mounted at `/examples/property-management/`. Build-generated CSP hashes replace request-time nonces.
