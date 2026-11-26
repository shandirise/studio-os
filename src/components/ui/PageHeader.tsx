import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type PageHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Right-aligned actions (buttons, segmented control…). */
  actions?: ReactNode;
  /** Extra inline content after the title, e.g. a status badge. */
  titleAddon?: ReactNode;
  className?: string;
};

/** Page title (22px semibold) with subtitle and actions. */
export function PageHeader({ title, subtitle, actions, titleAddon, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-4', className)}>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-22 leading-[1.2] font-semibold tracking-[-0.01em] text-ink">{title}</h1>
          {titleAddon}
        </div>
        {subtitle && <p className="text-13 leading-[1.3] text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Small caps group label, e.g. "HARI INI", "KONTAK ANDA". */
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-10-5 leading-none font-semibold tracking-[0.08em] text-faint uppercase', className)}>{children}</p>
  );
}
