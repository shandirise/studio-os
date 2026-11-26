/** Date and number helpers for documents. Dates are ISO strings ("2026-11-12"). */

/** "Today" in the demo data (matches the dashboard date). */
export const TODAY = '2026-11-19';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const numberFormat = new Intl.NumberFormat('id-ID');

function toDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

/** "2026-11-12" → "12 Nov 2026" */
export function formatDate(iso: string): string {
  const d = toDate(iso);
  return `${formatDayMonth(iso)} ${d.getUTCFullYear()}`;
}

/** "2026-11-12" → "12 Nov" */
export function formatDayMonth(iso: string): string {
  const d = toDate(iso);
  return `${String(d.getUTCDate()).padStart(2, '0')} ${MONTHS[d.getUTCMonth()]}`;
}

export function addDays(iso: string, days: number): string {
  const d = toDate(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Whole days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from: string, to: string): number {
  return Math.round((toDate(to).getTime() - toDate(from).getTime()) / 86_400_000);
}

/** 28000000 → "28.000.000" */
export function formatNumber(value: number): string {
  return numberFormat.format(value);
}

/** Keeps the digits of a typed value: "Rp 28.000.000" → 28000000. */
export function parseNumber(text: string): number {
  const digits = text.replace(/\D/g, '');
  return digits ? Number(digits) : 0;
}

/** Current time as "10:42" (autosave indicator). */
export function formatClock(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}
