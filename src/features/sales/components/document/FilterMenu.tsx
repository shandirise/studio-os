import { FilterChip, Menu } from '@/components/ui';

export type FilterOption<T extends string = string> = { value: T; label: string };

type FilterMenuProps<T extends string> = {
  /** Chip text while nothing is selected, e.g. "Klien". */
  label: string;
  /** Menu entry that clears the filter, e.g. "Semua klien". */
  allLabel: string;
  options: FilterOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
};

/** Toolbar filter chip with a dropdown of options; the chip turns ink when a value is picked. */
export function FilterMenu<T extends string>({ label, allLabel, options, value, onChange }: FilterMenuProps<T>) {
  const selected = options.find((o) => o.value === value);

  return (
    <Menu
      align="left"
      trigger={({ open, toggle }) => (
        <FilterChip active={Boolean(selected)} aria-expanded={open} aria-haspopup="menu" onClick={toggle}>
          {selected?.label ?? label}
        </FilterChip>
      )}
      items={[
        { label: allLabel, onSelect: () => onChange(null) },
        ...options.map((o) => ({ label: o.label, onSelect: () => onChange(o.value) })),
      ]}
    />
  );
}
