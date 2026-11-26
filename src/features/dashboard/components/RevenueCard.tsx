import { BarChart } from '@/components/charts/BarChart';
import { Card, CardHeader, TextLink } from '@/components/ui';
import { monthlyRevenue } from '../data';

export function RevenueCard() {
  return (
    <Card className="flex min-w-0 flex-col">
      {/* Desktop: full chart with values and month labels */}
      <div className="hidden lg:block">
        <CardHeader
          title="Revenue per bulan"
          subtitle="12 bulan terakhir · dalam juta Rupiah"
          action={<TextLink to="/reports/finance">Lihat laporan</TextLink>}
        />
        <BarChart data={monthlyRevenue} height={176} className="px-5 pt-2 pb-4" />
      </div>

      {/* Mobile: compact bars only */}
      <div className="lg:hidden">
        <CardHeader title="Revenue per bulan" subtitle="dalam juta Rupiah" />
        <BarChart data={monthlyRevenue} height={120} showValues={false} showLabels={false} className="gap-[5px] px-4 pb-4" />
      </div>
    </Card>
  );
}
