import { useRef } from 'react';
import { Archive, Copy, Ellipsis, Link as LinkIcon, Trash2, X } from 'lucide-react';
import { Drawer, Field, IconButton, Menu, Textarea, useToast } from '@/components/ui';
import { taskActions, useTask } from '../taskStore';
import { CommentComposer } from './CommentComposer';
import { CommentList } from './CommentList';
import { SubtaskList } from './SubtaskList';
import { TaskPropsTable } from './TaskPropsTable';
import { TaskTimer } from './TaskTimer';

type TaskDrawerProps = {
  /** Task to show; the drawer is closed when null or unknown. */
  taskId: string | null;
  onClose: () => void;
  /** Opens another task (used after duplicating). */
  onOpenTask: (id: string) => void;
};

/** E3 · Task detail drawer (600px): properties, description, subtasks, timer and comments. */
export function TaskDrawer({ taskId, onClose, onOpenTask }: TaskDrawerProps) {
  const toast = useToast();
  const task = useTask(taskId);
  const bodyRef = useRef<HTMLDivElement>(null);

  if (!task) return null;

  const copyLink = () => {
    void navigator.clipboard?.writeText(window.location.href);
    toast('Link task disalin', task.id);
  };

  const postComment = (body: string) => {
    taskActions.addComment(task.id, body);
    // Reveal the new comment once it has rendered.
    requestAnimationFrame(() => bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' }));
  };

  const duplicate = () => {
    const copy = taskActions.duplicate(task.id);
    if (!copy) return;
    toast('Task diduplikat', `${copy.id} · ${copy.title}`);
    onOpenTask(copy.id);
  };

  return (
    <Drawer open onClose={onClose} width={600}>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-line px-5">
        <button
          type="button"
          onClick={copyLink}
          className="flex cursor-pointer items-center gap-2 text-12 font-semibold text-muted hover:text-ink"
          aria-label={`Salin link ${task.id}`}
        >
          {task.id}
          <LinkIcon size={14} className="text-faint" />
        </button>
        <div className="flex items-center gap-1.5">
          <IconButton icon={Copy} label="Duplikat task" variant="ghost" size="sm" onClick={duplicate} />
          <Menu
            items={[
              { label: 'Salin link', icon: LinkIcon, onSelect: copyLink },
              { label: 'Arsipkan', icon: Archive, onSelect: () => toast('Task diarsipkan', task.title) },
              { label: 'Hapus task', icon: Trash2, danger: true, onSelect: () => toast('Task dihapus', task.title) },
            ]}
            trigger={({ toggle }) => <IconButton icon={Ellipsis} label="Lainnya" variant="ghost" size="sm" onClick={toggle} />}
          />
          <IconButton icon={X} label="Tutup" variant="ghost" size="sm" onClick={onClose} />
        </div>
      </header>

      <div ref={bodyRef} className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
        <h2 className="text-22 leading-[1.25] font-semibold tracking-[-0.01em] text-ink">{task.title}</h2>
        <TaskPropsTable task={task} />
        <Field label="Deskripsi">
          {(id) => (
            <Textarea
              id={id}
              value={task.description}
              onChange={(e) => taskActions.update(task.id, { description: e.target.value })}
              placeholder="Tambahkan deskripsi task…"
              className="min-h-[74px] resize-none py-2.5"
              rows={2}
            />
          )}
        </Field>
        <SubtaskList task={task} />
        <TaskTimer task={task} />
        <CommentList comments={task.comments} />
      </div>

      <CommentComposer onSubmit={postComment} />
    </Drawer>
  );
}
