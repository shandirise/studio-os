import type { ReactNode } from 'react';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/cn';

type AuthSplitLayoutProps = {
  /** Content of the dark right-hand panel (desktop only). */
  panel: ReactNode;
  /** Extra classes for the dark panel, e.g. a different gap. */
  panelClassName?: string;
  children: ReactNode;
};

/**
 * Split auth screen: 420px form column on white, dark 640px product panel on the right.
 * Below lg the panel is hidden and the form starts at the top with 20px gutters.
 */
export function AuthSplitLayout({ panel, panelClassName, children }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-dvh bg-white">
      <main className="flex min-w-0 flex-1 flex-col items-center px-5 pt-7 pb-6 lg:min-w-[516px] lg:justify-center lg:p-12">
        <div className="flex w-full max-w-[420px] flex-col gap-4 lg:gap-[18px]">
          <Logo className="mb-6 self-start" />
          {children}
        </div>
      </main>
      <aside className={cn('hidden w-[640px] min-w-0 flex-col justify-center gap-7 bg-ink p-14 lg:flex', panelClassName)}>
        {panel}
      </aside>
    </div>
  );
}
