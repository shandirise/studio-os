import { currencies, taxes, type FinanceForm } from '../../data';
import { InfoNote } from '../InfoNote';
import { SummaryCard } from '../SummaryCard';

const SAMPLE_DATE = { year: '2026', month: '11' };

/** "INV-{YYYY}-{0000}" → "INV-2026-0001" (first number of the year). */
function firstDocumentNumber(format: string) {
  return format
    .replace(/\{YYYY\}/g, SAMPLE_DATE.year)
    .replace(/\{YY\}/g, SAMPLE_DATE.year.slice(2))
    .replace(/\{MM\}/g, SAMPLE_DATE.month)
    .replace(/\{(0+)\}/g, (_, zeros: string) => '1'.padStart(zeros.length, '0'));
}

/** Step 2 aside: live preview of numbering and tax on a sample subtotal. */
export function FinancePreview({ value }: { value: FinanceForm }) {
  const currency = currencies.find((c) => c.value === value.currency) ?? currencies[0]!;
  const rate = taxes.find((t) => t.value === value.tax)?.rate ?? 0;
  const money = (amount: number) => `${currency.symbol} ${amount.toLocaleString('id-ID')}`;
  const taxAmount = currency.sampleSubtotal * rate;

  return (
    <>
      <SummaryCard
        title="PRATINJAU"
        rows={[
          { label: 'Nomor invoice', value: firstDocumentNumber(value.invoiceFormat) },
          { label: 'Nomor quotation', value: firstDocumentNumber(value.quotationFormat) },
          { label: 'Pajak pada total', value: `${value.tax} · ${money(taxAmount)}` },
          { label: 'Contoh total', value: money(currency.sampleSubtotal + taxAmount) },
        ]}
      />
      <InfoNote>Nomor dokumen berjalan otomatis dan tidak bisa duplikat. Reset urutan tiap tahun.</InfoNote>
    </>
  );
}
