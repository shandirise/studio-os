import { Avatar, Card, CardHeader } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { projectActivity } from '../data';

/** Aktivitas tab: chronological activity feed of the project. */
export function ProjectActivityTab() {
  return (
    <Card className="max-w-[760px]">
      <CardHeader title="Aktivitas project" subtitle="Semua perubahan oleh tim" />
      <ol className="flex flex-col px-4 pb-3">
        {projectActivity.map((a) => {
          const member = memberById(a.memberId);
          return (
            <li key={a.id} className="flex items-center gap-2.5 border-b border-line py-2.5 last:border-b-0">
              <Avatar name={member.name} size="sm" />
              <p className="min-w-0 flex-1 text-13 leading-[1.4] text-muted">
                <span className="font-semibold text-ink">{member.name}</span> {a.action}
              </p>
              <span className="shrink-0 text-11-5 text-faint">{a.when}</span>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
