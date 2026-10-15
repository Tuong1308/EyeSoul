# English UI for a shop selling in Vietnam

The storefront's UI and routes are English only (e.g. `/products`, `/checkout`), although Eye Soul still sells to customers in Vietnam and prices stay in VND (shown English-style, `₫12,500,000`). This replaces the original Vietnamese-only UI from the homepage spec; we chose English-only over bilingual to avoid carrying translations, and switched routes now, while there are no real users or search rankings to lose. Going back, or adding Vietnamese later, means an i18n layer and route redirects.
