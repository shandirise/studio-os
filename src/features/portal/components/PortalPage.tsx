import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Body of a portal screen: a 1160px column centered under the portal header.
 * Mobile: 16px padding, 12px gap. Desktop: 32px padding, 16px gap. Pages tune gaps via className.
 */
export function PortalPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto flex w-full max-w-[1224px] flex-col gap-3 p-4 lg:gap-4 lg:px-8 lg:py-8', className)}>
      {children}
    </div>
  );
}
