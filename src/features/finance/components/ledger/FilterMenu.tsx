import { FilterChip, Menu } from '@/components/ui';

type FilterMenuProps = {
  /** Chip label, e.g. "Metode". */
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
};

/** Toolbar filter chip that opens a pick-one menu; the chip turns ink while a value is set. */
export function FilterMenu({ label, options, value, onChange }: FilterMenuProps) {
  return (
    <Menu
      align="left"
      items={[
        { label: `Semua ${label.toLowerCase()}`, hint: value === null ? '✓' : undefined, onSelect: () => onChange(null) },
        ...options.map((option) => ({ label: option, hint: option === value ? '✓' : undefined, onSelect: () => onChange(option) })),
      ]}
      trigger={({ open, toggle }) => (
        <FilterChip active={value !== null} onClick={toggle} aria-expanded={open}>
          {value === null ? label : `${label}: ${value}`}
        </FilterChip>
      )}
    />
  );
}
