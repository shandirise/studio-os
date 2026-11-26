import { Check, CalendarClock, Clock, Ellipsis, Phone, Send, Trash2, Undo2, Video, Wallet, CircleCheck, type LucideIcon } from 'lucide-react';
import { Avatar, Checkbox, IconButton, Menu } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { cn } from '@/lib/cn';
import { activityDueLabel, daysFromToday, type Activity, type ActivityType } from '../../dealData';

const typeIcon: Record<ActivityType, LucideIcon> = {
  call: Phone,
  send: Send,
  meeting: Video,
  task: Check,
  billing: Wallet,
};

type ActivityRowProps = {
  activity: Activity;
  onToggle: (done: boolean) => void;
  onPostpone: () => void;
  onDelete: () => void;
};

/** One follow-up: checkbox, type icon, title + context, due time, PIC and a row menu. */
export function ActivityRow({ activity, onToggle, onPostpone, onDelete }: ActivityRowProps) {
  const Icon = typeIcon[activity.type];
  const owner = memberById(activity.ownerId);
  const overdue = !activity.done && daysFromToday(activity.date) < 0;

  const due = (
    <span className={cn('flex items-center gap-[5px] text-12 leading-none whitespace-nowrap', overdue ? 'text-danger' : 'text-muted')}>
      <Clock size={12} />
      {activityDueLabel(activity)}
    </span>
  );

  return (
    <li className="flex min-h-16 items-center gap-3 border-b border-line px-4 py-3 last:border-b-0">
      <Checkbox checked={activity.done} onChange={onToggle} ariaLabel={`Tandai selesai: ${activity.title}`} />
      <span className="flex size-8 shrink-0 items-center justify-center rounded-control border border-line bg-subtle text-ink-2">
        <Icon size={14} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            'truncate text-13-5 leading-[1.2] font-semibold',
            activity.done ? 'text-faint line-through' : 'text-ink',
          )}
        >
          {activity.title}
        </span>
        <span className="truncate text-12 leading-[1.2] text-muted">{activity.context}</span>
        <span className="mt-1 sm:hidden">{due}</span>
      </div>
      <span className="min-w-[90px] max-sm:hidden">{due}</span>
      <Avatar name={owner.name} size="sm" className="max-sm:hidden" />
      <Menu
        trigger={({ toggle }) => (
          <IconButton icon={Ellipsis} label="Aksi lainnya" variant="ghost" size="sm" className="size-[26px]" onClick={toggle} />
        )}
        items={[
          activity.done
            ? { label: 'Tandai belum selesai', icon: Undo2, onSelect: () => onToggle(false) }
            : { label: 'Tandai selesai', icon: CircleCheck, onSelect: () => onToggle(true) },
          { label: 'Tunda 1 hari', icon: CalendarClock, onSelect: onPostpone },
          { label: 'Hapus', icon: Trash2, danger: true, onSelect: onDelete },
        ]}
      />
    </li>
  );
}
