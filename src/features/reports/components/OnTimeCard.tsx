import { Card } from '@/components/ui';
import { onTimeSummary } from '../data';
import { ChartLegend } from './ChartLegend';

export function OnTimeCard() {
  const { total, onTime, late } = onTimeSummary;
  const onTimePct = Math.round((onTime / total) * 100);
  const latePct = 100 - onTimePct;

  return (
    <Card className="flex flex-col gap-3 p-4">
      <h3 className="text-14 leading-[1.3] font-semibold text-ink">On-time vs terlambat · {total} project</h3>
      <div className="flex h-4 overflow-hidden rounded-[3px]" role="img" aria-label={`${onTimePct}% tepat waktu, ${latePct}% terlambat`}>
        <div className="bg-ink" style={{ width: `${onTimePct}%` }} />
        <div className="flex-1 bg-faint" />
      </div>
      <ChartLegend
        items={[
          { label: `Tepat waktu ${onTime} (${onTimePct}%)`, swatch: 'bg-ink' },
          { label: `Terlambat ${late} (${latePct}%)`, swatch: 'bg-faint' },
        ]}
      />
    </Card>
  );
}
