import { useMemo, useState } from 'react';
import { Download, Plus, Upload, Users } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Card, EmptyState, PageHeader, Pagination, Tabs, useToast } from '@/components/ui';
import { team } from '@/data/workspace';
import { AddContactModal } from '../components/contacts/AddContactModal';
import { BulkActionBar, BulkActionButton, BulkActionMenu } from '../components/contacts/BulkActionBar';
import { ContactsTable } from '../components/contacts/ContactsTable';
import { ContactsToolbar, emptyContactFilters, type ContactFilters } from '../components/contacts/ContactsToolbar';
import type { SortDirection } from '../components/contacts/SortableTH';
import { useRowSelection } from '../components/contacts/useRowSelection';
import {
  companies,
  companyById,
  contactName,
  contacts as initialContacts,
  contactStages,
  contactTabs,
  contactTagOptions,
  contactTotals,
  createdRangeOptions,
  daysAgo,
  matchesContactTab,
  type Contact,
  type ContactTab,
} from '../contactData';

const PAGE_SIZE = 8;

function matchesQuery(contact: Contact, query: string): boolean {
  if (!query) return true;
  const company = companyById(contact.companyId)?.name ?? '';
  return [contactName(contact), contact.email, contact.phone, contact.title, company].some((v) => v.toLowerCase().includes(query));
}

function matchesFilters(contact: Contact, f: ContactFilters): boolean {
  const range = createdRangeOptions.find((r) => r.value === f.created);
  return (
    (!f.stage || contact.stage === f.stage) &&
    (!f.picId || contact.picId === f.picId) &&
    (!f.source || contact.source === f.source) &&
    (!f.tag || contact.tags.includes(f.tag)) &&
    (!range || daysAgo(contact.createdAt) <= range.days)
  );
}

/** C1 · Kontak */
export function ContactsPage() {
  useBreadcrumbs([{ label: 'CRM', to: '/crm/contacts' }, { label: 'Kontak' }]);
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [list, setList] = useState<Contact[]>(initialContacts);
  const [tab, setTab] = useState<ContactTab>('all');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<ContactFilters>(emptyContactFilters);
  const [sort, setSort] = useState<SortDirection | null>(null);
  const [page, setPage] = useState(1);
  const { selected, toggle, toggleAll, clear } = useRowSelection();

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
    const rows = list.filter((c) => matchesContactTab(c, tab) && matchesQuery(c, q) && matchesFilters(c, filters));
    if (!sort) return rows;
    const dir = sort === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => contactName(a).localeCompare(contactName(b), 'id') * dir);
  }, [list, tab, query, filters, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = (currentPage - 1) * PAGE_SIZE + rows.length;

  // Any change to what is listed starts again from page 1 with nothing selected.
  const resetPage = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
    clear();
  };

  const updateSelected = (patch: (c: Contact) => Contact, title: string) => {
    setList((all) => all.map((c) => (selected.has(c.id) ? patch(c) : c)));
    toast(title, `${selected.size} kontak diperbarui.`);
    clear();
  };

  const deleteSelected = () => {
    const count = selected.size;
    setList((all) => all.filter((c) => !selected.has(c.id)));
    clear();
    toast('Kontak dihapus', `${count} kontak dihapus dari daftar.`);
  };

  const addContact = (contact: Contact) => {
    setList((all) => [contact, ...all]);
    setTab('all');
    setQuery('');
    setFilters(emptyContactFilters);
    setSort(null);
    setPage(1);
    toast('Kontak disimpan', `${contactName(contact)} ditambahkan ke daftar kontak.`);
  };

  const hasFilters = query.trim() !== '' || Object.values(filters).some(Boolean);

  return (
    <Page>
      <PageHeader
        title="Kontak"
        subtitle={`${contactTotals.all.toLocaleString('id-ID')} kontak · Lead sampai klien`}
        actions={
          <>
            <Button icon={Upload} to="/crm/import">
              Import CSV
            </Button>
            <Button icon={Download} onClick={() => toast('Export dimulai', `${filtered.length} kontak sedang disiapkan sebagai CSV.`)}>
              Export
            </Button>
            <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
              Kontak
            </Button>
          </>
        }
      />

      <Tabs items={contactTabs} value={tab} onChange={resetPage(setTab)} />

      <ContactsToolbar
        query={query}
        onQueryChange={resetPage(setQuery)}
        filters={filters}
        onFiltersChange={resetPage(setFilters)}
        onSaveView={() => toast('View disimpan', 'Filter saat ini tersimpan di daftar view Anda.')}
      />

      {selected.size > 0 && (
        <BulkActionBar label={`${selected.size} kontak dipilih`}>
          <BulkActionMenu
            label="Ubah PIC"
            items={team.map((m) => ({
              label: m.name,
              onSelect: () => updateSelected((c) => ({ ...c, picId: m.id }), `PIC diubah ke ${m.name}`),
            }))}
          />
          <BulkActionMenu
            label="Tambah tag"
            items={contactTagOptions.map((tag) => ({
              label: tag,
              onSelect: () =>
                updateSelected((c) => (c.tags.includes(tag) ? c : { ...c, tags: [...c.tags, tag] }), `Tag “${tag}” ditambahkan`),
            }))}
          />
          <BulkActionMenu
            label="Ubah stage"
            items={contactStages.map((stage) => ({
              label: stage,
              onSelect: () => updateSelected((c) => ({ ...c, stage }), `Stage diubah ke ${stage}`),
            }))}
          />
          <BulkActionButton onClick={deleteSelected}>Hapus</BulkActionButton>
        </BulkActionBar>
      )}

      <Card className="overflow-hidden">
        {rows.length > 0 ? (
          <>
            <ContactsTable
              rows={rows}
              companies={companies}
              selected={selected}
              onToggle={toggle}
              onToggleAll={(on) => toggleAll(rows.map((r) => r.id), on)}
              sort={sort}
              onSort={() => setSort((s) => (s === null ? 'asc' : s === 'asc' ? 'desc' : null))}
              onOpen={(id) => navigate(`/crm/contacts/${id}`)}
            />
            <Pagination
              summary={`Menampilkan ${from}–${to} dari ${filtered.length.toLocaleString('id-ID')} kontak`}
              page={currentPage}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          </>
        ) : (
          <EmptyState
            icon={Users}
            title="Tidak ada kontak yang cocok"
            description="Coba ubah kata kunci pencarian atau filter yang aktif."
            className="py-12"
            action={
              hasFilters && (
                <Button
                  size="sm"
                  onClick={() => {
                    setQuery('');
                    setFilters(emptyContactFilters);
                  }}
                >
                  Reset filter
                </Button>
              )
            }
          />
        )}
      </Card>

      <AddContactModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addContact} />
    </Page>
  );
}
