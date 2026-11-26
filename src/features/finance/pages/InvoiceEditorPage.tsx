import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { Eye, Send } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, PageHeader, useToast } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import {
  AutosaveStatus,
  DocumentPaper,
  EditorLayout,
  LineItemsCard,
  NotesCard,
  SummaryCard,
  useAutosave,
} from '@/features/sales/components/document';
import { clientById, findQuotation } from '@/features/sales/data';
import { formatRupiah } from '@/lib/format';
import { AutoBillingCard } from '../components/invoice/AutoBillingCard';
import { InvoiceInfoCard } from '../components/invoice/InvoiceInfoCard';
import { invoiceAmount, invoicePaper, invoiceTotals, sourceQuotationNumber } from '../components/invoice/invoiceDocument';
import { createInvoiceDraft, findInvoice, saveInvoice, type Invoice } from '../invoiceData';

/**
 * F2 · Invoice editor for `/finance/invoices/new` (optionally `?from=<quotation id>`)
 * and `/finance/invoices/:id/edit`.
 */
export function InvoiceEditorPage() {
  const { invoiceId } = useParams();
  const [params] = useSearchParams();
  const from = params.get('from') ?? undefined;
  // Keyed so switching between documents starts a fresh form.
  return <InvoiceEditor key={invoiceId ?? `new-${from ?? ''}`} invoiceId={invoiceId} fromQuotationId={from} />;
}

function InvoiceEditor({ invoiceId, fromQuotationId }: { invoiceId?: string; fromQuotationId?: string }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState<Invoice>(() => (invoiceId ? findInvoice(invoiceId) : createInvoiceDraft(fromQuotationId)));
  const [previewOpen, setPreviewOpen] = useState(true);
  const autosave = useAutosave();

  useBreadcrumbs([
    { label: 'Finance', to: '/finance/invoices' },
    { label: 'Invoice', to: '/finance/invoices' },
    { label: form.number },
  ]);

  const client = clientById(form.clientId);
  const totals = invoiceTotals(form);
  const sourceNumber = sourceQuotationNumber(form);

  const update = (patch: Partial<Invoice>) => {
    setForm((f) => ({ ...f, ...patch }));
    autosave.touch();
  };

  /** Picking a quotation copies its scope and items; "manual" bills the full total. */
  const changeSource = (quotationId: string | null) => {
    if (!quotationId) {
      update({ sourceQuotationId: null, term: null });
      return;
    }
    const quotation = findQuotation(quotationId);
    update({
      sourceQuotationId: quotation.id,
      subject: quotation.subject,
      items: quotation.items.map((item) => ({ ...item, id: `${form.id}-${item.id}` })),
      discount: quotation.discount,
      taxRate: quotation.taxRate,
      term: form.term ?? { label: 'DP 50%', percent: 50 },
    });
  };

  const saveDraft = () => {
    saveInvoice(form);
    toast(invoiceId ? 'Perubahan disimpan' : 'Draft disimpan', `${form.number} · ${formatRupiah(invoiceAmount(form))}`);
    navigate(`/finance/invoices/${form.id}`);
  };

  const send = () => {
    saveInvoice({
      ...form,
      stage: 'Terkirim',
      timeline: [
        { id: `sent-${Date.now()}`, icon: 'send', actor: currentUser.name, action: 'mengirim invoice', time: 'baru saja' },
        ...form.timeline,
      ],
    });
    toast('Invoice terkirim', `${form.number} dikirim ke ${client.email}`);
    navigate(`/finance/invoices/${form.id}`);
  };

  return (
    <Page>
      <PageHeader
        title="Invoice — Editor"
        subtitle={form.term && sourceNumber ? `Invoice ${form.term.label} dari ${sourceNumber}` : `Invoice untuk ${client.company}`}
        actions={
          <>
            <AutosaveStatus saving={autosave.saving} savedAt={autosave.savedAt} />
            <Button onClick={saveDraft}>Simpan draft</Button>
            <Button icon={Eye} to="/portal/invoices">
              Preview
            </Button>
            <Button variant="primary" icon={Send} onClick={send}>
              Kirim invoice
            </Button>
          </>
        }
      />

      <EditorLayout
        previewOpen={previewOpen}
        onPreviewOpenChange={setPreviewOpen}
        preview={<DocumentPaper content={invoicePaper(form)} size="compact" />}
        form={
          <>
            <InvoiceInfoCard value={form} onChange={update} onSourceChange={changeSource} />
            <AutoBillingCard
              recurring={form.recurring}
              reminders={form.reminders}
              onRecurringChange={(recurring) => update({ recurring })}
              onReminderChange={(key, enabled) => update({ reminders: { ...form.reminders, [key]: enabled } })}
            />
            <LineItemsCard items={form.items} onChange={(items) => update({ items })} />
            <div className="flex flex-col items-start gap-3.5 sm:flex-row">
              <NotesCard
                title="Instruksi pembayaran"
                value={form.notes}
                onChange={(notes) => update({ notes })}
                className="w-full sm:flex-1"
              />
              <SummaryCard totals={totals} taxRate={form.taxRate} onDiscountChange={(discount) => update({ discount })} />
            </div>
          </>
        }
      />
    </Page>
  );
}
