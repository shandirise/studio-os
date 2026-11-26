import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { Ban, Copy, Download, Ellipsis, FileText, Layers, Pencil, Send, Wallet } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Badge, Button, IconButton, Menu, PageHeader, useToast, type MenuItem } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import { DetailLayout, DocumentPaper, TimelineCard, type TimelineEvent } from '@/features/sales/components/document';
import { clientById } from '@/features/sales/data';
import { formatRupiah } from '@/lib/format';
import { invoiceTone } from '@/lib/status';
import { BalanceCard } from '../components/invoice/BalanceCard';
import {
  dueText,
  invoiceAmount,
  invoiceBalance,
  invoicePaper,
  invoiceStatus,
  paidAmount,
  reminderSchedule,
} from '../components/invoice/invoiceDocument';
import { PaymentHistoryCard } from '../components/invoice/PaymentHistoryCard';
import { RecordPaymentModal } from '../components/invoice/RecordPaymentModal';
import { ReminderScheduleCard } from '../components/invoice/ReminderScheduleCard';
import { findInvoice, projectById, saveInvoice, type Invoice, type Payment } from '../invoiceData';

/** F3 · Invoice detail. Unknown ids fall back to INV-2026-0041; `?pay=1` opens "Catat Pembayaran". */
export function InvoiceDetailPage() {
  const { invoiceId } = useParams();
  return <InvoiceDetail key={invoiceId} invoiceId={invoiceId} />;
}

function myEvent(icon: TimelineEvent['icon'], action: string): TimelineEvent {
  return { id: `${icon}-${Date.now()}`, icon, actor: currentUser.name, action, time: 'baru saja' };
}

function InvoiceDetail({ invoiceId }: { invoiceId?: string }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const [invoice, setInvoice] = useState(() => findInvoice(invoiceId));
  const [payOpen, setPayOpen] = useState(() => params.has('pay'));

  useBreadcrumbs([
    { label: 'Finance', to: '/finance/invoices' },
    { label: 'Invoice', to: '/finance/invoices' },
    { label: invoice.number },
  ]);

  const client = clientById(invoice.clientId);
  const status = invoiceStatus(invoice);
  const amount = invoiceAmount(invoice);
  const paid = paidAmount(invoice);
  const isDraft = invoice.stage === 'Draft';
  const canPay = status !== 'Lunas' && status !== 'Batal' && !isDraft;

  const update = (next: Invoice) => {
    setInvoice(next);
    saveInvoice(next);
  };

  const closePayment = () => {
    setPayOpen(false);
    if (params.has('pay')) setParams({}, { replace: true });
  };

  const recordPayment = (payment: Omit<Payment, 'id'>) => {
    const next: Invoice = {
      ...invoice,
      payments: [...invoice.payments, { ...payment, id: `pay-${Date.now()}` }],
      timeline: [myEvent('wallet', `mencatat pembayaran ${formatRupiah(payment.amount)}`), ...invoice.timeline],
    };
    update(next);
    closePayment();
    toast(
      'Pembayaran dicatat',
      invoiceStatus(next) === 'Lunas'
        ? `${invoice.number} sekarang lunas.`
        : `Sisa tagihan ${invoice.number}: ${formatRupiah(invoiceBalance(next))}.`,
    );
  };

  const sendOrRemind = () => {
    update({
      ...invoice,
      stage: isDraft ? 'Terkirim' : invoice.stage,
      timeline: [myEvent('send', isDraft ? 'mengirim invoice' : 'mengirim reminder'), ...invoice.timeline],
    });
    toast(isDraft ? 'Invoice terkirim' : 'Reminder terkirim', `Dikirim ke ${client.email}`);
  };

  const moreItems: MenuItem[] = [
    { label: 'Edit invoice', icon: Pencil, onSelect: () => navigate(`/finance/invoices/${invoice.id}/edit`) },
    {
      label: 'Duplikat',
      icon: Copy,
      onSelect: () => {
        toast('Invoice diduplikat', `Draft baru dibuat dari ${invoice.number}.`);
        navigate(`/finance/invoices/new${invoice.sourceQuotationId ? `?from=${invoice.sourceQuotationId}` : ''}`);
      },
    },
    ...(invoice.sourceQuotationId
      ? [{ label: 'Lihat quotation', icon: FileText, onSelect: () => navigate(`/sales/quotations/${invoice.sourceQuotationId}`) }]
      : []),
    { label: 'Lihat project', icon: Layers, onSelect: () => navigate(`/projects/${projectById(invoice.projectId).id}`) },
    ...(status !== 'Lunas' && status !== 'Batal'
      ? [
          {
            label: 'Batalkan invoice',
            icon: Ban,
            danger: true,
            onSelect: () => {
              update({ ...invoice, stage: 'Batal', timeline: [myEvent('x', 'membatalkan invoice'), ...invoice.timeline] });
              toast('Invoice dibatalkan', `${invoice.number} tidak lagi ditagihkan.`);
            },
          },
        ]
      : []),
  ];

  return (
    <Page>
      <PageHeader
        title={invoice.number}
        titleAddon={<Badge tone={invoiceTone[status]}>{status}</Badge>}
        subtitle={
          <>
            <Link to={`/crm/companies/${client.id}`} className="hover:text-ink hover:underline">
              {client.company}
            </Link>{' '}
            · {dueText(invoice)}
          </>
        }
        actions={
          <>
            <Menu items={moreItems} trigger={({ toggle }) => <IconButton icon={Ellipsis} label="Lainnya" onClick={toggle} />} />
            <Button icon={Download} onClick={() => toast('PDF diunduh', `${invoice.number}.pdf tersimpan di folder unduhan.`)}>
              Download PDF
            </Button>
            <Button icon={Send} onClick={sendOrRemind} disabled={status === 'Lunas' || status === 'Batal'}>
              {isDraft ? 'Kirim invoice' : 'Kirim reminder'}
            </Button>
            <Button variant="primary" icon={Wallet} onClick={() => setPayOpen(true)} disabled={!canPay}>
              Catat Pembayaran
            </Button>
          </>
        }
      />

      <DetailLayout
        paper={<DocumentPaper content={invoicePaper(invoice)} />}
        side={
          <>
            <BalanceCard balance={invoiceBalance(invoice)} paid={paid} total={amount} />
            <TimelineCard title="Timeline" events={invoice.timeline} />
            <PaymentHistoryCard payments={invoice.payments} />
            <ReminderScheduleCard reminders={reminderSchedule(invoice)} />
          </>
        }
      />

      <RecordPaymentModal
        open={payOpen && canPay}
        onClose={closePayment}
        invoiceNumber={invoice.number}
        company={client.company}
        balance={invoiceBalance(invoice)}
        termLabel={invoice.term?.label ?? null}
        onSave={recordPayment}
      />
    </Page>
  );
}
