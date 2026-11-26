import { Lock, Mail } from 'lucide-react';
import { Button, useToast } from '@/components/ui';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { ErrorMessage } from '../components/ErrorMessage';
import { StatusTile } from '../components/StatusTile';
import { SystemPageLayout } from '../components/SystemPageLayout';
import { useGoBack } from '../useGoBack';

/** K2 · 403 Tanpa Akses. */
export function ForbiddenPage() {
  useBreadcrumbs([{ label: 'Tanpa akses' }]);
  const goBack = useGoBack();
  const toast = useToast();

  return (
    <SystemPageLayout>
      <StatusTile icon={Lock} />
      <ErrorMessage
        code="403"
        title="Anda tidak punya akses ke halaman ini"
        description="Halaman ini hanya untuk peran tertentu. Hubungi Owner workspace untuk meminta akses."
      />
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={goBack}>Kembali</Button>
        <Button
          variant="primary"
          icon={Mail}
          onClick={() => toast('Permintaan akses terkirim', 'Owner workspace akan menerima email dari Anda.')}
        >
          Hubungi Owner
        </Button>
      </div>
    </SystemPageLayout>
  );
}
