import { Card, CardHeader } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { PaymentRecord } from '../data';

type PaymentHistoryCardProps = {
  records: PaymentRecord[];
  className?: string;
};

/** "Riwayat pembayaran": payments and submitted receipts for this invoice. */
export function PaymentHistoryCard({ records, className }: PaymentHistoryCardProps) {
  return (
    <Card className={cn('min-w-0', className)}>
      <CardHeader title="Riwayat pembayaran" />
      <div className="px-4 pb-3.5">
        {records.length === 0 ? (
          <p className="text-12-5 leading-none text-muted">Belum ada pembayaran</p>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {records.map((r) => (
              <li key={r.id} className="flex items-start justify-between gap-3 text-12-5 leading-[1.3]">
                <span className="min-w-0 text-ink">{r.label}</span>
                <span className="shrink-0 text-muted">{r.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
