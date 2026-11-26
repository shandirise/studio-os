import type { ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TH } from '@/components/ui';
import { cn } from '@/lib/cn';

export type SortDirection = 'asc' | 'desc';

type SortableTHProps = {
  children: ReactNode;
  /** Current direction when this column is the sort key, otherwise null. */
  direction: SortDirection | null;
  onSort: () => void;
  align?: 'left' | 'right';
  className?: string;
};

/** Table header with a small chevron that toggles the sort order. */
export function SortableTH({ children, direction, onSort, align = 'left', className }: SortableTHProps) {
  const Icon = direction === 'asc' ? ChevronUp : ChevronDown;
  return (
    <TH align={align} className={className} aria-sort={direction ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <button
        type="button"
        onClick={onSort}
        className={cn(
          'inline-flex cursor-pointer items-center gap-1 font-semibold tracking-[inherit] hover:text-ink',
          direction && 'text-ink',
        )}
      >
        {children}
        <Icon size={12} strokeWidth={2} className={direction ? 'text-ink' : 'text-faint'} />
      </button>
    </TH>
  );
}
