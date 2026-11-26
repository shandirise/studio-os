import { Card } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { DealStage } from '@/lib/status';
import { openStages } from '../../dealData';
import { StepMarker, type StepState } from './StepMarker';

const steps: DealStage[] = [...openStages, 'Won'];

type DealStageCardProps = {
  stage: DealStage;
  /** Last open stage reached; drives the stepper while the deal is Lost. */
  reachedStage: DealStage;
  onSelectStage: (stage: DealStage) => void;
  properties: Array<{ label: string; value: string }>;
};

/** Stage stepper (click a step to move the deal) above a row of key properties. */
export function DealStageCard({ stage, reachedStage, onSelectStage, properties }: DealStageCardProps) {
  const currentIndex = steps.indexOf(stage === 'Lost' ? reachedStage : stage);

  const stateOf = (index: number): StepState => {
    if (index < currentIndex || (index === currentIndex && stage === 'Won')) return 'done';
    return index === currentIndex ? 'current' : 'todo';
  };

  return (
    <Card className="flex flex-col gap-3.5 p-4">
      <div className="-mx-4 overflow-x-auto px-4">
        <ol className="flex min-w-[680px]">
          {steps.map((step, i) => {
            const state = stateOf(i);
            const isLast = i === steps.length - 1;
            return (
              <li key={step} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectStage(step)}
                  disabled={step === stage}
                  aria-current={state === 'current' ? 'step' : undefined}
                  className="group flex shrink-0 cursor-pointer items-center gap-2 disabled:cursor-default"
                >
                  <StepMarker state={state} number={i + 1} />
                  <span
                    className={cn(
                      'text-12-5 leading-none whitespace-nowrap group-enabled:group-hover:underline',
                      state === 'current' ? 'font-semibold text-ink' : 'font-medium',
                      state === 'todo' ? 'text-muted' : 'text-ink',
                    )}
                  >
                    {step}
                  </span>
                </button>
                {!isLast && <span className={cn('h-px flex-1', i < currentIndex ? 'bg-ink' : 'bg-line-2')} />}
              </li>
            );
          })}
        </ol>
      </div>

      <dl className="grid grid-cols-2 gap-y-3 border-t border-line pt-3 sm:grid-cols-3 lg:grid-cols-5">
        {properties.map((p) => (
          <div key={p.label} className="flex min-w-0 flex-col gap-[3px]">
            <dt className="text-11-5 leading-none text-muted">{p.label}</dt>
            <dd className="truncate text-13-5 leading-[1.1] font-semibold text-ink">{p.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
