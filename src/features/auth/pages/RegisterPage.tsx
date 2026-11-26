import { useState, type FormEvent } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button, Checkbox, Field, Input, TextLink } from '@/components/ui';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { AuthHeading } from '../components/AuthHeading';
import { AuthPrompt } from '../components/AuthPrompt';
import { AuthSplitLayout } from '../components/AuthSplitLayout';
import { PanelHeadline } from '../components/PanelHeadline';
import { PasswordStrength } from '../components/PasswordStrength';
import { SetupStepList } from '../components/SetupStepList';

/** A2 · Register. Submitting continues to email verification. */
export function RegisterPage() {
  useBreadcrumbs([{ label: 'Daftar' }]);
  const navigate = useNavigate();
  const [name, setName] = useState('Dimas Prakoso');
  const [email, setEmail] = useState('dimas@kreasinusantara.id');
  const [password, setPassword] = useState('Kreasi202626');
  const [agreed, setAgreed] = useState(true);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/verify-email', { state: { email } });
  };

  return (
    <AuthSplitLayout
      panel={
        <>
          <PanelHeadline title="Siap dalam 5 menit." />
          <SetupStepList />
        </>
      }
    >
      <AuthHeading title="Buat akun Studio OS" description="Mulai kelola lead, project, dan invoice dalam satu tempat." />

      <form onSubmit={submit} className="contents">
        <Field label="Nama lengkap" required>
          {(id) => (
            <Input id={id} icon={User} required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          )}
        </Field>
        <Field label="Email kerja" required>
          {(id) => (
            <Input
              id={id}
              type="email"
              icon={Mail}
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Field>
        <div className="flex flex-col gap-2">
          <Field label="Password" required>
            {(id) => (
              <Input
                id={id}
                type="password"
                icon={Lock}
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </Field>
          <PasswordStrength password={password} hint="Min. 8 karakter, huruf besar & angka" />
        </div>

        <Checkbox
          checked={agreed}
          onChange={setAgreed}
          label="Saya menyetujui Syarat & Ketentuan dan Kebijakan Privasi."
          className="items-start gap-2.5 text-12-5 leading-[1.5]"
        />

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={!agreed}>
          Daftar
        </Button>
      </form>

      <AuthPrompt
        text="Sudah punya akun?"
        action={
          <TextLink to="/login" className="text-13 leading-none">
            Masuk
          </TextLink>
        }
      />
    </AuthSplitLayout>
  );
}
