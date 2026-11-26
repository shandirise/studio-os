import { Card } from '@/components/ui';
import type { LedgerStat } from '../../ledgerData';

/** Compact summary tile: 12px label over a 20px value. */
export function LedgerStatCard({ stat }: { stat: LedgerStat }) {
  return (
    <Card className="flex min-w-0 flex-col gap-[5px] p-3.5">
      <p className="truncate text-12 leading-none font-medium text-muted">{stat.label}</p>
      <p className="text-20 leading-[22px] font-semibold text-ink max-sm:text-18">{stat.value}</p>
    </Card>
  );
}
