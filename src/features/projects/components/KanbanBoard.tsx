import { useState } from 'react';
import { useToast } from '@/components/ui';
import { boardColumns, type Task, type TaskStatus } from '../data';
import { taskActions } from '../taskStore';
import { KanbanColumn } from './KanbanColumn';

type KanbanBoardProps = {
  tasks: Task[];
  onOpenTask: (id: string) => void;
  onAddTask: (status: TaskStatus) => void;
};

/** Task board with drag-and-drop between status columns (native HTML5 drag events). */
export function KanbanBoard({ tasks, onOpenTask, onAddTask }: KanbanBoardProps) {
  const toast = useToast();
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDrop = (id: string, status: TaskStatus) => {
    const task = tasks.find((t) => t.id === id);
    setDraggingId(null);
    if (!task || task.status === status) return;
    taskActions.move(id, status);
    toast('Task dipindahkan', `${task.title} → ${status}`);
  };

  return (
    <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 lg:mx-0 lg:min-h-0 lg:flex-1 lg:px-0 lg:pb-0">
      {boardColumns.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          draggingId={draggingId}
          onOpenTask={onOpenTask}
          onAddTask={onAddTask}
          onDragStart={setDraggingId}
          onDragEnd={() => setDraggingId(null)}
          onDropTask={handleDrop}
        />
      ))}
    </div>
  );
}
