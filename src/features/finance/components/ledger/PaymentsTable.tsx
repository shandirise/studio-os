import { Paperclip } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Avatar, Badge, IconButton, Table, TD, TH, THead, TR, useToast } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { formatDate, type Payment, type SortDirection } from '../../ledgerData';
import { DateSortHeader } from './DateSortHeader';
import { NoResultsRow } from './NoResultsRow';

type PaymentsTableProps = {
  rows: Payment[];
  sort: SortDirection;
  onToggleSort: () => void;
  onResetFilters: () => void;
};

export function PaymentsTable({ rows, sort, onToggleSort, onResetFilters }: PaymentsTableProps) {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Table minWidth={880}>
      <THead>
        <DateSortHeader direction={sort} onToggle={onToggleSort} />
        <TH className="w-[140px]">INVOICE</TH>
        <TH>KLIEN</TH>
        <TH className="w-[130px]">METODE</TH>
        <TH align="right" className="w-[140px]">
          JUMLAH
        </TH>
        <TH className="w-[110px]">DICATAT OLEH</TH>
        <TH className="w-[70px]">BUKTI</TH>
      </THead>
      <tbody>
        {rows.map((p) => (
          <TR key={p.id} className="h-12" onClick={() => navigate(`/finance/invoices/${p.invoiceId}`)}>
            <TD className="whitespace-nowrap">{formatDate(p.date)}</TD>
            <TD className="font-semibold whitespace-nowrap">
              <Link to={`/finance/invoices/${p.invoiceId}`} onClick={(e) => e.stopPropagation()} className="hover:underline">
                {p.invoiceNumber}
              </Link>
            </TD>
            <TD>{p.client}</TD>
            <TD>
              <Badge>{p.method}</Badge>
            </TD>
            <TD align="right" className="font-semibold whitespace-nowrap">
              {formatRupiah(p.amount)}
            </TD>
            <TD>
              <Avatar name={p.recordedBy} size="xs" className="text-10" />
            </TD>
            <TD className="py-0">
              <IconButton
                icon={Paperclip}
                label="Lihat bukti"
                variant="ghost"
                size="sm"
                className="-ml-1.5 text-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  toast('Membuka bukti pembayaran', `bukti-${p.invoiceNumber}.pdf`);
                }}
              />
            </TD>
          </TR>
        ))}
        {rows.length === 0 && <NoResultsRow colSpan={7} onReset={onResetFilters} />}
      </tbody>
    </Table>
  );
}
