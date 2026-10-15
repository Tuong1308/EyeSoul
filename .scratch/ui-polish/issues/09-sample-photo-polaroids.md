# 09: Sample Photos as a polaroid row

**What to build:** The masonry Sample Photo grid becomes a row of polaroids on an ink full-bleed band (prototype variant C).

The band is headed "Shot on our film", with kicker "Real photos · Shot on film". The heading keeps its id so the hero button can scroll to it.

Each polaroid:

- Is a white frame with a square photo and the Film Roll name in serif italic in the bottom margin, always visible.
- Links to that Film Roll.
- Drops in with a small alternating tilt (−3° to +3°) as it scrolls into view, using the shared scroll reveal from 08, and straightens and lifts on hover.

The row scrolls horizontally with snap, with "Previous photos" / "Next photos" buttons on desktop.

Loading and errors, scoped to this band (the hero and Spotlights don't wait on it):

- While loading: a row of blank polaroids, a status named "Loading photos".
- On failure: a message that the photos couldn't load, with "Try again". The error stays up during a retry.

See spec (Sample Photos, Loading and errors).

**Blocked by:** 03, 05, 08

**Status:** ready-for-agent

- [x] Each polaroid shows its photo (alt text intact) and Film Roll name, and links to the Film Roll
- [x] Previous and next buttons scroll the row
- [x] Loading and error states are scoped to the Sample Photo band
- [x] Reduced motion: no drop or tilt animation
- [x] The masonry grid and its skeleton pattern are removed
- [x] Sample Photo tests are updated

## Comments

**2026-10-15, review:** All criteria verified on `feat/ui-polish` (320ecbd); web suite 79/79 green, typecheck clean.
- `homepage/SamplePhotos.tsx`: an ink full-bleed band headed "Shot on our film", kicker "Real photos · Shot on film". Each polaroid shows its photo with its alt text intact and the Film Roll name in serif italic, and links to that Film Roll (HomePage tests).
- "Previous photos" and "Next photos" (shown from md up) scroll the row by 0.8 of its width, smoothly unless reduced motion (HomePage test with a stand-in `scrollBy`). The row snaps, and its scroll padding matches the frame so the first polaroid lines up with the heading.
- Drop-in: through the shared `Reveal` (0.08s stagger), a spring to alternating tilts within ±3°. Hover straightens, lifts and grows. Reduced motion: the polaroids are shown at their tilt with no drop and no hover motion.
- Loading and errors are scoped to the band, which owns the homepage data: blank polaroids under a "Loading photos" status, or "Couldn’t load the photos" with "Try again" that stays up during the retry. The hero and Spotlights render meanwhile (HomePage tests).
- The masonry `SamplePhotoGrid` and `HomePageSkeleton` are removed.
- Scroll target: `id="sample-photos"` (with `scroll-mt-24`) now sits on the always-present band rather than the heading (now `sample-photos-title`), so "See sample photos" works while loading and after errors too.
- Checked in headless Edge at 1440px against a fake API: loaded and error states. The espresso AI band is clearly distinct from the ink band below.
- Known, left for later: with no Sample Photos at all the band, and so the hero button's target, leaves the page. The scrollbar is hidden with `scrollbar-width: none` only.
