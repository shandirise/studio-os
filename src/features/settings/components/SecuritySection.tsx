import { Field, Input, Toggle } from '@/components/ui';
import type { ProfileForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';

const MIN_PASSWORD = 8;

/** Password change + 2FA switch. */
export function SecuritySection({ form }: { form: SettingsForm<ProfileForm> }) {
  const { values, set } = form;
  const tooShort = values.newPassword.length > 0 && values.newPassword.length < MIN_PASSWORD;

  return (
    <SettingsSection title="Keamanan">
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Password saat ini">
          {(id) => (
            <Input
              id={id}
              type="password"
              value={values.currentPassword}
              onChange={(e) => set('currentPassword', e.target.value)}
              autoComplete="current-password"
            />
          )}
        </Field>
        <Field label="Password baru" error={tooShort ? `Minimal ${MIN_PASSWORD} karakter` : undefined}>
          {(id) => (
            <Input
              id={id}
              type="password"
              placeholder="Minimal 8 karakter"
              value={values.newPassword}
              invalid={tooShort}
              onChange={(e) => set('newPassword', e.target.value)}
              autoComplete="new-password"
            />
          )}
        </Field>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-13 leading-none font-medium text-ink">Autentikasi dua langkah (2FA)</p>
          <p className="text-12 leading-[1.15] text-muted">Tambahkan lapisan keamanan dengan aplikasi authenticator</p>
        </div>
        <Toggle checked={values.twoFactor} onChange={(on) => set('twoFactor', on)} label="Autentikasi dua langkah (2FA)" />
      </div>
    </SettingsSection>
  );
}
