import { useState, type FormEvent } from 'react';
import { Button, Field, Input, Modal, Select, useToast } from '@/components/ui';
import { currentUser, team } from '@/data/workspace';
import type { Priority } from '@/lib/status';
import { priorities, projects, taskStatuses, type Task, type TaskStatus } from '../data';
import { taskActions } from '../taskStore';

const INTERNAL = 'internal';
const FORM_ID = 'new-task-form';

type NewTaskModalProps = {
  open: boolean;
  onClose: () => void;
  /** Preselected project (board) — omit for My Tasks. */
  projectId?: string;
  status?: TaskStatus;
  /** Task is created for the signed-in user (My Tasks). */
  mine?: boolean;
  onCreated?: (task: Task) => void;
};

type FormState = { title: string; projectId: string; status: TaskStatus; priority: Priority; deadline: string; assigneeId: string };

const myId = team.find((m) => m.name === currentUser.name)?.id ?? 'dp';

/** "Task baru" form. Render it only while open so every opening starts with a fresh form. */
export function NewTaskModal({ open, onClose, projectId, status = 'To Do', mine = false, onCreated }: NewTaskModalProps) {
  const toast = useToast();
  const [form, setForm] = useState<FormState>({
    title: '',
    projectId: projectId ?? projects[0]!.id,
    status,
    priority: 'Medium',
    deadline: '',
    assigneeId: myId,
  });
  const [error, setError] = useState<string | null>(null);
  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) {
      setError('Judul task wajib diisi');
      return;
    }
    const task = taskActions.add({
      title,
      projectId: form.projectId === INTERNAL ? null : form.projectId,
      status: form.status,
      priority: form.priority,
      deadline: form.deadline || null,
      assigneeId: form.assigneeId,
      mine: mine || form.assigneeId === myId,
    });
    toast('Task dibuat', `${task.id} · ${task.title}`);
    onCreated?.(task);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Task baru"
      subtitle="Tambahkan task ke project atau daftar Anda."
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" type="submit" form={FORM_ID}>
            Buat task
          </Button>
        </>
      }
    >
      <form id={FORM_ID} onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Judul task" required error={error} className="sm:col-span-2">
          {(id) => (
            <Input
              id={id}
              autoFocus
              value={form.title}
              invalid={!!error}
              placeholder="mis. Desain halaman Kontak"
              onChange={(e) => {
                set({ title: e.target.value });
                setError(null);
              }}
            />
          )}
        </Field>
        <Field label="Project">
          {(id) => (
            <Select
              id={id}
              value={form.projectId}
              onChange={(e) => set({ projectId: e.target.value })}
              options={[...projects.map((p) => ({ value: p.id, label: p.name })), { value: INTERNAL, label: 'Internal' }]}
            />
          )}
        </Field>
        <Field label="Status">
          {(id) => (
            <Select
              id={id}
              value={form.status}
              onChange={(e) => set({ status: e.target.value as TaskStatus })}
              options={taskStatuses}
            />
          )}
        </Field>
        <Field label="Assignee">
          {(id) => (
            <Select
              id={id}
              value={form.assigneeId}
              onChange={(e) => set({ assigneeId: e.target.value })}
              options={team.map((m) => ({ value: m.id, label: m.name }))}
            />
          )}
        </Field>
        <Field label="Prioritas">
          {(id) => (
            <Select
              id={id}
              value={form.priority}
              onChange={(e) => set({ priority: e.target.value as Priority })}
              options={priorities}
            />
          )}
        </Field>
        <Field label="Deadline" className="sm:col-span-2">
          {(id) => <Input id={id} type="date" value={form.deadline} onChange={(e) => set({ deadline: e.target.value })} />}
        </Field>
      </form>
    </Modal>
  );
}
