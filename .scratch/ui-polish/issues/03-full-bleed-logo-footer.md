# 03: Full-bleed frame, SVG logo, dark footer

**What to build:** The site stops looking squeezed into a column. Sections become full-bleed bands, with content held in a shared ~1440px frame with fluid side margins (16px on phones). The Eye Soul logo, redrawn as SVG from `docs/reference/eye-soul-logo-original.jpeg` (eight split petals around an eye with a highlight, plus "EYE SOUL" in Playfair Display Bold capitals), replaces the text logo: side by side in the header, stacked in cream in a new dark full-bleed footer. A mark-only form is ready for the hero. Two band colours are added to the theme: warm beige and espresso. See spec (Layout and theme, Logo, Footer).

**Blocked by:** 01

**Status:** ready-for-agent

- [x] Header, homepage sections, footer and placeholder pages use full-bleed bands with the shared content frame; no horizontal page scroll at phone width
- [x] The logo is an SVG that takes its colour from the surrounding text, in three forms: horizontal, stacked, mark-only
- [x] The header logo link keeps the accessible name "Eye Soul, home" and takes the shopper home
- [x] The footer is ink, full-bleed, with the stacked logo in cream, and keeps contact details, Policies and Follow us links (tests for these still pass)
- [x] Beige and espresso band colours exist as theme tokens

## Comments

**2026-10-15, review:** All criteria verified on `feat/ui-polish` (d47b78e).
- `components/Logo.tsx`: SVG redraw in three forms (`LogoHorizontal` in the header, `LogoStacked` in the footer, `LogoMark` ready for the hero), all `currentColor` with real holes for the gaps; checked rendered on paper and on ink.
- Header and footer logo links keep the accessible name "Eye Soul, home" (Header and Footer tests).
- Footer: `bg-ink text-paper`, full-bleed, stacked logo in cream; contact, Policies and Follow us tests pass.
- `index.css`: `--color-beige`, `--color-espresso` and the `frame` utility (max 1440px, `clamp(16px, 4vw, 64px)` side padding) used by header, homepage sections, footer and placeholder pages.
- No horizontal page scroll: measured in headless Edge at 320/360/390/600px on `/`, `/products?type=film-camera`, `/checkout`, `/portfolio` (scrollWidth equals clientWidth everywhere).
- Known, left for later tickets: the phone swipe rows' fixed `-mx-4` doesn't follow the growing frame padding between ~400 and 767px (rows move off the homepage in 05); the phone menu panel uses fixed 16px padding (rebuilt in 04).
