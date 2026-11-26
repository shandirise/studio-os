import { ChevronDown, ChevronUp } from 'lucide-react';
import { TH } from '@/components/ui';
import type { SortDirection } from '../../ledgerData';

type DateSortHeaderProps = {
  direction: SortDirection;
  onToggle: () => void;
};

/** "TANGGAL ⌄" column header that flips the date order. */
export function DateSortHeader({ direction, onToggle }: DateSortHeaderProps) {
  const Chevron = direction === 'desc' ? ChevronDown : ChevronUp;
  return (
    <TH className="w-[120px]" aria-sort={direction === 'desc' ? 'descending' : 'ascending'}>
      <button type="button" onClick={onToggle} className="inline-flex cursor-pointer items-center gap-1 hover:text-ink">
        TANGGAL
        <Chevron size={12} strokeWidth={2} className="text-faint" />
      </button>
    </TH>
  );
}
