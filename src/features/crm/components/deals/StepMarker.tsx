import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export type StepState = 'done' | 'current' | 'todo';

/** 22px numbered step box: ink with a check when done, ink with the number when current, outlined when upcoming. */
export function StepMarker({ state, number }: { state: StepState; number: number }) {
  return (
    <span
      className={cn(
        'flex size-[22px] shrink-0 items-center justify-center rounded-control text-11 leading-none font-semibold',
        state === 'todo' ? 'border border-line-2 bg-white text-muted' : 'bg-ink text-white',
      )}
    >
      {state === 'done' ? <Check size={12} strokeWidth={2.5} absoluteStrokeWidth={false} /> : number}
    </span>
  );
}
