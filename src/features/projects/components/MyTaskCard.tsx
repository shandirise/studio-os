import { Checkbox, Card } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Task } from '../data';
import { formatDayMonth } from '../format';
import { projectName } from '../taskStore';
import { PriorityBadge } from './PriorityBadge';
import { TaskTimerButton } from './TaskTimerButton';

type MyTaskCardProps = {
  task: Task;
  late: boolean;
  onToggleDone: (task: Task, done: boolean) => void;
  onOpen: (id: string) => void;
};

/** Mobile My Tasks card. */
export function MyTaskCard({ task, late, onToggleDone, onOpen }: MyTaskCardProps) {
  const done = task.status === 'Done';

  return (
    <Card className="flex flex-col gap-2 p-3">
      <div className="flex gap-2.5">
        <Checkbox checked={done} onChange={(checked) => onToggleDone(task, checked)} ariaLabel={`Tandai selesai: ${task.title}`} />
        <button type="button" onClick={() => onOpen(task.id)} className="flex min-w-0 flex-1 cursor-pointer flex-col gap-[3px] text-left">
          <span className={cn('text-13-5 leading-[1.25] font-semibold', done ? 'text-faint line-through' : 'text-ink')}>
            {task.title}
          </span>
          <span className="text-12 leading-none text-muted">{projectName(task.projectId)}</span>
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <span className={cn('text-12', late ? 'text-danger' : 'text-muted')}>
            {task.deadline ? formatDayMonth(task.deadline) : 'Tanpa deadline'}
          </span>
        </div>
        <TaskTimerButton task={task} size="sm" />
      </div>
    </Card>
  );
}
