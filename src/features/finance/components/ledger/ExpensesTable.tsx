import { ReceiptText } from 'lucide-react';
import { Link } from 'react-router';
import { Avatar, Badge, IconButton, Table, TD, TH, THead, TR, useToast } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { formatDate, projectPath, type Expense, type SortDirection } from '../../ledgerData';
import { DateSortHeader } from './DateSortHeader';
import { NoResultsRow } from './NoResultsRow';

type ExpensesTableProps = {
  rows: Expense[];
  sort: SortDirection;
  onToggleSort: () => void;
  onResetFilters: () => void;
};

export function ExpensesTable({ rows, sort, onToggleSort, onResetFilters }: ExpensesTableProps) {
  const toast = useToast();

  return (
    <Table minWidth={900}>
      <THead>
        <DateSortHeader direction={sort} onToggle={onToggleSort} />
        <TH className="w-[130px]">KATEGORI</TH>
        <TH>DESKRIPSI</TH>
        <TH className="w-[190px]">PROJECT</TH>
        <TH align="right" className="w-[130px]">
          JUMLAH
        </TH>
        <TH className="w-20">DICATAT</TH>
        <TH className="w-[70px]">STRUK</TH>
      </THead>
      <tbody>
        {rows.map((e) => {
          const projectTo = projectPath(e.project);
          return (
            <TR key={e.id} className="h-[46px]">
              <TD className="whitespace-nowrap">{formatDate(e.date)}</TD>
              <TD>
                <Badge>{e.category}</Badge>
              </TD>
              <TD>{e.description}</TD>
              <TD className="text-muted">
                {projectTo ? (
                  <Link to={projectTo} className="hover:text-ink hover:underline">
                    {e.project}
                  </Link>
                ) : (
                  e.project
                )}
              </TD>
              <TD align="right" className="font-semibold whitespace-nowrap">
                {formatRupiah(e.amount)}
              </TD>
              <TD>
                <Avatar name={e.recordedBy} size="xs" className="text-10" />
              </TD>
              <TD className="py-0">
                <IconButton
                  icon={ReceiptText}
                  label="Lihat struk"
                  variant="ghost"
                  size="sm"
                  className="-ml-1.5 text-muted"
                  onClick={() => toast('Membuka struk', `${e.description} · ${formatRupiah(e.amount)}`)}
                />
              </TD>
            </TR>
          );
        })}
        {rows.length === 0 && <NoResultsRow colSpan={7} onReset={onResetFilters} />}
      </tbody>
    </Table>
  );
}
