import { Field, Input } from '@/components/ui';
import { nextDocumentNumber, type WorkspaceForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';

/** "QUO-{YYYY}-{0000}" → "QUO-2026-0012" */
function formatDocumentNumber(pattern: string, sequence: number): string {
  return pattern
    .replace(/\{YYYY\}/g, String(nextDocumentNumber.year))
    .replace(/\{YY\}/g, String(nextDocumentNumber.year).slice(-2))
    .replace(/\{(0+)\}/g, (_, zeros: string) => String(sequence).padStart(zeros.length, '0'));
}

/** Quotation and invoice number patterns with a live example. */
export function DocumentNumberSection({ form }: { form: SettingsForm<WorkspaceForm> }) {
  const { values, set } = form;

  return (
    <SettingsSection title="Format nomor dokumen">
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Quotation" hint={`Contoh: ${formatDocumentNumber(values.quotationFormat, nextDocumentNumber.quotation)}`}>
          {(id) => <Input id={id} value={values.quotationFormat} onChange={(e) => set('quotationFormat', e.target.value)} />}
        </Field>
        <Field label="Invoice" hint={`Contoh: ${formatDocumentNumber(values.invoiceFormat, nextDocumentNumber.invoice)}`}>
          {(id) => <Input id={id} value={values.invoiceFormat} onChange={(e) => set('invoiceFormat', e.target.value)} />}
        </Field>
      </div>
    </SettingsSection>
  );
}
