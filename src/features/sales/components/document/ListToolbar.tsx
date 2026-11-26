import type { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui';

type ListToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;
  /** Filter chips. */
  children: ReactNode;
  onSaveView: () => void;
};

/** Search box + filter chips + "Simpan sebagai view" above document tables. */
export function ListToolbar({ query, onQueryChange, placeholder, children, onSaveView }: ListToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        type="search"
        icon={Search}
        placeholder={placeholder}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full sm:w-[260px]"
        inputClassName="h-[30px] text-12-5"
        aria-label={placeholder}
      />
      {children}
      <button
        type="button"
        onClick={onSaveView}
        className="ml-auto cursor-pointer text-12 font-semibold text-ink underline underline-offset-2 hover:text-ink-2"
      >
        Simpan sebagai view
      </button>
    </div>
  );
}
