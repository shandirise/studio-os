import { FilterChip, Menu } from '@/components/ui';

type AuditFilterMenuProps<T extends string> = {
  /** Chip text while no value is selected, e.g. "User". */
  label: string;
  /** First menu item that clears the filter, e.g. "Semua user". */
  allLabel: string;
  options: Array<{ value: T; label: string }>;
  value: T | null;
  onChange: (value: T | null) => void;
};

/** Filter chip with a dropdown of options; shows the chosen option and turns ink when active. */
export function AuditFilterMenu<T extends string>({ label, allLabel, options, value, onChange }: AuditFilterMenuProps<T>) {
  const selected = options.find((o) => o.value === value);

  return (
    <Menu
      align="left"
      items={[
        { label: allLabel, onSelect: () => onChange(null) },
        ...options.map((o) => ({ label: o.label, onSelect: () => onChange(o.value) })),
      ]}
      trigger={({ open, toggle }) => (
        <FilterChip active={!!selected} aria-expanded={open} onClick={toggle}>
          {selected?.label ?? label}
        </FilterChip>
      )}
    />
  );
}
