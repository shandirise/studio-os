import { useState } from 'react';
import { Copy, Eye, EyeOff, TriangleAlert } from 'lucide-react';
import { Button, Input } from '@/components/ui';

type NewApiKeyBannerProps = {
  apiKey: string;
  onCopy: () => void;
};

/** Yellow notice showing a freshly created key once, with reveal and copy. */
export function NewApiKeyBanner({ apiKey, onCopy }: NewApiKeyBannerProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col gap-2 rounded-control bg-yellow-soft p-3">
      <p className="flex items-center gap-2 text-12-5 leading-none font-semibold text-yellow-strong">
        <TriangleAlert size={15} className="shrink-0" />
        Salin sekarang. Kunci ini tidak akan ditampilkan lagi.
      </p>
      <div className="flex items-center gap-2">
        <Input
          readOnly
          aria-label="API key baru"
          value={revealed ? apiKey : `${apiKey.slice(0, 24)}…`}
          className="min-w-0 flex-1"
          inputClassName="h-[34px]"
          suffix={
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              aria-label={revealed ? 'Sembunyikan kunci' : 'Tampilkan kunci'}
              title={revealed ? 'Sembunyikan kunci' : 'Tampilkan kunci'}
              className="flex cursor-pointer text-muted hover:text-ink"
            >
              {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
        />
        <Button icon={Copy} onClick={onCopy}>
          Salin
        </Button>
      </div>
    </div>
  );
}
