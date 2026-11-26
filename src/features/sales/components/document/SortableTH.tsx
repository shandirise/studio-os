import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TH } from '@/components/ui';
import { cn } from '@/lib/cn';

export type SortState<K extends string> = { key: K; direction: 'asc' | 'desc' };

/** Sort state for a table; clicking the active column flips the direction. */
export function useSort<K extends string>(initial: SortState<K>) {
  const [sort, setSort] = useState(initial);
  const toggle = (key: K) =>
    setSort((s) => (s.key === key ? { key, direction: s.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'desc' }));
  return [sort, toggle] as const;
}

type SortableTHProps<K extends string> = {
  label: string;
  column: K;
  sort: SortState<K>;
  onSort: (column: K) => void;
  align?: 'left' | 'right';
  className?: string;
};

/** Table header cell with a sort chevron ("NOMOR ⌄", "TOTAL ⌄"). */
export function SortableTH<K extends string>({ label, column, sort, onSort, align, className }: SortableTHProps<K>) {
  const active = sort.key === column;
  const Icon = active && sort.direction === 'asc' ? ChevronUp : ChevronDown;

  return (
    <TH
      align={align}
      className={className}
      aria-sort={active ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined}
    >
      <button
        type="button"
        onClick={() => onSort(column)}
        className={cn('inline-flex cursor-pointer items-center gap-1 hover:text-ink', active && 'text-ink-2')}
      >
        {label}
        <Icon size={12} strokeWidth={2.25} />
      </button>
    </TH>
  );
}
