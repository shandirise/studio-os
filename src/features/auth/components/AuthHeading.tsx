import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type AuthHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

/** Form title (26px, 24px on mobile) with a muted 14px description. */
export function AuthHeading({ title, description, className }: AuthHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <h1 className="text-24 leading-[1.2] font-semibold tracking-[-0.015em] text-ink lg:text-[26px]">{title}</h1>
      {description && <p className="text-14 leading-[1.45] text-muted">{description}</p>}
    </div>
  );
}
