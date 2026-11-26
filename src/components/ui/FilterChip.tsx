import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

type FilterChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  /** Show the dropdown chevron (default true). */
  chevron?: boolean;
  children: ReactNode;
};

/** 28px filter pill used in list toolbars ("Stage ⌄", "PIC ⌄"). Active = ink fill. */
export function FilterChip({ active, chevron = true, className, children, type = 'button', ...rest }: FilterChipProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-control border px-2.5 text-12 font-medium whitespace-nowrap transition-colors',
        active ? 'border-ink bg-ink text-white' : 'border-line-2 bg-white text-ink hover:bg-canvas',
        className,
      )}
      {...rest}
    >
      {children}
      {chevron && <ChevronDown size={14} strokeWidth={2} className={active ? 'text-white' : 'text-muted'} />}
    </button>
  );
}
