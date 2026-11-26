import { Checkbox, Progress } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Task } from '../data';
import { taskActions } from '../taskStore';

/** Subtask checklist with a done/total header and progress bar. */
export function SubtaskList({ task }: { task: Task }) {
  const done = task.subtasks.filter((s) => s.done).length;
  const total = task.subtasks.length;

  return (
    <section className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <h3 className="text-12 leading-none font-semibold text-ink">
          Subtask · {done}/{total}
        </h3>
        <Progress value={total ? (done / total) * 100 : 0} height={5} shape="square" className="w-[120px]" />
      </div>
      {total === 0 ? (
        <p className="py-1.5 text-13 text-faint">Belum ada subtask.</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {task.subtasks.map((s) => (
            <li key={s.id} className="flex h-7 items-center">
              <Checkbox
                checked={s.done}
                onChange={() => taskActions.toggleSubtask(task.id, s.id)}
                className="gap-2.5"
                label={<span className={cn(s.done && 'text-faint line-through')}>{s.title}</span>}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
