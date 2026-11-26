import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Eye, Send } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, PageHeader, useToast } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import { formatRupiah } from '@/lib/format';
import {
  AutosaveStatus,
  DocumentPaper,
  EditorLayout,
  LineItemsCard,
  NotesCard,
  SummaryCard,
  useAutosave,
} from '../components/document';
import { QuotationInfoCard } from '../components/quotation/QuotationInfoCard';
import { quotationPaper, quotationTotals } from '../components/quotation/quotationDocument';
import { clientById, createQuotationDraft, findQuotation, saveQuotation, type Quotation } from '../data';

/** D2 · Quotation editor for `/sales/quotations/new` and `/sales/quotations/:id/edit`. */
export function QuotationEditorPage() {
  const { quotationId } = useParams();
  // Keyed so switching between "new" and an existing quotation starts a fresh form.
  return <QuotationEditor key={quotationId ?? 'new'} quotationId={quotationId} />;
}

function QuotationEditor({ quotationId }: { quotationId?: string }) {
  const navigate = useNavigate();
  const toast = useToast();
  const isNew = !quotationId;
  const [form, setForm] = useState<Quotation>(() => (quotationId ? findQuotation(quotationId) : createQuotationDraft()));
  const [previewOpen, setPreviewOpen] = useState(true);
  const autosave = useAutosave();

  useBreadcrumbs([
    { label: 'Sales', to: '/sales/quotations' },
    { label: 'Quotation', to: '/sales/quotations' },
    { label: form.number },
  ]);

  const client = clientById(form.clientId);
  const totals = quotationTotals(form);

  const update = (patch: Partial<Quotation>) => {
    setForm((f) => ({ ...f, ...patch }));
    autosave.touch();
  };

  const saveDraft = () => {
    saveQuotation({ ...form, status: isNew ? 'Draft' : form.status });
    toast(isNew ? 'Draft disimpan' : 'Perubahan disimpan', `${form.number} · ${formatRupiah(totals.total)}`);
    navigate(`/sales/quotations/${form.id}`);
  };

  const send = () => {
    saveQuotation({
      ...form,
      status: 'Terkirim',
      timeline: [
        { id: `sent-${Date.now()}`, icon: 'send', actor: currentUser.name, action: 'mengirim ke klien', time: 'baru saja' },
        ...form.timeline,
      ],
    });
    toast('Quotation terkirim', `${form.number} dikirim ke ${client.email}`);
    navigate(`/sales/quotations/${form.id}`);
  };

  return (
    <Page>
      <PageHeader
        title="Quotation — Editor"
        subtitle={`Penawaran baru untuk ${client.company}`}
        actions={
          <>
            <AutosaveStatus saving={autosave.saving} savedAt={autosave.savedAt} />
            <Button onClick={saveDraft}>Simpan draft</Button>
            <Button icon={Eye} to={`/portal/quotations/${form.id}`}>
              Preview
            </Button>
            <Button variant="primary" icon={Send} onClick={send}>
              Kirim ke klien
            </Button>
          </>
        }
      />

      <EditorLayout
        previewOpen={previewOpen}
        onPreviewOpenChange={setPreviewOpen}
        preview={<DocumentPaper content={quotationPaper(form)} size="compact" />}
        form={
          <>
            <QuotationInfoCard value={form} onChange={update} />
            <LineItemsCard items={form.items} onChange={(items) => update({ items })} />
            <div className="flex flex-col items-start gap-3.5 sm:flex-row">
              <NotesCard
                title="Termin & syarat"
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
