# 01: English storefront: copy, routes, VND format

**What to build:** A shopper sees the whole storefront in English: every label, button, accessible name, status announcement and placeholder page, with the page language declared as English and prices shown English-style as `₫12,500,000`. URLs are English. The Product Types no longer have routes of their own; they point at the Products page filtered by type (a placeholder titled "Products" for now, until ticket 05). The look and layout are otherwise unchanged. This prefactor lands first because it touches nearly every file and test. See spec `.scratch/ui-polish/spec.md` (Language and routes) and ADR 0004.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] Every user-visible string and accessible name in the web app is natural English (header, search, account control, Cart and mini-cart, cards, homepage sections, loading/error states, footer, placeholders, dev stub session panel)
- [x] The document language is English
- [x] `formatVnd` renders `₫12,500,000`
- [x] Routes: `/products` (placeholder "Products"), `/products/:slug`, `/checkout`, `/login`, `/search`, `/shipping-policy`, `/returns-policy`, plus placeholder pages at `/portfolio` ("Portfolio") and `/assistant` ("AI assistant")
- [x] Product Types carry English labels (Digital cameras, Film cameras, Film rolls), a `?type=` value (`digital-camera`, `film-camera`, `film-roll`) and a path to `/products?type=…`; every Product Type link in the app uses it
- [x] The Vietnamese routes are gone, with no redirects
- [x] All existing web tests are rewritten in English against the new routes and pass; none are deleted

## Comments

**2026-10-15, review:** All criteria verified on `feat/ui-polish` (landed in 3648ae4, merged in cb01804).
- No Vietnamese text left in `apps/web/src` or `index.html`; `index.html` has `lang="en"`.
- `formatVnd` uses en-US grouping with a leading `₫`; Cart tests assert `₫8,340,000`.
- `lib/routes.ts` is the single source of English paths and of `PRODUCT_TYPES` (label, `?type=` value, path); no hard-coded `?type=` paths elsewhere, no old Vietnamese route strings; tests assert `/may-anh-film`, `/san-pham/…`, `/thanh-toan`, `/dang-nhap` no longer match.
- Web test count per file is equal or higher than on master (none deleted); all 58 web tests pass.
