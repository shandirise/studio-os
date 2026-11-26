import { Search } from 'lucide-react';
import { Input } from '@/components/ui';
import { team } from '@/data/workspace';
import { cityOptions, companySizes, industryOptions, type CompanySize } from '../../contactData';
import { FilterMenu } from '../contacts/FilterMenu';

export type CompanyFilters = {
  industry: string | null;
  size: CompanySize | null;
  picId: string | null;
  city: string | null;
};

export const emptyCompanyFilters: CompanyFilters = { industry: null, size: null, picId: null, city: null };

type CompaniesToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  filters: CompanyFilters;
  onFiltersChange: (filters: CompanyFilters) => void;
  onSaveView: () => void;
};

const asOptions = <T extends string>(values: readonly T[]) => values.map((value) => ({ value, label: value }));

/** Search, filter chips and "Simpan sebagai view" above the companies table. */
export function CompaniesToolbar({ query, onQueryChange, filters, onFiltersChange, onSaveView }: CompaniesToolbarProps) {
  const set = <K extends keyof CompanyFilters>(key: K) => (value: CompanyFilters[K]) => onFiltersChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        icon={Search}
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Cari perusahaan…"
        aria-label="Cari perusahaan"
        className="w-full sm:w-[260px]"
        inputClassName="h-[30px] pl-[30px] text-12-5"
      />
      <FilterMenu label="Industri" allLabel="Semua industri" options={asOptions(industryOptions)} value={filters.industry} onChange={set('industry')} />
      <FilterMenu label="Ukuran" allLabel="Semua ukuran" options={asOptions(companySizes)} value={filters.size} onChange={set('size')} />
      <FilterMenu
        label="PIC"
        allLabel="Semua PIC"
        options={team.map((m) => ({ value: m.id, label: m.name }))}
        value={filters.picId}
        onChange={set('picId')}
      />
      <FilterMenu label="Kota" allLabel="Semua kota" options={asOptions(cityOptions)} value={filters.city} onChange={set('city')} />
      <button
        type="button"
        onClick={onSaveView}
        className="ml-auto cursor-pointer text-12 font-semibold whitespace-nowrap text-ink underline underline-offset-2 hover:text-ink-2"
      >
        Simpan sebagai view
      </button>
    </div>
  );
}
