import { Avatar } from '@/components/ui';
import { memberById } from '@/data/workspace';
import type { TaskComment } from '../data';

/** "Komentar" section of the task drawer. */
export function CommentList({ comments }: { comments: TaskComment[] }) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-12 leading-none font-semibold text-ink">Komentar</h3>
      {comments.length === 0 ? (
        <p className="text-13 text-faint">Belum ada komentar. Mulai diskusi di bawah.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {comments.map((c) => {
            const author = memberById(c.authorId);
            return (
              <li key={c.id} className="flex gap-2.5">
                <Avatar name={author.name} size="sm" />
                <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                  <p className="flex items-baseline gap-1.5 leading-none">
                    <span className="text-12 font-semibold text-ink">{author.name}</span>
                    <span className="text-11-5 text-faint">{c.time}</span>
                  </p>
                  <p className="text-13 leading-[1.45] break-words text-ink">{c.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
