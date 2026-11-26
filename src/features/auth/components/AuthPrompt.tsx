import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Centered "question + underlined action" line, e.g. "Belum punya akun? Daftar".
 * Pass the action as a TextLink (navigation) or InlineAction (button).
 */
export function AuthPrompt({ text, action, className }: { text: ReactNode; action: ReactNode; className?: string }) {
  return (
    <p className={cn('flex flex-wrap items-center justify-center gap-1.5 text-13 leading-none text-muted', className)}>
      {text}
      {action}
    </p>
  );
}
