import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type PanelHeadlineProps = {
  title: ReactNode;
  description?: ReactNode;
  /** 36px on the login/register panels, 34px on the password screens. */
  size?: 'lg' | 'md';
  className?: string;
};

/** White headline + soft grey copy on the dark auth panel. */
export function PanelHeadline({ title, description, size = 'lg', className }: PanelHeadlineProps) {
  return (
    <div className={cn('flex flex-col', size === 'lg' ? 'gap-3' : 'gap-7', className)}>
      <h2
        className={cn(
          size === 'lg' ? 'text-[36px]' : 'text-34',
          'leading-[1.15] font-bold tracking-[-0.02em] text-white',
        )}
      >
        {title}
      </h2>
      {description && <p className="text-15 leading-[1.5] text-white/70">{description}</p>}
    </div>
  );
}
