import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { AppearanceSection } from '../components/AppearanceSection';
import { NotificationPreferencesSection } from '../components/NotificationPreferencesSection';
import { ProfileSection } from '../components/ProfileSection';
import { SaveBar } from '../components/SaveBar';
import { SecuritySection } from '../components/SecuritySection';
import { SettingsPage } from '../components/SettingsPage';
import { initialProfile, settingsCrumb } from '../data';
import { useSettingsForm } from '../hooks/useSettingsForm';

/** I1 · Profil Saya */
export function ProfileSettingsPage() {
  useBreadcrumbs([settingsCrumb, { label: 'Profil Saya' }]);
  const form = useSettingsForm(initialProfile);

  return (
    <SettingsPage title="Profil Saya" subtitle="Informasi akun dan preferensi pribadi">
      <ProfileSection form={form} />
      <SecuritySection form={form} />
      <NotificationPreferencesSection form={form} />
      <AppearanceSection form={form} />
      <SaveBar form={form} savedMessage="Profil dan preferensi Anda sudah diperbarui." />
    </SettingsPage>
  );
}
