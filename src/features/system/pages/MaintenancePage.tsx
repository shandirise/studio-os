import { SlidersVertical } from 'lucide-react';
import { SectionLabel } from '@/components/ui';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { ErrorMessage } from '../components/ErrorMessage';
import { StatusTile } from '../components/StatusTile';
import { SystemPageLayout } from '../components/SystemPageLayout';
import { maintenance } from '../data';

/** K4 · Maintenance. */
export function MaintenancePage() {
  useBreadcrumbs([{ label: 'Maintenance' }]);
  return (
    <SystemPageLayout>
      <StatusTile icon={SlidersVertical} />
      <ErrorMessage
        title="Sedang dalam pemeliharaan"
        description="Kami meningkatkan sistem agar lebih cepat dan aman. Data Anda tetap aman."
      />
      <div className="flex w-full max-w-[420px] flex-col items-center gap-1 rounded-card border border-line bg-white p-4">
        <SectionLabel className="text-10 leading-none">PERKIRAAN SELESAI</SectionLabel>
        <p className="text-20 leading-[1.2] font-bold tracking-[-0.01em] text-ink">{maintenance.eta}</p>
      </div>
      <a
        href={maintenance.statusUrl}
        target="_blank"
        rel="noreferrer"
        className="text-12-5 leading-none text-muted underline underline-offset-2 hover:text-ink"
      >
        Status terkini: {maintenance.statusLabel}
      </a>
    </SystemPageLayout>
  );
}
