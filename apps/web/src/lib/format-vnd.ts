const grouping = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 });

/** Formats an integer VND amount as `12.500.000 ₫` (non-breaking space before the symbol). */
export function formatVnd(amount: number): string {
  return `${grouping.format(amount)} ₫`;
}
