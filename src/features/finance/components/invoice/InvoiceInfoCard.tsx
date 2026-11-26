import { Field, Input, Select } from '@/components/ui';
import { addDays, daysBetween, DateField, EditorCard } from '@/features/sales/components/document';
import { clients, listQuotations } from '@/features/sales/data';
import type { Invoice } from '../../invoiceData';
import { DueTermSelect } from './DueTermSelect';

type InvoiceInfoCardProps = {
  value: Invoice;
  onChange: (patch: Partial<Invoice>) => void;
  /** Called when a quotation is picked as the source, to copy its content. */
  onSourceChange: (quotationId: string | null) => void;
};

const clientOptions = clients.map((c) => ({ value: c.id, label: c.company }));

/** "Informasi dokumen" of the invoice editor. */
export function InvoiceInfoCard({ value, onChange, onSourceChange }: InvoiceInfoCardProps) {
  const sourceOptions = [
    ...listQuotations()
      .filter((q) => q.clientId === value.clientId)
      .map((q) => ({ value: q.id, label: `Dari quotation · ${q.number}` })),
    { value: '', label: 'Tanpa sumber (manual)' },
  ];

  // Keep the payment term (Net N) when the issue date moves.
  const changeIssueDate = (issueDate: string) =>
    onChange({ issueDate, dueDate: addDays(issueDate, daysBetween(value.issueDate, value.dueDate)) });

  return (
    <EditorCard title="Informasi dokumen">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Klien" required>
          {(id) => (
            <Select
              id={id}
              options={clientOptions}
              value={value.clientId}
              onChange={(e) => onChange({ clientId: e.target.value, sourceQuotationId: null, term: null })}
            />
          )}
        </Field>
        <Field label="Sumber invoice">
          {(id) => (
            <Select
              id={id}
              options={sourceOptions}
              value={value.sourceQuotationId ?? ''}
              onChange={(e) => onSourceChange(e.target.value || null)}
            />
          )}
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Nomor">{(id) => <Input id={id} value={value.number} disabled />}</Field>
        <Field label="Tanggal">{(id) => <DateField id={id} value={value.issueDate} onChange={changeIssueDate} />}</Field>
        <Field label="Jatuh tempo">
          {(id) => (
            <DueTermSelect
              id={id}
              issueDate={value.issueDate}
              dueDate={value.dueDate}
              onChange={(dueDate) => onChange({ dueDate })}
            />
          )}
        </Field>
      </div>
      <Field label="Judul / ringkasan scope">
        {(id) => <Input id={id} value={value.subject} onChange={(e) => onChange({ subject: e.target.value })} />}
      </Field>
    </EditorCard>
  );
}
