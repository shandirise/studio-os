import { Avatar, Card, CardHeader } from '@/components/ui';
import { teamActivity } from '../data';

export function TeamActivityCard() {
  return (
    <Card className="self-start">
      <CardHeader title="Aktivitas tim terbaru" />
      <ul className="flex flex-col gap-3 px-4 pb-3">
        {teamActivity.map((a) => (
          <li key={a.id} className="flex items-center gap-2.5">
            <Avatar name={a.whoFull} size="sm" />
            <p className="min-w-0 flex-1 text-12-5 leading-[1.3] text-muted">
              <span className="font-semibold text-ink">{a.who}</span> {a.action}
            </p>
            <span className="shrink-0 text-11 text-faint">{a.when}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
