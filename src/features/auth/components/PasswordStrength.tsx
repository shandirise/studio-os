import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { passwordStrength } from '../password';

type PasswordStrengthProps = {
  password: string;
  /** Optional requirement hint on the right of the label. */
  hint?: ReactNode;
};

/** Four-segment strength meter with "Kekuatan: …" label, updated live. */
export function PasswordStrength({ password, hint }: PasswordStrengthProps) {
  const { score, label } = passwordStrength(password);

  return (
    <div className="flex flex-col gap-2" aria-live="polite">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((segment) => (
          <span key={segment} className={cn('h-1 flex-1 rounded-[2px]', segment <= score ? 'bg-ink' : 'bg-line')} />
        ))}
      </div>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
        <span className="text-12 leading-none font-semibold text-ink">Kekuatan: {label}</span>
        {hint && <span className="text-11-5 leading-none text-muted">{hint}</span>}
      </div>
    </div>
  );
}
