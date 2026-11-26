import { Badge } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/status';
import { issuer, portalClient, type PortalDocumentData } from '../data';
import { DocumentItems } from './DocumentItems';
import { PortalBrand } from './PortalBrand';

const capsLabel = 'text-9 leading-none font-semibold tracking-[0.08em] text-faint';

type PortalDocumentProps = {
  doc: PortalDocumentData;
  /** Status badge under the document number (desktop sheet only). */
  status?: { label: string; tone: Tone };
};

/**
 * Printable quotation / invoice sheet as the client sees it.
 * Mobile stacks issuer, title and meta; desktop lays them out side by side like the printed page.
 */
export function PortalDocument({ doc, status }: PortalDocumentProps) {
  return (
    <article className="flex flex-col gap-[18px] border border-line bg-white p-[18px] lg:p-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-[230px] flex-col gap-1.5">
          <PortalBrand size="doc" />
          <p className="text-[9.5px] leading-[1.45] text-muted">
            {issuer.address}
            <br />
            {issuer.email} · NPWP {issuer.npwp}
          </p>
        </div>
        <div className="flex flex-col gap-[3px] lg:items-end lg:text-right">
          <h2 className="text-18 leading-[1.1] font-bold tracking-[0.04em] text-ink">{doc.title}</h2>
          <p className="text-11 leading-[1.2] font-medium text-muted">{doc.number}</p>
          {status && (
            <Badge tone={status.tone} className="h-[18px] text-10 max-lg:hidden">
              {status.label}
            </Badge>
          )}
        </div>
      </header>

      <hr className="border-line" />

      <section className="flex flex-col gap-2.5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-[200px] flex-col gap-[3px]">
          <p className={capsLabel}>KEPADA</p>
          <p className="text-12 leading-[1.3] font-semibold text-ink">{portalClient.name}</p>
          <p className="text-10 leading-[1.45] text-muted">
            {portalClient.company}
            <br />
            {portalClient.address}
          </p>
        </div>
        <dl className="flex flex-col gap-1 text-10 leading-[1.2] lg:items-end">
          {doc.meta.map((row) => (
            <div key={row.label} className={cn('flex gap-2.5', row.desktopOnly && 'max-lg:hidden')}>
              <dt className="text-muted">{row.label}</dt>
              <dd className="font-semibold text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="text-12 leading-[1.4] font-semibold text-ink">{doc.subject}</p>

      <DocumentItems items={doc.items} subtotal={doc.subtotal} tax={doc.tax} due={doc.due} />

      <footer className="mt-5 flex flex-col gap-1">
        <p className={capsLabel}>
          {doc.notes.mobileTitle ? (
            <>
              <span className="lg:hidden">{doc.notes.mobileTitle}</span>
              <span className="max-lg:hidden">{doc.notes.title}</span>
            </>
          ) : (
            doc.notes.title
          )}
        </p>
        <p className="text-[9.5px] leading-[1.5] text-muted">{doc.notes.body}</p>
      </footer>
    </article>
  );
}
