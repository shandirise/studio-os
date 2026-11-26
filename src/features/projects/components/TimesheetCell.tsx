import { useState } from 'react';
import { cn } from '@/lib/cn';
import { formatHours, parseHours } from '../format';

type TimesheetCellProps = {
  value: number | null;
  active: boolean;
  readOnly: boolean;
  label: string;
  onActivate: () => void;
  onCommit: (value: number | null) => void;
};

/** Editable hour cell. Accepts "3,5" or "3.5"; empty or 0 clears the entry. Commits on blur / Enter. */
export function TimesheetCell({ value, active, readOnly, label, onActivate, onCommit }: TimesheetCellProps) {
  // null while not editing, so the cell always reflects the latest committed value.
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? (value === null ? '' : formatHours(value));
  const empty = text.trim() === '';

  return (
    <input
      value={text}
      readOnly={readOnly}
      inputMode="decimal"
      aria-label={label}
      placeholder="–"
      onFocus={() => {
        onActivate();
        if (!readOnly) setDraft(text);
      }}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        if (draft !== null) onCommit(parseHours(draft));
        setDraft(null);
      }}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
      className={cn(
        'h-8 w-full rounded-control border text-center text-12-5 text-ink outline-none transition-colors placeholder:text-faint',
        empty ? 'bg-subtle' : 'bg-white font-medium',
        active ? 'border-ink' : 'border-line-2',
        !readOnly && 'hover:border-faint focus:bg-white',
        readOnly && 'cursor-default text-muted',
      )}
    />
  );
}
