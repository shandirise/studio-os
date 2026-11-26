import { Field, Segmented, Select } from '@/components/ui';
import { languageOptions, themeOptions, type ProfileForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';

/** Theme segmented control + language select. */
export function AppearanceSection({ form }: { form: SettingsForm<ProfileForm> }) {
  const { values, set } = form;

  return (
    <SettingsSection title="Tampilan & bahasa">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-12 leading-[1.2] font-medium text-ink-2">Tema</span>
          <Segmented options={themeOptions} value={values.theme} onChange={(theme) => set('theme', theme)} />
        </div>
        <Field label="Bahasa">
          {(id) => <Select id={id} options={languageOptions} value={values.language} onChange={(e) => set('language', e.target.value)} />}
        </Field>
      </div>
    </SettingsSection>
  );
}
