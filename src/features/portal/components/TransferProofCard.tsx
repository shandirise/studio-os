import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button, Card, useToast } from '@/components/ui';

type TransferProofCardProps = {
  /** Called with the uploaded file name after the client sends it. */
  onSubmit: (fileName: string) => void;
};

/** "Sudah transfer?": pick a transfer receipt and send it to the agency for verification. */
export function TransferProofCard({ onSubmit }: TransferProofCardProps) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>();

  const send = () => {
    if (!fileName) {
      inputRef.current?.click();
      return;
    }
    onSubmit(fileName);
    toast('Bukti transfer terkirim', 'Tim Kreasi Nusantara akan memverifikasi pembayaran Anda.');
    setFileName(undefined);
  };

  return (
    <Card className="flex flex-col gap-2.5 p-3.5 lg:p-4">
      <h3 className="text-14 leading-none font-semibold text-ink">Sudah transfer?</h3>
      <label className="flex cursor-pointer flex-col items-center gap-1.5 rounded-control border border-dashed border-line-2 bg-subtle p-3.5 text-center hover:border-faint lg:p-4">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,application/pdf"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name)}
        />
        <Upload size={18} className="text-muted lg:size-5" />
        <span className="max-w-full truncate text-13 leading-none font-semibold text-ink">{fileName ?? 'Upload bukti transfer'}</span>
        <span className="text-11-5 leading-none text-muted max-lg:hidden">{fileName ? 'Klik untuk mengganti file' : 'PNG, JPG, atau PDF'}</span>
      </label>
      <Button variant="primary" className="w-full" onClick={send}>
        Kirim bukti
      </Button>
    </Card>
  );
}
