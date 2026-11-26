import { Card, CardHeader } from '@/components/ui';
import { lostReasons } from '../data';
import { MeterList } from './MeterList';

export function LostReasonsCard() {
  return (
    <Card className="self-start">
      <CardHeader title="Alasan deal kalah" subtitle="14 deal Lost" />
      <MeterList items={lostReasons} />
    </Card>
  );
}
