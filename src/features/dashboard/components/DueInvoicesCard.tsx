import { useNavigate } from 'react-router';
import { Badge, Card, CardHeader, Table, TD, TH, THead, TR, TextLink } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatRupiah } from '@/lib/format';
import { invoiceTone } from '@/lib/status';
import { dueInvoices, type DueInvoice } from '../data';

function StatusBadge({ invoice }: { invoice: DueInvoice }) {
  return <Badge tone={invoiceTone[invoice.status]}>{invoice.statusLabel ?? invoice.status}</Badge>;
}

export function DueInvoicesCard() {
  const navigate = useNavigate();
  const open = (id: string) => navigate(`/finance/invoices/${id}`);

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader
        title={<span>Invoice jatuh tempo<span className="hidden lg:inline"> &amp; overdue</span></span>}
        action={
          <TextLink to="/finance/invoices">
            <span className="hidden lg:inline">Lihat semua</span>
            <span className="lg:hidden">Semua</span>
          </TextLink>
        }
      />

      {/* Desktop table */}
      <div className="hidden lg:block">
        <Table minWidth={640} className="border-t border-line">
          <THead>
            <TH>NOMOR</TH>
            <TH>KLIEN</TH>
            <TH>JATUH TEMPO</TH>
            <TH align="right">SISA</TH>
            <TH>STATUS</TH>
          </THead>
          <tbody>
            {dueInvoices.map((inv) => (
              <TR key={inv.id} onClick={() => open(inv.id)} className="h-11">
                <TD className="font-semibold">{inv.number}</TD>
                <TD>{inv.client}</TD>
                <TD className="whitespace-nowrap">{inv.dueDate}</TD>
                <TD align="right" className={cn('font-semibold whitespace-nowrap', inv.status === 'Overdue' && 'text-danger')}>
                  {formatRupiah(inv.balance)}
                </TD>
                <TD>
                  <StatusBadge invoice={inv} />
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Mobile list */}
      <ul className="px-4 pb-2 lg:hidden">
        {dueInvoices.slice(0, 3).map((inv) => (
          <li key={inv.id}>
            <button
              type="button"
              onClick={() => open(inv.id)}
              className="flex w-full cursor-pointer items-start justify-between gap-3 border-b border-line py-3 text-left last:border-b-0"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-13 font-semibold text-ink">{inv.number}</span>
                <span className="truncate text-12 text-muted">{inv.client}</span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-13 font-semibold text-ink">{formatRupiah(inv.balance)}</span>
                <StatusBadge invoice={inv} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
