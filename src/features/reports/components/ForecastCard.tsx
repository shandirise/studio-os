import { Card, CardHeader } from '@/components/ui';
import { forecast } from '../data';
import { ColumnChart } from './ColumnChart';

export function ForecastCard() {
  return (
    <Card className="self-start">
      <CardHeader title="Forecast 3 bulan" subtitle="Weighted pipeline vs target" />
      {/* The next month (Jan) is highlighted. */}
      <ColumnChart data={forecast} highlight={1} barHeight={128} barWidth={44} className="h-[200px] px-5 pt-2 pb-3.5" />
    </Card>
  );
}
