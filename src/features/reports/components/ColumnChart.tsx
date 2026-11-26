import { cn } from '@/lib/cn';
import type { ColumnDatum } from '../data';

type ColumnChartProps = {
  data: ColumnDatum[];
  /** Index drawn in ink (defaults to the last column = current period). */
  highlight?: number;
  /** Height in px of the tallest bar. */
  barHeight: number;
  /** Bar width in px (shrinks on narrow screens). */
  barWidth: number;
  className?: string;
};

/** Vertical bars with the value above and the label below; grey with one ink highlight. */
export function ColumnChart({ data, highlight = data.length - 1, barHeight, barWidth, className }: ColumnChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn('flex items-end gap-2.5', className)}>
      {data.map((d, i) => {
        const active = i === highlight;
        return (
          <div key={d.label} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
            <span className={cn('text-10-5 leading-none whitespace-nowrap', active ? 'font-semibold text-ink' : 'text-faint')}>
              {d.display}
            </span>
            <div
              className={cn('max-w-full rounded-[2px]', active ? 'bg-ink' : 'bg-line-2')}
              style={{ width: barWidth, height: (d.value / max) * barHeight }}
            />
            <span className="text-10-5 leading-none text-muted">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
