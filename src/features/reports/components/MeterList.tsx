import { Progress } from '@/components/ui';
import type { MeterDatum } from '../data';

/** Label + value rows, each with a 6px ink bar on a grey track (lost reasons, utilization, aging). */
export function MeterList({ items }: { items: MeterDatum[] }) {
  return (
    <ul className="flex flex-col gap-3 px-4 pt-0.5 pb-4">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col gap-[5px]">
          <div className="flex justify-between gap-3 text-12-5 leading-[13px] text-ink">
            <span className="font-medium">{item.label}</span>
            <span className="font-semibold whitespace-nowrap">{item.display}</span>
          </div>
          {/* A sliver stays visible for zero values, as in the design. */}
          <Progress value={Math.max(item.percent, 0.5)} height={6} shape="square" />
        </li>
      ))}
    </ul>
  );
}
