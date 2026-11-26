import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type CellInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Text shown after the value inside the box, e.g. "%". */
  suffix?: string;
};

/** 30px right-aligned input used in the line item grid (qty, satuan, harga, diskon). */
export function CellInput({ suffix, className, ...rest }: CellInputProps) {
  return (
    <div
      className={cn(
        'flex h-[30px] shrink-0 items-center rounded-control border border-line-2 bg-white px-2 text-12 text-ink transition-colors focus-within:border-ink',
        className,
      )}
    >
      <input className="w-full min-w-0 bg-transparent text-right outline-none" {...rest} />
      {suffix && <span>{suffix}</span>}
    </div>
  );
}
