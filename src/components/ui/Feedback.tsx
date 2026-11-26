import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/status';

const barTone: Record<Tone | 'ink', string> = {
  ink: 'bg-ink',
  gray: 'bg-gray',
  blue: 'bg-blue',
  purple: 'bg-purple',
  orange: 'bg-orange',
  green: 'bg-green',
  red: 'bg-red',
  yellow: 'bg-yellow',
  dark: 'bg-dark',
};

type ProgressProps = {
  /** 0–100 */
  value: number;
  tone?: Tone | 'ink';
  /** Track height in px (design uses 4–10). */
  height?: number;
  /** `pill` = fully rounded (default), `square` = 2px corners as in chart-like bars. */
  shape?: 'pill' | 'square';
  /** Hide the grey track (bar-chart style rows). */
  track?: boolean;
  className?: string;
};

/** Horizontal progress bar on a line-colored track. */
export function Progress({ value, tone = 'ink', height = 6, shape = 'pill', track = true, className }: ProgressProps) {
  const radius = shape === 'pill' ? 'rounded-full' : 'rounded-[2px]';
  return (
    <div
      className={cn('w-full overflow-hidden', radius, track && 'bg-line', className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={cn('h-full', radius, barTone[tone])} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

type EmptyStateProps = {
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

/** Centered empty state with a 56px icon tile. */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center gap-2.5 p-5 text-center', className)}>
      <div className="flex size-14 items-center justify-center rounded-card border border-line bg-subtle text-muted">
        {Icon && <Icon size={22} />}
      </div>
      <p className="text-14 font-semibold text-ink">{title}</p>
      {description && <p className="text-12 leading-[1.3] text-muted">{description}</p>}
      {action}
    </div>
  );
}

/** Loading placeholder bar. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('h-2.5 animate-pulse rounded-[2px] bg-subtle', className)} />;
}

/** Keyboard hint, e.g. "Ctrl K". */
export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'inline-flex h-[17px] items-center rounded-badge border border-line-2 bg-white px-1.5 font-sans text-10-5 font-medium text-muted',
        className,
      )}
    >
      {children}
    </kbd>
  );
}
