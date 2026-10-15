# 01: English storefront: copy, routes, VND format

**What to build:** A shopper sees the whole storefront in English: every label, button, accessible name, status announcement and placeholder page, with the page language declared as English and prices shown English-style as `₫12,500,000`. URLs are English. The Product Types no longer have routes of their own; they point at the Products page filtered by type (a placeholder titled "Products" for now, until ticket 05). The look and layout are otherwise unchanged. This prefactor lands first because it touches nearly every file and test. See spec `.scratch/ui-polish/spec.md` (Language and routes) and ADR 0004.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Every user-visible string and accessible name in the web app is natural English (header, search, account control, Cart and mini-cart, cards, homepage sections, loading/error states, footer, placeholders, dev stub session panel)
- [ ] The document language is English
- [ ] `formatVnd` renders `₫12,500,000`
- [ ] Routes: `/products` (placeholder "Products"), `/products/:slug`, `/checkout`, `/login`, `/search`, `/shipping-policy`, `/returns-policy`, plus placeholder pages at `/portfolio` ("Portfolio") and `/assistant` ("AI assistant")
- [ ] Product Types carry English labels (Digital cameras, Film cameras, Film rolls), a `?type=` value (`digital-camera`, `film-camera`, `film-roll`) and a path to `/products?type=…`; every Product Type link in the app uses it
- [ ] The Vietnamese routes are gone, with no redirects
- [ ] All existing web tests are rewritten in English against the new routes and pass; none are deleted
