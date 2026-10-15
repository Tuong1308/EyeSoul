# 07: Hero banner

Spec: `.scratch/homepage/spec.md`

**What to build:** The homepage opens with a single hard-coded hero: a large photo with a slow Ken Burns zoom, a tagline that fades in, and three buttons leading to the Digital Camera, Film Camera and Film Roll listings. Shoppers who prefer reduced motion get a still version.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Hero content (image, tagline, three CTAs) is hard-coded in the web app, with no admin or API involvement
- [ ] The Ken Burns zoom and tagline fade-in are built with Motion
- [ ] With `prefers-reduced-motion`, the animation is disabled or minimal
- [ ] The three CTAs ("Máy ảnh digital", "Máy ảnh film", "Cuộn film") lead to the placeholder Product Type listing routes
- [ ] Web tests cover the three CTAs and their destinations
