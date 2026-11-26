import { Checkbox, Toggle } from '@/components/ui';
import { EditorCard } from '@/features/sales/components/document';
import type { Invoice, ReminderKey } from '../../invoiceData';
import { reminderDefs, reminderKeys } from './invoiceDocument';

type AutoBillingCardProps = {
  recurring: boolean;
  reminders: Invoice['reminders'];
  onRecurringChange: (recurring: boolean) => void;
  onReminderChange: (key: ReminderKey, enabled: boolean) => void;
};

/** "Penagihan otomatis": recurring invoice switch and automatic reminders. */
export function AutoBillingCard({ recurring, reminders, onRecurringChange, onReminderChange }: AutoBillingCardProps) {
  return (
    <EditorCard title="Penagihan otomatis">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-13 leading-none font-medium text-ink">Invoice berulang</p>
          <p className="text-12 leading-none text-muted">
            {recurring ? 'Diterbitkan otomatis setiap bulan' : 'Terbitkan otomatis setiap periode'}
          </p>
        </div>
        <Toggle checked={recurring} onChange={onRecurringChange} label="Invoice berulang" />
      </div>
      <div className="h-px bg-line" />
      <p className="text-13 leading-none font-medium text-ink">Reminder otomatis</p>
      <div className="flex flex-wrap gap-x-5 gap-y-2.5">
        {reminderKeys.map((key) => (
          <Checkbox
            key={key}
            checked={reminders[key]}
            onChange={(checked) => onReminderChange(key, checked)}
            label={reminderDefs[key].label}
            className="text-12-5"
          />
        ))}
      </div>
    </EditorCard>
  );
}
