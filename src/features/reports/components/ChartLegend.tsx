import { cn } from '@/lib/cn';

export type LegendItem = { label: string; /** Swatch background, e.g. "bg-ink". */ swatch: string };

/** Row of 10px square swatches with 12px labels. */
export function ChartLegend({ items, className }: { items: LegendItem[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-6 gap-y-2', className)}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5 text-12 leading-none text-ink">
          <span className={cn('size-2.5 shrink-0 rounded-[2px]', item.swatch)} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
