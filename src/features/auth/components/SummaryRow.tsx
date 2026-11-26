import type { ReactNode } from 'react';

export type SummaryItem = { label: ReactNode; value: ReactNode };

/** Label / value row with a bottom hairline, as in the onboarding "Pratinjau" card. */
export function SummaryRow({ label, value }: SummaryItem) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-2.5">
      <span className="text-12-5 leading-none text-muted">{label}</span>
      <span className="text-right text-13 leading-none font-semibold text-ink">{value}</span>
    </div>
  );
}
