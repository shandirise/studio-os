import { Search } from 'lucide-react';
import { Button } from '@/components/ui';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { ErrorMessage } from '../components/ErrorMessage';
import { StatusTile } from '../components/StatusTile';
import { SystemPageLayout } from '../components/SystemPageLayout';
import { useGoBack } from '../useGoBack';

/** K1 · 404 Tidak Ditemukan (catch-all route). */
export function NotFoundPage() {
  useBreadcrumbs([{ label: 'Halaman tidak ditemukan' }]);
  const goBack = useGoBack();

  return (
    <SystemPageLayout brand={false} className="gap-4">
      <StatusTile icon={Search} className="text-muted" />
      <ErrorMessage
        code="404"
        title="Halaman tidak ditemukan"
        description="Alamat yang Anda tuju mungkin sudah dipindahkan atau dihapus."
        titleClassName="text-20 leading-[1.2] tracking-normal"
        descriptionClassName="max-w-[440px] leading-[1.4]"
      />
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={goBack}>Kembali</Button>
        <Button to="/" variant="primary">
          Ke Dashboard
        </Button>
      </div>
    </SystemPageLayout>
  );
}
