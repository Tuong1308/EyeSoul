/** Classes for content that sits on a light band (paper, beige) or a dark one (espresso, ink). */
const BAND_TONES = {
  light: { rule: 'border-ink', muted: 'text-ink/70', button: 'bg-ink text-paper hover:bg-ink/85' },
  dark: { rule: 'border-paper/30', muted: 'text-paper/70', button: 'bg-paper text-ink hover:bg-amber' },
} as const;

/** The top rule, muted text and solid button classes for content on a light band, or a dark one when `onDark`. */
export function bandTone(onDark: boolean) {
  return BAND_TONES[onDark ? 'dark' : 'light'];
}
