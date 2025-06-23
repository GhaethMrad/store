/**
 * Format a number as a currency string (USD by default).
 */
export function formatPrice(val: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(val);
}
