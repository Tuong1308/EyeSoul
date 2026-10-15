# 03: Guest Cart with mini-cart

Spec: `.scratch/homepage/spec.md`

**What to build:** A signed-out shopper adds products to a Cart from homepage cards, sees the count in the header, opens a mini-cart drawer to review, change and remove items, and finds the Cart still there after reloading. Film Cameras can only be added once; Out of Stock products can't be added. Holding a Film Camera does not reserve it.

**Blocked by:** 02

**Status:** done

- [x] Purchasable cards have a "Thêm vào giỏ" button; Out of Stock cards don't
- [x] Adding shows a brief confirmation and updates the header Cart count
- [x] The Cart persists in the browser (localStorage) and survives a reload; each line keeps a snapshot of name, price, Product Photo and Product Type
- [x] Adding a Digital Camera or Film Roll already in the Cart increases its quantity; a Film Camera's quantity is fixed at 1, with no quantity stepper
- [x] The mini-cart drawer lists lines (photo, name, unit price, quantity, line total) and the subtotal in VND, and lets the shopper change quantity and remove lines
- [x] An empty Cart shows a message nudging back to shopping
- [x] "Thanh toán" leads to a placeholder checkout route
- [x] Web tests cover adding, the header count, the Film Camera cap, no add on Out of Stock, mini-cart contents and subtotal, and persistence across a remount

**Note from 02:** the card's name link is stretched over the whole card (`after:absolute after:inset-0`), so the "Thêm vào giỏ" button needs `relative z-10` to stay clickable above it.

**Notes:** Ticket 04 had no header to extend yet, so `apps/web/src/layout/SiteLayout.tsx` adds a minimal one: the Eye Soul wordmark linking home and the Cart button. It is deliberately not sticky. If 04 makes it sticky with a `backdrop-blur`, keep the mini-cart rendered outside the `<header>` (a filter on an ancestor traps `position: fixed`). The Cart store is `apps/web/src/cart/cart-store.ts` (localStorage key `eyesoul.cart`, synced across tabs); `useCart()` in `cart-context.tsx` is the only way components read it. The checkout placeholder is `/thanh-toan` (`CHECKOUT_PATH` in `lib/routes.ts`). A Film Camera already in the Cart shows a disabled "Đã có trong giỏ" button on its card.
