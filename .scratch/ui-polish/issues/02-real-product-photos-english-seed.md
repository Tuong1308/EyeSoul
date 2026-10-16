# 02: Real Product Photos and English seed data

**What to build:** When the owner seeds the database, every product card shows that exact product: a Digital Camera or Film Camera card shows that camera, a Film Roll card shows that film's box or cartridge. Each seeded product has 1–2 real, freely licensed photos of that model from Wikimedia Commons (the first is the card photo), and the licence and source page travel with each photo. Product names, photo alt text, descriptions and Film Camera condition notes are in English. The prototype branch `prototype/ui-polish` already holds a vetted seed photo map with every URL checked; reuse it. See spec (Seed data).

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] Every seeded product's Product Photos come from a seed photo map recording URL, licence and source page per photo
- [x] Seeding fails loudly if any product has no photo
- [x] Product names are English (e.g. "Kodak Portra 400 – 35mm – 36 exp", "Canon EOS R8 with 24-50mm"); alt text reads "<name>, main photo" / "<name>, another angle"; Sample Photo alt reads "Shot on <name> (n)"
- [x] Descriptions and Film Camera condition notes are English
- [x] Sample Photos stay placeholder images
- [x] API e2e tests still pass; `db:setup` runs cleanly from an empty database

## Comments

**2026-10-15, review:** All criteria verified on `feat/ui-polish` (landed in dd938cf, merged in b75d36c).
- `apps/api/prisma/seed-photos.ts` maps each product slug to Wikimedia Commons photos with `url`, `licence`, `source`.
- `prisma/seed.ts` throws `No Product Photo in prisma/seed-photos.ts for: …` when a product has none.
- Names, descriptions and condition notes are English; alt text is `<name>, main photo` / `<name>, another angle`; Sample Photos are `Shot on <name> (n)` on picsum placeholders.
- API e2e tests: 19/19 pass (against `eyesoul_test`).
- `db:setup` run on a fresh, empty throwaway database: exit 0, 21 products, 40 Product Photos, none from picsum. The throwaway database was dropped afterwards; the dev database was not touched.

**2026-10-16, follow-up (owner request):** Sample Photos no longer use picsum. They are the free photos from https://unsplash.com/s/photos/film-photography (Unsplash+ items excluded), recorded in `SAMPLE_PHOTOS` in `apps/api/prisma/seed-photos.ts` with licence and source. Each is used once. 11 film-look shots go to the Film Rolls, so the homepage shows 11 distinct polaroids. HP5 shots are rendered in black and white via `sat=-100`. Cameras get the 4 camera-themed shots from the same search. The "Sample Photos stay placeholder images" criterion above is superseded.
