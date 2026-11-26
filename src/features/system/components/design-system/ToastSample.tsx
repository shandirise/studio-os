import { Check } from 'lucide-react';
import { useToast } from '@/components/ui';

const title = 'Quotation terkirim';
const description = 'Dikirim ke rina@majubersama.co.id';

/** Static toast preview; clicking it fires the real toast. */
export function ToastSample() {
  const toast = useToast();

  return (
    <button
      type="button"
      title="Tampilkan toast"
      onClick={() => toast(title, description)}
      className="flex cursor-pointer flex-col gap-1 rounded-card border border-line bg-white p-3 text-left transition-colors hover:bg-canvas"
    >
      <span className="flex items-center gap-2 text-13 leading-[1.2] font-semibold text-ink">
        <Check size={14} strokeWidth={2.5} className="text-green-strong" />
        {title}
      </span>
      <span className="text-12 leading-[1.3] text-muted">{description}</span>
    </button>
  );
}
