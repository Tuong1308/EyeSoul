# 11: Light-leak backgrounds for the hero and Spotlights

**What to build:** The hero and the three Spotlight bands keep their flat colours (paper, paper, beige, espresso) but gain soft blooms of warm colour, like light leaking onto film, so the bands feel less plain. Text contrast and the band colour sequence are unchanged.

**Status:** ready-for-human

## Acceptance criteria

- [x] The hero has amber, coral and peach blooms over a paper gradient
- [x] Each Spotlight band has one or two warm blooms at its edges; the espresso band's are amber and deep red
- [x] The blooms are decorative only: behind the content, not clickable, no change to text or buttons
- [x] Web tests still pass

## Comments

**2026-10-16, prototype verdict (owner):** Prompted by "the backgrounds behind the features and the banner are a bit plain; can we use photos or other colours?" Five options were prototyped on the homepage, switchable via `?variant=`: A flat (today), B film light leaks, C blurred photo + colour wash, D light-leak hero + faint photos in the Spotlights, E a bolder flat palette. The owner chose **B**. The prototype, with all five variants, is on branch `prototype/backgrounds` (commit 4641913); it is a primary source, not code to merge. B is folded in as the `light-leak` and `leak-*` utilities in `apps/web/src/index.css`.
