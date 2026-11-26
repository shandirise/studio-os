import { Check, MessageSquare, Target, TriangleAlert, Upload, User, Wallet, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { AppNotification, NotificationKind } from '../data';

const kindIcon: Record<NotificationKind, LucideIcon> = {
  deal: Target,
  mention: MessageSquare,
  quotation: Check,
  overdue: TriangleAlert,
  payment: Wallet,
  member: User,
  import: Upload,
};

type NotificationItemProps = {
  notification: AppNotification;
  onOpen: (notification: AppNotification) => void;
};

/** One 58px row: unread dot, icon tile, "Actor message" and time. Unread rows get a tinted background. */
export function NotificationItem({ notification, onOpen }: NotificationItemProps) {
  const { actor, message, time, unread, kind } = notification;
  const Icon = kindIcon[kind];

  return (
    <li className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={() => onOpen(notification)}
        className={cn(
          'flex min-h-[58px] w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-canvas',
          unread && 'bg-canvas/50',
        )}
      >
        <span className={cn('size-2 shrink-0 rounded-full', unread && 'bg-ink')}>
          {unread && <span className="sr-only">Belum dibaca</span>}
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-control border border-line bg-subtle text-ink-2">
          <Icon size={15} />
        </span>
        <span className="flex min-w-0 flex-1 flex-wrap gap-x-[5px] text-13 leading-[17px]">
          <span className="font-semibold text-ink">{actor}</span>
          <span className="text-ink-2">{message}</span>
        </span>
        <span className="shrink-0 text-11-5 leading-none text-faint">{time}</span>
      </button>
    </li>
  );
}
