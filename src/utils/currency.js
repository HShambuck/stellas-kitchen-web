// ─── Currency Helpers ─────────────────────────────────────────────────────────

/**
 * Format a number as Ghanaian Cedis.
 * @param {number} amount
 * @returns {string}  e.g. "GHS 35.00"
 */
export function formatCurrency(amount) {
  return `GHS ${Number(amount).toFixed(2)}`;
}

/**
 * Format a number as compact Cedis (no decimals for whole numbers).
 * @param {number} amount
 * @returns {string}  e.g. "GHS 35"
 */
export function formatCurrencyCompact(amount) {
  return Number.isInteger(amount)
    ? `GHS ${amount}`
    : `GHS ${Number(amount).toFixed(2)}`;
}
