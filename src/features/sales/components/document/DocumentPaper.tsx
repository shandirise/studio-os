import { LogoMark } from '@/components/layout/Logo';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/cn';
import { DocumentItemsTable } from './DocumentItemsTable';
import { DocumentTotalsBlock } from './DocumentTotalsBlock';
import { issuer } from './issuer';
import type { PaperContent } from './types';

type DocumentPaperProps = {
  content: PaperContent;
  /** `compact` = live preview column (26px padding), `regular` = detail page canvas (36px). */
  size?: 'compact' | 'regular';
  className?: string;
};

const capsLabel = 'text-9 leading-none font-semibold tracking-[0.08em] text-faint';

/** The quotation / invoice as the client sees it (A4-like white sheet). */
export function DocumentPaper({ content, size = 'regular', className }: DocumentPaperProps) {
  const { heading, number, status, recipient, meta, subject, items, totals, taxRate, due, notes } = content;

  return (
    <article
      className={cn(
        'flex flex-col gap-[18px] border border-line bg-white text-ink',
        size === 'compact' ? 'p-[26px]' : 'p-6 sm:p-9',
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex w-[230px] min-w-0 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <LogoMark className="size-6 text-13" />
            <span className="text-13 leading-none font-bold">{issuer.name}</span>
          </div>
          <p className="text-[9.5px] leading-[1.45] whitespace-pre-line text-muted">{issuer.address}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-[3px] text-right">
          <p className="text-18 leading-[1.1] font-bold tracking-[0.04em]">{heading}</p>
          <p className="text-11 leading-[1.2] font-medium text-muted">{number}</p>
          <Badge tone={status.tone} className="h-[18px] text-10">
            {status.label}
          </Badge>
        </div>
      </header>

      <div className="h-px bg-line" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex w-[200px] min-w-0 flex-col gap-[3px]">
          <p className={capsLabel}>KEPADA</p>
          <p className="text-12 leading-[1.3] font-semibold">{recipient.contactName}</p>
          <p className="text-10 leading-[1.45] whitespace-pre-line text-muted">
            {recipient.company}
            {'\n'}
            {recipient.address}
          </p>
        </div>
        <dl className="flex shrink-0 flex-col items-end gap-1 text-10 leading-[1.2]">
          {meta.map((row) => (
            <div key={row.label} className="flex gap-2.5">
              <dt className="text-muted">{row.label}</dt>
              <dd className="font-semibold">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="text-12 leading-[1.4] font-semibold break-words">{subject || 'Judul dokumen'}</p>

      <DocumentItemsTable items={items} />

      <DocumentTotalsBlock totals={totals} taxRate={taxRate} due={due} />

      <div className="mt-5 flex flex-col gap-1">
        <p className={capsLabel}>{notes.label}</p>
        <p className="text-[9.5px] leading-[1.5] whitespace-pre-line text-muted">{notes.text}</p>
      </div>
    </article>
  );
}
