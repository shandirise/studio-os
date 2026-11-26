import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { onboardingSteps } from '../data';

/** Horizontal wizard progress: done = ink check, current = ink number, upcoming = outlined. */
export function OnboardingStepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-3">
      {onboardingSteps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === onboardingSteps.length - 1;
        return (
          <li key={step.id} className={cn('flex min-w-0 items-center gap-2.5', !last && 'flex-1')} aria-current={active ? 'step' : undefined}>
            <span
              className={cn(
                'flex size-[26px] shrink-0 items-center justify-center rounded-control border text-12 leading-none font-semibold',
                done || active ? 'border-ink bg-ink text-white' : 'border-line-2 bg-white text-muted',
              )}
            >
              {done ? <Check size={14} strokeWidth={3} /> : i + 1}
            </span>
            <span
              className={cn(
                'text-13 leading-none whitespace-nowrap max-sm:hidden',
                active ? 'font-semibold text-ink' : 'font-medium',
                done ? 'text-ink' : !active && 'text-muted',
              )}
            >
              {step.label}
            </span>
            {!last && <span className={cn('h-px min-w-3 flex-1', done ? 'bg-ink' : 'bg-line-2')} />}
          </li>
        );
      })}
    </ol>
  );
}
