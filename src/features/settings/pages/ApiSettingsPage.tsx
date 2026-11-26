import { Link as LinkIcon } from 'lucide-react';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { useToast } from '@/components/ui';
import { ApiKeysSection } from '../components/ApiKeysSection';
import { SaveBar } from '../components/SaveBar';
import { SettingsPage } from '../components/SettingsPage';
import { WebhookSection } from '../components/WebhookSection';
import { initialWebhooks, settingsCrumb } from '../data';
import { useSettingsForm } from '../hooks/useSettingsForm';

/** I6 · API & Webhook */
export function ApiSettingsPage() {
  useBreadcrumbs([settingsCrumb, { label: 'API & Webhook' }]);
  const toast = useToast();
  const form = useSettingsForm({ webhooks: initialWebhooks });

  return (
    <SettingsPage title="API & Webhook" subtitle="Integrasi dengan sistem lain">
      <ApiKeysSection />
      <WebhookSection form={form} />
      <button
        type="button"
        onClick={() => toast('Dokumentasi API', 'Referensi endpoint REST dan contoh payload webhook.')}
        className="flex cursor-pointer items-center gap-2 self-start text-13 leading-none font-semibold text-ink underline underline-offset-2 hover:text-ink-2"
      >
        <LinkIcon size={14} />
        Baca dokumentasi API
      </button>
      <SaveBar form={form} savedMessage="Status webhook sudah diperbarui." />
    </SettingsPage>
  );
}
