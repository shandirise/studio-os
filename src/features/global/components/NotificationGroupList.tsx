import { Card, SectionLabel } from '@/components/ui';
import type { AppNotification, NotificationGroup } from '../data';
import { NotificationItem } from './NotificationItem';

type NotificationGroupListProps = {
  group: NotificationGroup;
  items: AppNotification[];
  onOpen: (notification: AppNotification) => void;
};

/** Caps label ("HARI INI") followed by a card listing that day's notifications. */
export function NotificationGroupList({ group, items, onOpen }: NotificationGroupListProps) {
  return (
    <section className="flex flex-col gap-3.5 lg:gap-5" aria-label={group}>
      <SectionLabel>{group}</SectionLabel>
      <Card className="overflow-hidden">
        <ul>
          {items.map((n) => (
            <NotificationItem key={n.id} notification={n} onOpen={onOpen} />
          ))}
        </ul>
      </Card>
    </section>
  );
}
