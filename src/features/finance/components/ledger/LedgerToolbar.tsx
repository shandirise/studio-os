import type { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { Input, useToast } from '@/components/ui';

type LedgerToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  searchPlaceholder: string;
  /** Filter chips. */
  children: ReactNode;
};

/** Search field, filter chips and the "Simpan sebagai view" link above a ledger table. */
export function LedgerToolbar({ query, onQueryChange, searchPlaceholder, children }: LedgerToolbarProps) {
  const toast = useToast();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        icon={Search}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        className="w-full sm:w-[260px]"
        inputClassName="h-[30px] text-12-5"
      />
      {children}
      <button
        type="button"
        onClick={() => toast('View disimpan', 'Filter ini tersedia lagi dari menu view.')}
        className="ml-auto cursor-pointer text-12 font-semibold text-ink underline underline-offset-2 hover:text-ink-2"
      >
        Simpan sebagai view
      </button>
    </div>
  );
}
