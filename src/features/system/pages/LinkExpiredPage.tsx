import { useState, type FormEvent } from 'react';
import { Clock, Mail } from 'lucide-react';
import { Button, Field, Input, useToast } from '@/components/ui';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { ErrorMessage } from '../components/ErrorMessage';
import { StatusTile } from '../components/StatusTile';
import { SystemPageLayout } from '../components/SystemPageLayout';

/** K5 · Link Kadaluarsa: request a fresh link by email. */
export function LinkExpiredPage() {
  useBreadcrumbs([{ label: 'Link kadaluarsa' }]);
  const toast = useToast();
  const [email, setEmail] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast('Link baru dikirim', `Cek inbox ${email}`);
    setEmail('');
  };

  return (
    <SystemPageLayout>
      <StatusTile icon={Clock} />
      <ErrorMessage
        title="Link ini sudah kadaluarsa"
        description="Link undangan, reset password, atau masuk hanya berlaku sementara dan sekali pakai."
      />
      <form onSubmit={submit} className="flex w-full max-w-[360px] flex-col gap-2.5 text-left">
        <Field label="Email">
          {(id) => (
            <Input
              id={id}
              type="email"
              icon={Mail}
              required
              autoComplete="email"
              placeholder="nama@perusahaan.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Field>
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Minta link baru
        </Button>
      </form>
    </SystemPageLayout>
  );
}
