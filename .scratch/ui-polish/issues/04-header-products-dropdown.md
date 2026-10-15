# 04: Header: Products drop-down and scroll-tightening

**What to build:** The header's three Product Type links become one "Products" link to `/products`. On large screens, hovering it, or moving keyboard focus into it, opens a drop-down of three tiles (a Product Photo and the Product Type label) linking to `/products?type=…`. In the phone menu, the three Product Types sit indented under Products. The header stays pinned; once the shopper scrolls past the hero it gets shorter, gains a soft shadow and a translucent blurred background. It never hides. See spec (Header).

**Blocked by:** 01, 03

**Status:** ready-for-agent

- [x] One "Products" link to `/products` replaces the three Product Type links, marked current when on `/products`
- [x] The drop-down offers Digital cameras, Film cameras and Film rolls, each linking to its `/products?type=…`, and is reachable and usable by keyboard
- [x] The phone menu lists Products and the three Product Types; choosing one closes the menu
- [x] The header tightens with shadow and blur after scrolling past the hero, and reverts at the top
- [x] Header tests cover the Products link and each Product Type link's destination

## Comments

**2026-10-15, review:** All criteria verified on `feat/ui-polish` (2dd3441); web suite 61/61 green, typecheck clean.
- `layout/ProductsMenu.tsx`: one "Products" link to `/products` in the "Main" nav. It is `aria-current="page"` on unfiltered `/products`; on a Product Type tab that tile is the page and Products is `"true"` (Header tests).
- Drop-down: Digital cameras, Film cameras and Film rolls tiles (seed-map Product Photo plus label) link to `/products?type=…` (one Header test each). Hover or focus opens it, focus moving into the tiles keeps it open, the pointer leaving doesn't close it while focus is inside, and Escape closes it and returns focus to Products (Header test). `aria-expanded` is only exposed from lg up.
- Phone menu: the Product Types sit indented under Products, and following a link closes the menu (Header test).
- Scroll-tightening: `useScrolledPastHero` in `Header.tsx` measures the `data-hero` region (72px on pages without one) and re-measures on scroll, resize and route change. Past it the header goes to `py-1.5` with `shadow-soft` and `bg-paper/80 backdrop-blur-md`, and it reverts at the top. Not covered by tests, per the spec's no-animation-state rule.
- Known, left for later: the phone menu panel still uses a fixed 16px padding (flagged in 03), and the tile photo URLs are a hand copy of `apps/api/prisma/seed-photos.ts`. Ticket 07 must keep `data-hero` (noted there).
