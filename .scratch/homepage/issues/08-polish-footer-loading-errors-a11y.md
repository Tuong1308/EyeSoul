# 08: Polish: footer, loading and error states, accessibility

Spec: `.scratch/homepage/spec.md`

**What to build:** The homepage feels finished and robust. It has a footer with contact info, policy links and social links. Placeholders show while data loads, a friendly error with retry appears if data fails to load, below-the-fold photos load lazily, everything is usable with a screen reader, and all sections share the magazine look consistently.

**Blocked by:** 03, 05, 06, 07

**Status:** done

- [x] Footer with contact info, shipping and return policy links (placeholder routes) and social links
- [x] Skeleton placeholders reserve layout while homepage data loads (no layout jump)
- [x] On a failed load, a friendly Vietnamese error with a "Thử lại" action renders, and retrying refetches
- [x] Below-the-fold photos load lazily
- [x] All photos have meaningful alt text; all controls (Cart, account, search, drawer, menu) have accessible names
- [x] Section headings, rules and spacing are consistent with Variant B across the page
- [x] Web tests cover the loading state, the error state and retry
