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

- [ ] Card hover lift and zoom, button press, link underline slide-in applied site-wide
- [ ] The Cart icon bounces and the count pulses after each add (the count value itself is covered by tests)
- [ ] `/products` rows reveal once, staggered
- [ ] With reduced motion enabled, nothing on the site moves beyond quick fades
- [ ] All tests pass; the owner signs off the look and motion against the prototype
