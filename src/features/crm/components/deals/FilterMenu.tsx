import { FilterChip, Menu } from '@/components/ui';

type FilterMenuProps<T extends string> = {
  /** Chip text when nothing is selected, e.g. "PIC". */
  label: string;
  options: Array<{ value: T; label: string }>;
  value: T;
  /** Value meaning "no filter". */
  allValue: T;
  onChange: (value: T) => void;
};

/** Filter chip that opens a dropdown of options; turns ink-filled while a value is active. */
export function FilterMenu<T extends string>({ label, options, value, allValue, onChange }: FilterMenuProps<T>) {
  const active = value !== allValue;
  const current = options.find((o) => o.value === value);

  return (
    <Menu
      align="left"
      trigger={({ toggle, open }) => (
        <FilterChip active={active} onClick={toggle} aria-expanded={open}>
          {active && current ? `${label}: ${current.label}` : label}
        </FilterChip>
      )}
      items={options.map((o) => ({ label: o.label, onSelect: () => onChange(o.value) }))}
    />
  );
}
