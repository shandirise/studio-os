import { Link } from 'react-router';
import { Badge, Card, CardHeader, TextLink } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { quotationTone } from '@/lib/status';
import type { DealQuotation } from '../../dealData';

/** "Quotation terkait" side card. */
export function DealQuotationCard({ quotations }: { quotations: DealQuotation[] }) {
  return (
    <Card>
      <CardHeader title="Quotation terkait" />
      <div className="flex flex-col gap-2 px-4 pb-3.5">
        {quotations.length === 0 ? (
          <p className="text-12 text-muted">
            Belum ada quotation. <TextLink to="/sales/quotations/new">Buat quotation</TextLink>
          </p>
        ) : (
          quotations.map((q) => (
            <Link key={q.id} to={`/sales/quotations/${q.id}`} className="group flex items-center justify-between gap-3">
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-13 leading-[1.2] font-semibold text-ink group-hover:underline">{q.number}</span>
                <span className="text-12 leading-[1.2] text-muted">
                  {formatRupiah(q.total)} · {q.date}
                </span>
              </span>
              <Badge tone={quotationTone[q.status]}>{q.status}</Badge>
            </Link>
          ))
        )}
      </div>
    </Card>
  );
}
