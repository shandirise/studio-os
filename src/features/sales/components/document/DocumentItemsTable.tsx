import { formatRupiah } from '@/lib/format';
import { lineAmount } from './calc';
import type { LineItem } from './types';

/** Line items as printed on the document paper. */
export function DocumentItemsTable({ items }: { items: LineItem[] }) {
  return (
    <div className="overflow-hidden rounded-badge border border-line">
      <div className="flex h-[26px] items-center gap-2 bg-subtle px-2.5 text-9 leading-none font-semibold text-muted">
        <span className="min-w-0 flex-1">DESKRIPSI</span>
        <span className="w-[30px] text-right">QTY</span>
        <span className="w-20 text-right">HARGA</span>
        <span className="w-[84px] text-right">JUMLAH</span>
      </div>
      {items.length === 0 && (
        <p className="border-t border-line px-2.5 py-3 text-center text-[9.5px] text-faint">Belum ada item</p>
      )}
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-2 border-t border-line px-2.5 py-[7px] text-10-5 leading-[1.3] text-ink">
          <div className="flex min-w-0 flex-1 flex-col gap-px">
            <span className="font-medium break-words">{item.name || 'Item tanpa nama'}</span>
            {(item.description || item.discount > 0) && (
              <span className="text-9 text-muted">
                {[item.description, item.discount > 0 && `diskon ${item.discount}%`].filter(Boolean).join(' · ')}
              </span>
            )}
          </div>
          <span className="w-[30px] text-right">{item.qty}</span>
          <span className="w-20 text-right">{formatRupiah(item.price)}</span>
          <span className="w-[84px] text-right font-medium">{formatRupiah(lineAmount(item))}</span>
        </div>
      ))}
    </div>
  );
}
