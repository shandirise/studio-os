import { Card, Progress } from '@/components/ui';
import { formatRupiah } from '@/lib/format';

type BalanceCardProps = {
  balance: number;
  paid: number;
  total: number;
};

/** "SALDO TAGIHAN": outstanding amount with a paid / total bar. */
export function BalanceCard({ balance, paid, total }: BalanceCardProps) {
  return (
    <Card className="flex flex-col gap-2.5 p-4">
      <p className="text-10 leading-none font-semibold tracking-[0.08em] text-faint">SALDO TAGIHAN</p>
      <p className="text-[26px] leading-[1.1] font-bold tracking-[-0.015em] text-ink">{formatRupiah(balance)}</p>
      <Progress value={total ? (paid / total) * 100 : 0} shape="square" height={6} />
      <div className="flex justify-between gap-3 text-12 leading-none text-muted">
        <span>Dibayar {formatRupiah(paid)}</span>
        <span>Total {formatRupiah(total)}</span>
      </div>
    </Card>
  );
}
