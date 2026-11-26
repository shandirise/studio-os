import { Info } from 'lucide-react';
import { Avatar } from '@/components/ui';
import type { WorkspaceForm } from '../../data';
import { InfoNote } from '../InfoNote';
import { SummaryCard } from '../SummaryCard';

/** Step 1 aside: how the workspace identity will appear. */
export function WorkspacePreview({ value }: { value: WorkspaceForm }) {
  const name = value.name.trim() || 'Nama workspace';
  return (
    <>
      <SummaryCard
        title="PRATINJAU"
        header={
          <div className="flex items-center gap-3 border-b border-line pb-3.5">
            <Avatar name={name} size="xl" variant="dark" />
            <div className="flex min-w-0 flex-col gap-1">
              <p className="truncate text-15 leading-none font-bold text-ink">{name}</p>
              <p className="text-12 leading-none text-muted">{value.businessType}</p>
            </div>
          </div>
        }
        rows={[
          { label: 'Ukuran tim', value: value.teamSize },
          { label: 'Zona waktu', value: value.timezone },
        ]}
      />
      <InfoNote icon={Info}>Logo dan warna dokumen bisa diatur nanti di Settings · Workspace.</InfoNote>
    </>
  );
}
