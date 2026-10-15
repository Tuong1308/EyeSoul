/*
 * The hero's hard-coded photos, served from the web app's public folder (public/hero/).
 * They are placeholders until the owner supplies real photos: drop each one into public/hero/ and point its slot
 * here at the new file. Pill photos are shown at about 2:1, strip photos at 3:2.
 */

/** The photos that crossfade inside the headline's pill. */
export const HERO_PILL_PHOTOS = ['/hero/pill-1.svg', '/hero/pill-2.svg', '/hero/pill-3.svg'];

/** The frames of the decorative film strip. */
export const HERO_STRIP_PHOTOS = Array.from({ length: 12 }, (_, index) => `/hero/strip-${String(index + 1).padStart(2, '0')}.svg`);
