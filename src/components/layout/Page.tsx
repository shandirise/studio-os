import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Standard page body inside the app shell.
 * Desktop: 24px / 32px padding, 20px gap. Mobile: 16px padding, 14px gap.
 */
export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex w-full flex-col gap-3.5 p-4 lg:gap-5 lg:px-8 lg:py-6', className)}>{children}</div>;
}
