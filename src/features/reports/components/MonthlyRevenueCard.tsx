import { Card, CardHeader } from '@/components/ui';
import { monthlyRevenue } from '../data';
import { ColumnChart } from './ColumnChart';

export function MonthlyRevenueCard() {
  return (
    <Card className="min-w-0">
      <CardHeader title="Revenue per bulan" subtitle="Dalam juta Rupiah" />
      <div className="overflow-x-auto">
        <ColumnChart data={monthlyRevenue} barHeight={152} barWidth={28} className="h-[220px] min-w-[480px] px-5 pt-2 pb-3.5" />
      </div>
    </Card>
  );
}
