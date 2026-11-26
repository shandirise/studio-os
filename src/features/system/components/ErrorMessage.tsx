import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ErrorMessageProps = {
  /** Big status code, e.g. "404". */
  code?: string;
  title: ReactNode;
  description: ReactNode;
  /** Classes for the title (404 uses a 20px title). */
  titleClassName?: string;
  /** Classes for the description, e.g. a wider max width. */
  descriptionClassName?: string;
};

/** Code + title + description block shared by the error pages. */
export function ErrorMessage({ code, title, description, titleClassName, descriptionClassName }: ErrorMessageProps) {
  return (
    <>
      {code && <p className="text-[56px] leading-none font-bold tracking-[-0.03em] text-ink">{code}</p>}
      <h1 className={cn('text-22 leading-[1.25] font-semibold tracking-[-0.01em] text-ink', titleClassName)}>{title}</h1>
      <p className={cn('max-w-[420px] text-14 leading-[1.45] text-muted', descriptionClassName)}>{description}</p>
    </>
  );
}
