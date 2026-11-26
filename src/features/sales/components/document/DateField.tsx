import { Calendar } from 'lucide-react';
import { formatDate } from './format';

type DateFieldProps = {
  id?: string;
  /** ISO date, e.g. "2026-11-12". */
  value: string;
  onChange: (value: string) => void;
};

/**
 * Date control that shows "12 Nov 2026" like the design while using the
 * browser's native date picker underneath.
 */
export function DateField({ id, value, onChange }: DateFieldProps) {
  return (
    <label className="relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-control border border-line-2 bg-white px-2.5 text-13 text-ink transition-colors focus-within:border-ink">
      <Calendar size={16} className="shrink-0 text-faint" />
      <span className="truncate">{formatDate(value)}</span>
      <input
        id={id}
        type="date"
        value={value}
        required
        onChange={(e) => e.target.value && onChange(e.target.value)}
        onClick={(e) => e.currentTarget.showPicker()}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </label>
  );
}
