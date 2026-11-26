import { formatRupiah } from '@/lib/format';
import { taxLabel } from './calc';
import type { PaperContent } from './types';

type DocumentTotalsBlockProps = Pick<PaperContent, 'totals' | 'taxRate' | 'due'>;

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-5 text-10-5 leading-[1.2]">
      <span className="text-muted">{label}</span>
      <span className="w-[100px] text-right text-ink">{value}</span>
    </div>
  );
}

/** Right-aligned subtotal / PPN rows and the black total chip. */
export function DocumentTotalsBlock({ totals, taxRate, due }: DocumentTotalsBlockProps) {
  return (
    <div className="flex flex-col items-end gap-[5px]">
      <TotalRow label="Subtotal" value={formatRupiah(totals.subtotal)} />
      {totals.discount > 0 && <TotalRow label="Diskon" value={`– ${formatRupiah(totals.discount)}`} />}
      <TotalRow label={taxLabel(taxRate)} value={formatRupiah(totals.tax)} />
      <div className="flex items-center gap-5 rounded-badge bg-ink px-2.5 py-[7px] leading-none text-white">
        <span className="text-10 font-semibold">{due.label}</span>
        <span className="min-w-[100px] text-right text-12 font-bold">{formatRupiah(due.amount)}</span>
      </div>
    </div>
  );
}
