# 05: Products page stand-in; Featured rows leave the homepage

**What to build:** The three Featured Product rows move off the homepage to `/products`, a temporary Products page titled "Our products" with tabs All / Digital cameras / Film cameras / Film rolls. The tab is driven by `?type=` and marked as the current page; All shows all three rows. Each row's "View all" goes to its tab. The page reuses the homepage API response's rows (the API is unchanged) and shows the existing loading skeleton and error-with-"Try again" while it loads or fails. The real Products page (full listing, sorting, paging, its own API) is a separate feature. See spec (Products page).

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] The homepage no longer shows the Featured Product rows
- [ ] `/products` shows the rows with English titles (e.g. "Featured · Each one is unique / Film cameras")
- [ ] `/products?type=film-camera` (and the other two values) shows only that Product Type's row; the matching tab is marked current
- [ ] "View all" on each row links to its tab
- [ ] Loading and error states work on `/products`
- [ ] The homepage tests for the rows move to Products page tests
