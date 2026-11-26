import { Check, Copy, Eye, FileText, Send, Wallet, X, type LucideIcon } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { TimelineEvent, TimelineIcon } from './types';

const icons: Record<TimelineIcon, LucideIcon> = {
  eye: Eye,
  send: Send,
  file: FileText,
  wallet: Wallet,
  check: Check,
  x: X,
  copy: Copy,
};

/** Activity list of a document ("Status & timeline", "Timeline"), newest first. */
export function TimelineCard({ title, events }: { title: string; events: TimelineEvent[] }) {
  return (
    <Card className="min-w-0">
      <CardHeader title={title} />
      <ol className="flex flex-col px-4 pb-3.5">
        {events.map((event, index) => {
          const Icon = icons[event.icon];
          return (
            <li key={event.id} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-control border border-line bg-subtle text-ink">
                <Icon size={14} />
              </span>
              <div
                className={cn(
                  'flex min-w-0 flex-1 items-start justify-between gap-1.5',
                  index < events.length - 1 && 'pb-3.5',
                )}
              >
                <p className="min-w-0 text-12-5 leading-4">
                  <span className="font-semibold text-ink">{event.actor}</span>{' '}
                  <span className="text-muted">{event.action}</span>
                </p>
                <span className="shrink-0 pt-px text-11-5 leading-none whitespace-nowrap text-faint">{event.time}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
