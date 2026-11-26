import { Paperclip } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui';
import { formatDate } from '@/features/sales/components/document';
import { formatRupiah } from '@/lib/format';
import type { Payment } from '../../invoiceData';

/** "Riwayat pembayaran": recorded payments, newest first. */
export function PaymentHistoryCard({ payments }: { payments: Payment[] }) {
  return (
    <Card className="min-w-0">
      <CardHeader title="Riwayat pembayaran" />
      <div className="flex flex-col gap-2 px-4 pb-3.5">
        {payments.length === 0 && (
          <p className="rounded-control border border-line bg-subtle p-3.5 text-center text-12-5 leading-none font-medium text-muted">
            Belum ada pembayaran
          </p>
        )}
        {[...payments].reverse().map((p) => (
          <div key={p.id} className="flex flex-col gap-1 rounded-control border border-line p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-13 leading-none font-semibold text-ink">{formatRupiah(p.amount)}</span>
              <span className="text-11-5 leading-none text-muted">{formatDate(p.date)}</span>
            </div>
            <p className="text-12 leading-[1.3] text-muted">
              {p.method}
              {p.note && ` · ${p.note}`}
            </p>
            {p.proofName && (
              <p className="flex items-center gap-1 text-11-5 leading-none text-muted">
                <Paperclip size={12} />
                {p.proofName}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
