import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Card, PageHeader, useToast } from '@/components/ui';
import { FilterMenu } from '../components/ledger/FilterMenu';
import { LedgerPagination } from '../components/ledger/LedgerPagination';
import { LedgerStatCard } from '../components/ledger/LedgerStatCard';
import { LedgerToolbar } from '../components/ledger/LedgerToolbar';
import { PaymentsTable } from '../components/ledger/PaymentsTable';
import {
  paymentCount,
  paymentMethods,
  paymentPageSize,
  payments,
  paymentStats,
  periodOptions,
  sortByDate,
  type SortDirection,
} from '../ledgerData';

const clients = [...new Set(payments.map((p) => p.client))].sort();

/** F4 · Pembayaran — incoming client payments. */
export function PaymentsPage() {
  useBreadcrumbs([{ label: 'Finance', to: '/finance/invoices' }, { label: 'Pembayaran' }]);
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState<string | null>(null);
  const [method, setMethod] = useState<string | null>(null);
  const [client, setClient] = useState<string | null>(null);
  const [sort, setSort] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);

  const filtered = query.trim() !== '' || period !== null || method !== null || client !== null;

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = periodOptions.find((o) => o.label === period)?.from;
    const matches = payments.filter(
      (p) =>
        (!q || p.invoiceNumber.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)) &&
        (!from || p.date >= from) &&
        (!method || p.method === method) &&
        (!client || p.client === client),
    );
    return sortByDate(matches, sort);
  }, [query, period, method, client, sort]);

  // Each filter change starts again from the first page.
  const withPageReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const resetFilters = () => {
    setQuery('');
    setPeriod(null);
    setMethod(null);
    setClient(null);
    setPage(1);
  };

  return (
    <Page>
      <PageHeader
        title="Pembayaran"
        subtitle="Pembayaran masuk dari klien"
        actions={
          <Button icon={Download} onClick={() => toast('Export dimulai', 'Daftar pembayaran sedang disiapkan.')}>
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
        {paymentStats.map((stat) => (
          <LedgerStatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <LedgerToolbar query={query} onQueryChange={withPageReset(setQuery)} searchPlaceholder="Cari invoice atau klien…">
        <FilterMenu label="Periode" options={periodOptions.map((o) => o.label)} value={period} onChange={withPageReset(setPeriod)} />
        <FilterMenu label="Metode" options={paymentMethods} value={method} onChange={withPageReset(setMethod)} />
        <FilterMenu label="Klien" options={clients} value={client} onChange={withPageReset(setClient)} />
      </LedgerToolbar>

      <Card className="min-w-0 overflow-hidden">
        <PaymentsTable
          rows={rows}
          sort={sort}
          onToggleSort={() => setSort((s) => (s === 'desc' ? 'asc' : 'desc'))}
          onResetFilters={resetFilters}
        />
        <LedgerPagination
          page={page}
          onPageChange={setPage}
          total={filtered ? rows.length : paymentCount}
          pageSize={paymentPageSize}
          noun="pembayaran"
        />
      </Card>
    </Page>
  );
}
