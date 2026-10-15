# 06: Minimal product card with round quick-add

**What to build:** Product cards lose their chrome: a 4:5 rounded photo with grain showing the product's first Product Photo, the Condition Grade badge top-left for Film Cameras, and a round "+" add button bottom-right on the photo. The button is revealed on hover on hover-capable screens and always visible on touch screens. Name and price sit on one line below; the name link covers the whole card. Out of Stock shows an "Out of stock" chip instead of the button. Only the look changes: adding keeps today's behaviour. See spec (Product card).

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] The card shows the photo, name, price and (Film Cameras) Condition Grade; clicking the card opens the product
- [ ] "+" adds to the Cart; its accessible name is "Add to cart", described by the product name, and a polite "Added to cart" status follows
- [ ] A Film Camera already in the Cart shows a check, is named "In your cart" and can't be added again
- [ ] Out of Stock cards show "Out of stock" and no add button
- [ ] Cart tests pass against the new card
