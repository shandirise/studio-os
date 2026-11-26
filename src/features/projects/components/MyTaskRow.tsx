import { Calendar } from 'lucide-react';
import { Checkbox, Tag } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Task } from '../data';
import { formatDayMonth } from '../format';
import { projectName } from '../taskStore';
import { PriorityBadge } from './PriorityBadge';
import { TaskTimerButton } from './TaskTimerButton';

type MyTaskRowProps = {
  task: Task;
  late: boolean;
  onToggleDone: (task: Task, done: boolean) => void;
  onOpen: (id: string) => void;
};

/** Desktop My Tasks row: checkbox, title, project, deadline, priority and timer. */
export function MyTaskRow({ task, late, onToggleDone, onOpen }: MyTaskRowProps) {
  const done = task.status === 'Done';

  return (
    <li className="flex h-[46px] items-center gap-3 border-b border-line px-3.5 last:border-b-0">
      <Checkbox checked={done} onChange={(checked) => onToggleDone(task, checked)} ariaLabel={`Tandai selesai: ${task.title}`} />
      <button
        type="button"
        onClick={() => onOpen(task.id)}
        className={cn(
          'h-full min-w-0 flex-1 cursor-pointer truncate text-left text-13-5 font-medium hover:underline',
          done ? 'text-faint line-through' : 'text-ink',
        )}
      >
        {task.title}
      </button>
      <Tag>{projectName(task.projectId)}</Tag>
      <span className={cn('flex w-[90px] shrink-0 items-center gap-[5px] text-12', late ? 'font-semibold text-danger' : 'text-muted')}>
        <Calendar size={13} />
        {task.deadline ? formatDayMonth(task.deadline) : '–'}
      </span>
      <span className="w-[70px] shrink-0">
        <PriorityBadge priority={task.priority} />
      </span>
      <TaskTimerButton task={task} />
    </li>
  );
}
