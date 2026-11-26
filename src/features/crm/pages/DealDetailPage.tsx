import { useState } from 'react';
import { Check, FileText, Pencil } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Badge, Button, PageHeader, Tabs, useToast, type TabItem } from '@/components/ui';
import { currentUser, memberById } from '@/data/workspace';
import { formatRupiah } from '@/lib/format';
import { dealStageTone, type DealStage } from '@/lib/status';
import { DealContactCard } from '../components/deals/DealContactCard';
import { DealFilesCard } from '../components/deals/DealFilesCard';
import { DealFilesTab } from '../components/deals/DealFilesTab';
import { DealLostModal } from '../components/deals/DealLostModal';
import { DealNotesTab } from '../components/deals/DealNotesTab';
import { DealQuotationCard } from '../components/deals/DealQuotationCard';
import { DealQuotationsTab } from '../components/deals/DealQuotationsTab';
import { DealStageCard } from '../components/deals/DealStageCard';
import { DealTimeline } from '../components/deals/DealTimeline';
import { LogActivityModal } from '../components/deals/LogActivityModal';
import {
  dealDetail,
  findDeal,
  formatDate,
  isOpenStage,
  logActivityKinds,
  stageProbability,
  type Deal,
  type DealFile,
  type LostReason,
  type TimelineEntry,
  type TimelineKind,
} from '../dealData';

type DetailTab = 'timeline' | 'notes' | 'files' | 'quotations';

const tabs: TabItem<DetailTab>[] = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'notes', label: 'Catatan' },
  { value: 'files', label: 'File' },
  { value: 'quotations', label: 'Quotation' },
];

/** C6 · Deal — Detail. Any id works; unknown ids show the designed record. */
export function DealDetailPage() {
  const { dealId } = useParams();
  const deal = findDeal(dealId);
  // Keyed so local state (stage, timeline…) resets when navigating to another deal.
  return <DealDetailView key={deal.id} deal={deal} />;
}

function DealDetailView({ deal }: { deal: Deal }) {
  useBreadcrumbs([{ label: 'CRM', to: '/crm/contacts' }, { label: 'Deals', to: '/crm/deals' }, { label: deal.title }]);
  const toast = useToast();
  const owner = memberById(deal.ownerId);
  const initial = dealDetail(deal, owner.name);

  const [stage, setStage] = useState<DealStage>(deal.stage);
  const [reachedStage, setReachedStage] = useState<DealStage>(isOpenStage(deal.stage) ? deal.stage : 'Negosiasi');
  const [timeline, setTimeline] = useState<TimelineEntry[]>(initial.timeline);
  const [files, setFiles] = useState<DealFile[]>(initial.files);
  const [tab, setTab] = useState<DetailTab>('timeline');
  const [logOpen, setLogOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const lostOpen = searchParams.has('lost');

  const setLostOpen = (open: boolean) =>
    setSearchParams(
      (params) => {
        if (open) params.set('lost', '1');
        else params.delete('lost');
        return params;
      },
      { replace: true },
    );

  const addEntry = (entry: Omit<TimelineEntry, 'id' | 'who' | 'when'>) =>
    setTimeline((list) => [{ id: `t-${Date.now()}`, who: currentUser.name, when: 'Baru saja', ...entry }, ...list]);

  const moveTo = (next: DealStage) => {
    if (next === stage) return;
    if (next === 'Lost') {
      setLostOpen(true);
      return;
    }
    setStage(next);
    if (isOpenStage(next)) setReachedStage(next);
    addEntry({ kind: 'stage', action: `memindahkan ke ${next}` });
    if (next === 'Won') toast('Deal ditandai Won', `${deal.title} · ${formatRupiah(deal.value)}`);
    else toast('Stage diperbarui', `Deal dipindahkan ke ${next}`);
  };

  const confirmLost = (reason: LostReason, note: string) => {
    setStage('Lost');
    addEntry({ kind: 'stage', action: `menandai Lost · ${reason}`, note: note || undefined });
    setLostOpen(false);
    toast('Deal ditandai Lost', `Alasan: ${reason}`);
  };

  const logActivity = (kind: TimelineKind, note: string) => {
    const action = logActivityKinds.find((k) => k.value === kind)?.action ?? 'mencatat aktivitas';
    addEntry({ kind, action, note });
    setLogOpen(false);
    setTab('timeline');
    toast('Aktivitas dicatat', deal.title);
  };

  const probability = stageProbability[stage];
  const properties = [
    { label: 'PIC', value: owner.name },
    { label: 'Estimasi closing', value: formatDate(deal.closingDate) },
    { label: 'Probabilitas', value: `${probability}%` },
    { label: 'Nilai tertimbang', value: formatRupiah((deal.value * probability) / 100) },
    { label: 'Sumber', value: deal.source },
  ];

  return (
    <Page>
      <PageHeader
        title={deal.title}
        titleAddon={<Badge tone={dealStageTone[stage]}>{stage}</Badge>}
        subtitle={`${formatRupiah(deal.value)} · ${deal.company.name}`}
        actions={
          <>
            <Button icon={Pencil} onClick={() => setLogOpen(true)}>
              Log aktivitas
            </Button>
            <Button variant="danger" onClick={() => setLostOpen(true)} disabled={stage === 'Lost'}>
              Lost
            </Button>
            <Button icon={Check} onClick={() => moveTo('Won')} disabled={stage === 'Won'}>
              Won
            </Button>
            <Button variant="primary" icon={FileText} to="/sales/quotations/new">
              Buat quotation
            </Button>
          </>
        }
      />

      <DealStageCard stage={stage} reachedStage={reachedStage} onSelectStage={moveTo} properties={properties} />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-3.5">
          <Tabs items={tabs} value={tab} onChange={setTab} />
          {tab === 'timeline' && <DealTimeline entries={timeline} />}
          {tab === 'notes' && (
            <DealNotesTab
              notes={timeline.filter((e) => e.note)}
              onAddNote={(note) => {
                addEntry({ kind: 'note', action: 'menambahkan catatan', note });
                toast('Catatan disimpan', deal.title);
              }}
            />
          )}
          {tab === 'files' && (
            <DealFilesTab
              files={files}
              onUpload={(file) => {
                setFiles((list) => [...list, file]);
                toast('File diupload', file.name);
              }}
            />
          )}
          {tab === 'quotations' && <DealQuotationsTab quotations={initial.quotations} />}
        </div>

        <aside className="flex flex-col gap-3.5">
          <DealContactCard contact={deal.contact} company={deal.company} />
          <DealQuotationCard quotations={initial.quotations} />
          <DealFilesCard files={files} />
        </aside>
      </div>

      <DealLostModal deal={lostOpen ? deal : null} onClose={() => setLostOpen(false)} onConfirm={confirmLost} />
      <LogActivityModal open={logOpen} dealTitle={deal.title} onClose={() => setLogOpen(false)} onLog={logActivity} />
    </Page>
  );
}
