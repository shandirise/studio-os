import { ArrowRight, Copy, TriangleAlert } from 'lucide-react';
import { Button, useToast } from '@/components/ui';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { ErrorMessage } from '../components/ErrorMessage';
import { StatusTile } from '../components/StatusTile';
import { SystemPageLayout } from '../components/SystemPageLayout';
import { errorReference } from '../data';
import { useGoBack } from '../useGoBack';

/** K3 · 500 Error Server, with a copyable error reference. */
export function ServerErrorPage() {
  useBreadcrumbs([{ label: 'Error server' }]);
  const goBack = useGoBack();
  const toast = useToast();

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(errorReference);
      toast('Kode error disalin', errorReference);
    } catch {
      toast('Kode error', errorReference);
    }
  };

  return (
    <SystemPageLayout>
      <StatusTile icon={TriangleAlert} />
      <ErrorMessage
        code="500"
        title="Terjadi kesalahan di server"
        description="Maaf, kami sedang memperbaikinya. Coba lagi sebentar lagi."
      />
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="primary" icon={ArrowRight} onClick={goBack}>
          Coba lagi
        </Button>
        <Button to="/">Ke Dashboard</Button>
      </div>
      <div className="flex items-center gap-2 rounded-control border border-line bg-subtle py-2 pr-2 pl-3">
        <span className="text-12 leading-none text-muted">Kode error</span>
        <span className="text-12-5 leading-none font-semibold text-ink">{errorReference}</span>
        <button
          type="button"
          aria-label="Salin kode error"
          title="Salin kode error"
          onClick={copyReference}
          className="flex size-5 cursor-pointer items-center justify-center rounded-badge text-muted transition-colors hover:bg-line hover:text-ink"
        >
          <Copy size={13} />
        </button>
      </div>
    </SystemPageLayout>
  );
}
