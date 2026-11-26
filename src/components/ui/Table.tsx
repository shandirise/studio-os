import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Data table primitives. Wrap in a Card; the table scrolls horizontally on small screens.
 *
 * <Table><THead><TH>NAMA</TH></THead><tbody><TR><TD>…</TD></TR></tbody></Table>
 */
export function Table({ className, children, minWidth }: { className?: string; children: ReactNode; minWidth?: number }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse text-left" style={minWidth ? { minWidth } : undefined}>
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr className="h-9 border-b border-line bg-subtle">{children}</tr>
    </thead>
  );
}

type THProps = ThHTMLAttributes<HTMLTableCellElement> & { align?: 'left' | 'right' | 'center' };

export function TH({ align = 'left', className, ...rest }: THProps) {
  return (
    <th
      className={cn(
        'px-3 text-11-5 font-semibold tracking-[0.02em] whitespace-nowrap text-muted',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className,
      )}
      {...rest}
    />
  );
}

type TRProps = HTMLAttributes<HTMLTableRowElement> & { selected?: boolean };

export function TR({ className, selected, onClick, ...rest }: TRProps) {
  return (
    <tr
      className={cn(
        'border-b border-line last:border-b-0',
        onClick && 'cursor-pointer hover:bg-canvas',
        selected && 'bg-canvas',
        className,
      )}
      onClick={onClick}
      {...rest}
    />
  );
}

type TDProps = TdHTMLAttributes<HTMLTableCellElement> & { align?: 'left' | 'right' | 'center' };

export function TD({ align = 'left', className, ...rest }: TDProps) {
  return (
    <td
      className={cn(
        'px-3 py-2.5 text-13 leading-[1.3] text-ink',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className,
      )}
      {...rest}
    />
  );
}

type PaginationProps = {
  /** e.g. "Menampilkan 1–8 dari 1.248 kontak" */
  summary: ReactNode;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
};

/** Table footer: summary on the left, page buttons on the right. */
export function Pagination({ summary, page, pageCount, onPageChange, className }: PaginationProps) {
  const pages = buildPages(page, pageCount);
  const box =
    'flex h-[26px] min-w-[26px] cursor-pointer items-center justify-center rounded-control border px-1.5 text-12 font-semibold transition-colors';
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3 border-t border-line px-3.5 py-[9px]', className)}>
      <p className="text-12 text-muted">{summary}</p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Sebelumnya"
          className={cn(box, 'border-line-2 bg-white text-ink hover:bg-canvas')}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeft size={14} />
        </button>
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`gap-${i}`} className={cn(box, 'cursor-default border-line-2 bg-white text-ink')}>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={cn(box, p === page ? 'border-ink bg-ink text-white' : 'border-line-2 bg-white text-ink hover:bg-canvas')}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          aria-label="Berikutnya"
          className={cn(box, 'border-line-2 bg-white text-ink hover:bg-canvas')}
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function buildPages(page: number, count: number): Array<number | '…'> {
  if (count <= 5) return Array.from({ length: count }, (_, i) => i + 1);
  const head = [1, 2, 3];
  if (page <= 3) return [...head, '…', count];
  if (page >= count - 2) return [1, '…', count - 2, count - 1, count];
  return [1, '…', page, '…', count];
}
