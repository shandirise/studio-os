import { useState } from 'react';
import { Download } from 'lucide-react';
import { Badge, Button, Card, useToast } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { invoiceTone } from '@/lib/status';
import { DocumentCanvas } from '../components/DocumentCanvas';
import { PaymentHistoryCard } from '../components/PaymentHistoryCard';
import { PaymentMethodCard } from '../components/PaymentMethodCard';
import { PortalDocument } from '../components/PortalDocument';
import { PortalPage } from '../components/PortalPage';
import { PortalPageHeader } from '../components/PortalPageHeader';
import { TransferProofCard } from '../components/TransferProofCard';
import { portalInvoice, portalToday, type PaymentRecord } from '../data';

/** J5 · Portal Invoice: the invoice sheet plus how to pay and where to send the transfer receipt. */
export function PortalInvoicesPage() {
  const invoice = portalInvoice;
  const toast = useToast();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const status = { label: invoice.statusLabel, tone: invoiceTone.Terkirim };

  const addProof = (fileName: string) =>
    setPayments((list) => [...list, { id: `proof-${list.length + 1}`, label: `Bukti transfer ${fileName} · menunggu verifikasi`, date: portalToday }]);

  return (
    <PortalPage>
      <PortalPageHeader
        title={invoice.number}
        badge={<Badge tone={status.tone}>{status.label}</Badge>}
        subtitle={
          <>
            Jatuh tempo {invoice.dueDate}
            <span className="max-lg:hidden"> · {formatRupiah(invoice.amountDue)}</span>
          </>
        }
        action={
          <Button icon={Download} className="max-lg:hidden" onClick={() => toast('Download dimulai', `${invoice.number}.pdf sedang diunduh.`)}>
            Download PDF
          </Button>
        }
      />

      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-4">
        <div className="flex min-w-0 flex-col gap-3 lg:col-start-2 lg:row-start-1 lg:gap-3.5">
          <Card className="flex flex-col gap-1.5 p-3.5 lg:hidden">
            <span className="text-12 leading-none text-muted">Total tagihan</span>
            <span className="text-24 leading-[1.1] font-bold tracking-[-0.015em] text-ink">{formatRupiah(invoice.amountDue)}</span>
          </Card>
          <PaymentMethodCard />
          <TransferProofCard onSubmit={addProof} />
          <PaymentHistoryCard records={payments} className="max-lg:hidden" />
        </div>
        <DocumentCanvas className="lg:col-start-1 lg:row-start-1">
          <PortalDocument doc={invoice.document} status={status} />
        </DocumentCanvas>
      </div>
    </PortalPage>
  );
}
