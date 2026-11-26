import { useRef } from 'react';
import { FileText } from 'lucide-react';

type ImportFileBarProps = {
  fileName: string;
  rows: number;
  columns: number;
  onReplace: (fileName: string) => void;
};

/** Uploaded file summary with a "Ganti file" picker. */
export function ImportFileBar({ fileName, rows, columns, onReplace }: ImportFileBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2.5 rounded-control border border-line bg-subtle p-2.5">
      <FileText size={14} className="shrink-0 text-muted" />
      <span className="truncate text-13 leading-none font-semibold text-ink">{fileName}</span>
      <span className="min-w-0 flex-1 truncate text-12 leading-none text-muted">
        {rows} baris · {columns} kolom
      </span>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="shrink-0 cursor-pointer text-12 leading-none font-semibold text-ink underline underline-offset-2 hover:text-ink-2"
      >
        Ganti file
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onReplace(file.name);
          e.target.value = '';
        }}
      />
    </div>
  );
}
