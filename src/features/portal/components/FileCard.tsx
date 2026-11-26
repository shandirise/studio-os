import { Download, FileText } from 'lucide-react';
import { Card, IconButton, Tag } from '@/components/ui';
import { fileSourceLabel, type PortalFile } from '../data';

type FileCardProps = {
  file: PortalFile;
  onDownload: (file: PortalFile) => void;
};

/** Mobile file row as a card: name, size · date, source tag and download. */
export function FileCard({ file, onDownload }: FileCardProps) {
  return (
    <Card className="flex items-center gap-3 p-3">
      <FileText size={18} className="-mx-[3px] shrink-0 text-muted" />
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="truncate text-13-5 leading-[1.2] font-medium text-ink">{file.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-11-5 leading-none text-muted">
            {file.size} · {file.date}
          </span>
          <Tag>{fileSourceLabel[file.source]}</Tag>
        </div>
      </div>
      <IconButton icon={Download} label={`Download ${file.name}`} className="size-[30px]" onClick={() => onDownload(file)} />
    </Card>
  );
}
