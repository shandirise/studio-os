import { useNavigate } from 'react-router';
import { FileText } from 'lucide-react';
import { Avatar, Badge, EmptyState, Table, TD, TH, THead, TR } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { formatRupiah } from '@/lib/format';
import { quotationTone } from '@/lib/status';
import { formatDate, SortableTH, type SortState } from '../document';
import { clientById, dealById, type Quotation } from '../../data';
import { quotationTotals, showsValidity, type QuotationSortKey } from './quotationDocument';

type QuotationTableProps = {
  rows: Quotation[];
  sort: SortState<QuotationSortKey>;
  onSort: (key: QuotationSortKey) => void;
};

/** D1 table; rows open the quotation detail. */
export function QuotationTable({ rows, sort, onSort }: QuotationTableProps) {
  const navigate = useNavigate();

  return (
    <Table minWidth={1100} className="[&_table]:table-fixed">
      <THead>
        <SortableTH label="NOMOR" column="number" sort={sort} onSort={onSort} className="w-[130px]" />
        <TH>KLIEN</TH>
        <TH className="w-[190px]">DEAL TERKAIT</TH>
        <SortableTH label="TOTAL" column="total" sort={sort} onSort={onSort} className="w-[130px]" />
        <TH className="w-[110px]">STATUS</TH>
        <TH className="w-[120px]">BERLAKU SAMPAI</TH>
        <TH className="w-[150px]">DIBUAT OLEH</TH>
        <TH className="w-[100px]">TANGGAL</TH>
      </THead>
      <tbody>
        {rows.map((q) => {
          const creator = memberById(q.createdBy);
          return (
            <TR key={q.id} className="h-[50px] [&>td]:py-2" onClick={() => navigate(`/sales/quotations/${q.id}`)}>
              <TD className="font-semibold">{q.number}</TD>
              <TD>{clientById(q.clientId).company}</TD>
              <TD className="text-muted">{dealById(q.dealId)?.name ?? '–'}</TD>
              <TD className="font-semibold whitespace-nowrap">{formatRupiah(quotationTotals(q).total)}</TD>
              <TD>
                <Badge tone={quotationTone[q.status]}>{q.status}</Badge>
              </TD>
              <TD>{showsValidity(q.status) ? formatDate(q.validUntil) : '–'}</TD>
              <TD>
                <span className="flex items-center gap-2">
                  <Avatar name={creator.name} className="size-7" />
                  <span className="font-medium">{creator.name}</span>
                </span>
              </TD>
              <TD className="text-muted">{formatDate(q.issueDate)}</TD>
            </TR>
          );
        })}
        {rows.length === 0 && (
          <tr>
            <td colSpan={8}>
              <EmptyState
                icon={FileText}
                title="Tidak ada quotation"
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
