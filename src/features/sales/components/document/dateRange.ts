import type { FilterOption } from './FilterMenu';

/** Date filter used by the document lists ("Tanggal", "Tanggal terbit"). */
export type DateRange = 'month' | 'last30' | 'quarter';

export const dateRangeOptions: FilterOption<DateRange>[] = [
  { value: 'month', label: 'Bulan ini' },
  { value: 'last30', label: '30 hari terakhir' },
  { value: 'quarter', label: 'Kuartal ini' },
];

const rangeStart: Record<DateRange, string> = {
  month: '2026-11-01',
  last30: '2026-10-20',
  quarter: '2026-10-01',
};

/** True when the ISO date falls in the range (relative to the demo "today"); no range matches everything. */
export function inDateRange(iso: string, range: DateRange | null): boolean {
  return !range || iso >= rangeStart[range];
}
