import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs, type Crumb } from '@/components/layout/PageMeta';
import { Button, PageHeader, SectionLabel, Segmented, useToast } from '@/components/ui';
import { cn } from '@/lib/cn';
import { MyTaskCard } from '../components/MyTaskCard';
import { MyTaskGroup } from '../components/MyTaskGroup';
import { NewTaskModal } from '../components/NewTaskModal';
import { TaskDrawer } from '../components/TaskDrawer';
import {
  END_OF_WEEK,
  myTasksGroupingOptions,
  timeBuckets,
  TODAY,
  type MyTasksGrouping,
  type Task,
  type TimeBucket,
} from '../data';
import { projectName, taskActions, useTasks } from '../taskStore';
import { useTaskParam } from '../useTaskParam';

type TaskGroup = { key: string; label: string; danger: boolean; tasks: Task[] };

function timeBucket(task: Task): TimeBucket {
  if (!task.deadline) return 'none';
  if (task.deadline < TODAY) return 'late';
  if (task.deadline === TODAY) return 'today';
  return task.deadline <= END_OF_WEEK ? 'week' : 'later';
}

const isLate = (task: Task) => task.status !== 'Done' && timeBucket(task) === 'late';
const byDeadline = (a: Task, b: Task) => (a.deadline ?? '9999').localeCompare(b.deadline ?? '9999');

function groupTasks(tasks: Task[], grouping: MyTasksGrouping): TaskGroup[] {
  const sorted = [...tasks].sort(byDeadline);
  if (grouping === 'project') {
    const groups = new Map<string, TaskGroup>();
    for (const task of sorted) {
      const key = task.projectId ?? 'internal';
      const group = groups.get(key) ?? { key, label: projectName(task.projectId), danger: false, tasks: [] };
      group.tasks.push(task);
      groups.set(key, group);
    }
    return [...groups.values()];
  }
  return timeBuckets
    .map(({ key, label }) => ({ key, label, danger: key === 'late', tasks: sorted.filter((t) => timeBucket(t) === key) }))
    .filter((g) => g.tasks.length > 0);
}

/** E4 · My Tasks — grouped list on desktop, card list on mobile. Tasks open the shared task drawer. */
export function MyTasksPage() {
  const toast = useToast();
  const allTasks = useTasks();
  const { taskId, openTask, closeTask } = useTaskParam();
  const [grouping, setGrouping] = useState<MyTasksGrouping>('time');
  const [creating, setCreating] = useState(false);

  const myTasks = useMemo(() => allTasks.filter((t) => t.mine), [allTasks]);
  const groups = useMemo(() => groupTasks(myTasks, grouping), [myTasks, grouping]);
  const timeGroups = useMemo(() => groupTasks(myTasks, 'time'), [myTasks]);
  const lateCount = myTasks.filter(isLate).length;
  const openedTask = allTasks.find((t) => t.id === taskId);

  const crumbs: Crumb[] = openedTask
    ? [{ label: 'My Tasks', to: '/my-tasks' }, { label: openedTask.title }]
    : [{ label: 'My Tasks' }];
  useBreadcrumbs(crumbs);

  const toggleDone = (task: Task, done: boolean) => {
    taskActions.setDone(task.id, done);
    toast(done ? 'Task selesai' : 'Task dibuka kembali', task.title);
  };

  return (
    <Page className="max-lg:gap-3">
      <PageHeader
        title="My Tasks"
        subtitle={
          <>
            <span className="max-lg:hidden">{myTasks.length} task di-assign ke Anda</span>
            <span className="lg:hidden">{myTasks.length} task</span> · {lateCount} terlambat
          </>
        }
        className="max-lg:[&_h1]:text-20 max-lg:[&_p]:text-12-5"
        actions={
          <div className="flex items-center gap-2 max-lg:hidden">
            <Segmented options={myTasksGroupingOptions} value={grouping} onChange={setGrouping} />
            <Button variant="primary" icon={Plus} onClick={() => setCreating(true)}>
              Task
            </Button>
          </div>
        }
      />

      {/* Desktop */}
      <div className="flex flex-col gap-3.5 max-lg:hidden">
        {groups.map((g) => (
          <MyTaskGroup
            key={`${grouping}-${g.key}`}
            label={g.label}
            danger={g.danger}
            tasks={g.tasks}
            isLate={isLate}
            onToggleDone={toggleDone}
            onOpenTask={openTask}
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-3 lg:hidden">
        {timeGroups.map((g) => (
          <section key={g.key} className="flex flex-col gap-3">
            <SectionLabel className={cn(g.danger && 'text-danger')}>{g.label}</SectionLabel>
            {g.tasks.map((task) => (
              <MyTaskCard key={task.id} task={task} late={isLate(task)} onToggleDone={toggleDone} onOpen={openTask} />
            ))}
          </section>
        ))}
      </div>

      {creating && <NewTaskModal open mine onClose={() => setCreating(false)} />}
      <TaskDrawer taskId={taskId} onClose={closeTask} onOpenTask={openTask} />
    </Page>
  );
}
