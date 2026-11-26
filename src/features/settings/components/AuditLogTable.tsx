import { ChevronDown, ChevronRight, SearchX } from 'lucide-react';
import { Avatar, Badge, EmptyState, Table, TD, TH, THead, TR } from '@/components/ui';
import { cn } from '@/lib/cn';
import { auditActionTone, type AuditEntry } from '../data';
import { formatAuditTime } from '../utils';

type AuditLogTableProps = {
  entries: AuditEntry[];
  selectedId: string | null;
  onSelect: (entry: AuditEntry) => void;
  /** Oldest first when true. */
  ascending: boolean;
  onToggleSort: () => void;
};

/** Audit entries; a row opens its detail drawer. */
export function AuditLogTable({ entries, selectedId, onSelect, ascending, onToggleSort }: AuditLogTableProps) {
  return (
    <Table minWidth={860}>
      <THead>
        <TH className="w-[150px]" aria-sort={ascending ? 'ascending' : 'descending'}>
          <button type="button" onClick={onToggleSort} className="inline-flex cursor-pointer items-center gap-1 hover:text-ink">
            WAKTU
            <ChevronDown size={12} strokeWidth={2} className={cn('text-faint transition-transform', ascending && 'rotate-180')} />
          </button>
        </TH>
        <TH className="w-[170px]">USER</TH>
        <TH className="w-[100px]">AKSI</TH>
        <TH>OBJEK</TH>
        <TH className="w-[130px]">IP</TH>
        <TH className="w-10" aria-label="Detail" />
      </THead>
      <tbody>
        {entries.map((entry) => (
          <TR key={entry.id} selected={entry.id === selectedId} onClick={() => onSelect(entry)} className="h-12 [&>td]:py-2">
            <TD className="whitespace-nowrap">{formatAuditTime(entry.at)}</TD>
            <TD>
              <div className="flex items-center gap-2">
                <Avatar name={entry.user.name} className="size-7" />
                <span className="truncate font-medium">{entry.user.name}</span>
              </div>
            </TD>
            <TD>
              <Badge tone={auditActionTone[entry.action]}>{entry.action}</Badge>
            </TD>
            <TD>{entry.object}</TD>
            <TD className="text-muted">{entry.ip}</TD>
            <TD>
              <ChevronRight size={16} className="text-muted" aria-hidden />
            </TD>
          </TR>
        ))}
        {entries.length === 0 && (
          <tr>
            <td colSpan={6}>
              <EmptyState icon={SearchX} title="Tidak ada entri yang cocok" description="Ubah kata kunci atau hapus beberapa filter." className="py-10" />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
