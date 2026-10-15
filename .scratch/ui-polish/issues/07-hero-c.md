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

- [ ] The hero region is named "About Eye Soul" and renders immediately, without waiting on the API
- [ ] "Shop film cameras" links to `/products?type=film-camera`; "See sample photos" targets the Sample Photo section
- [ ] The film strip is hidden from assistive tech and not clickable; it pauses on hover
- [ ] Entrance: logo 0s, headline words from 0.3s ~0.08s apart, pill opens ~0.7s, line ~1.0s, buttons ~1.1s, strip ~1.25s; the logo mark turns once from ~1.7s
- [ ] With reduced motion: quick fade only; strip, ticker, crossfade and spin are still
- [ ] Hero photos are placeholders bundled with the web app, in slots ready for the owner's real photos
- [ ] The old hero is removed; homepage tests cover both buttons
