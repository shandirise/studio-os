import type { ReactNode } from 'react';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/cn';

type SystemPageLayoutProps = {
  /** Show the 56px logo bar (all system pages except 404). */
  brand?: boolean;
  /** Classes for the centered column, e.g. a different gap. */
  className?: string;
  children: ReactNode;
};

/** Full-page white canvas with a centered, stacked message column. */
export function SystemPageLayout({ brand = true, className, children }: SystemPageLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {brand && (
        <header className="flex h-14 shrink-0 items-center px-4 lg:px-10">
          <Logo />
        </header>
      )}
      <main className={cn('flex flex-1 flex-col items-center justify-center gap-3.5 px-5 py-10 text-center', className)}>
        {children}
      </main>
    </div>
  );
}
