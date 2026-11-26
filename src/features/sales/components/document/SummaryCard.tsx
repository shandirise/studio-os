import type { ReactNode } from 'react';
import { Card } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { taxLabel } from './calc';
import { formatNumber, parseNumber } from './format';
import type { DocumentTotals } from './types';

type SummaryCardProps = {
  totals: DocumentTotals;
  taxRate: number;
  onDiscountChange: (discount: number) => void;
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 text-12-5 leading-none">
      <span className="text-muted">{label}</span>
      <span className="text-ink">{children}</span>
    </div>
  );
}

/** "Ringkasan": live subtotal, editable overall discount, PPN and total. */
export function SummaryCard({ totals, taxRate, onDiscountChange }: SummaryCardProps) {
  const discountText = formatNumber(totals.discount);

  return (
    <Card className="flex w-full shrink-0 flex-col gap-2.5 p-4 sm:w-[300px]">
      <h2 className="text-14 leading-[1.2] font-semibold text-ink">Ringkasan</h2>
      <Row label="Subtotal">{formatRupiah(totals.subtotal)}</Row>
      <Row label="Diskon keseluruhan">
        <span className="flex items-center justify-end">
          – Rp
          <input
            aria-label="Diskon keseluruhan"
            title="Klik untuk mengubah diskon"
            inputMode="numeric"
            value={discountText}
            onChange={(e) => onDiscountChange(parseNumber(e.target.value))}
            style={{ width: `${discountText.length + 1}ch` }}
            className="-mr-1 rounded-badge bg-transparent px-1 text-right outline-none hover:bg-canvas focus:bg-canvas"
          />
        </span>
      </Row>
      <Row label={taxLabel(taxRate)}>{formatRupiah(totals.tax)}</Row>
      <div className="my-0.5 h-px bg-line" />
      <div className="flex items-center justify-between gap-3">
        <span className="text-13 font-semibold text-ink">Total</span>
        <span className="text-18 leading-none font-bold text-ink">{formatRupiah(totals.total)}</span>
      </div>
    </Card>
  );
}
