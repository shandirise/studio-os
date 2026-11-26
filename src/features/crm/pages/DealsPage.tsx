import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, PageHeader, Segmented, useToast } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import type { DealStage } from '@/lib/status';
import { DealFiltersBar } from '../components/deals/DealFiltersBar';
import { DealFormModal } from '../components/deals/DealFormModal';
import { DealLostModal } from '../components/deals/DealLostModal';
import { DealsKanban } from '../components/deals/DealsKanban';
import { DealsTable } from '../components/deals/DealsTable';
import { PipelineSummary } from '../components/deals/PipelineSummary';
import {
  deals as initialDeals,
  emptyDealFilters,
  matchesDealFilters,
  pipelineSummary,
  type Deal,
  type LostReason,
} from '../dealData';

type View = 'kanban' | 'table';

const viewOptions: Array<{ value: View; label: string }> = [
  { value: 'kanban', label: 'Kanban' },
  { value: 'table', label: 'Tabel' },
];

/** C5 · Deals — Pipeline. Kanban with drag and drop between stages, or a table view. `?new=1` opens the new-deal form. */
export function DealsPage() {
  useBreadcrumbs([{ label: 'CRM', to: '/crm/contacts' }, { label: 'Deals' }]);
  const toast = useToast();
  const [view, setView] = useState<View>('kanban');
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [filters, setFilters] = useState(emptyDealFilters);
  const [lostDeal, setLostDeal] = useState<Deal | null>(null);
  const [newDealStage, setNewDealStage] = useState<DealStage | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // `?new=1` (e.g. "Buat deal" on a contact) opens the form for a new lead.
  const formStage = newDealStage ?? (searchParams.has('new') ? 'Lead Masuk' : null);

  const visibleDeals = useMemo(() => deals.filter((d) => matchesDealFilters(d, filters)), [deals, filters]);
  const summary = pipelineSummary(deals);

  /** Moves a deal to a stage and puts it at the bottom of that column. */
  const setStage = (id: string, stage: DealStage) =>
    setDeals((list) => {
      const deal = list.find((d) => d.id === id);
      return deal ? [...list.filter((d) => d.id !== id), { ...deal, stage }] : list;
    });

  const moveDeal = (id: string, stage: DealStage) => {
    const deal = deals.find((d) => d.id === id);
    if (!deal || deal.stage === stage) return;
    if (stage === 'Lost') {
      setLostDeal(deal);
      return;
    }
    setStage(id, stage);
    if (stage === 'Won') toast('Deal ditandai Won', `${deal.title} · ${formatRupiah(deal.value)}`);
    else toast('Stage diperbarui', `${deal.title} dipindahkan ke ${stage}`);
  };

  const confirmLost = (reason: LostReason) => {
    if (!lostDeal) return;
    setStage(lostDeal.id, 'Lost');
    toast('Deal ditandai Lost', `${lostDeal.title} · ${reason}`);
    setLostDeal(null);
  };

  const closeDealForm = () => {
    setNewDealStage(null);
    if (searchParams.has('new')) {
      setSearchParams(
        (params) => {
          params.delete('new');
          return params;
        },
        { replace: true },
      );
    }
  };

  const createDeal = (deal: Deal) => {
    setDeals((list) => [...list, deal]);
    closeDealForm();
    toast('Deal ditambahkan', `${deal.title} masuk ke ${deal.stage}`);
  };

  return (
    <Page className="flex-1">
      <PageHeader
        title="Deals"
        subtitle="Pantau semua peluang penjualan per tahap"
        actions={
          <>
            <Segmented options={viewOptions} value={view} onChange={setView} />
            <Button variant="primary" icon={Plus} onClick={() => setNewDealStage('Lead Masuk')}>
              Deal
            </Button>
          </>
        }
      />

      <PipelineSummary total={summary.total} weighted={summary.weighted} wonThisMonth={summary.wonThisMonth} />

      <DealFiltersBar
        filters={filters}
        onChange={setFilters}
        onSaveView={() => toast('View disimpan', 'Filter pipeline ini tersedia di menu view tersimpan.')}
      />

      {view === 'kanban' ? (
        <DealsKanban deals={deals} visibleDeals={visibleDeals} onMove={moveDeal} onAdd={setNewDealStage} />
      ) : (
        <DealsTable deals={visibleDeals} />
      )}

      <DealLostModal deal={lostDeal} onClose={() => setLostDeal(null)} onConfirm={confirmLost} />
      <DealFormModal stage={formStage} onClose={closeDealForm} onCreate={createDeal} />
    </Page>
  );
}
