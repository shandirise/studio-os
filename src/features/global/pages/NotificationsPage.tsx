import { useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Card, EmptyState, PageHeader, Tabs, useToast, type TabItem } from '@/components/ui';
import { NotificationGroupList } from '../components/NotificationGroupList';
import {
  notificationGroups,
  notifications as initialNotifications,
  type AppNotification,
  type NotificationFilter,
} from '../data';

const matchesFilter: Record<NotificationFilter, (n: AppNotification) => boolean> = {
  all: () => true,
  unread: (n) => n.unread,
  mention: (n) => n.kind === 'mention',
};

/** Count chip is hidden once there is nothing left to read. */
const countOrNone = (count: number) => (count > 0 ? count : undefined);

/** H1 · Notifikasi — grouped activity feed with read state. */
export function NotificationsPage() {
  useBreadcrumbs([{ label: 'Notifikasi' }]);
  const navigate = useNavigate();
  const toast = useToast();
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState<NotificationFilter>('all');

  const unreadCount = items.filter((n) => n.unread).length;
  const unreadMentions = items.filter((n) => n.unread && n.kind === 'mention').length;
  const visible = items.filter(matchesFilter[filter]);

  const tabs: TabItem<NotificationFilter>[] = [
    { value: 'all', label: 'Semua' },
    { value: 'unread', label: 'Belum dibaca', count: countOrNone(unreadCount) },
    { value: 'mention', label: 'Mention', count: countOrNone(unreadMentions) },
  ];

  const markAllRead = () => {
    setItems((list) => list.map((n) => ({ ...n, unread: false })));
    toast('Semua notifikasi ditandai dibaca');
  };

  const open = (notification: AppNotification) => {
    setItems((list) => list.map((n) => (n.id === notification.id ? { ...n, unread: false } : n)));
    navigate(notification.to);
  };

  return (
    <Page>
      <PageHeader
        title="Notifikasi"
        subtitle={unreadCount > 0 ? `${unreadCount} belum dibaca` : 'Semua sudah dibaca'}
        actions={
          <Button icon={Check} onClick={markAllRead} disabled={unreadCount === 0}>
            Tandai semua dibaca
          </Button>
        }
      />

      <Tabs items={tabs} value={filter} onChange={setFilter} />

      {notificationGroups.map((group) => {
        const groupItems = visible.filter((n) => n.group === group);
        return groupItems.length > 0 && <NotificationGroupList key={group} group={group} items={groupItems} onOpen={open} />;
      })}

      {visible.length === 0 && (
        <Card className="py-10">
          <EmptyState
            icon={Bell}
            title={filter === 'mention' ? 'Belum ada mention' : 'Tidak ada notifikasi baru'}
            description="Notifikasi baru akan muncul di sini."
          />
        </Card>
      )}
    </Page>
  );
}
