import { Card, CardHeader } from '@/components/ui';
import { utilization } from '../data';
import { MeterList } from './MeterList';

export function UtilizationCard() {
  return (
    <Card className="min-w-0 self-start">
      <CardHeader title="Utilisasi" subtitle="Jam billable ÷ jam kerja" />
      <MeterList items={utilization} />
    </Card>
  );
}
