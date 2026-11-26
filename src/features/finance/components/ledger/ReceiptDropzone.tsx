import { Paperclip, Upload } from 'lucide-react';

type ReceiptDropzoneProps = {
  fileName: string | null;
  onFileChange: (fileName: string | null) => void;
};

/** Dashed upload area (same look as the "Upload bukti transfer" box in M3). */
export function ReceiptDropzone({ fileName, onFileChange }: ReceiptDropzoneProps) {
  return (
    <label className="flex cursor-pointer flex-col items-center gap-1 rounded-control border border-dashed border-line-2 bg-subtle px-4 py-[18px] text-center hover:border-faint">
      <input
        type="file"
        accept="image/png,image/jpeg,application/pdf"
        className="sr-only"
        onChange={(e) => onFileChange(e.target.files?.[0]?.name ?? null)}
      />
      {fileName ? (
        <>
          <Paperclip size={16} className="text-ink-2" />
          <span className="text-13 font-semibold text-ink">{fileName}</span>
          <span className="text-11-5 text-muted">Klik untuk mengganti file</span>
        </>
      ) : (
        <>
          <Upload size={16} className="text-ink-2" />
          <span className="text-13 font-semibold text-ink">Upload struk</span>
          <span className="text-11-5 text-muted">PNG, JPG, atau PDF · maks. 5 MB</span>
        </>
      )}
    </label>
  );
}
