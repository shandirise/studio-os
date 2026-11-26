import { Download, FileText, Upload } from 'lucide-react';
import { Button, Card, IconButton, useToast } from '@/components/ui';
import type { CrmFile } from '../../contactData';

/** Attached files list used on the "File" tabs of contact and company pages. */
export function FileList({ files }: { files: CrmFile[] }) {
  const toast = useToast();

  return (
    <Card>
      <div className="flex items-center justify-between gap-3 px-4 pt-3.5 pb-3">
        <p className="text-13 font-semibold text-ink">{files.length} file</p>
        <Button size="sm" icon={Upload} onClick={() => toast('Pilih file untuk diunggah', 'Maks. 20 MB per file.')}>
          Unggah file
        </Button>
      </div>
      <ul className="border-t border-line">
        {files.map((file) => (
          <li key={file.id} className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-control border border-line bg-subtle text-ink-2">
              <FileText size={14} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-px">
              <span className="truncate text-13 font-medium text-ink">{file.name}</span>
              <span className="truncate text-11-5 text-muted">
                {file.size} · {file.uploadedBy} · {file.uploadedAt}
              </span>
            </div>
            <IconButton icon={Download} label={`Unduh ${file.name}`} variant="ghost" size="sm" onClick={() => toast('Unduhan dimulai', file.name)} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
