import { useState, type FormEvent } from 'react';
import { Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button, Checkbox, Field, Input, TextLink } from '@/components/ui';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { AuthHeading } from '../components/AuthHeading';
import { AuthPrompt } from '../components/AuthPrompt';
import { AuthSplitLayout } from '../components/AuthSplitLayout';
import { DemoLoginPanel } from '../components/DemoLoginPanel';
import { OrDivider } from '../components/OrDivider';
import { PanelHeadline } from '../components/PanelHeadline';
import { ProductMockCard } from '../components/ProductMockCard';

/** A1 · Login (desktop split screen + mobile single column). */
export function LoginPage() {
  useBreadcrumbs([{ label: 'Masuk' }]);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('rahasia123');
  const [remember, setRemember] = useState(true);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <AuthSplitLayout
      panelClassName="gap-8"
      panel={
        <>
          <PanelHeadline
            title="Dari lead sampai dibayar, dalam satu tempat."
            description="CRM, quotation, project, dan invoice terhubung. Tidak ada lagi data yang tercecer di spreadsheet dan chat."
          />
          <ProductMockCard />
        </>
      }
    >
      <AuthHeading title="Masuk ke Studio OS" description="Kelola alur bisnis dari lead sampai dibayar." />

      <form onSubmit={submit} className="contents">
        <Field label="Email">
          {(id) => (
            <Input
              id={id}
              type="email"
              icon={Mail}
              placeholder="nama@perusahaan.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Field>
        <Field label="Password">
          {(id) => (
            <Input
              id={id}
              type="password"
              icon={Lock}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </Field>

        <div className="flex items-center justify-between gap-4">
          <Checkbox checked={remember} onChange={setRemember} label="Ingat saya" />
          <TextLink to="/forgot-password" className="text-13">
            Lupa password?
          </TextLink>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Masuk
        </Button>
      </form>

      <OrDivider className="max-lg:hidden" />
      <Button size="lg" className="w-full" onClick={() => navigate('/')}>
        Masuk dengan Google
      </Button>

      <DemoLoginPanel />

      <AuthPrompt
        text="Belum punya akun?"
        action={
          <TextLink to="/register" className="text-13 leading-none">
            Daftar
          </TextLink>
        }
      />
    </AuthSplitLayout>
  );
}
