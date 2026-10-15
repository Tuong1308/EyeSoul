# 03: Full-bleed frame, SVG logo, dark footer

**What to build:** The site stops looking squeezed into a column. Sections become full-bleed bands, with content held in a shared ~1440px frame with fluid side margins (16px on phones). The Eye Soul logo, redrawn as SVG from `docs/reference/eye-soul-logo-original.jpeg` (eight split petals around an eye with a highlight, plus "EYE SOUL" in Playfair Display Bold capitals), replaces the text logo: side by side in the header, stacked in cream in a new dark full-bleed footer. A mark-only form is ready for the hero. Two band colours are added to the theme: warm beige and espresso. See spec (Layout and theme, Logo, Footer).

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Header, homepage sections, footer and placeholder pages use full-bleed bands with the shared content frame; no horizontal page scroll at phone width
- [ ] The logo is an SVG that takes its colour from the surrounding text, in three forms: horizontal, stacked, mark-only
- [ ] The header logo link keeps the accessible name "Eye Soul, home" and takes the shopper home
- [ ] The footer is ink, full-bleed, with the stacked logo in cream, and keeps contact details, Policies and Follow us links (tests for these still pass)
- [ ] Beige and espresso band colours exist as theme tokens
