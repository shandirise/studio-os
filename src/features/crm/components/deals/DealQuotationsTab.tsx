import { FileText } from 'lucide-react';
import { Link } from 'react-router';
import { Badge, Button, Card, EmptyState } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { quotationTone } from '@/lib/status';
import type { DealQuotation } from '../../dealData';

/** "Quotation" tab: quotations made for this deal, linking to the sales module. */
export function DealQuotationsTab({ quotations }: { quotations: DealQuotation[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-12-5 text-muted">{quotations.length} quotation</p>
        <Button size="sm" icon={FileText} to="/sales/quotations/new">
          Buat quotation
        </Button>
      </div>

      <Card>
        {quotations.length === 0 ? (
          <EmptyState icon={FileText} title="Belum ada quotation" description="Buat quotation dari deal ini untuk dikirim ke klien." />
        ) : (
          <ul>
            {quotations.map((q) => (
              <li key={q.id} className="border-b border-line last:border-b-0">
                <Link
                  to={`/sales/quotations/${q.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-canvas"
                >
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-13 font-semibold text-ink">{q.number}</span>
                    <span className="text-12 text-muted">
                      {formatRupiah(q.total)} · {q.date}
                    </span>
                  </span>
                  <Badge tone={quotationTone[q.status]}>{q.status}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
