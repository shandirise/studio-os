import { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Card, PageHeader, Pagination, Tabs, useToast, type TabItem } from '@/components/ui';
import { team } from '@/data/workspace';
import type { QuotationStatus } from '@/lib/status';
import { dateRangeOptions, FilterMenu, ListToolbar, useSort, type DateRange } from '../components/document';
import { filterQuotations, type QuotationSortKey, type QuotationTab } from '../components/quotation/quotationDocument';
import { QuotationTable } from '../components/quotation/QuotationTable';
import { clients, listQuotations, QUOTATION_TOTAL_COUNT, quotationTabCounts } from '../data';

const PAGE_SIZE = 7;
const statuses: QuotationStatus[] = ['Draft', 'Terkirim', 'Dilihat', 'Disetujui', 'Ditolak', 'Kadaluarsa'];

const tabs: TabItem<QuotationTab>[] = [
  { value: 'all', label: 'Semua', count: quotationTabCounts.all },
  ...statuses.map((s) => ({ value: s, label: s, count: quotationTabCounts[s] })),
];

const clientOptions = clients.map((c) => ({ value: c.id, label: c.company }));
const creatorOptions = team.map((m) => ({ value: m.id, label: m.name }));

/** D1 · Quotation list. */
export function QuotationsPage() {
  useBreadcrumbs([{ label: 'Sales', to: '/sales/quotations' }, { label: 'Quotation' }]);
  const toast = useToast();

  const [tab, setTab] = useState<QuotationTab>('all');
  const [query, setQuery] = useState('');
  const [clientId, setClientId] = useState<string | null>(null);
  const [createdBy, setCreatedBy] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [page, setPage] = useState(1);
  const [sort, toggleSort] = useSort<QuotationSortKey>({ key: 'number', direction: 'desc' });

  /** Wraps a filter setter so that changing a filter goes back to page 1. */
  const resetting =
    <T,>(set: (value: T) => void) =>
    (value: T) => {
      set(value);
      setPage(1);
    };

  const rows = filterQuotations(listQuotations(), { tab, query, clientId, createdBy, dateRange }, sort);
  const isFiltered = tab !== 'all' || query.trim() !== '' || Boolean(clientId || createdBy || dateRange);

  // Unfiltered, the table is page `page` of the full archive from the design; filtered, it shows every match.
  const total = isFiltered ? rows.length : QUOTATION_TOTAL_COUNT;
  const visible = isFiltered ? rows : rows.slice(0, PAGE_SIZE);
  const first = isFiltered ? 1 : (page - 1) * PAGE_SIZE + 1;
  const summary = visible.length
    ? `Menampilkan ${first}–${first + visible.length - 1} dari ${total} quotation`
    : 'Tidak ada quotation yang cocok';

  return (
    <Page>
      <PageHeader
        title="Quotation"
        subtitle={`Penawaran ke klien · ${QUOTATION_TOTAL_COUNT} dokumen`}
        actions={
          <>
            <Button icon={Download} onClick={() => toast('Export dimulai', 'Daftar quotation sedang disiapkan sebagai CSV.')}>
              Export
            </Button>
            <Button variant="primary" icon={Plus} to="/sales/quotations/new">
              Quotation
            </Button>
          </>
        }
      />

      <Tabs items={tabs} value={tab} onChange={resetting(setTab)} />

      <ListToolbar
        query={query}
        onQueryChange={resetting(setQuery)}
        placeholder="Cari nomor atau klien…"
        onSaveView={() => toast('View disimpan', 'Filter quotation ini tersedia di menu view.')}
      >
        <FilterMenu label="Klien" allLabel="Semua klien" options={clientOptions} value={clientId} onChange={resetting(setClientId)} />
        <FilterMenu
          label="Dibuat oleh"
          allLabel="Semua anggota"
          options={creatorOptions}
          value={createdBy}
          onChange={resetting(setCreatedBy)}
        />
        <FilterMenu
          label="Tanggal"
          allLabel="Semua tanggal"
          options={dateRangeOptions}
          value={dateRange}
          onChange={resetting(setDateRange)}
        />
      </ListToolbar>

      <Card className="min-w-0 overflow-hidden">
        <QuotationTable rows={visible} sort={sort} onSort={toggleSort} />
        <Pagination
          summary={summary}
          page={isFiltered ? 1 : page}
          pageCount={isFiltered ? 1 : Math.ceil(total / PAGE_SIZE)}
          onPageChange={setPage}
          className="py-[9px]"
        />
      </Card>
    </Page>
  );
}
