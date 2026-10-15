# 10: Motion polish pass

**What to build:** The motion language is made consistent across the site:

- Product cards lift slightly with a slow photo zoom on hover.
- Buttons press in to 0.97 when clicked.
- Text links get an underline that slides in on hover.
- After an add to the Cart, the header Cart icon bounces and its count pulses.
- Rows and cards on `/products` fade and rise in once, staggered, using the shared scroll reveal.

Every animation is then audited for reduced motion: the entrance and reveals become a quick fade; the strip, ticker, crossfades and logo spin stop. See spec (Motion system).

**Blocked by:** 04, 05, 06, 07, 08, 09

**Status:** ready-for-agent

- [x] Card hover lift and zoom, button press, link underline slide-in applied site-wide
- [x] The Cart icon bounces and the count pulses after each add (the count value itself is covered by tests)
- [x] `/products` rows reveal once, staggered
- [x] With reduced motion enabled, nothing on the site moves beyond quick fades
- [ ] All tests pass; the owner signs off the look and motion against the prototype

## Comments

**2026-10-15, review:** The first four criteria are verified on `feat/ui-polish` (87c8aac); web suite 79/79 green, typecheck clean. The last box waits on the owner's sign-off of the look and motion against the prototype.
- Cards lift 4px with a slow (700ms) photo zoom, on hover-capable screens only. Every `<button>` presses to 0.97 (base rule); pill links do the same through `press`. Text links that only underlined on hover now use `link-slide`, an underline that slides in on hover or focus, including the header's "Products" word. All are in the built CSS under motion-safe media queries.
- Deliberately unchanged: the amber, always-underlined "View all" and "Continue shopping" keep their static underline as emphasis. The grey "Remove" button and the dev-only sign-out link keep theirs.
- Cart feedback: `cart/use-cart-add-feedback.ts` bounces the icon and pulses the count whenever the count goes up: an add, the mini-cart "+", or another tab adding. Not on load, and never under reduced motion. A throwaway jsdom spy confirmed one add calls `animate` for both. Headless Edge doesn't advance Motion's JS frame loop, so the bounce itself wasn't observed there.
- `/products` rows reveal once through `Reveal`. Headless Edge `getAnimations()`: title at 0ms, cards at 80/160/240/320ms, 600ms each.
- Reduced motion: `Reveal` fades its block in over 0.2s with the children in place (rows end fully opaque, no transforms; checked in headless Edge). A base rule limits CSS transitions to colour, opacity, visibility and filters. Hover, press and pulse transforms are motion-safe. Hero, Spotlights and polaroids were already gated (07–09). `index.css` notes which mechanism owns what.
