import { KpiCard } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { ReportKpi } from '../data';

/** Row of KPI tiles; pass the desktop column count via className (e.g. "lg:grid-cols-4"). */
export function KpiGrid({ kpis, className }: { kpis: ReportKpi[]; className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 gap-2.5 lg:gap-4', className)}>
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} delta={kpi.delta} />
      ))}
    </div>
  );
}
