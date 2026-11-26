import { useState, type FormEvent } from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button, Field, Input, useToast } from '@/components/ui';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { AuthHeading } from '../components/AuthHeading';
import { AuthSplitLayout } from '../components/AuthSplitLayout';
import { PanelHeadline } from '../components/PanelHeadline';
import { PasswordRules } from '../components/PasswordRules';
import { PasswordStrength } from '../components/PasswordStrength';
import { passwordRules } from '../password';

/** A4 · Reset Password with live strength meter and requirement checklist. */
export function ResetPasswordPage() {
  useBreadcrumbs([{ label: 'Reset password' }]);
  const navigate = useNavigate();
  const toast = useToast();
  const [password, setPassword] = useState('Kreasi#2026!');
  const [confirm, setConfirm] = useState('Kreasi#2026!');

  const mismatch = confirm.length > 0 && confirm !== password;
  const valid = passwordRules.every((rule) => rule.test(password)) && confirm === password;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    toast('Password baru tersimpan', 'Silakan masuk dengan password baru Anda.');
    navigate('/login');
  };

  return (
    <AuthSplitLayout
      panel={
        <PanelHeadline
          size="md"
          title="Satu langkah lagi."
          description="Setelah disimpan, semua sesi lain akan keluar otomatis demi keamanan."
        />
      }
    >
      <AuthHeading title="Buat password baru" description="Gunakan kombinasi huruf besar, huruf kecil, dan angka." />

      <form onSubmit={submit} className="contents">
        <div className="flex flex-col gap-2">
          <Field label="Password baru" required>
            {(id) => (
              <Input
                id={id}
                type="password"
                icon={Lock}
                required
                autoFocus
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </Field>
          <PasswordStrength password={password} />
        </div>
        <Field label="Konfirmasi password" required error={mismatch ? 'Password tidak sama' : undefined}>
          {(id) => (
            <Input
              id={id}
              type="password"
              icon={Lock}
              required
              invalid={mismatch}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          )}
        </Field>

        <PasswordRules password={password} />

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={!valid}>
          Simpan password baru
        </Button>
      </form>
    </AuthSplitLayout>
  );
}
