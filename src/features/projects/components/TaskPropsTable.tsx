import type { ReactNode } from 'react';
import { Calendar } from 'lucide-react';
import { Avatar, Badge, Menu, Tag, Toggle } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { priorityTone } from '@/lib/status';
import { priorities, taskStatuses, taskStatusTone, type Task } from '../data';
import { formatDate } from '../format';
import { taskActions } from '../taskStore';

function PropRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[38px] items-center border-b border-line px-3 last:border-b-0">
      <span className="w-[100px] shrink-0 text-12 text-muted">{label}</span>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">{children}</div>
    </div>
  );
}

/** Key/value table at the top of the task drawer. Status and priority open a menu. */
export function TaskPropsTable({ task }: { task: Task }) {
  const assignee = memberById(task.assigneeId);

  return (
    <div className="rounded-card border border-line">
      <PropRow label="Status">
        <Menu
          align="left"
          items={taskStatuses.map((s) => ({ label: s, onSelect: () => taskActions.move(task.id, s) }))}
          trigger={({ toggle }) => (
            <button type="button" onClick={toggle} className="cursor-pointer" aria-label={`Ubah status: ${task.status}`}>
              <Badge tone={taskStatusTone[task.status]}>{task.status}</Badge>
            </button>
          )}
        />
      </PropRow>
      <PropRow label="Assignee">
        <Avatar name={assignee.name} size="xs" className="text-10" />
        <span className="text-13 text-ink">{assignee.name}</span>
      </PropRow>
      <PropRow label="Deadline">
        <Calendar size={14} className="text-muted" />
        <span className="text-13 text-ink">{task.deadline ? formatDate(task.deadline) : 'Belum ditentukan'}</span>
      </PropRow>
      <PropRow label="Prioritas">
        <Menu
          align="left"
          items={priorities.map((p) => ({ label: p, onSelect: () => taskActions.update(task.id, { priority: p }) }))}
          trigger={({ toggle }) => (
            <button type="button" onClick={toggle} className="cursor-pointer" aria-label={`Ubah prioritas: ${task.priority}`}>
              <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
            </button>
          )}
        />
      </PropRow>
      <PropRow label="Label">
        {task.labels.length > 0 ? (
          task.labels.map((label) => <Tag key={label}>{label}</Tag>)
        ) : (
          <span className="text-13 text-faint">–</span>
        )}
      </PropRow>
      <PropRow label="Terlihat klien">
        <Toggle
          checked={task.visibleToClient}
          onChange={(visibleToClient) => taskActions.update(task.id, { visibleToClient })}
          label="Terlihat klien"
        />
      </PropRow>
    </div>
  );
}
