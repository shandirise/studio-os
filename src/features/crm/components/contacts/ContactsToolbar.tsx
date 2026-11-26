import { Search } from 'lucide-react';
import { Input } from '@/components/ui';
import { team } from '@/data/workspace';
import type { ContactStage } from '@/lib/status';
import { contactStages, contactTagOptions, createdRangeOptions, leadSources, type CreatedRange, type LeadSource } from '../../contactData';
import { FilterMenu } from './FilterMenu';

export type ContactFilters = {
  stage: ContactStage | null;
  picId: string | null;
  source: LeadSource | null;
  tag: string | null;
  created: CreatedRange | null;
};

export const emptyContactFilters: ContactFilters = { stage: null, picId: null, source: null, tag: null, created: null };

type ContactsToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  filters: ContactFilters;
  onFiltersChange: (filters: ContactFilters) => void;
  onSaveView: () => void;
};

const asOptions = <T extends string>(values: readonly T[]) => values.map((value) => ({ value, label: value }));

/** Search, filter chips and "Simpan sebagai view" above the contacts table. */
export function ContactsToolbar({ query, onQueryChange, filters, onFiltersChange, onSaveView }: ContactsToolbarProps) {
  const set = <K extends keyof ContactFilters>(key: K) => (value: ContactFilters[K]) => onFiltersChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        icon={Search}
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Cari nama, email, perusahaan…"
        aria-label="Cari kontak"
        className="w-full sm:w-[260px]"
        inputClassName="h-[30px] pl-[30px] text-12-5"
      />
      <FilterMenu label="Stage" allLabel="Semua stage" options={asOptions(contactStages)} value={filters.stage} onChange={set('stage')} />
      <FilterMenu
        label="PIC"
        allLabel="Semua PIC"
        options={team.map((m) => ({ value: m.id, label: m.name }))}
        value={filters.picId}
        onChange={set('picId')}
      />
      <FilterMenu label="Sumber" allLabel="Semua sumber" options={asOptions(leadSources)} value={filters.source} onChange={set('source')} />
      <FilterMenu label="Tag" allLabel="Semua tag" options={asOptions(contactTagOptions)} value={filters.tag} onChange={set('tag')} />
      <FilterMenu
        label="Tanggal dibuat"
        allLabel="Kapan saja"
        options={createdRangeOptions.map(({ value, label }) => ({ value, label }))}
        value={filters.created}
        onChange={set('created')}
      />
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
