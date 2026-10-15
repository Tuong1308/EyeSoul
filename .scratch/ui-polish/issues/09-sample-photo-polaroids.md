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

- [ ] Each polaroid shows its photo (alt text intact) and Film Roll name, and links to the Film Roll
- [ ] Previous and next buttons scroll the row
- [ ] Loading and error states are scoped to the Sample Photo band
- [ ] Reduced motion: no drop or tilt animation
- [ ] The masonry grid and its skeleton pattern are removed
- [ ] Sample Photo tests are updated
