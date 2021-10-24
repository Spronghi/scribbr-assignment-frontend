import { DateTime } from 'luxon';

export function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-EN', { style: 'currency', currency }).format(amount);
}

export function formatISODate(str) {
  const date = DateTime.fromISO(str);
  if (!date.isValid) return '-';
  return date.toLocaleString(DateTime.DATETIME_MED);
}
