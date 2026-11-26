import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Task } from '../data';
import { MyTaskRow } from './MyTaskRow';

type MyTaskGroupProps = {
  label: string;
  /** Red heading, used for "Terlambat". */
  danger?: boolean;
  tasks: Task[];
  isLate: (task: Task) => boolean;
  onToggleDone: (task: Task, done: boolean) => void;
  onOpenTask: (id: string) => void;
};

/** Collapsible group card on the desktop My Tasks list. */
export function MyTaskGroup({ label, danger, tasks, isLate, onToggleDone, onOpenTask }: MyTaskGroupProps) {
  const [open, setOpen] = useState(true);

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          'flex h-[34px] w-full cursor-pointer items-center gap-2 bg-subtle px-3.5 text-left',
          open && 'border-b border-line',
        )}
      >
        <ChevronDown size={14} strokeWidth={2} className={cn('text-muted transition-transform', !open && '-rotate-90')} />
        <span className={cn('text-12-5 font-semibold', danger ? 'text-danger' : 'text-ink')}>{label}</span>
        <span className="text-12 text-muted">{tasks.length}</span>
      </button>
      {open && (
        <ul>
          {tasks.map((task) => (
            <MyTaskRow key={task.id} task={task} late={isLate(task)} onToggleDone={onToggleDone} onOpen={onOpenTask} />
          ))}
        </ul>
      )}
    </Card>
  );
}
