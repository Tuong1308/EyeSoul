# 06: Sample Photo section

Spec: `.scratch/homepage/spec.md`

**What to build:** Near the bottom of the homepage, shoppers see up to 12 Sample Photos shot on Film Rolls in a magazine-style grid of mixed sizes, showing as many different Film Rolls as possible. Each photo is labelled with its Film Roll and leads to that Film Roll's page.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] The seed includes Sample Photos for fewer than 12 distinct Film Rolls (so the top-up rule is exercised), plus some Sample Photos of cameras
- [ ] The homepage endpoint returns `samplePhotos`: only photos of Film Rolls; first the newest photo of each distinct Film Roll (newest first), then the next-newest remaining photos, up to 12
- [ ] Each item carries its Film Roll's slug and name
- [ ] The grid uses mixed sizes; the Film Roll name label shows on hover on desktop and is always visible on touch screens
- [ ] Clicking a photo goes to that Film Roll's placeholder product detail route
- [ ] API tests cover the Film-Roll-only rule, one-per-Film-Roll priority, top-up and the cap; web tests cover labels and navigation
