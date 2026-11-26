import { useEffect, useState, useSyncExternalStore } from 'react';
import { currentUser, team } from '@/data/workspace';
import type { Priority } from '@/lib/status';
import { initialTasks, initialTimer, projects, type Task, type TaskStatus } from './data';

/**
 * Client-side task store shared by the project board, My Tasks and the task drawer,
 * so a change in one place (moving a card, ticking a subtask, the running timer) shows everywhere.
 */
type Timer = { taskId: string; startedAt: number };
type State = { tasks: Task[]; timer: Timer | null };

let state: State = {
  tasks: initialTasks,
  timer: { taskId: initialTimer.taskId, startedAt: Date.now() - initialTimer.elapsedSeconds * 1000 },
};

const listeners = new Set<() => void>();

function setState(update: (s: State) => State) {
  state = update(state);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function updateTask(id: string, update: (task: Task) => Task) {
  setState((s) => ({ ...s, tasks: s.tasks.map((t) => (t.id === id ? update(t) : t)) }));
}

const currentUserId = team.find((m) => m.name === currentUser.name)?.id ?? 'dp';
const elapsedSince = (startedAt: number) => Math.max(0, Math.floor((Date.now() - startedAt) / 1000));

/** Adds the running timer's elapsed time to its task and clears it. */
function stopRunningTimer(s: State): State {
  if (!s.timer) return s;
  const { taskId, startedAt } = s.timer;
  const elapsed = elapsedSince(startedAt);
  return {
    timer: null,
    tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, loggedSeconds: t.loggedSeconds + elapsed } : t)),
  };
}

type NewTask = {
  title: string;
  projectId: string | null;
  status: TaskStatus;
  priority: Priority;
  deadline: string | null;
  assigneeId: string;
  mine: boolean;
};

export const taskActions = {
  move(id: string, status: TaskStatus) {
    setState((s) => {
      const task = s.tasks.find((t) => t.id === id);
      if (!task || task.status === status) return s;
      // Re-append so the card lands at the bottom of its new column.
      return { ...s, tasks: [...s.tasks.filter((t) => t.id !== id), { ...task, status }] };
    });
  },
  setDone(id: string, done: boolean) {
    updateTask(id, (t) => ({ ...t, status: done ? 'Done' : 'To Do' }));
  },
  update(id: string, patch: Partial<Pick<Task, 'description' | 'visibleToClient' | 'priority'>>) {
    updateTask(id, (t) => ({ ...t, ...patch }));
  },
  toggleSubtask(id: string, subtaskId: string) {
    updateTask(id, (t) => ({
      ...t,
      subtasks: t.subtasks.map((s) => (s.id === subtaskId ? { ...s, done: !s.done } : s)),
    }));
  },
  addComment(id: string, body: string) {
    updateTask(id, (t) => ({
      ...t,
      comments: [...t.comments, { id: `c-${Date.now()}`, authorId: currentUserId, time: 'Baru saja', body }],
    }));
  },
  add(input: NewTask): Task {
    const nextNumber = Math.max(...state.tasks.map((t) => Number(t.id.replace('TASK-', '')))) + 1;
    const task: Task = {
      ...input,
      id: `TASK-${nextNumber}`,
      labels: [],
      description: '',
      subtasks: [],
      comments: [],
      attachments: 0,
      loggedSeconds: 0,
      visibleToClient: false,
    };
    setState((s) => ({ ...s, tasks: [...s.tasks, task] }));
    return task;
  },
  duplicate(id: string): Task | undefined {
    const source = state.tasks.find((t) => t.id === id);
    if (!source) return undefined;
    return taskActions.add({ ...source, title: `${source.title} (salinan)` });
  },
  logTime(id: string, seconds: number) {
    updateTask(id, (t) => ({ ...t, loggedSeconds: t.loggedSeconds + seconds }));
  },
  /** Starts the timer on a task; a timer running elsewhere is stopped and logged first. */
  startTimer(id: string) {
    setState((s) => ({ ...stopRunningTimer(s), timer: { taskId: id, startedAt: Date.now() } }));
  },
  /** Stops the timer and returns the seconds that were logged. */
  stopTimer(): number {
    const elapsed = state.timer ? elapsedSince(state.timer.startedAt) : 0;
    setState(stopRunningTimer);
    return elapsed;
  },
};

export function useTasks(): Task[] {
  return useSyncExternalStore(subscribe, () => state.tasks);
}

export function useTask(id: string | null): Task | undefined {
  const tasks = useTasks();
  return id ? tasks.find((t) => t.id === id) : undefined;
}

/** Running timer as `{ taskId, elapsed }`; `elapsed` ticks every second. */
export function useRunningTimer(): { taskId: string; elapsed: number } | null {
  const timer = useSyncExternalStore(subscribe, () => state.timer);
  const [, tick] = useState(0);

  useEffect(() => {
    if (!timer) return;
    const id = window.setInterval(() => tick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, [timer]);

  return timer ? { taskId: timer.taskId, elapsed: elapsedSince(timer.startedAt) } : null;
}

export function projectName(projectId: string | null): string {
  return projects.find((p) => p.id === projectId)?.name ?? 'Internal';
}
