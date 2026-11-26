import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { BankAccountSection } from '../components/BankAccountSection';
import { BrandColorSection } from '../components/BrandColorSection';
import { BusinessIdentitySection } from '../components/BusinessIdentitySection';
import { DangerZoneSection } from '../components/DangerZoneSection';
import { DocumentNumberSection } from '../components/DocumentNumberSection';
import { SaveBar } from '../components/SaveBar';
import { SettingsPage } from '../components/SettingsPage';
import { initialWorkspace, settingsCrumb } from '../data';
import { useSettingsForm } from '../hooks/useSettingsForm';

/** I2 · Workspace */
export function WorkspaceSettingsPage() {
  useBreadcrumbs([settingsCrumb, { label: 'Workspace' }]);
  const form = useSettingsForm(initialWorkspace);

  return (
    <SettingsPage title="Workspace" subtitle="Identitas bisnis, pajak, dan dokumen">
      <BusinessIdentitySection form={form} />
      <DocumentNumberSection form={form} />
      <BankAccountSection form={form} />
      <BrandColorSection form={form} />
      <DangerZoneSection workspaceName={form.values.businessName} />
      <SaveBar form={form} savedMessage="Pengaturan workspace sudah diperbarui." />
    </SettingsPage>
  );
}
