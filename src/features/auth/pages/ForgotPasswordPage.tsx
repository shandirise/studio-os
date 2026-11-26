import { useState, type FormEvent } from 'react';
import { ChevronLeft, Mail } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { Button, Field, Input, useToast } from '@/components/ui';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { AuthHeading } from '../components/AuthHeading';
import { AuthPrompt } from '../components/AuthPrompt';
import { AuthSplitLayout } from '../components/AuthSplitLayout';
import { IconTile } from '../components/IconTile';
import { InlineAction } from '../components/InlineAction';
import { PanelHeadline } from '../components/PanelHeadline';

/** A3 · Lupa Password. Submitting switches to the "Terkirim" state (`?sent=1`). */
export function ForgotPasswordPage() {
  useBreadcrumbs([{ label: 'Lupa password' }]);
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const sent = params.get('sent') === '1';
  const [email, setEmail] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setParams({ sent: '1' });
  };

  return (
    <AuthSplitLayout
      panel={
        <PanelHeadline
          size="md"
          title="Akses akun Anda kembali dengan aman."
          description={sent ? undefined : 'Link reset berlaku 30 menit dan hanya dapat dipakai sekali.'}
        />
      }
    >
      {sent ? (
        <>
          <IconTile icon={Mail} size="md" />
          <AuthHeading
            title="Cek email Anda"
            description="Jika email tersebut terdaftar, link untuk mereset password sudah dikirim. Periksa juga folder spam."
          />
          <Button to="/login" variant="primary" size="lg" className="w-full">
            Kembali ke login
          </Button>
          <AuthPrompt
            text="Belum menerima?"
            action={
              <InlineAction onClick={() => toast('Link reset dikirim ulang', email ? `Cek inbox ${email}` : undefined)}>
                Kirim ulang
              </InlineAction>
            }
          />
        </>
      ) : (
        <>
          <AuthHeading
            title="Lupa password?"
            description="Masukkan email akun Anda. Kami kirim link untuk membuat password baru."
          />
          <form onSubmit={submit} className="contents">
            <Field label="Email">
              {(id) => (
                <Input
                  id={id}
                  type="email"
                  icon={Mail}
                  required
                  autoFocus
                  autoComplete="email"
                  placeholder="nama@perusahaan.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </Field>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Kirim link reset
            </Button>
          </form>
          <Link
            to="/login"
            className="flex items-center justify-center gap-1.5 text-13 leading-none font-semibold text-ink hover:text-ink-2"
          >
            <ChevronLeft size={14} strokeWidth={2} />
            Kembali ke login
          </Link>
        </>
      )}
    </AuthSplitLayout>
  );
}
