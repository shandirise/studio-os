import { Field, Input, Select } from '@/components/ui';
import { banks, currencies, taxes, type CurrencyCode, type FinanceForm } from '../../data';

type FinanceFieldsProps = {
  value: FinanceForm;
  onChange: (patch: Partial<FinanceForm>) => void;
};

/** Step 2 · Currency, tax, document numbering and bank account (the designed step). */
export function FinanceFields({ value, onChange }: FinanceFieldsProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Mata uang default">
          {(id) => (
            <Select
              id={id}
              options={currencies}
              value={value.currency}
              onChange={(e) => onChange({ currency: e.target.value as CurrencyCode })}
            />
          )}
        </Field>
        <Field label="Pajak default">
          {(id) => (
            <Select id={id} options={taxes.map((t) => t.value)} value={value.tax} onChange={(e) => onChange({ tax: e.target.value })} />
          )}
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Format nomor quotation">
          {(id) => (
            <Input id={id} required value={value.quotationFormat} onChange={(e) => onChange({ quotationFormat: e.target.value })} />
          )}
        </Field>
        <Field label="Format nomor invoice">
          {(id) => <Input id={id} required value={value.invoiceFormat} onChange={(e) => onChange({ invoiceFormat: e.target.value })} />}
        </Field>
      </div>

      <div className="h-px bg-line" />
      <h2 className="text-14 leading-[1.2] font-semibold text-ink">Rekening bank untuk pembayaran</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Bank">
          {(id) => <Select id={id} options={banks} value={value.bank} onChange={(e) => onChange({ bank: e.target.value })} />}
        </Field>
        <Field label="Nomor rekening">
          {(id) => (
            <Input
              id={id}
              inputMode="numeric"
              value={value.accountNumber}
              onChange={(e) => onChange({ accountNumber: e.target.value })}
            />
          )}
        </Field>
        <Field label="Atas nama">
          {(id) => <Input id={id} value={value.accountName} onChange={(e) => onChange({ accountName: e.target.value })} />}
        </Field>
      </div>
    </>
  );
}
