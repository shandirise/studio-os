import { useState, type DragEvent } from 'react';
import { Plus } from 'lucide-react';
import { Dot } from '@/components/ui';
import { cn } from '@/lib/cn';
import { taskStatusTone, type Task, type TaskStatus } from '../data';
import { TASK_DRAG_TYPE, TaskCard } from './TaskCard';

type KanbanColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  draggingId: string | null;
  onOpenTask: (id: string) => void;
  onAddTask: (status: TaskStatus) => void;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDropTask: (id: string, status: TaskStatus) => void;
};

/** One board column: header with count and "+", then the cards. Accepts dropped cards. */
export function KanbanColumn({
  status,
  tasks,
  draggingId,
  onOpenTask,
  onAddTask,
  onDragStart,
  onDragEnd,
  onDropTask,
}: KanbanColumnProps) {
  const [over, setOver] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    if (!e.dataTransfer.types.includes(TASK_DRAG_TYPE)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setOver(false);
    const id = e.dataTransfer.getData(TASK_DRAG_TYPE);
    if (id) onDropTask(id, status);
  };

  return (
    <section
      aria-label={status}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'flex w-[275px] shrink-0 flex-col gap-2.5 rounded-card bg-gray-soft p-2.5 transition-shadow lg:w-auto lg:min-w-[240px] lg:flex-1',
        over && 'ring-2 ring-line-2 ring-inset',
      )}
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dot tone={taskStatusTone[status]} className="size-2" />
          <h2 className="text-13 leading-none font-semibold text-ink">{status}</h2>
          <span className="text-12 leading-none text-muted">{tasks.length}</span>
        </div>
        <button
          type="button"
          onClick={() => onAddTask(status)}
          aria-label={`Tambah task ke ${status}`}
          className="-m-1 flex cursor-pointer items-center justify-center rounded-control p-1 text-muted hover:bg-line hover:text-ink"
        >
          <Plus size={14} strokeWidth={2} />
        </button>
      </header>

      <div className="flex min-h-12 flex-col gap-2.5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onOpen={onOpenTask}
            dragging={draggingId === task.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </section>
  );
}
