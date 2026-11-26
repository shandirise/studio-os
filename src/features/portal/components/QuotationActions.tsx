import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatRupiah } from '@/lib/format';
import type { PortalQuotationStatus } from '../data';

type QuotationActionsProps = {
  total: number;
  status: PortalQuotationStatus;
  /** Shown instead of the buttons once the client has decided. */
  decisionNote?: string;
  onApprove: () => void;
  onRequestRevision: () => void;
  onReject: () => void;
  /** `bar` = sticky bottom bar (mobile design), `card` = side card (desktop). */
  variant: 'bar' | 'card';
  className?: string;
};

/** Total and the client's decision buttons: approve, ask for revision, reject. */
export function QuotationActions({
  total,
  status,
  decisionNote,
  onApprove,
  onRequestRevision,
  onReject,
  variant,
  className,
}: QuotationActionsProps) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="text-12-5 leading-none text-muted">Total</span>
        <span className={cn('leading-none font-bold text-ink', variant === 'bar' ? 'text-[17px]' : 'text-20')}>
          {formatRupiah(total)}
        </span>
      </div>
      {status === 'Menunggu' ? (
        <>
          <Button variant="primary" size="lg" className="w-full" onClick={onApprove}>
            Setujui quotation
          </Button>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={onRequestRevision}>
              Minta revisi
            </Button>
            <Button variant="danger" className="flex-1" onClick={onReject}>
              Tolak
            </Button>
          </div>
        </>
      ) : (
        <p className="rounded-control border border-line bg-subtle p-2.5 text-12-5 leading-[1.4] text-muted">{decisionNote}</p>
      )}
    </>
  );

  if (variant === 'card') {
    return <Card className={cn('flex flex-col gap-3 p-4', className)}>{content}</Card>;
  }

  return (
    <div className={cn('sticky bottom-0 z-20 flex flex-col gap-2 border-t border-line bg-white px-4 pt-3 pb-[18px]', className)}>
      {content}
    </div>
  );
}
