import { Check, FileText, MessageSquare, Phone, ReceiptText, Target, User, Video, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { Activity, ActivityKind } from '../../contactData';

const kindIcon: Record<ActivityKind, LucideIcon> = {
  call: Phone,
  note: MessageSquare,
  meeting: Video,
  quotation: FileText,
  deal: Target,
  invoice: ReceiptText,
  won: Check,
  system: User,
};

type ActivityTimelineProps = {
  items: Activity[];
  className?: string;
};

/** Vertical activity feed: icon tile, "Actor action · time", optional note box. */
export function ActivityTimeline({ items, className }: ActivityTimelineProps) {
  return (
    <ol className={cn('flex flex-col', className)}>
      {items.map((item, i) => {
        const Icon = kindIcon[item.kind];
        const last = i === items.length - 1;
        return (
          <li key={item.id} className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-control border border-line bg-subtle text-ink-2">
              <Icon size={14} />
            </span>
            <div className={cn('flex min-w-0 flex-1 flex-col gap-[3px]', !last && 'pb-3.5')}>
              <div className="flex items-baseline justify-between gap-1.5">
                <p className="min-w-0 text-12-5 leading-4">
                  <span className="font-semibold text-ink">{item.actor}</span> <span className="text-muted">{item.action}</span>
                </p>
                <span className="shrink-0 text-11-5 leading-3 whitespace-nowrap text-faint">{item.time}</span>
              </div>
              {item.note && (
                <p className="rounded-control border border-line bg-subtle px-2.5 py-2 text-12-5 leading-[19px] whitespace-pre-line text-ink">
                  {item.note}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
