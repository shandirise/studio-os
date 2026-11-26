import type { ReactNode } from 'react';
import { Card } from '@/components/ui';
import { cn } from '@/lib/cn';

type SettingsSectionProps = {
  title: ReactNode;
  description?: ReactNode;
  /** Right side of the heading row. */
  action?: ReactNode;
  /** Red title, used by "Zona bahaya". */
  danger?: boolean;
  className?: string;
  children?: ReactNode;
};

/** White settings card: 14.5px title, optional description, 16px gap between rows. */
export function SettingsSection({ title, description, action, danger, className, children }: SettingsSectionProps) {
  return (
    <Card className={cn('flex min-w-0 flex-col gap-4 p-4 lg:p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <h2 className={cn('text-[14.5px] leading-[1.2] font-semibold', danger ? 'text-danger' : 'text-ink')}>{title}</h2>
          {description && <p className="text-12-5 leading-[1.3] text-muted">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}
