# 06: Minimal product card with round quick-add

**What to build:** Product cards lose their chrome: a 4:5 rounded photo with grain showing the product's first Product Photo, the Condition Grade badge top-left for Film Cameras, and a round "+" add button bottom-right on the photo. The button is revealed on hover on hover-capable screens and always visible on touch screens. Name and price sit on one line below; the name link covers the whole card. Out of Stock shows an "Out of stock" chip instead of the button. Only the look changes: adding keeps today's behaviour. See spec (Product card).

**Blocked by:** 01

**Status:** ready-for-agent

- [x] The card shows the photo, name, price and (Film Cameras) Condition Grade; clicking the card opens the product
- [x] "+" adds to the Cart; its accessible name is "Add to cart", described by the product name, and a polite "Added to cart" status follows
- [x] A Film Camera already in the Cart shows a check, is named "In your cart" and can't be added again
- [x] Out of Stock cards show "Out of stock" and no add button
- [x] Cart tests pass against the new card

## Comments

**2026-10-15, review:** All criteria verified on `feat/ui-polish` (1e74d6b); web suite 70/70 green, typecheck clean.
- `products/ProductCardView.tsx`: no chrome. A 4:5 `grain` photo with `rounded-xl2` shows the first Product Photo, the Condition Grade sits top-left, and name and price share one line. The name link is stretched over the card (ProductsPage tests: photo, name, price, badge, card click).
- `cart/AddToCartButton.tsx`: a round "+" named "Add to cart" and described by the product name. A polite `role="status"` says "Added to cart", now also shown as a chip beside the button. A Film Camera already in the Cart shows a check, is named "In your cart" and is disabled (Cart tests).
- Hover reveal uses the new `can-hover` variant (`@media (hover: hover)`, index.css), so touch screens always show the "+". Keyboard focus reveals it through `group-focus-within`. The check and the confirmation always stay visible.
- Out of Stock cards show an "Out of stock" chip on the photo and no button (Cart and ProductsPage tests).
- Stacking: headless Edge `elementFromPoint` at the "+" on a hover-capable screen hit the stretched link before 1e74d6b and the button after. `z-10` now sits on the button's wrapper.
- Known, left for later: hover lift and photo zoom on cards, and the Cart bounce, belong to 10. The "Out of stock" label still shows for any `out_of_stock` product, while GLOSSARY says Film Cameras are "Sold" (pre-existing, unchanged here).
