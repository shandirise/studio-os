import { formatRupiahShort } from '@/lib/format';

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const longMonths = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
const weekdays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const pad = (n: number) => String(n).padStart(2, '0');

/** Parses an ISO date (yyyy-mm-dd) as a local date. */
export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y!, m! - 1, d!);
}

/** Date → "2026-11-19" */
export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** "2027-02-28" → "28 Feb 2027" */
export function formatDate(iso: string): string {
  const d = parseDate(iso);
  return `${pad(d.getDate())} ${shortMonths[d.getMonth()]} ${d.getFullYear()}`;
}

/** "2026-11-21" → "21 Nov" */
export function formatDayMonth(iso: string): string {
  const d = parseDate(iso);
  return `${pad(d.getDate())} ${shortMonths[d.getMonth()]}`;
}

/** Date → "Kam 19" (timesheet column header). */
export function formatWeekday(date: Date): string {
  return `${weekdays[date.getDay()]} ${date.getDate()}`;
}

/** Monday + Sunday → "16 – 22 November 2026" / "30 November – 06 Desember 2026". */
export function formatWeekRange(start: Date, end: Date): string {
  const endText = `${pad(end.getDate())} ${longMonths[end.getMonth()]} ${end.getFullYear()}`;
  if (start.getMonth() === end.getMonth()) return `${start.getDate()} – ${endText}`;
  const startYear = start.getFullYear() === end.getFullYear() ? '' : ` ${start.getFullYear()}`;
  return `${pad(start.getDate())} ${longMonths[start.getMonth()]}${startYear} – ${endText}`;
}

/** 2530 → "00:42:10" */
export function formatClock(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${pad(h)}:${pad(m)}:${pad(seconds % 60)}`;
}

/** 23400 → "6j 30m" */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}j ${m}m` : `${m}m`;
}

const hoursFormat = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 });

/** 3.5 → "3,5" */
export function formatHours(hours: number): string {
  return hoursFormat.format(hours);
}

/** "3,5" → 3.5; empty, zero or invalid input → null. Capped at 24 hours. */
export function parseHours(text: string): number | null {
  const value = Number.parseFloat(text.replace(',', '.'));
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.min(24, Math.round(value * 100) / 100);
}

/** 38000000 → "Rp 38 jt"; 0 → "Rp 0" */
export function formatBudget(value: number): string {
  return value === 0 ? 'Rp 0' : formatRupiahShort(value);
}
