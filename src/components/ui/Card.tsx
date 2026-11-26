import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** White surface with 1px line border and 6px corners. Accepts a `ref`. */
export function Card({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cn('rounded-card border border-line bg-white', className)} {...rest} />;
}

type CardHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Right side: usually a TextLink or small buttons. */
  action?: ReactNode;
  className?: string;
};

/** Card heading row: 14px semibold title, optional 12px subtitle and right action. */
export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4 px-4 pt-3.5 pb-3', className)}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <h3 className="text-14 leading-[1.3] font-semibold text-ink">{title}</h3>
        {subtitle && <p className="text-12 leading-[1.3] text-muted">{subtitle}</p>}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  );
}
