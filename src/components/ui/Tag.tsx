import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Neutral label chip, e.g. "VIP", "Referral". */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-[19px] shrink-0 items-center whitespace-nowrap rounded-badge border border-line bg-subtle px-[7px] text-11 font-medium leading-none text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
