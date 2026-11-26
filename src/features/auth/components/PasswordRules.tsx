import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { passwordRules } from '../password';

/** Live requirement checklist: green check when met, faint when not. */
export function PasswordRules({ password }: { password: string }) {
  return (
    <ul className="flex flex-col gap-[18px]">
      {passwordRules.map((rule) => {
        const met = rule.test(password);
        return (
          <li key={rule.label} className="flex items-center gap-2 text-12-5 leading-none text-muted">
            <Check size={12} strokeWidth={3} className={cn('shrink-0', met ? 'text-green-strong' : 'text-line-2')} />
            <span className={cn(!met && 'text-faint')}>{rule.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
