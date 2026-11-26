import { useMemo, useState } from 'react';
import { Download, Search } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Card, Input, PageHeader, Pagination, useToast } from '@/components/ui';
import { AuditFilterMenu } from '../components/AuditFilterMenu';
import { AuditLogDrawer } from '../components/AuditLogDrawer';
import { AuditLogTable } from '../components/AuditLogTable';
import {
  auditActions,
  auditLog,
  auditLogTotal,
  auditModules,
  auditPageSize,
  auditToday,
  auditUsers,
  dateRanges,
  settingsCrumb,
  type AuditAction,
  type AuditEntry,
  type AuditModule,
  type DateRange,
} from '../data';
import { formatCount } from '../utils';

const DAY = 86_400_000;

/** [from, to) in epoch ms for a date-range filter, relative to the demo "today". */
function rangeBounds(range: DateRange): [number, number] {
  const today = auditToday.getTime();
  const end = today + DAY;
  if (range === 'today') return [today, end];
  if (range === 'yesterday') return [today - DAY, today];
  if (range === 'week') return [today - 6 * DAY, end];
  return [today - 29 * DAY, end];
}

const toOptions = <T extends string>(values: T[]) => values.map((value) => ({ value, label: value }));

/** I8 · Audit Log (+ detail drawer, linkable with ?entry=<id>). */
export function AuditLogPage() {
  useBreadcrumbs([settingsCrumb, { label: 'Audit Log' }]);
  const toast = useToast();
  const [params, setParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [user, setUser] = useState<string | null>(null);
  const [action, setAction] = useState<AuditAction | null>(null);
  const [module, setModule] = useState<AuditModule | null>(null);
  const [range, setRange] = useState<DateRange | null>(null);
  const [ascending, setAscending] = useState(false);
  const [page, setPage] = useState(1);

  const filtering = query.trim() !== '' || user !== null || action !== null || module !== null || range !== null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bounds = range ? rangeBounds(range) : null;
    const list = auditLog.filter(
      (e) =>
        (!q || e.object.toLowerCase().includes(q) || e.ip.includes(q)) &&
        (!user || e.user.name === user) &&
        (!action || e.action === action) &&
        (!module || e.module === module) &&
        (!bounds || (e.at >= bounds[0] && e.at < bounds[1])),
    );
    return ascending ? [...list].reverse() : list;
  }, [query, user, action, module, range, ascending]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / auditPageSize));
  const currentPage = Math.min(page, pageCount);
  const rows = filtered.slice((currentPage - 1) * auditPageSize, currentPage * auditPageSize);
  // Unfiltered, the footer reports the full server-side log; the browsable history is its latest part.
  const total = filtering ? filtered.length : auditLogTotal;
  const from = rows.length ? (currentPage - 1) * auditPageSize + 1 : 0;
  const to = (currentPage - 1) * auditPageSize + rows.length;

  /** Wraps a filter setter so changing a filter returns to page 1. */
  const onFilter =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const entryId = params.get('entry');
  const openEntry = entryId ? (auditLog.find((e) => e.id === entryId) ?? auditLog[0]!) : null;

  const openDrawer = (entry: AuditEntry) =>
    setParams((p) => {
      p.set('entry', entry.id);
      return p;
    });
  const closeDrawer = () =>
    setParams((p) => {
      p.delete('entry');
      return p;
    });

  return (
    <Page>
      <PageHeader
        title="Audit Log"
        subtitle="Jejak aktivitas semua pengguna · hanya Owner"
        actions={
          <Button icon={Download} onClick={() => toast('Export audit log dimulai', 'File CSV sesuai filter aktif sedang disiapkan.')}>
            Export
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Input
          icon={Search}
          value={query}
          onChange={(e) => onFilter(setQuery)(e.target.value)}
          placeholder="Cari objek atau IP…"
          aria-label="Cari objek atau IP"
          className="w-full sm:w-[260px]"
          inputClassName="h-[30px] text-12-5"
        />
        <AuditFilterMenu
          label="User"
          allLabel="Semua user"
          options={auditUsers.map((u) => ({ value: u.name, label: u.name }))}
          value={user}
          onChange={onFilter(setUser)}
        />
        <AuditFilterMenu label="Jenis aksi" allLabel="Semua aksi" options={toOptions(auditActions)} value={action} onChange={onFilter(setAction)} />
        <AuditFilterMenu label="Modul" allLabel="Semua modul" options={toOptions(auditModules)} value={module} onChange={onFilter(setModule)} />
        <AuditFilterMenu label="Rentang tanggal" allLabel="Semua tanggal" options={dateRanges} value={range} onChange={onFilter(setRange)} />
      </div>

      <Card className="overflow-hidden">
        <AuditLogTable
          entries={rows}
          selectedId={openEntry?.id ?? null}
          onSelect={openDrawer}
          ascending={ascending}
          onToggleSort={() => setAscending((a) => !a)}
        />
        <Pagination
          summary={`Menampilkan ${from}–${to} dari ${formatCount(total)} entri`}
          page={currentPage}
          pageCount={pageCount}
          onPageChange={setPage}
        />
      </Card>

      <AuditLogDrawer entry={openEntry} onClose={closeDrawer} />
    </Page>
  );
}
