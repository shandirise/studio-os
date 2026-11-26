import { cn } from '@/lib/cn';

export type BarDatum = { label: string; value: number };

type BarChartProps = {
  data: BarDatum[];
  /** Index drawn in ink (defaults to the last bar = current period). */
  highlight?: number;
  /** Height of the plot area in px (bars only, labels excluded). */
  height?: number;
  showValues?: boolean;
  showLabels?: boolean;
  /** Formats the value printed above each bar. */
  format?: (value: number) => string;
  className?: string;
};

/** Simple vertical bar chart in the design's grey-with-ink-highlight style. */
export function BarChart({
  data,
  highlight = data.length - 1,
  height = 160,
  showValues = true,
  showLabels = true,
  format = String,
  className,
}: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn('flex items-end gap-2.5', className)}>
      {data.map((d, i) => {
        const active = i === highlight;
        return (
          <div key={`${d.label}-${i}`} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
            {showValues && (
              <span className={cn('text-10-5 leading-none', active ? 'font-semibold text-ink' : 'text-faint')}>
                {format(d.value)}
              </span>
            )}
            <div className="flex w-full justify-center" style={{ height: (d.value / max) * height }}>
              <div className={cn('h-full w-full max-w-[30px] rounded-[2px]', active ? 'bg-ink' : 'bg-line-2')} />
            </div>
            {showLabels && <span className="text-10-5 leading-none text-muted">{d.label}</span>}
          </div>
        );
      })}
    </div>
  );
}
