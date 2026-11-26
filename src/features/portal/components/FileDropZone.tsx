import { useState, type DragEvent } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/cn';

type FileDropZoneProps = {
  onFiles: (files: File[]) => void;
};

/** Dashed drop area: click to pick files, or drag them in (desktop). */
export function FileDropZone({ onFiles }: FileDropZoneProps) {
  const [dragging, setDragging] = useState(false);

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    onFiles(Array.from(e.dataTransfer.files));
  };

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={cn(
        'flex h-16 cursor-pointer items-center justify-center gap-2 rounded-control border border-dashed bg-subtle px-4 text-12-5 leading-none text-muted transition-colors lg:h-[72px] lg:gap-2.5 lg:text-13',
        dragging ? 'border-ink' : 'border-line-2 hover:border-faint',
      )}
    >
      <input
        type="file"
        multiple
        className="sr-only"
        onChange={(e) => {
          onFiles(Array.from(e.target.files ?? []));
          e.target.value = '';
        }}
      />
      <Upload size={16} className="shrink-0 lg:size-[18px]" />
      <span className="lg:hidden">Pilih file untuk diunggah</span>
      <span className="max-lg:hidden">Seret file ke sini, atau klik untuk memilih. Brief, aset, dan dokumen.</span>
    </label>
  );
}
