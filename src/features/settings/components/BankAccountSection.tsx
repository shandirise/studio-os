import { Field, Input, Select } from '@/components/ui';
import { bankOptions, type WorkspaceForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';

/** Bank account printed on invoices. */
export function BankAccountSection({ form }: { form: SettingsForm<WorkspaceForm> }) {
  const { values, set } = form;

  return (
    <SettingsSection title="Rekening bank">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Bank">
          {(id) => <Select id={id} options={bankOptions} value={values.bank} onChange={(e) => set('bank', e.target.value)} />}
        </Field>
        <Field label="Nomor rekening">
          {(id) => (
            <Input id={id} inputMode="numeric" value={values.accountNumber} onChange={(e) => set('accountNumber', e.target.value)} />
          )}
        </Field>
        <Field label="Atas nama">
          {(id) => <Input id={id} value={values.accountName} onChange={(e) => set('accountName', e.target.value)} />}
        </Field>
      </div>
    </SettingsSection>
  );
}
