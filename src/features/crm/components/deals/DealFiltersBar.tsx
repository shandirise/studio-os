import { Search } from 'lucide-react';
import { Input } from '@/components/ui';
import { team } from '@/data/workspace';
import {
  closingRangeOptions,
  dealSources,
  emptyDealFilters,
  valueRangeOptions,
  type DealFilters,
} from '../../dealData';
import { FilterMenu } from './FilterMenu';

const ownerOptions = [{ value: 'all', label: 'Semua PIC' }, ...team.map((m) => ({ value: m.id, label: m.name }))];
const sourceOptions = [{ value: 'all', label: 'Semua sumber' }, ...dealSources.map((s) => ({ value: s, label: s }))];

type DealFiltersBarProps = {
  filters: DealFilters;
  onChange: (filters: DealFilters) => void;
  onSaveView: () => void;
};

/** Search + filter chips above the board / table. */
export function DealFiltersBar({ filters, onChange, onSaveView }: DealFiltersBarProps) {
  const set = <K extends keyof DealFilters>(key: K, value: DealFilters[K]) => onChange({ ...filters, [key]: value });
  const hasFilters = JSON.stringify(filters) !== JSON.stringify(emptyDealFilters);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        icon={Search}
        value={filters.query}
        onChange={(e) => set('query', e.target.value)}
        placeholder="Cari deal…"
        aria-label="Cari deal"
        className="w-full sm:w-[220px]"
        inputClassName="h-[30px] text-12-5"
      />
      <FilterMenu label="PIC" options={ownerOptions} value={filters.ownerId} allValue="all" onChange={(v) => set('ownerId', v)} />
      <FilterMenu label="Rentang nilai" options={valueRangeOptions} value={filters.value} allValue="all" onChange={(v) => set('value', v)} />
      <FilterMenu
        label="Tanggal closing"
        options={closingRangeOptions}
        value={filters.closing}
        allValue="all"
        onChange={(v) => set('closing', v)}
      />
      <FilterMenu label="Sumber" options={sourceOptions} value={filters.source} allValue="all" onChange={(v) => set('source', v)} />
      {hasFilters && (
        <button
          type="button"
          onClick={() => onChange(emptyDealFilters)}
          className="cursor-pointer px-1 text-12 font-medium text-muted hover:text-ink"
        >
          Reset
        </button>
      )}
      <button
        type="button"
        onClick={onSaveView}
        className="ml-auto cursor-pointer text-12 font-semibold text-ink underline underline-offset-2 hover:text-ink-2"
      >
        Simpan sebagai view
      </button>
    </div>
  );
}
