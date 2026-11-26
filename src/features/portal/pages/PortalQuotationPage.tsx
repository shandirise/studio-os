import { useState } from 'react';
import { Download } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router';
import { Badge, Button, useToast } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { ApproveQuotationModal } from '../components/ApproveQuotationModal';
import { DocumentCanvas } from '../components/DocumentCanvas';
import { PortalDocument } from '../components/PortalDocument';
import { PortalPage } from '../components/PortalPage';
import { PortalPageHeader } from '../components/PortalPageHeader';
import { QuotationActions } from '../components/QuotationActions';
import { portalQuotationTone, portalToday, projectManager, quotationById, type PortalQuotationStatus } from '../data';

/**
 * J4 · Portal Quotation. Mobile follows the design (sheet + sticky decision bar);
 * desktop shows the same sheet on a grey desk with the decision card beside it, like the invoice screen.
 * `?approve=1` opens the approval dialog (M4).
 */
export function PortalQuotationPage() {
  const { quotationId } = useParams();
  const quotation = quotationById(quotationId);
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const [status, setStatus] = useState<PortalQuotationStatus>(quotation.status);
  const [decisionNote, setDecisionNote] = useState<string>();

  const approveOpen = status === 'Menunggu' && params.get('approve') === '1';
  const openApprove = () => setParams({ approve: '1' });
  const closeApprove = () => setParams({}, { replace: true });

  const approve = (signerName: string) => {
    setStatus('Disetujui');
    setDecisionNote(`Disetujui oleh ${signerName} · ${portalToday}`);
    closeApprove();
    toast('Quotation disetujui', `${quotation.number} disetujui. ${projectManager.name} akan menghubungi Anda untuk langkah berikutnya.`);
  };

  const reject = () => {
    setStatus('Ditolak');
    setDecisionNote(`Anda menolak quotation ini · ${portalToday}`);
    toast('Quotation ditolak', `${projectManager.name} sudah diberi tahu.`);
  };

  const requestRevision = () => toast('Permintaan revisi terkirim', `${projectManager.name} akan memperbarui penawaran ini.`);

  const badge = <Badge tone={portalQuotationTone[status]}>{status}</Badge>;
  const actions = {
    total: quotation.total,
    status,
    decisionNote,
    onApprove: openApprove,
    onRequestRevision: requestRevision,
    onReject: reject,
  };

  return (
    <>
      <PortalPage>
        <PortalPageHeader
          title={quotation.number}
          badge={badge}
          subtitle={
            <>
              Berlaku sampai {quotation.validUntil}
              <span className="max-lg:hidden"> · {formatRupiah(quotation.total)}</span>
            </>
          }
          action={
            <Button
              icon={Download}
              className="max-lg:hidden"
              onClick={() => toast('Download dimulai', `${quotation.number}.pdf sedang diunduh.`)}
            >
              Download PDF
            </Button>
          }
        />

        <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-4">
          <DocumentCanvas>
            <PortalDocument doc={quotation.document} status={{ label: status, tone: portalQuotationTone[status] }} />
          </DocumentCanvas>
          <QuotationActions variant="card" className="max-lg:hidden" {...actions} />
        </div>
      </PortalPage>

      <QuotationActions variant="bar" className="lg:hidden" {...actions} />

      <ApproveQuotationModal open={approveOpen} onClose={closeApprove} quotation={quotation} onApprove={approve} />
    </>
  );
}
