import { Card, CardHeader } from '@/components/ui';
import { receivablesAging } from '../data';
import { MeterList } from './MeterList';

export function ReceivablesAgingCard() {
  return (
    <Card className="self-start">
      <CardHeader title="Umur piutang" subtitle="Total Rp 62,5 jt" />
      <MeterList items={receivablesAging} />
    </Card>
  );
}
