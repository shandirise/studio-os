import { useRef } from 'react';
import { Download, Paperclip, Upload } from 'lucide-react';
import { Button, Card, EmptyState, IconButton, useToast } from '@/components/ui';
import { formatFileSize, type DealFile } from '../../dealData';

type DealFilesTabProps = {
  files: DealFile[];
  onUpload: (file: DealFile) => void;
};

/** "File" tab: attachments with download, plus an upload button (local only). */
export function DealFilesTab({ files, onUpload }: DealFilesTabProps) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = (list: FileList | null) => {
    const file = list?.[0];
    if (!file) return;
    onUpload({ id: `f-${Date.now()}`, name: file.name, size: formatFileSize(file.size) });
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-12-5 text-muted">{files.length} file terlampir</p>
        <Button size="sm" icon={Upload} onClick={() => inputRef.current?.click()}>
          Upload file
        </Button>
        <input ref={inputRef} type="file" className="hidden" onChange={(e) => upload(e.target.files)} />
      </div>

      <Card>
        {files.length === 0 ? (
          <EmptyState icon={Paperclip} title="Belum ada file" description="Upload brief, moodboard atau dokumen pendukung." />
        ) : (
          <ul>
            {files.map((file) => (
              <li key={file.id} className="flex items-center gap-2.5 border-b border-line px-4 py-2.5 last:border-b-0">
                <Paperclip size={14} className="shrink-0 text-muted" />
                <span className="min-w-0 flex-1 truncate text-13 font-medium text-ink">{file.name}</span>
                <span className="text-11-5 text-muted">{file.size}</span>
                <IconButton
                  icon={Download}
                  label={`Unduh ${file.name}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => toast('Unduhan dimulai', file.name)}
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
