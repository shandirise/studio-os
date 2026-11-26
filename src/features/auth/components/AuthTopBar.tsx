import type { ReactNode } from 'react';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/cn';

type AuthTopBarProps = {
  /** Right-aligned content, e.g. wizard progress. */
  children?: ReactNode;
  /** White bar with a bottom hairline (onboarding) instead of a bare logo row. */
  bordered?: boolean;
};

/** 56px header with the Studio OS logo for full-width auth screens. */
export function AuthTopBar({ children, bordered }: AuthTopBarProps) {
  return (
    <header
      className={cn(
        'flex h-14 shrink-0 items-center justify-between gap-4 px-4 lg:px-10',
        bordered && 'border-b border-line bg-white',
      )}
    >
      <Logo />
      {children}
    </header>
  );
}
