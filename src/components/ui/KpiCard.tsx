import type { ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Card } from './Card';

type KpiCardProps = {
  label: ReactNode;
  value: ReactNode;
  /** Change vs previous period, e.g. "12,4%". */
  delta?: ReactNode;
  /** Direction decides arrow and color. `down-good` = decrease is positive (e.g. expenses). */
  trend?: 'up' | 'down' | 'up-bad' | 'down-good';
  deltaLabel?: ReactNode;
  className?: string;
};

/** KPI tile: label, 24px value, colored delta line. */
export function KpiCard({ label, value, delta, trend = 'up', deltaLabel = 'vs periode lalu', className }: KpiCardProps) {
  const isUp = trend === 'up' || trend === 'up-bad';
  const isGood = trend === 'up' || trend === 'down-good';
  const Arrow = isUp ? ChevronUp : ChevronDown;

  return (
    <Card className={cn('flex min-w-0 flex-col gap-2 p-4', className)}>
      <p className="truncate text-12 leading-[1.2] font-medium text-muted">{label}</p>
      <p className="text-24 leading-[1.1] font-semibold tracking-[-0.01em] text-ink">{value}</p>
      {delta !== undefined && (
        <p className="flex items-center gap-[5px] text-11-5 leading-none">
          <span className={cn('flex items-center gap-[3px] font-semibold', isGood ? 'text-green-strong' : 'text-red-strong')}>
            <Arrow size={12} strokeWidth={2.5} />
            {delta}
          </span>
          <span className="text-faint">{deltaLabel}</span>
        </p>
      )}
    </Card>
  );
}
