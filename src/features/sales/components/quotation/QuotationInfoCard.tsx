import { Field, Input, Select } from '@/components/ui';
import { DateField, EditorCard } from '../document';
import { clients, deals, type Quotation } from '../../data';

type QuotationInfoCardProps = {
  value: Quotation;
  onChange: (patch: Partial<Quotation>) => void;
};

const clientOptions = clients.map((c) => ({ value: c.id, label: c.company }));

/** "Informasi dokumen" of the quotation editor. */
export function QuotationInfoCard({ value, onChange }: QuotationInfoCardProps) {
  const dealOptions = [
    ...deals.filter((d) => d.clientId === value.clientId).map((d) => ({ value: d.id, label: d.name })),
    { value: '', label: 'Tanpa deal' },
  ];

  const changeClient = (clientId: string) =>
    onChange({ clientId, dealId: deals.find((d) => d.clientId === clientId)?.id ?? null });

  return (
    <EditorCard title="Informasi dokumen">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Klien" required>
          {(id) => <Select id={id} options={clientOptions} value={value.clientId} onChange={(e) => changeClient(e.target.value)} />}
        </Field>
        <Field label="Deal terkait">
          {(id) => (
            <Select
              id={id}
              options={dealOptions}
              value={value.dealId ?? ''}
              onChange={(e) => onChange({ dealId: e.target.value || null })}
            />
          )}
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Nomor">{(id) => <Input id={id} value={value.number} disabled />}</Field>
        <Field label="Tanggal">
          {(id) => <DateField id={id} value={value.issueDate} onChange={(issueDate) => onChange({ issueDate })} />}
        </Field>
        <Field label="Berlaku sampai">
          {(id) => <DateField id={id} value={value.validUntil} onChange={(validUntil) => onChange({ validUntil })} />}
        </Field>
      </div>
      <Field label="Judul / ringkasan scope">
        {(id) => <Input id={id} value={value.subject} onChange={(e) => onChange({ subject: e.target.value })} />}
      </Field>
    </EditorCard>
  );
}
