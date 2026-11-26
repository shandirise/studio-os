import { useState, type FormEvent } from 'react';
import { Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button, Card, Field, Input, useToast } from '@/components/ui';
import { PortalBrand } from '../components/PortalBrand';
import { portalClient } from '../data';

/** J1 · Portal Login: passwordless magic-link sign in for clients. */
export function PortalLoginPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState<string>(portalClient.email);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast('Link masuk terkirim', `Kami mengirim link masuk ke ${email}.`);
    navigate('/portal');
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-canvas px-5">
      <Card className="flex w-full max-w-[400px] flex-col gap-4 p-6 lg:gap-[18px] lg:p-8">
        <PortalBrand size="login" />

        <div className="flex flex-col gap-1.5">
          <h1 className="text-22 leading-[1.2] font-semibold tracking-[-0.01em] text-ink">Portal Klien</h1>
          <p className="text-13 leading-[1.45] text-muted lg:text-13-5">Masukkan email Anda. Kami kirim link masuk, tanpa password.</p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4 lg:gap-[18px]">
          <Field label="Email">
            {(id) => (
              <Input
                id={id}
                type="email"
                required
                autoComplete="email"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="[&>svg]:size-[15px] [&>svg]:text-faint"
              />
            )}
          </Field>
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Kirim link masuk
          </Button>
        </form>

        <p className="flex gap-2 rounded-control border border-line bg-subtle p-2.5 text-12 leading-[1.4] text-muted max-lg:hidden">
          <Lock size={12} strokeWidth={1.75} className="mt-0.5 shrink-0" />
          Link berlaku 15 menit dan hanya bisa dipakai sekali.
        </p>
      </Card>
    </div>
  );
}
