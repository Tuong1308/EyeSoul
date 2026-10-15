# 01: Tracer bullet: Featured Product rows end to end

Spec: `.scratch/homepage/spec.md`

**What to build:** A shopper opens the homepage and sees three rows of Featured Products (Digital Camera, Film Camera, Film Roll) as simple cards with Product Photo, name and VND price, served from a seeded database through the API, in the Variant B visual style. This ticket stands up the whole stack: pnpm monorepo (web app, API, shared types), Docker Compose Postgres, the full Prisma data model, migrations and a realistic Vietnamese seed, the aggregated homepage endpoint, the React homepage, and both test seams.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] One documented command starts Postgres in Docker; one command migrates and seeds it
- [x] The data model includes Product (Product Type, slug, name, integer VND price, description, created-at, stock, sold state, Condition Grade + condition note, featured flag + rank), Product Photo and Sample Photo, with no variant tables (ADR-0003)
- [x] The seed has at least 6 products per Product Type, some featured with ranks, one Product Type with no featured products, and a featured Sold Film Camera
- [x] The homepage endpoint returns `rows` in the order Digital Camera, Film Camera, Film Roll, each holding at most 4 ProductCards of that type: featured products first by rank, then the newest; Sold Film Cameras excluded
- [x] ProductCard and the homepage response are shared types used by both the API and the web app
- [x] The web homepage renders the three rows with Product Photo, name and price formatted like `12.500.000 ₫`
- [x] Variant B style tokens are in place (paper, ink, amber, line and card colours; Playfair Display + Inter; 16px radius; soft shadow; film-grain overlay) with magazine-style section titles (amber kicker, large serif title with an italic second word, black top rule)
- [x] API URL, database URL and allowed web origin (CORS) come from environment variables
- [x] API seam: HTTP tests against a Docker Postgres test database cover row order, the cap of 4, featured-rank ordering, the newest fallback and Sold exclusion
- [x] Web seam: a Vitest + Testing Library + MSW test renders the homepage and finds the three rows with formatted prices
