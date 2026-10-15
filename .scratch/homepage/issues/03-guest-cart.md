# 03: Guest Cart with mini-cart

Spec: `.scratch/homepage/spec.md`

**What to build:** A signed-out shopper adds products to a Cart from homepage cards, sees the count in the header, opens a mini-cart drawer to review, change and remove items, and finds the Cart still there after reloading. Film Cameras can only be added once; Out of Stock products can't be added. Holding a Film Camera does not reserve it.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Purchasable cards have a "Thêm vào giỏ" button; Out of Stock cards don't
- [ ] Adding shows a brief confirmation and updates the header Cart count
- [ ] The Cart persists in the browser (localStorage) and survives a reload; each line keeps a snapshot of name, price, Product Photo and Product Type
- [ ] Adding a Digital Camera or Film Roll already in the Cart increases its quantity; a Film Camera's quantity is fixed at 1, with no quantity stepper
- [ ] The mini-cart drawer lists lines (photo, name, unit price, quantity, line total) and the subtotal in VND, and lets the shopper change quantity and remove lines
- [ ] An empty Cart shows a message nudging back to shopping
- [ ] "Thanh toán" leads to a placeholder checkout route
- [ ] Web tests cover adding, the header count, the Film Camera cap, no add on Out of Stock, mini-cart contents and subtotal, and persistence across a remount

**Note from 02:** the card's name link is stretched over the whole card (`after:absolute after:inset-0`), so the "Thêm vào giỏ" button needs `relative z-10` to stay clickable above it.
