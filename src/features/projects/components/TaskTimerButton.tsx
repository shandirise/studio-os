import { Timer } from 'lucide-react';
import { useToast } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Task } from '../data';
import { formatClock, formatDuration } from '../format';
import { taskActions, useRunningTimer } from '../taskStore';

type TaskTimerButtonProps = {
  task: Task;
  /** 28px on desktop rows, 26px on mobile cards. */
  size?: 'md' | 'sm';
};

/** Start-timer icon button, or the orange running pill (click to stop) when this task's timer runs. */
export function TaskTimerButton({ task, size = 'md' }: TaskTimerButtonProps) {
  const toast = useToast();
  const timer = useRunningTimer();
  const height = size === 'md' ? 'h-7' : 'h-[26px]';

  if (timer?.taskId === task.id) {
    return (
      <button
        type="button"
        onClick={() => {
          const seconds = taskActions.stopTimer();
          toast('Waktu tercatat', `${formatDuration(seconds)} ditambahkan ke ${task.title}.`);
        }}
        aria-label={`Hentikan timer ${task.title}`}
        title="Hentikan timer"
        className={cn(
          'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-control bg-orange-soft pr-2.5 pl-2 text-12 font-semibold text-orange-strong tabular-nums hover:brightness-95',
          height,
        )}
      >
        <Timer size={14} strokeWidth={2} />
        {formatClock(timer.elapsed)}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        taskActions.startTimer(task.id);
        toast('Timer dimulai', task.title);
      }}
      aria-label={`Mulai timer ${task.title}`}
      title="Mulai timer"
      className={cn(
        'flex shrink-0 cursor-pointer items-center justify-center rounded-control border border-line-2 bg-white text-ink hover:bg-canvas',
        height,
        size === 'md' ? 'w-7' : 'w-[26px]',
      )}
    >
      <Timer size={size === 'md' ? 14 : 15} strokeWidth={size === 'md' ? 2 : 1.75} />
    </button>
  );
}
