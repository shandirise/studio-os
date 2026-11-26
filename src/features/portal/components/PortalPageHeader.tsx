import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type PortalPageHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Status badge: inline after the title on desktop, right-aligned on mobile. */
  badge?: ReactNode;
  /** Right side (buttons, progress…). Shown on every breakpoint; hide parts with classes. */
  action?: ReactNode;
  /** Mobile title size differs per screen (18px documents, 20px lists). */
  titleClassName?: string;
  className?: string;
};

/** Screen title row used by the project, quotation, invoice and file screens. */
export function PortalPageHeader({ title, subtitle, badge, action, titleClassName, className }: PortalPageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <div className="flex min-w-0 flex-col gap-[3px] lg:gap-1">
        <div className="flex items-center gap-2.5">
          <h1
            className={cn(
              'truncate text-18 leading-[1.1] font-semibold text-ink lg:text-24 lg:leading-[1.2] lg:tracking-[-0.01em]',
              titleClassName,
            )}
          >
            {title}
          </h1>
          {badge && <span className="max-lg:hidden">{badge}</span>}
        </div>
        {subtitle && <p className="text-12 leading-none text-muted lg:text-13">{subtitle}</p>}
      </div>
      {badge && <span className="lg:hidden">{badge}</span>}
      {action}
    </div>
  );
}
