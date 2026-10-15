# 02: Complete product cards and rows

Spec: `.scratch/homepage/spec.md`

**What to build:** Featured Product rows behave fully. Film Camera cards show their Condition Grade, Out of Stock Digital Cameras and Film Rolls show "Hết hàng", rows top up to 4 and hide when their Product Type has no products, and shoppers can click through to placeholder listing and product pages. On mobile each row scrolls horizontally.

**Blocked by:** 01

**Status:** done

- [x] ProductCard carries `availability` (`available` | `out_of_stock`) and `conditionGrade` (Film Cameras only)
- [x] A row with fewer than 4 featured products is topped up with the newest non-featured products of that type
- [x] A Product Type with no eligible products is omitted from `rows`, and no empty row renders
- [x] Film Camera cards show a circled serif Condition Grade badge (A+, A, B, C)
- [x] Out of Stock cards show "Hết hàng" and still appear
- [x] Each row has a "Xem tất cả" link to a placeholder Product Type listing route; clicking a card goes to a placeholder product detail route by slug
- [x] Rows become horizontal scroll strips on mobile widths
- [x] The seed includes at least one Out of Stock Digital Camera and one Out of Stock Film Roll
- [x] API tests cover top-up, empty-type omission, availability and Condition Grade presence; web tests cover the badge, the "Hết hàng" label and navigation from a card

**Notes:** Routes are `/may-anh-digital`, `/may-anh-film`, `/cuon-film` (listings) and `/san-pham/:slug` (product detail), defined once in `apps/web/src/lib/routes.ts` for later tickets to reuse. The seed already had an Out of Stock Digital Camera (Ricoh GR IIIx) and Film Roll (Fujifilm C200).
