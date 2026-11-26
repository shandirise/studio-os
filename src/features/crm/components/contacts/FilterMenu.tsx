import { Check } from 'lucide-react';
import { FilterChip, Menu } from '@/components/ui';

export type FilterOption<T extends string> = { value: T; label: string };

type FilterMenuProps<T extends string> = {
  label: string;
  /** First menu item, clears the filter (e.g. "Semua stage"). */
  allLabel: string;
  options: Array<FilterOption<T>>;
  value: T | null;
  onChange: (value: T | null) => void;
};

/** Toolbar filter chip with a dropdown of options. Active chips show the chosen value. */
export function FilterMenu<T extends string>({ label, allLabel, options, value, onChange }: FilterMenuProps<T>) {
  const selected = options.find((o) => o.value === value);

  return (
    <Menu
      align="left"
      trigger={({ toggle }) => (
        <FilterChip active={Boolean(selected)} onClick={toggle}>
          {selected ? `${label}: ${selected.label}` : label}
        </FilterChip>
      )}
      items={[
        { label: allLabel, icon: selected ? undefined : Check, onSelect: () => onChange(null) },
        ...options.map((o) => ({
          label: o.label,
          icon: o.value === value ? Check : undefined,
          onSelect: () => onChange(o.value),
        })),
      ]}
    />
  );
}
