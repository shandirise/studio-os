import { Calendar, ChevronDown } from 'lucide-react';
import { addDays, daysBetween, formatDate } from '@/features/sales/components/document';

type DueTermSelectProps = {
  id?: string;
  issueDate: string;
  dueDate: string;
  onChange: (dueDate: string) => void;
};

const NET_TERMS = [7, 14, 30, 45];

/** "Jatuh tempo" as payment terms: "Net 14 · 03 Des 2026". */
export function DueTermSelect({ id, issueDate, dueDate, onChange }: DueTermSelectProps) {
  const current = daysBetween(issueDate, dueDate);
  const terms = NET_TERMS.includes(current) ? NET_TERMS : [...NET_TERMS, current].sort((a, b) => a - b);

  return (
    <div className="relative flex items-center">
      <Calendar size={16} className="pointer-events-none absolute left-2.5 text-faint" />
      <select
        id={id}
        value={current}
        onChange={(e) => onChange(addDays(issueDate, Number(e.target.value)))}
        className="h-9 w-full cursor-pointer appearance-none truncate rounded-control border border-line-2 bg-white pr-7 pl-[35px] text-13 text-ink outline-none transition-colors focus:border-ink"
      >
        {terms.map((days) => (
          <option key={days} value={days}>
            {days === 0 ? 'Saat terbit' : `Net ${days}`} · {formatDate(addDays(issueDate, days))}
          </option>
        ))}
      </select>
      <ChevronDown size={14} strokeWidth={2} className="pointer-events-none absolute right-2.5 text-muted" />
    </div>
  );
}
