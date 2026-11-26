import { FileText, ReceiptText } from 'lucide-react';
import { Link } from 'react-router';
import { Badge, Card, CardHeader, KpiCard } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { invoiceTone, quotationTone } from '@/lib/status';
import { financeDocs, projectExpenses, type FinanceDoc, type Project } from '../data';
import { formatBudget, formatDate } from '../format';

const invoiced = financeDocs.reduce((sum, d) => (d.kind === 'Invoice' ? sum + d.amount : sum), 0);
const expenses = projectExpenses.reduce((sum, e) => sum + e.amount, 0);

function DocBadge({ doc }: { doc: FinanceDoc }) {
  return doc.kind === 'Quotation' ? (
    <Badge tone={quotationTone[doc.status]}>{doc.status}</Badge>
  ) : (
    <Badge tone={invoiceTone[doc.status]}>{doc.status}</Badge>
  );
}

/** Keuangan tab: budget KPIs, linked quotation / invoices and project expenses. */
export function ProjectFinanceTab({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
        <KpiCard label="Budget" value={formatBudget(project.budget)} />
        <KpiCard label="Terpakai" value={formatBudget(project.spent)} />
        <KpiCard label="Sisa budget" value={formatBudget(project.budget - project.spent)} />
        <KpiCard label="Sudah ditagih" value={formatBudget(invoiced)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_400px]">
        <Card className="self-start">
          <CardHeader title="Quotation & invoice" />
          <ul className="px-4 pb-2">
            {financeDocs.map((doc) => {
              const Icon = doc.kind === 'Quotation' ? FileText : ReceiptText;
              return (
                <li key={doc.id} className="border-b border-line last:border-b-0">
                  <Link to={doc.to} className="flex items-center gap-3 py-2.5 hover:opacity-80">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-subtle text-muted">
                      <Icon size={15} />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate text-13 font-semibold text-ink">{doc.number}</span>
                      <span className="truncate text-12 text-muted">
                        {doc.title} · {formatDate(doc.date)}
                      </span>
                    </div>
                    <span className="shrink-0 text-13 font-medium text-ink max-sm:hidden">{formatRupiah(doc.amount)}</span>
                    <DocBadge doc={doc} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="self-start">
          <CardHeader title="Pengeluaran project" subtitle={`Total ${formatRupiah(expenses)}`} />
          <ul className="px-4 pb-2">
            {projectExpenses.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-b-0">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-13 text-ink">{e.label}</span>
                  <span className="text-12 text-muted">{formatDate(e.date)}</span>
                </div>
                <span className="shrink-0 text-13 font-medium text-ink">{formatRupiah(e.amount)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
