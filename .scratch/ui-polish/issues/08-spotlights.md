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

- [x] Three labelled Spotlight regions appear in order Products, Sharing, AI assistant, with the copy above
- [x] The CTAs link to `/products`, `/portfolio`, `/assistant`, and those pages render
- [x] The scroll reveal plays once, with the timings above; with reduced motion, content shows without movement and quotes don't rotate
- [x] The AI band's espresso background is visibly distinct from the dark band below it
- [x] A shared scroll-reveal building block exists for later tickets; the test setup stubs `IntersectionObserver`
- [x] Homepage tests cover the three Spotlights and their CTAs

## Comments

**2026-10-15, review:** All criteria verified on `feat/ui-polish` (6dc556b); web suite 76/76 green, typecheck clean.
- `homepage/Spotlights.tsx`: three regions, "The shop", "Your portfolio" and "AI assistant", come between the hero and the Sample Photos. The copy comes first in the DOM and the sides alternate from md up. They render without API data (HomePage tests).
- CTAs: "Browse products" goes to `/products` ("Our products"), "Start your portfolio" to `/portfolio` and "Ask the assistant" to `/assistant`, and each destination's h1 renders (HomePage tests). There are no "Coming soon" labels.
- Reveal: `components/Reveal.tsx` (once, 30% in view) with `rise()` variants. Measured in headless Edge with `getAnimations()`: copy lines start at 150/450/750/1050/1350ms (48px over 1.2s), the visual at 600ms (85% scale and 60px down, over 1.6s), and the camera and roll at 1000/1400ms. With reduced motion, content shows from the start without movement, and the quotes stay on Ansel Adams.
- Bands are paper, `bg-beige` and `bg-espresso`; screenshot checked at 1440px. The contrast with the ink Sample Photo band below can only be judged once 09 lands.
- The test setup stubs `IntersectionObserver` to report everything in view. `Reveal` and `rise` are ready for 09 and 10; a child that sets its own `delay` counts from the start of the reveal.
- The portfolio and chat mocks are `aria-hidden`; the camera and roll photos have `alt=""`.
- Known, left for later: the Motion-system note that reveals become "a quick fade" under reduced motion; today they are simply shown (story 66's "still"). It belongs with 10.
