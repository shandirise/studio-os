import { useState } from 'react';
import { Download, Plus, Send } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Card, PageHeader, Pagination, Tabs, useToast, type TabItem } from '@/components/ui';
import { dateRangeOptions, FilterMenu, ListToolbar, useSort, type DateRange } from '@/features/sales/components/document';
import { clients } from '@/features/sales/data';
import type { InvoiceStatus } from '@/lib/status';
import { filterInvoices, invoiceStatus, type InvoiceSortKey, type InvoiceTab } from '../components/invoice/invoiceDocument';
import { InvoiceStatCard } from '../components/invoice/InvoiceStatCard';
import { InvoiceTable } from '../components/invoice/InvoiceTable';
import { INVOICE_TOTAL_COUNT, invoiceProjects, invoiceSummary, invoiceTabCounts, listInvoices } from '../invoiceData';

const PAGE_SIZE = 7;
const statuses: InvoiceStatus[] = ['Draft', 'Terkirim', 'Dibayar Sebagian', 'Lunas', 'Overdue', 'Batal'];

const tabs: TabItem<InvoiceTab>[] = [
  { value: 'all', label: 'Semua', count: invoiceTabCounts.all },
  ...statuses.map((s) => ({ value: s, label: s, count: invoiceTabCounts[s] })),
];

const clientOptions = clients.map((c) => ({ value: c.id, label: c.company }));
const projectOptions = invoiceProjects.map((p) => ({ value: p.id, label: p.name }));

/** F1 · Invoice list. */
export function InvoicesPage() {
  useBreadcrumbs([{ label: 'Finance', to: '/finance/invoices' }, { label: 'Invoice' }]);
  const toast = useToast();

  const [tab, setTab] = useState<InvoiceTab>('all');
  const [query, setQuery] = useState('');
  const [clientId, setClientId] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [page, setPage] = useState(1);
  const [sort, toggleSort] = useSort<InvoiceSortKey>({ key: 'number', direction: 'desc' });

  /** Wraps a filter setter so that changing a filter goes back to page 1. */
  const resetting =
    <T,>(set: (value: T) => void) =>
    (value: T) => {
      set(value);
      setPage(1);
    };

  const all = listInvoices();
  const rows = filterInvoices(all, { tab, query, clientId, projectId, dateRange }, sort);
  const isFiltered = tab !== 'all' || query.trim() !== '' || Boolean(clientId || projectId || dateRange);

  // Unfiltered, the table is page `page` of the full archive from the design; filtered, it shows every match.
  const total = isFiltered ? rows.length : INVOICE_TOTAL_COUNT;
  const visible = isFiltered ? rows : rows.slice(0, PAGE_SIZE);
  const first = isFiltered ? 1 : (page - 1) * PAGE_SIZE + 1;
  const summary = visible.length
    ? `Menampilkan ${first}–${first + visible.length - 1} dari ${total} invoice`
    : 'Tidak ada invoice yang cocok';

  const sendReminders = () => {
    const overdue = all.filter((inv) => invoiceStatus(inv) === 'Overdue').length;
    toast('Reminder terkirim', `${overdue} klien dengan invoice overdue telah diingatkan.`);
  };

  return (
    <Page>
      <PageHeader
        title="Invoice"
        subtitle="Tagihan ke klien"
        actions={
          <>
            <Button icon={Send} onClick={sendReminders}>
              Kirim reminder
            </Button>
            <Button icon={Download} onClick={() => toast('Export dimulai', 'Daftar invoice sedang disiapkan sebagai CSV.')}>
              Export
            </Button>
            <Button variant="primary" icon={Plus} to="/finance/invoices/new">
              Invoice
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
        {invoiceSummary.map((s) => (
          <InvoiceStatCard key={s.label} {...s} />
        ))}
      </div>

      <Tabs items={tabs} value={tab} onChange={resetting(setTab)} />

      <ListToolbar
        query={query}
        onQueryChange={resetting(setQuery)}
        placeholder="Cari nomor atau klien…"
        onSaveView={() => toast('View disimpan', 'Filter invoice ini tersedia di menu view.')}
      >
        <FilterMenu label="Klien" allLabel="Semua klien" options={clientOptions} value={clientId} onChange={resetting(setClientId)} />
        <FilterMenu
          label="Project"
          allLabel="Semua project"
          options={projectOptions}
          value={projectId}
          onChange={resetting(setProjectId)}
        />
        <FilterMenu
          label="Tanggal terbit"
          allLabel="Semua tanggal"
          options={dateRangeOptions}
          value={dateRange}
          onChange={resetting(setDateRange)}
        />
      </ListToolbar>

      <Card className="min-w-0 overflow-hidden">
        <InvoiceTable rows={visible} sort={sort} onSort={toggleSort} />
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
