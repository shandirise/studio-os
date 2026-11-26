import { Paperclip } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui';
import type { DealFile } from '../../dealData';

/** "File" side card: compact list of attachments. */
export function DealFilesCard({ files }: { files: DealFile[] }) {
  return (
    <Card>
      <CardHeader title="File" />
      <ul className="flex flex-col gap-2 px-4 pb-3.5">
        {files.length === 0 && <li className="text-12 text-muted">Belum ada file.</li>}
        {files.map((file) => (
          <li key={file.id} className="flex items-center gap-2.5">
            <Paperclip size={14} className="shrink-0 text-muted" />
            <span className="min-w-0 flex-1 truncate text-12-5 leading-[1.2] font-medium text-ink">{file.name}</span>
            <span className="text-11-5 leading-none text-muted">{file.size}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
