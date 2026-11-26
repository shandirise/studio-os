import { useMemo, useState } from 'react';
import { Download, Landmark, Plus, Upload } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Card, EmptyState, PageHeader, Pagination, useToast } from '@/components/ui';
import { team } from '@/data/workspace';
import { AddCompanyModal } from '../components/companies/AddCompanyModal';
import { CompaniesTable, type CompanySort, type CompanySortKey } from '../components/companies/CompaniesTable';
import { CompaniesToolbar, emptyCompanyFilters, type CompanyFilters } from '../components/companies/CompaniesToolbar';
import { BulkActionBar, BulkActionButton, BulkActionMenu } from '../components/contacts/BulkActionBar';
import { useRowSelection } from '../components/contacts/useRowSelection';
import { companies as initialCompanies, companyTotals, contactCountByCompany, type Company } from '../contactData';

const PAGE_SIZE = 8;

function matchesQuery(company: Company, query: string): boolean {
  if (!query) return true;
  return [company.name, company.industry, company.city, company.area].some((v) => v.toLowerCase().includes(query));
}

function matchesFilters(company: Company, f: CompanyFilters): boolean {
  return (
    (!f.industry || company.industry === f.industry) &&
    (!f.size || company.size === f.size) &&
    (!f.picId || company.picId === f.picId) &&
    (!f.city || company.city === f.city)
  );
}

function compare(a: Company, b: Company, key: CompanySortKey): number {
  return key === 'name' ? a.name.localeCompare(b.name, 'id') : a.revenue - b.revenue;
}

/** C3 · Perusahaan — List */
export function CompaniesPage() {
  useBreadcrumbs([{ label: 'CRM', to: '/crm/contacts' }, { label: 'Perusahaan' }]);
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [list, setList] = useState<Company[]>(initialCompanies);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<CompanyFilters>(emptyCompanyFilters);
  const [sort, setSort] = useState<CompanySort>(null);
  const [page, setPage] = useState(1);
  const { selected, toggle, toggleAll, clear } = useRowSelection();
  const contactCounts = useMemo(() => contactCountByCompany(), []);

  const modalOpen = searchParams.get('new') === '1';
  const setModalOpen = (open: boolean) =>
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (open) params.set('new', '1');
        else params.delete('new');
        return params;
      },
      { replace: true },
    );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = list.filter((c) => matchesQuery(c, q) && matchesFilters(c, filters));
    if (!sort) return rows;
    const dir = sort.direction === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => compare(a, b, sort.key) * dir);
  }, [list, query, filters, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = (currentPage - 1) * PAGE_SIZE + rows.length;

  const resetPage = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
    clear();
  };

  // Name sorts A→Z first, revenue sorts highest first; a third click clears the sort.
  const toggleSort = (key: CompanySortKey) => {
    const first = key === 'name' ? 'asc' : 'desc';
    setSort((s) => {
      if (s?.key !== key) return { key, direction: first };
      if (s.direction === first) return { key, direction: first === 'asc' ? 'desc' : 'asc' };
      return null;
    });
  };

  const changePic = (picId: string, name: string) => {
    setList((all) => all.map((c) => (selected.has(c.id) ? { ...c, picId } : c)));
    toast(`PIC diubah ke ${name}`, `${selected.size} perusahaan diperbarui.`);
    clear();
  };

  const deleteSelected = () => {
    const count = selected.size;
    setList((all) => all.filter((c) => !selected.has(c.id)));
    clear();
    toast('Perusahaan dihapus', `${count} perusahaan dihapus dari daftar.`);
  };

  const addCompany = (company: Company) => {
    setList((all) => [company, ...all]);
    setQuery('');
    setFilters(emptyCompanyFilters);
    setSort(null);
    setPage(1);
    toast('Perusahaan disimpan', `${company.name} ditambahkan ke daftar perusahaan.`);
  };

  const hasFilters = query.trim() !== '' || Object.values(filters).some(Boolean);

  return (
    <Page>
      <PageHeader
        title="Perusahaan"
        subtitle={`${companyTotals.count} perusahaan · total revenue ${companyTotals.revenueLabel}`}
        actions={
          <>
            <Button icon={Upload} to="/crm/import">
              Import CSV
            </Button>
            <Button icon={Download} onClick={() => toast('Export dimulai', `${filtered.length} perusahaan sedang disiapkan sebagai CSV.`)}>
              Export
            </Button>
            <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
              Perusahaan
            </Button>
          </>
        }
      />

      <CompaniesToolbar
        query={query}
        onQueryChange={resetPage(setQuery)}
        filters={filters}
        onFiltersChange={resetPage(setFilters)}
        onSaveView={() => toast('View disimpan', 'Filter saat ini tersimpan di daftar view Anda.')}
      />

      {selected.size > 0 && (
        <BulkActionBar label={`${selected.size} perusahaan dipilih`}>
          <BulkActionMenu label="Ubah PIC" items={team.map((m) => ({ label: m.name, onSelect: () => changePic(m.id, m.name) }))} />
          <BulkActionButton onClick={() => toast('Export dimulai', `${selected.size} perusahaan sedang disiapkan sebagai CSV.`)}>
            Export
          </BulkActionButton>
          <BulkActionButton onClick={deleteSelected}>Hapus</BulkActionButton>
        </BulkActionBar>
      )}

      <Card className="overflow-hidden">
        {rows.length > 0 ? (
          <>
            <CompaniesTable
              rows={rows}
              contactCounts={contactCounts}
              selected={selected}
              onToggle={toggle}
              onToggleAll={(on) => toggleAll(rows.map((r) => r.id), on)}
              sort={sort}
              onSort={toggleSort}
              onOpen={(id) => navigate(`/crm/companies/${id}`)}
            />
            <Pagination
              summary={`Menampilkan ${from}–${to} dari ${filtered.length.toLocaleString('id-ID')} perusahaan`}
              page={currentPage}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          </>
        ) : (
          <EmptyState
            icon={Landmark}
            title="Tidak ada perusahaan yang cocok"
            description="Coba ubah kata kunci pencarian atau filter yang aktif."
            className="py-12"
            action={
              hasFilters && (
                <Button
                  size="sm"
                  onClick={() => {
                    setQuery('');
                    setFilters(emptyCompanyFilters);
                  }}
                >
                  Reset filter
                </Button>
              )
            }
          />
        )}
      </Card>

      <AddCompanyModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addCompany} />
    </Page>
  );
}
