import { Card, CardHeader } from '@/components/ui';
import { busiestWeek, weeklyHours } from '../data';
import { ColumnChart } from './ColumnChart';

export function WeeklyHoursCard() {
  return (
    <Card className="min-w-0">
      <CardHeader title="Jam tercatat per minggu" subtitle="Billable vs non-billable" />
      <ColumnChart data={weeklyHours} highlight={busiestWeek} barHeight={165} barWidth={56} className="h-[220px] px-5 pt-2 pb-3.5" />
    </Card>
  );
}
