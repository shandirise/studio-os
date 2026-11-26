import { useNavigate } from 'react-router';
import { ReceiptText } from 'lucide-react';
import { Badge, EmptyState, Table, TD, TH, THead, TR } from '@/components/ui';
import { formatDayMonth, SortableTH, type SortState } from '@/features/sales/components/document';
import { clientById } from '@/features/sales/data';
import { cn } from '@/lib/cn';
import { formatRupiah } from '@/lib/format';
import { invoiceTone } from '@/lib/status';
import { projectById, type Invoice } from '../../invoiceData';
import { invoiceAmount, invoiceBalance, invoiceStatus, paidAmount, type InvoiceSortKey } from './invoiceDocument';

type InvoiceTableProps = {
  rows: Invoice[];
  sort: SortState<InvoiceSortKey>;
  onSort: (key: InvoiceSortKey) => void;
};

/** F1 table; rows open the invoice detail. */
export function InvoiceTable({ rows, sort, onSort }: InvoiceTableProps) {
  const navigate = useNavigate();

  return (
    <Table minWidth={1110} className="[&_table]:table-fixed">
      <THead>
        <SortableTH label="NOMOR" column="number" sort={sort} onSort={onSort} className="w-[126px]" />
        <TH>KLIEN</TH>
        <TH className="w-[170px]">PROJECT</TH>
        <TH className="w-[70px]">TERBIT</TH>
        <TH className="w-[96px]">JATUH TEMPO</TH>
        <TH align="right" className="w-[120px]">
          TOTAL
        </TH>
        <TH align="right" className="w-[112px]">
          DIBAYAR
        </TH>
        <TH align="right" className="w-[112px]">
          SISA
        </TH>
        <TH className="w-[150px]">STATUS</TH>
      </THead>
      <tbody>
        {rows.map((inv) => {
          const status = invoiceStatus(inv);
          const overdue = status === 'Overdue';
          return (
            <TR key={inv.id} className="h-12 [&>td]:py-2" onClick={() => navigate(`/finance/invoices/${inv.id}`)}>
              <TD className="font-semibold">{inv.number}</TD>
              <TD>{clientById(inv.clientId).company}</TD>
              <TD className="text-muted">{projectById(inv.projectId).name}</TD>
              <TD className="whitespace-nowrap">{formatDayMonth(inv.issueDate)}</TD>
              <TD className="whitespace-nowrap">{formatDayMonth(inv.dueDate)}</TD>
              <TD align="right" className="font-semibold whitespace-nowrap">
                {formatRupiah(invoiceAmount(inv))}
              </TD>
              <TD align="right" className="whitespace-nowrap">
                {formatRupiah(paidAmount(inv))}
              </TD>
              <TD align="right" className={cn('whitespace-nowrap', overdue && 'font-semibold text-danger')}>
                {formatRupiah(invoiceBalance(inv))}
              </TD>
              <TD>
                <Badge tone={invoiceTone[status]}>{status}</Badge>
              </TD>
            </TR>
          );
        })}
        {rows.length === 0 && (
          <tr>
            <td colSpan={9}>
              <EmptyState
                icon={ReceiptText}
                title="Tidak ada invoice"
                description="Coba ubah kata kunci atau filter yang dipakai."
                className="py-10"
              />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
