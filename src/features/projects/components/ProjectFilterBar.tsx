import { Search } from 'lucide-react';
import { FilterChip, Input, Menu, useToast } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { deadlineSortLabel, projects, type DeadlineSort } from '../data';

export type ProjectFilters = {
  query: string;
  client: string | null;
  pmId: string | null;
  deadline: DeadlineSort | null;
};

type ProjectFilterBarProps = {
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
};

const clients = [...new Set(projects.map((p) => p.client))];
const pmIds = [...new Set(projects.map((p) => p.pmId))];

/** Search + Klien / PM / Deadline chips + "Simpan sebagai view". */
export function ProjectFilterBar({ filters, onChange }: ProjectFilterBarProps) {
  const toast = useToast();
  const set = (patch: Partial<ProjectFilters>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        icon={Search}
        value={filters.query}
        onChange={(e) => set({ query: e.target.value })}
        placeholder="Cari project…"
        aria-label="Cari project"
        className="w-full sm:w-[260px]"
        inputClassName="h-[30px] text-12-5"
      />

      <Menu
        align="left"
        items={[
          { label: 'Semua klien', onSelect: () => set({ client: null }) },
          ...clients.map((client) => ({ label: client, onSelect: () => set({ client }) })),
        ]}
        trigger={({ toggle }) => (
          <FilterChip active={filters.client !== null} onClick={toggle}>
            {filters.client ?? 'Klien'}
          </FilterChip>
        )}
      />

      <Menu
        align="left"
        items={[
          { label: 'Semua PM', onSelect: () => set({ pmId: null }) },
          ...pmIds.map((id) => ({ label: memberById(id).name, onSelect: () => set({ pmId: id }) })),
        ]}
        trigger={({ toggle }) => (
          <FilterChip active={filters.pmId !== null} onClick={toggle}>
            {filters.pmId ? `PM: ${memberById(filters.pmId).name}` : 'PM'}
          </FilterChip>
        )}
      />

      <Menu
        align="left"
        items={[
          { label: 'Urutan default', onSelect: () => set({ deadline: null }) },
          ...(Object.keys(deadlineSortLabel) as DeadlineSort[]).map((key) => ({
            label: deadlineSortLabel[key],
            onSelect: () => set({ deadline: key }),
          })),
        ]}
        trigger={({ toggle }) => (
          <FilterChip active={filters.deadline !== null} onClick={toggle}>
            {filters.deadline ? deadlineSortLabel[filters.deadline] : 'Deadline'}
          </FilterChip>
        )}
      />

      <button
        type="button"
        onClick={() => toast('View disimpan', 'Filter saat ini tersimpan sebagai view baru.')}
        className="ml-auto cursor-pointer text-12 font-semibold text-ink underline underline-offset-2 hover:text-ink-2"
      >
        Simpan sebagai view
      </button>
    </div>
  );
}
