import { Download, FileText } from 'lucide-react';
import { Card, CardHeader, useToast } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { PortalFile } from '../data';

type RecentFilesCardProps = {
  title: string;
  files: PortalFile[];
  className?: string;
};

/** Compact file list card ("File terbaru", "File") with per-file download. */
export function RecentFilesCard({ title, files, className }: RecentFilesCardProps) {
  const toast = useToast();
  return (
    <Card className={cn('min-w-0', className)}>
      <CardHeader title={title} />
      <ul className="flex flex-col gap-2.5 px-4 pb-3.5">
        {files.map((file) => (
          <li key={file.id} className="flex h-[13px] items-center gap-2.5">
            <FileText size={16} className="-mx-0.5 shrink-0 text-muted" />
            <span className="min-w-0 flex-1 truncate text-13 leading-none font-medium text-ink">{file.name}</span>
            <span className="shrink-0 text-11-5 leading-none text-faint">{file.date}</span>
            <button
              type="button"
              aria-label={`Download ${file.name}`}
              onClick={() => toast('Download dimulai', `${file.name} sedang diunduh.`)}
              className="shrink-0 cursor-pointer text-muted hover:text-ink"
            >
              <Download size={14} />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
