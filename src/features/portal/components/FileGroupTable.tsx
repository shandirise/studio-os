import { Download, FileText, Folder } from 'lucide-react';
import { Card, IconButton, Tag } from '@/components/ui';
import { fileSourceLabel, type PortalFile } from '../data';

type FileGroupTableProps = {
  project: string;
  files: PortalFile[];
  onDownload: (file: PortalFile) => void;
};

/** Desktop: one card per project folder with a row per file (source, size, date, download). */
export function FileGroupTable({ project, files, onDownload }: FileGroupTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex h-9 items-center gap-2 border-b border-line bg-subtle px-4">
        <Folder size={16} className="text-ink-2" />
        <span className="text-13 leading-none font-semibold text-ink">{project}</span>
        <span className="text-12 leading-none text-muted">{files.length} file</span>
      </div>
      <ul>
        {files.map((file) => (
          <li key={file.id} className="flex h-[50px] items-center gap-3 border-b border-line px-4 last:border-b-0">
            <FileText size={16} className="-mx-0.5 shrink-0 text-muted" />
            <span className="min-w-0 flex-1 truncate text-13-5 leading-none font-medium text-ink">{file.name}</span>
            <Tag>{fileSourceLabel[file.source]}</Tag>
            <span className="w-[70px] shrink-0 text-right text-12 leading-none text-muted">{file.size}</span>
            <span className="w-[60px] shrink-0 text-right text-12 leading-none text-muted">{file.date}</span>
            <IconButton icon={Download} label={`Download ${file.name}`} size="sm" onClick={() => onDownload(file)} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
