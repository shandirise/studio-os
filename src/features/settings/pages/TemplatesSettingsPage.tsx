import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { CatalogSection } from '../components/CatalogSection';
import { EmailTemplateSection } from '../components/EmailTemplateSection';
import { PdfTemplateSection } from '../components/PdfTemplateSection';
import { SaveBar } from '../components/SaveBar';
import { SettingsPage } from '../components/SettingsPage';
import { initialTemplates, settingsCrumb } from '../data';
import { useSettingsForm } from '../hooks/useSettingsForm';

/** I5 · Template */
export function TemplatesSettingsPage() {
  useBreadcrumbs([settingsCrumb, { label: 'Template' }]);
  const form = useSettingsForm(initialTemplates);

  return (
    <SettingsPage title="Template" subtitle="Template PDF, email, dan katalog jasa">
      <PdfTemplateSection form={form} />
      <EmailTemplateSection form={form} />
      <CatalogSection form={form} />
      <SaveBar form={form} savedMessage="Template dan katalog jasa sudah diperbarui." />
    </SettingsPage>
  );
}
