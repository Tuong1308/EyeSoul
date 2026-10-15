# 08: Three Spotlights

**What to build:** Between the hero and the Sample Photos, the homepage shows three Spotlights as zigzag full-bleed bands (prototype variant A): copy on one side and a visual on the other, sides alternating, backgrounds paper, then beige, then espresso. Contents:

- Products: "01 · The shop", photographer quotes rotating every ~5s (Ansel Adams, Dorothea Lange, Henri Cartier-Bresson), a seeded film camera and film roll Product Photo overlapping and tilted. CTA "Browse products" goes to `/products`.
- Sharing: "02 · Your portfolio", a mock portfolio card. CTA "Start your portfolio" goes to `/portfolio`.
- AI assistant: "03 · AI assistant", a mock chat about night film and metering neon, plus exposure chips. CTA "Ask the assistant" goes to `/assistant`.

There are no "Coming soon" labels.

Each band reveals slowly, once, when ~30% of it is in view:

- Copy lines rise ~48px over 1.2s, 0.3s apart.
- The visual grows from 85% scale over 1.6s, starting ~0.6s later.
- In the Products visual, the camera slides in from the left at ~1.0s and the roll from the right at ~1.4s.

This ticket introduces the shared scroll-reveal building block and stubs `IntersectionObserver` in the test setup. See spec (Spotlights).

**Blocked by:** 03, 05

**Status:** ready-for-agent

- [ ] Three labelled Spotlight regions appear in order Products, Sharing, AI assistant, with the copy above
- [ ] The CTAs link to `/products`, `/portfolio`, `/assistant`, and those pages render
- [ ] The scroll reveal plays once, with the timings above; with reduced motion, content shows without movement and quotes don't rotate
- [ ] The AI band's espresso background is visibly distinct from the dark band below it
- [ ] A shared scroll-reveal building block exists for later tickets; the test setup stubs `IntersectionObserver`
- [ ] Homepage tests cover the three Spotlights and their CTAs
