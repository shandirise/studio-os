import { cn } from '@/lib/cn';
import { StepMarker } from '../deals/StepMarker';

const steps = ['Upload', 'Mapping kolom', 'Preview & validasi', 'Hasil'];

/** Four-step progress for the CSV import; `current` is the zero-based active step. */
export function ImportStepper({ current }: { current: number }) {
  return (
    <ol className="flex min-w-[560px] items-center gap-2">
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo';
        const isLast = i === steps.length - 1;
        return (
          <li key={label} className={cn('flex items-center gap-2', !isLast && 'flex-1')}>
            <StepMarker state={state} number={i + 1} />
            <span
              className={cn(
                'text-12-5 leading-none whitespace-nowrap',
                state === 'current' ? 'font-semibold' : 'font-medium',
                state === 'todo' ? 'text-muted' : 'text-ink',
              )}
            >
              {label}
            </span>
            {!isLast && <span className={cn('h-px flex-1', i < current ? 'bg-ink' : 'bg-line-2')} />}
          </li>
        );
      })}
    </ol>
  );
}
