import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

/** Task drawer state kept in the URL (`?task=TASK-142`) so an open task is linkable. */
export function useTaskParam() {
  const [params, setParams] = useSearchParams();
  const taskId = params.get('task');

  const openTask = useCallback(
    (id: string) =>
      setParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('task', id);
        return next;
      }),
    [setParams],
  );

  const closeTask = useCallback(
    () =>
      setParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete('task');
        return next;
      }),
    [setParams],
  );

  return { taskId, openTask, closeTask };
}
