import { Field, Input, Select, Textarea } from '@/components/ui';
import { businessTypes, teamSizes, timezones, type WorkspaceForm } from '../../data';

type WorkspaceFieldsProps = {
  value: WorkspaceForm;
  onChange: (patch: Partial<WorkspaceForm>) => void;
};

/** Step 1 · Workspace profile. */
export function WorkspaceFields({ value, onChange }: WorkspaceFieldsProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nama workspace" required>
          {(id) => <Input id={id} required value={value.name} onChange={(e) => onChange({ name: e.target.value })} />}
        </Field>
        <Field label="Jenis bisnis">
          {(id) => (
            <Select id={id} options={businessTypes} value={value.businessType} onChange={(e) => onChange({ businessType: e.target.value })} />
          )}
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ukuran tim">
          {(id) => <Select id={id} options={teamSizes} value={value.teamSize} onChange={(e) => onChange({ teamSize: e.target.value })} />}
        </Field>
        <Field label="Zona waktu">
          {(id) => <Select id={id} options={timezones} value={value.timezone} onChange={(e) => onChange({ timezone: e.target.value })} />}
        </Field>
      </div>
      <div className="h-px bg-line" />
      <Field label="Alamat kantor" hint="Dicetak di kop quotation dan invoice.">
        {(id) => <Textarea id={id} rows={2} value={value.address} onChange={(e) => onChange({ address: e.target.value })} />}
      </Field>
    </>
  );
}
