import { Badge } from '@/components/ui';
import { cn } from '@/lib/cn';
import { productSummary } from '../data';

/** "Ringkasan bulan ini" product preview shown on the dark login panel. */
export function ProductMockCard() {
  const { kpis, bars, invoice } = productSummary;
  const last = bars.length - 1;

  return (
    <div className="flex flex-col gap-4 rounded-card bg-white p-5" aria-hidden>
      <div className="flex items-center justify-between">
        <p className="text-13 leading-none font-semibold text-ink">Ringkasan bulan ini</p>
        <Badge tone="green">Live</Badge>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="flex min-w-0 flex-col gap-1 rounded-control bg-subtle p-3">
            <span className="text-11 leading-none text-muted">{kpi.label}</span>
            <span className="truncate text-16 leading-[1.1] font-semibold text-ink">{kpi.value}</span>
          </div>
        ))}
      </div>

      <div className="flex h-24 items-end gap-2">
        {bars.map((height, i) => (
          <div
            key={i}
            className={cn('flex-1 rounded-[2px]', i === last ? 'bg-ink' : 'bg-line-2')}
            style={{ height }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-line pt-2.5">
        <span className="text-12 leading-none text-ink">{invoice}</span>
        <Badge tone="green">Lunas</Badge>
      </div>
    </div>
  );
}
