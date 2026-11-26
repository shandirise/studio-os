import { cn } from '@/lib/cn';
import { formatRupiah } from '@/lib/format';
import type { LineItem, PortalDocumentData } from '../data';

/** Description · qty · price · amount. The description column absorbs the remaining width. */
const columns = 'grid grid-cols-[minmax(0,1fr)_30px_80px_84px] gap-x-2 px-2.5';

function ItemRow({ item }: { item: LineItem }) {
  return (
    <div role="row" className={cn(columns, 'border-t border-line py-[7px] text-10-5 leading-[1.3] text-ink')}>
      <div role="cell" className="flex flex-col gap-px">
        <span className="font-medium">{item.name}</span>
        <span className="text-9 text-muted">{item.description}</span>
      </div>
      <span role="cell" className="text-right">
        {item.qty}
      </span>
      <span role="cell" className="text-right">
        {formatRupiah(item.price)}
      </span>
      <span role="cell" className="text-right font-medium">
        {formatRupiah(item.qty * item.price)}
      </span>
    </div>
  );
}

function TotalRow({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex gap-5 text-10-5 leading-[1.2]">
      <span className="text-muted">{label}</span>
      <span className="w-[100px] text-right text-ink">{formatRupiah(amount)}</span>
    </div>
  );
}

type DocumentItemsProps = Pick<PortalDocumentData, 'items' | 'subtotal' | 'tax' | 'due'>;

/** Line-item table and the right-aligned totals of a quotation / invoice sheet. */
export function DocumentItems({ items, subtotal, tax, due }: DocumentItemsProps) {
  return (
    <>
      <div role="table" className="overflow-hidden rounded-badge border border-line">
        <div role="row" className={cn(columns, 'h-[26px] items-center bg-subtle text-9 leading-none font-semibold text-muted')}>
          <span role="columnheader">DESKRIPSI</span>
          <span role="columnheader" className="text-right">
            QTY
          </span>
          <span role="columnheader" className="text-right">
            HARGA
          </span>
          <span role="columnheader" className="text-right">
            JUMLAH
          </span>
        </div>
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>

      <div className="flex flex-col items-end gap-[5px]">
        <TotalRow label="Subtotal" amount={subtotal} />
        <TotalRow label="PPN 11%" amount={tax} />
        <div className="flex items-center gap-5 rounded-badge bg-ink px-2.5 py-[7px] text-white">
          <span className="text-10 leading-none font-semibold">{due.label}</span>
          <span className="w-[100px] text-right text-12 leading-none font-bold">{formatRupiah(due.amount)}</span>
        </div>
      </div>
    </>
  );
}
