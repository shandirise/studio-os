import type { MouseEvent } from 'react';
import { Avatar, Checkbox, Table, TD, TH, THead, TR } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { formatRupiah } from '@/lib/format';
import { companyMark, type Company } from '../../contactData';
import { SortableTH, type SortDirection } from '../contacts/SortableTH';

export type CompanySortKey = 'name' | 'revenue';
export type CompanySort = { key: CompanySortKey; direction: SortDirection } | null;

type CompaniesTableProps = {
  rows: Company[];
  contactCounts: Record<string, number>;
  selected: Set<string>;
  onToggle: (id: string, on: boolean) => void;
  onToggleAll: (on: boolean) => void;
  sort: CompanySort;
  onSort: (key: CompanySortKey) => void;
  onOpen: (id: string) => void;
};

const stop = (e: MouseEvent) => e.stopPropagation();

/** C3 companies table: selectable rows that open the company detail. */
export function CompaniesTable({ rows, contactCounts, selected, onToggle, onToggleAll, sort, onSort, onOpen }: CompaniesTableProps) {
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const directionOf = (key: CompanySortKey) => (sort?.key === key ? sort.direction : null);

  return (
    <Table minWidth={1134}>
      <THead>
        <TH className="w-10">
          <Checkbox checked={allSelected} onChange={onToggleAll} ariaLabel="Pilih semua perusahaan di halaman ini" />
        </TH>
        <SortableTH direction={directionOf('name')} onSort={() => onSort('name')}>
          PERUSAHAAN
        </SortableTH>
        <TH className="w-[150px]">INDUSTRI</TH>
        <TH className="w-[90px]">UKURAN</TH>
        <TH align="right" className="w-20">
          KONTAK
        </TH>
        <TH align="right" className="w-[90px]">
          DEAL WON
        </TH>
        <SortableTH align="right" direction={directionOf('revenue')} onSort={() => onSort('revenue')} className="w-[150px]">
          TOTAL REVENUE
        </SortableTH>
        <TH className="w-[70px]">PIC</TH>
        <TH className="w-[120px]">KOTA</TH>
      </THead>
      <tbody>
        {rows.map((company) => {
          const isSelected = selected.has(company.id);
          return (
            <TR key={company.id} selected={isSelected} onClick={() => onOpen(company.id)} className="h-[54px]">
              <TD onClick={stop}>
                <Checkbox checked={isSelected} onChange={(on) => onToggle(company.id, on)} ariaLabel={`Pilih ${company.name}`} />
              </TD>
              <TD>
                <div className="flex items-center gap-2">
                  <Avatar name={companyMark(company.name)} className="size-7 text-11" />
                  <div className="flex min-w-0 flex-col gap-px">
                    <span className="truncate font-medium">{company.name}</span>
                    <span className="truncate text-11-5 text-muted">{company.area}</span>
                  </div>
                </div>
              </TD>
              <TD>{company.industry}</TD>
              <TD className="text-muted">{company.size}</TD>
              <TD align="right">{contactCounts[company.id] ?? 0}</TD>
              <TD align="right">{company.dealsWon}</TD>
              <TD align="right" className="font-semibold whitespace-nowrap">
                {formatRupiah(company.revenue)}
              </TD>
              <TD>
                <Avatar name={memberById(company.picId).name} size="xs" className="text-10" />
              </TD>
              <TD>{company.city}</TD>
            </TR>
          );
        })}
      </tbody>
    </Table>
  );
}
