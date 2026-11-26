import { Badge, Card, CardHeader } from '@/components/ui';
import type { ScheduledReminder } from './invoiceDocument';

/** "Reminder terjadwal": automatic reminders around the due date. */
export function ReminderScheduleCard({ reminders }: { reminders: ScheduledReminder[] }) {
  return (
    <Card className="min-w-0">
      <CardHeader title="Reminder terjadwal" />
      <ul className="flex flex-col gap-2 px-4 pb-3.5">
        {reminders.length === 0 && <li className="text-12-5 text-muted">Reminder otomatis tidak aktif</li>}
        {reminders.map((r) => (
          <li key={r.key} className="flex items-center justify-between gap-3">
            <span className="text-12-5 leading-none text-ink">{r.label}</span>
            <Badge tone={r.tone} className="h-[19px] text-10-5">
              {r.status}
            </Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
