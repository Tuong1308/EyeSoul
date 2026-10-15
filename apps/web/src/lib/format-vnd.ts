const grouping = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

/** Formats an integer VND amount English-style, as `₫12,500,000`. */
export function formatVnd(amount: number): string {
  return `₫${grouping.format(amount)}`;
}
