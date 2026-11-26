import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/status';

const toneClass: Record<Tone, { box: string; dot: string }> = {
  gray: { box: 'bg-gray-soft text-gray-strong', dot: 'bg-gray' },
  blue: { box: 'bg-blue-soft text-blue-strong', dot: 'bg-blue' },
  purple: { box: 'bg-purple-soft text-purple-strong', dot: 'bg-purple' },
  orange: { box: 'bg-orange-soft text-orange-strong', dot: 'bg-orange' },
  green: { box: 'bg-green-soft text-green-strong', dot: 'bg-green' },
  red: { box: 'bg-red-soft text-red-strong', dot: 'bg-red' },
  yellow: { box: 'bg-yellow-soft text-yellow-strong', dot: 'bg-yellow' },
  dark: { box: 'bg-dark-soft text-dark-strong', dot: 'bg-dark' },
};

type BadgeProps = {
  tone?: Tone;
  /** Hide the leading status dot (used for count-like badges). */
  dot?: boolean;
  className?: string;
  children: ReactNode;
};

/** Status badge: soft background, strong text and a colored dot. */
export function Badge({ tone = 'gray', dot = true, className, children }: BadgeProps) {
  const t = toneClass[tone];
  return (
    <span
      className={cn(
        'inline-flex h-5 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-badge px-2 text-11-5 font-semibold leading-none',
        t.box,
        className,
      )}
    >
      {dot && <span className={cn('size-1.5 rounded-full', t.dot)} />}
      {children}
    </span>
  );
}

/** Small dot used on its own, e.g. kanban column headers and legends. */
export function Dot({ tone = 'gray', className }: { tone?: Tone; className?: string }) {
  return <span className={cn('inline-block size-1.5 shrink-0 rounded-full', toneClass[tone].dot, className)} />;
}
