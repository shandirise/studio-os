import { X } from 'lucide-react';
import { Card, Drawer, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { AuditEntry } from '../data';
import { formatAuditDateTime } from '../utils';

type AuditLogDrawerProps = {
  entry: AuditEntry | null;
  onClose: () => void;
};

const diffGrid = 'grid grid-cols-[88px_minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 px-3 sm:grid-cols-[110px_minmax(0,1fr)_minmax(0,1fr)]';

/** I8 · Audit log entry detail: metadata and a before → after field diff. */
export function AuditLogDrawer({ entry, onClose }: AuditLogDrawerProps) {
  return (
    <Drawer open={entry !== null} onClose={onClose} width={560}>
      {entry && (
        <>
          <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-line px-5">
            <h2 className="text-15 leading-none font-semibold text-ink">Detail perubahan</h2>
            <IconButton icon={X} label="Tutup" variant="ghost" size="sm" onClick={onClose} />
          </div>

          <div className="flex min-h-0 flex-col gap-4 overflow-y-auto p-5">
            <dl className="flex flex-col gap-2">
              {[
                ['Waktu', formatAuditDateTime(entry.at)],
                ['User', `${entry.user.name} (${entry.user.role})`],
                ['Aksi', entry.action],
                ['Objek', entry.object],
                ['IP', entry.ip],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3 leading-[1.2]">
                  <dt className="w-20 shrink-0 text-12-5 text-muted">{label}</dt>
                  <dd className="min-w-0 text-13 font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="h-px shrink-0 bg-line" />

            <p className="text-13 leading-none font-semibold text-ink">Sebelum → Sesudah</p>

            {entry.changes.length > 0 ? (
              <Card className="overflow-hidden">
                <div className={cn(diffGrid, 'h-[30px] border-b border-line bg-subtle text-10-5 leading-none font-semibold text-muted')}>
                  <span>FIELD</span>
                  <span>SEBELUM</span>
                  <span>SESUDAH</span>
                </div>
                {entry.changes.map((change) => (
                  <div key={change.field} className={cn(diffGrid, 'min-h-[42px] border-b border-line py-2 last:border-b-0')}>
                    <span className="text-12-5 leading-none font-medium text-ink">{change.field}</span>
                    <span className="rounded-badge bg-red-soft px-2 py-1 text-12-5 leading-[1.2] text-red-strong line-through">{change.before}</span>
                    <span className="rounded-badge bg-green-soft px-2 py-1 text-12-5 leading-[1.2] font-medium text-green-strong">{change.after}</span>
                  </div>
                ))}
              </Card>
            ) : (
              <p className="text-12-5 leading-[1.3] text-muted">Tidak ada perubahan field yang dicatat untuk aksi ini.</p>
            )}
          </div>
        </>
      )}
    </Drawer>
  );
}
