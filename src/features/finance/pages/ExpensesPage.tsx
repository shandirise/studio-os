import { useMemo, useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Card, PageHeader, useToast } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { AddExpenseModal } from '../components/ledger/AddExpenseModal';
import { ExpenseBreakdownCard } from '../components/ledger/ExpenseBreakdownCard';
import { ExpensesTable } from '../components/ledger/ExpensesTable';
import { FilterMenu } from '../components/ledger/FilterMenu';
import { LedgerPagination } from '../components/ledger/LedgerPagination';
import { LedgerToolbar } from '../components/ledger/LedgerToolbar';
import {
  expenseCategories,
  expenseCount,
  expensePageSize,
  expenseProjects,
  expenses as initialExpenses,
  periodOptions,
  sortByDate,
  type Expense,
  type SortDirection,
} from '../ledgerData';

/** F5 · Pengeluaran — operational and project spend. `?new=1` opens the add dialog. */
export function ExpensesPage() {
  useBreadcrumbs([{ label: 'Finance', to: '/finance/invoices' }, { label: 'Pengeluaran' }]);
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState(initialExpenses);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [period, setPeriod] = useState<string | null>(null);
  const [project, setProject] = useState<string | null>(null);
  const [sort, setSort] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);

  const modalOpen = searchParams.get('new') === '1';
  const setModalOpen = (open: boolean) =>
    setSearchParams(
      (params) => {
        if (open) params.set('new', '1');
        else params.delete('new');
        return params;
      },
      { replace: !open },
    );

  const filtered = query.trim() !== '' || category !== null || period !== null || project !== null;

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = periodOptions.find((o) => o.label === period)?.from;
    const matches = items.filter(
      (e) =>
        (!q || e.description.toLowerCase().includes(q) || e.project.toLowerCase().includes(q)) &&
        (!category || e.category === category) &&
        (!from || e.date >= from) &&
        (!project || e.project === project),
    );
    return sortByDate(matches, sort);
  }, [items, query, category, period, project, sort]);

  // Each filter change starts again from the first page.
  const withPageReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const resetFilters = () => {
    setQuery('');
    setCategory(null);
    setPeriod(null);
    setProject(null);
    setPage(1);
  };

  const addExpense = (expense: Expense) => {
    setItems((list) => [expense, ...list]);
    setModalOpen(false);
    toast('Pengeluaran dicatat', `${expense.description} · ${formatRupiah(expense.amount)}`);
  };

  // Entries added here join the first page and the recorded total.
  const added = items.length - initialExpenses.length;

  return (
    <Page>
      <PageHeader
        title="Pengeluaran"
        subtitle="Biaya operasional dan project"
        actions={
          <>
            <Button icon={Download} onClick={() => toast('Export dimulai', 'Daftar pengeluaran sedang disiapkan.')}>
              Export
            </Button>
            <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
              Pengeluaran
            </Button>
          </>
        }
      />

      <ExpenseBreakdownCard />

      <LedgerToolbar query={query} onQueryChange={withPageReset(setQuery)} searchPlaceholder="Cari pengeluaran…">
        <FilterMenu label="Kategori" options={expenseCategories} value={category} onChange={withPageReset(setCategory)} />
        <FilterMenu label="Periode" options={periodOptions.map((o) => o.label)} value={period} onChange={withPageReset(setPeriod)} />
        <FilterMenu label="Project" options={expenseProjects} value={project} onChange={withPageReset(setProject)} />
      </LedgerToolbar>

      <Card className="min-w-0 overflow-hidden">
        <ExpensesTable
          rows={rows}
          sort={sort}
          onToggleSort={() => setSort((s) => (s === 'desc' ? 'asc' : 'desc'))}
          onResetFilters={resetFilters}
        />
        <LedgerPagination
          page={page}
          onPageChange={setPage}
          total={filtered ? rows.length : expenseCount + added}
          pageSize={expensePageSize + added}
          noun="pengeluaran"
        />
      </Card>

      <AddExpenseModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addExpense} />
    </Page>
  );
}
