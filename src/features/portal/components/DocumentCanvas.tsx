import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Desktop: grey "desk" filling the rest of the viewport with a 560px sheet centered on it.
 * Mobile: the sheet simply takes the full column width.
 */
export function DocumentCanvas({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('min-w-0 lg:flex lg:min-h-[calc(100dvh-186px)] lg:justify-center lg:rounded-card lg:bg-gray-soft lg:py-6', className)}>
      <div className="w-full lg:max-w-[560px] lg:self-start">{children}</div>
    </div>
  );
}
