import { formatRupiah } from '@/lib/format';
import { cn } from '@/lib/cn';
import { initialWorkspace, previewInvoice, workspaceEmail, workspaceLogoMark, type PdfLayout } from '../data';

type DocumentPreviewProps = {
  layout: PdfLayout;
  showLogo: boolean;
  showNpwp: boolean;
  showPageNumber: boolean;
  footer: string;
  className?: string;
};

/** Small differences between the three layouts, on top of the designed "Modern" one. */
const layoutClass: Record<PdfLayout, { doc: string; total: string; head: string }> = {
  modern: { doc: 'gap-[18px]', total: 'bg-ink text-white', head: 'bg-subtle' },
  klasik: { doc: 'gap-[18px]', total: 'border border-ink bg-white text-ink', head: 'border-b border-line bg-white' },
  ringkas: { doc: 'gap-3', total: 'bg-subtle text-ink', head: 'bg-subtle' },
};

const inv = previewInvoice;

/** Live invoice preview for the PDF template settings. */
export function DocumentPreview({ layout, showLogo, showNpwp, showPageNumber, footer, className }: DocumentPreviewProps) {
  const style = layoutClass[layout];
  const compact = layout === 'ringkas';

  return (
    <div aria-label="Pratinjau PDF" className={cn('flex flex-col border border-line bg-white p-[18px]', style.doc, className)}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            {showLogo && (
              <span className="flex size-6 items-center justify-center rounded-control bg-ink text-13 leading-none font-bold text-white">
                {workspaceLogoMark}
              </span>
            )}
            <span className="text-13 leading-none font-bold text-ink">{initialWorkspace.businessName}</span>
          </div>
          <p className="max-w-[230px] text-[9.5px] leading-[1.45] whitespace-pre-line text-muted">
            {initialWorkspace.address}
            {'\n'}
            {workspaceEmail}
            {showNpwp && ` · NPWP ${initialWorkspace.npwp}`}
          </p>
        </div>
        <div className="flex flex-col gap-[3px]">
          <p className={cn('text-18 leading-[1.1] font-bold tracking-[0.04em] text-ink', layout === 'klasik' && 'font-semibold')}>INVOICE</p>
          <p className="text-11 leading-[1.2] font-medium text-muted">{inv.number}</p>
        </div>
      </div>

      <div className="h-px bg-line" />

      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-[3px]">
          <p className="text-9 leading-none font-semibold tracking-[0.08em] text-faint">KEPADA</p>
          <p className="text-12 leading-[1.3] font-semibold text-ink">{inv.clientName}</p>
          {!compact && (
            <p className="text-10 leading-[1.45] text-muted">
              {inv.clientCompany}
              <br />
              {inv.clientAddress}
            </p>
          )}
        </div>
        <dl className="flex flex-col gap-1 text-10 leading-[1.2]">
          {[
            ['Tanggal', inv.date],
            ['Berlaku sampai', inv.validUntil],
            ['Referensi', inv.reference],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-2.5">
              <dt className="text-muted">{label}</dt>
              <dd className="font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {!compact && <p className="text-12 leading-[1.4] font-semibold text-ink">{inv.title}</p>}

      <div className="overflow-hidden rounded-badge border border-line">
        <div className={cn('flex h-[26px] items-center gap-2 px-2.5 text-9 leading-none font-semibold text-muted', style.head)}>
          <span className="min-w-0 flex-1">DESKRIPSI</span>
          <span className="w-[30px] text-right">QTY</span>
          <span className="w-20 text-right">HARGA</span>
          <span className="w-[84px] text-right">JUMLAH</span>
        </div>
        <div className="flex gap-2 border-t border-line px-2.5 py-[7px] text-[10.5px] leading-[1.3] text-ink">
          <div className="flex min-w-0 flex-1 flex-col gap-px">
            <span className="font-medium">{inv.item.name}</span>
            <span className="text-9 text-muted">{inv.item.note}</span>
          </div>
          <span className="w-[30px] text-right">{inv.item.qty}</span>
          <span className="w-20 text-right">{formatRupiah(inv.item.price)}</span>
          <span className="w-[84px] text-right font-medium">{formatRupiah(inv.item.price * inv.item.qty)}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-[5px]">
        {!compact && (
          <div className="flex gap-5 text-[10.5px] leading-[1.2]">
            <span className="text-muted">Subtotal</span>
            <span className="w-[100px] text-right text-ink">{formatRupiah(inv.subtotal)}</span>
          </div>
        )}
        <div className={cn('flex items-center gap-5 rounded-badge px-2.5 py-[7px] leading-none', style.total)}>
          <span className="text-10 font-semibold">TOTAL</span>
          <span className="w-[100px] text-right text-12 font-bold">{formatRupiah(inv.total)}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1">
        <p className="text-9 leading-none font-semibold tracking-[0.08em] text-faint">CATATAN</p>
        <p className="text-[9.5px] leading-[1.5] text-muted">{footer || '–'}</p>
      </div>

      {showPageNumber && <p className="text-right text-9 leading-none text-faint">Halaman 1 dari 1</p>}
    </div>
  );
}
