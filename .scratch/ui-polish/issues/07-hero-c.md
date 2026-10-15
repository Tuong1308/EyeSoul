# 07: Hero C

**What to build:** The dark Ken Burns hero is replaced by the light hero chosen in the prototype (variant C on branch `prototype/ui-polish`).

Centred, top to bottom:

- The logo mark.
- A serif headline, "Slow down, [photo pill] look closer.", with the second line in italics. The photo pill crossfades between about 3 hard-coded photos every ~3s.
- The line "New digital cameras, hand-graded used film cameras, and the film rolls for your next frame."
- Two buttons:
  - "Shop film cameras" is amber and goes to `/products?type=film-camera`.
  - "See sample photos" is outlined and smooth-scrolls to the Sample Photo section, with a scroll margin so the sticky header doesn't cover it.

Below that:

- A decorative full-bleed film strip: about 12 hard-coded photos, with sprocket edges and amber frame numbers. It scrolls endlessly to the left (~45s per loop) and pauses on hover.
- Under the strip, an amber ticker running the other way (~30s per loop) that repeats the commitments: "Film cameras graded A+ to C", "Nationwide delivery", "Inspected before shipping".

The hero needs no API data. See spec (Hero) for the entrance timings.

**Note (from 04):** keep the `data-hero` attribute on the hero region; the header uses it to tighten once the hero has scrolled past.

**Blocked by:** 03

**Status:** ready-for-agent

- [x] The hero region is named "About Eye Soul" and renders immediately, without waiting on the API
- [x] "Shop film cameras" links to `/products?type=film-camera`; "See sample photos" targets the Sample Photo section
- [x] The film strip is hidden from assistive tech and not clickable; it pauses on hover
- [x] Entrance: logo 0s, headline words from 0.3s ~0.08s apart, pill opens ~0.7s, line ~1.0s, buttons ~1.1s, strip ~1.25s; the logo mark turns once from ~1.7s
- [x] With reduced motion: quick fade only; strip, ticker, crossfade and spin are still
- [x] Hero photos are placeholders bundled with the web app, in slots ready for the owner's real photos
- [x] The old hero is removed; homepage tests cover both buttons

## Comments

**2026-10-15, review:** All criteria verified on `feat/ui-polish` (0138dd4); web suite 71/71 green, typecheck clean.
- `homepage/Hero.tsx` is a region named "About Eye Soul" with `data-hero`. It needs no data and is present while the API is pending (HomePage loading test). The headline's accessible name is "Slow down, look closer." (HomePage test).
- "Shop film cameras" goes to `/products?type=film-camera` (HomePage test). "See sample photos" targets `#sample-photos`, now an always-present wrapper with `scroll-mt-24` on the homepage, so it works while the photos load (HomePage test). Smooth scrolling is on unless the shopper prefers reduced motion.
- The film strip is `aria-hidden` and has no links. Only the two buttons and the first copy of the commitments list reach assistive tech (HomePage test). The `marquee` utility pauses on hover.
- Entrance: logo 0s, "Slow down," words 0.3/0.38s, pill 0.7s, "look closer." 0.55/0.63s (as in the prototype), line 1.0s, buttons 1.1s, strip 1.25s. The logo mark makes one `rotate: 360` from 1.7s.
- Reduced motion: the entrance is a 0.2s fade with no delays, there is no spin, the pill's crossfade interval never starts, and `.marquee` gets `animation: none`. Checked in headless Edge with `--force-prefers-reduced-motion`: the 1440px screenshot matches prototype C with both strips still.
- Placeholders: 3 pill and 12 strip SVG scenes in `public/hero/`, listed in `homepage/hero-photos.ts`. Real photos go in that folder and their slots there.
- Strip loop: items are spaced with padding rather than `gap`, so the -50% marquee loops without a jump.
- No horizontal page scroll at 320/360/390/600px (measured in headless Edge).
- Known, left for later: the ~0.08s word stagger restarts at 0.55s for the second line, copied from the prototype.
