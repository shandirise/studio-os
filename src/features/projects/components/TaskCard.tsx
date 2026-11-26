import type { DragEvent, ReactNode } from 'react';
import { Check, MessageSquare, Paperclip, type LucideIcon } from 'lucide-react';
import { Avatar, Tag } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { cn } from '@/lib/cn';
import type { Task } from '../data';
import { formatDayMonth } from '../format';
import { PriorityBadge } from './PriorityBadge';

/** Drag payload type used between cards and columns. */
export const TASK_DRAG_TYPE = 'text/x-studio-task';

function MetaCount({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <span className="flex items-center gap-[3px]">
      <Icon size={12} strokeWidth={2} />
      {children}
    </span>
  );
}

type TaskCardProps = {
  task: Task;
  onOpen: (id: string) => void;
  dragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
};

/** Kanban card: label + priority, title, subtask / comment / attachment counts, deadline and assignee. */
export function TaskCard({ task, onOpen, dragging, onDragStart, onDragEnd }: TaskCardProps) {
  const doneSubtasks = task.subtasks.filter((s) => s.done).length;
  const assignee = memberById(task.assigneeId);

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    e.dataTransfer.setData(TASK_DRAG_TYPE, task.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(task.id);
  };

  return (
    <button
      type="button"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(task.id)}
      className={cn(
        'flex w-full shrink-0 cursor-pointer flex-col gap-2.5 rounded-card border border-line bg-white p-3 text-left transition-colors hover:border-line-2 active:cursor-grabbing',
        dragging && 'opacity-40',
      )}
    >
      <div className="flex flex-wrap gap-1.5">
        {task.labels[0] && <Tag>{task.labels[0]}</Tag>}
        <PriorityBadge priority={task.priority} />
      </div>

      <p className="text-13 leading-[1.3] font-semibold text-ink">{task.title}</p>

      <div className="flex h-[22px] items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 text-11 leading-none text-muted">
          {task.subtasks.length > 0 && (
            <MetaCount icon={Check}>
              {doneSubtasks}/{task.subtasks.length}
            </MetaCount>
          )}
          {task.comments.length > 0 && <MetaCount icon={MessageSquare}>{task.comments.length}</MetaCount>}
          {task.attachments > 0 && <MetaCount icon={Paperclip}>{task.attachments}</MetaCount>}
        </div>
        <div className="flex items-center gap-2">
          {task.deadline && <span className="text-11 text-muted">{formatDayMonth(task.deadline)}</span>}
          <Avatar name={assignee.name} size="xs" className="text-10" />
        </div>
      </div>
    </button>
  );
}
