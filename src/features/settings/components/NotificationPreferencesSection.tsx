import { Checkbox } from '@/components/ui';
import { cn } from '@/lib/cn';
import { notificationTypes, type NotificationChannels, type NotificationId, type ProfileForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';

const channels: Array<{ key: keyof NotificationChannels; label: string }> = [
  { key: 'email', label: 'Email' },
  { key: 'inApp', label: 'In-app' },
];

/** Notification type × channel checkbox list. */
export function NotificationPreferencesSection({ form }: { form: SettingsForm<ProfileForm> }) {
  const { values, update } = form;

  const toggle = (id: NotificationId, channel: keyof NotificationChannels, checked: boolean) =>
    update((v) => ({ ...v, notifications: { ...v.notifications, [id]: { ...v.notifications[id], [channel]: checked } } }));

  return (
    <SettingsSection title="Preferensi notifikasi">
      <div className="flex border-b border-line pb-2 text-11-5 leading-none font-semibold text-muted">
        <span className="flex-1">Jenis notifikasi</span>
        {channels.map((c) => (
          <span key={c.key} className="w-16 text-center lg:w-20">
            {c.label}
          </span>
        ))}
      </div>
      {notificationTypes.map((type, i) => (
        <div key={type.id} className={cn('flex h-[34px] items-center', i < notificationTypes.length - 1 && 'border-b border-line')}>
          <span className="min-w-0 flex-1 text-13 text-ink">{type.label}</span>
          {channels.map((c) => (
            <span key={c.key} className="flex w-16 justify-center lg:w-20">
              <Checkbox
                checked={values.notifications[type.id][c.key]}
                onChange={(checked) => toggle(type.id, c.key, checked)}
                ariaLabel={`${type.label} · ${c.label}`}
              />
            </span>
          ))}
        </div>
      ))}
    </SettingsSection>
  );
}
