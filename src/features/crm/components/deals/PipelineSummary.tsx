import { Card } from '@/components/ui';
import { formatCompactRupiah } from '../../dealData';

type PipelineSummaryProps = {
  total: number;
  weighted: number;
  wonThisMonth: number;
};

/** Three summary tiles above the board; values follow the deals as they move. */
export function PipelineSummary({ total, weighted, wonThisMonth }: PipelineSummaryProps) {
  const stats = [
    { label: 'Total nilai pipeline', value: total },
    { label: 'Weighted value', value: weighted },
    { label: 'Deal Won bulan ini', value: wonThisMonth },
  ];

  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:gap-4">
      {stats.map((s) => (
        <Card key={s.label} className="flex flex-col gap-1 p-3.5">
          <p className="text-12 leading-none font-medium text-muted">{s.label}</p>
          <p className="text-20 leading-[1.1] font-semibold text-ink">{formatCompactRupiah(s.value)}</p>
        </Card>
      ))}
    </div>
  );
}
