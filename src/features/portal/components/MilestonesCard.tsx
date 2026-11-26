import { Check } from 'lucide-react';
import { Badge, Card, CardHeader } from '@/components/ui';
import { cn } from '@/lib/cn';
import { milestones, milestoneTone, type MilestoneStatus } from '../data';

/** Read-only completion box: ink with a check when the milestone is done. */
function MilestoneCheck({ done }: { done: boolean }) {
  return (
    <span
      aria-label={done ? 'Selesai' : 'Belum selesai'}
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-control border max-lg:hidden',
        done ? 'border-ink bg-ink text-white' : 'border-line-2 bg-white',
      )}
    >
      {done && <Check size={11} strokeWidth={3} />}
    </span>
  );
}

function MilestoneBadge({ status }: { status: MilestoneStatus }) {
  return (
    <Badge tone={milestoneTone[status]} className="max-lg:h-[19px] max-lg:text-10-5">
      {status}
    </Badge>
  );
}

/** Project milestones with target date and status. Mobile drops the check box and date. */
export function MilestonesCard() {
  return (
    <Card className="min-w-0">
      <CardHeader title="Milestone" />
      <ul className="px-3.5 pb-2.5 lg:px-4 lg:pb-4">
        {milestones.map((m) => (
          <li key={m.id} className="flex h-[42px] items-center justify-between gap-3 border-b border-line last:border-b-0 lg:h-11">
            <MilestoneCheck done={m.status === 'Selesai'} />
            <span className="min-w-0 flex-1 truncate text-13 leading-none font-medium text-ink lg:text-13-5">
              <span className="lg:hidden">{m.shortTitle ?? m.title}</span>
              <span className="max-lg:hidden">{m.title}</span>
            </span>
            <span className="w-[100px] shrink-0 text-12 leading-none text-muted max-lg:hidden">{m.date}</span>
            <MilestoneBadge status={m.status} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
