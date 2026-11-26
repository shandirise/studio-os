import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Download, Layers, ReceiptText, Send } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Badge, Button, PageHeader, useToast } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import { formatRupiah } from '@/lib/format';
import { quotationTone } from '@/lib/status';
import { DetailLayout, DocumentPaper, TimelineCard, type TimelineEvent } from '../components/document';
import { ClientCommentsCard } from '../components/quotation/ClientCommentsCard';
import { PublicLinkCard } from '../components/quotation/PublicLinkCard';
import { quotationHeaderStatus, quotationPaper, quotationTotals } from '../components/quotation/quotationDocument';
import { clientById, findQuotation, saveQuotation, type Quotation } from '../data';

/** D3 · Quotation detail. Unknown ids fall back to QUO-2026-0012. */
export function QuotationDetailPage() {
  const { quotationId } = useParams();
  return <QuotationDetail key={quotationId} quotationId={quotationId} />;
}

function myEvent(icon: TimelineEvent['icon'], action: string): TimelineEvent {
  return { id: `${icon}-${Date.now()}`, icon, actor: currentUser.name, action, time: 'baru saja' };
}

function QuotationDetail({ quotationId }: { quotationId?: string }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [quotation, setQuotation] = useState(() => findQuotation(quotationId));

  useBreadcrumbs([
    { label: 'Sales', to: '/sales/quotations' },
    { label: 'Quotation', to: '/sales/quotations' },
    { label: quotation.number },
  ]);

  const client = clientById(quotation.clientId);
  const totals = quotationTotals(quotation);
  const isDraft = quotation.status === 'Draft';

  const update = (next: Quotation) => {
    setQuotation(next);
    saveQuotation(next);
  };

  const send = () => {
    update({
      ...quotation,
      status: isDraft ? 'Terkirim' : quotation.status,
      timeline: [myEvent('send', isDraft ? 'mengirim ke klien' : 'mengirim ulang ke klien'), ...quotation.timeline],
    });
    toast(isDraft ? 'Quotation terkirim' : 'Quotation dikirim ulang', `Dikirim ke ${client.email}`);
  };

  const convertToProject = () => {
    toast('Project dibuat', `Project dari ${quotation.number} siap direncanakan.`);
    navigate('/projects/website-corporate-v1');
  };

  const reply = (text: string) =>
    update({
      ...quotation,
      comments: [...quotation.comments, { id: `reply-${Date.now()}`, author: currentUser.name, time: 'baru saja', text }],
    });

  return (
    <Page>
      <PageHeader
        title={quotation.number}
        titleAddon={<Badge tone={quotationTone[quotation.status]}>{quotationHeaderStatus(quotation.status)}</Badge>}
        subtitle={
          <>
            <Link to={`/crm/companies/${client.id}`} className="hover:text-ink hover:underline">
              {client.company}
            </Link>{' '}
            · {formatRupiah(totals.total)}
          </>
        }
        actions={
          <>
            <Button
              disabled={!isDraft}
              title={isDraft ? undefined : 'Quotation yang sudah dikirim tidak dapat diedit'}
              onClick={() => navigate(`/sales/quotations/${quotation.id}/edit`)}
            >
              Edit
            </Button>
            <Button icon={Download} onClick={() => toast('PDF diunduh', `${quotation.number}.pdf tersimpan di folder unduhan.`)}>
              Download PDF
            </Button>
            <Button icon={Send} onClick={send}>
              {isDraft ? 'Kirim ke klien' : 'Kirim ulang'}
            </Button>
            <Button icon={Layers} onClick={convertToProject}>
              Konversi ke Project
            </Button>
            <Button variant="primary" icon={ReceiptText} to={`/finance/invoices/new?from=${quotation.id}`}>
              Buat Invoice
            </Button>
          </>
        }
      />

      <DetailLayout
        paper={<DocumentPaper content={quotationPaper(quotation)} />}
        side={
          <>
            <TimelineCard title="Status & timeline" events={quotation.timeline} />
            <PublicLinkCard link={quotation.publicLink} portalPath={`/portal/quotations/${quotation.id}`} />
            <ClientCommentsCard comments={quotation.comments} onReply={reply} />
          </>
        }
      />
    </Page>
  );
}
