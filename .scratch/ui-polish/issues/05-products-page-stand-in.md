# 05: Products page stand-in; Featured rows leave the homepage

**What to build:** The three Featured Product rows move off the homepage to `/products`, a temporary Products page titled "Our products" with tabs All / Digital cameras / Film cameras / Film rolls. The tab is driven by `?type=` and marked as the current page; All shows all three rows. Each row's "View all" goes to its tab. The page reuses the homepage API response's rows (the API is unchanged) and shows the existing loading skeleton and error-with-"Try again" while it loads or fails. The real Products page (full listing, sorting, paging, its own API) is a separate feature. See spec (Products page).

**Blocked by:** 01

**Status:** ready-for-agent

- [x] The homepage no longer shows the Featured Product rows
- [x] `/products` shows the rows with English titles (e.g. "Featured · Each one is unique / Film cameras")
- [x] `/products?type=film-camera` (and the other two values) shows only that Product Type's row; the matching tab is marked current
- [x] "View all" on each row links to its tab
- [x] Loading and error states work on `/products`
- [x] The homepage tests for the rows move to Products page tests

## Comments

**2026-10-15, review:** All criteria verified on `feat/ui-polish` (a04a239); web suite 70/70 green, typecheck clean.
- Homepage: only the hero and Sample Photos remain. Its loading and error now say "Loading photos" and "Couldn’t load the photos" (HomePage tests).
- `products/ProductsPage.tsx`: "Our products" with tabs All / Digital cameras / Film cameras / Film rolls (a "Product types" nav). Rows keep their English titles, e.g. "Featured · Each one is unique / Film cameras" (ProductsPage tests).
- `?type=` goes through `productTypeFromParam` in `lib/routes.ts`, shared with the header drop-down. Each value shows only its row and marks its tab `aria-current="page"`; an unknown value shows every row under All (ProductsPage tests, including extra query parameters).
- "View all" on each row lands on its tab (ProductsPage test).
- Loading uses `FeaturedRowsSkeleton` ("Loading products"), and failure uses the shared `components/LoadError` with "Try again". A Product Type with nothing featured says "Nothing to show here yet" (ProductsPage tests).
- The row, Condition Grade, Out of stock and card-click tests moved from HomePage to ProductsPage tests. Cart tests now start from `/products`, and the `/products` placeholder cases left the Footer tests.
- Known, left for later: the page reuses `useHomepage` and the homepage API (stand-in by design), and the homepage still has the masonry skeleton until 09.
