# 04: Header: Products drop-down and scroll-tightening

**What to build:** The header's three Product Type links become one "Products" link to `/products`. On large screens, hovering it, or moving keyboard focus into it, opens a drop-down of three tiles (a Product Photo and the Product Type label) linking to `/products?type=…`. In the phone menu, the three Product Types sit indented under Products. The header stays pinned; once the shopper scrolls past the hero it gets shorter, gains a soft shadow and a translucent blurred background. It never hides. See spec (Header).

**Blocked by:** 01, 03

**Status:** ready-for-agent

- [ ] One "Products" link to `/products` replaces the three Product Type links, marked current when on `/products`
- [ ] The drop-down offers Digital cameras, Film cameras and Film rolls, each linking to its `/products?type=…`, and is reachable and usable by keyboard
- [ ] The phone menu lists Products and the three Product Types; choosing one closes the menu
- [ ] The header tightens with shadow and blur after scrolling past the hero, and reverts at the top
- [ ] Header tests cover the Products link and each Product Type link's destination
