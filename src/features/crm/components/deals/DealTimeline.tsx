import { FileText, Mail, Pencil, Phone, Target, Video, type LucideIcon } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import type { TimelineEntry, TimelineKind } from '../../dealData';

const kindIcon: Record<TimelineKind, LucideIcon> = {
  note: Pencil,
  quotation: FileText,
  stage: Target,
  meeting: Video,
  call: Phone,
  email: Mail,
};

/** Activity history of a deal: icon rail, "who did what", optional note box and relative time. */
export function DealTimeline({ entries }: { entries: TimelineEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState icon={Pencil} title="Belum ada aktivitas" description="Catat telepon, meeting atau catatan pertama." />;
  }

  return (
    <ol className="flex flex-col pt-1.5">
      {entries.map((entry) => {
        const Icon = kindIcon[entry.kind];
        return (
          <li key={entry.id} className="group flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-control border border-line bg-subtle text-ink-2">
              <Icon size={14} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-[3px] pb-3.5 group-last:pb-0">
              <div className="flex items-center justify-between gap-1.5">
                <p className="min-w-0 text-12-5 leading-[1.3]">
                  <span className="font-semibold text-ink">{entry.who}</span>{' '}
                  <span className="text-muted">{entry.action}</span>
                </p>
                <span className="shrink-0 text-11-5 leading-none text-faint">{entry.when}</span>
              </div>
              {entry.note && (
                <p className="rounded-control border border-line bg-subtle px-2.5 py-2 text-12-5 leading-[1.5] text-ink">{entry.note}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
