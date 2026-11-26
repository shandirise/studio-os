import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { useLocation } from 'react-router';
import { Button, TextLink, buttonClass, useToast } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { AuthPrompt } from '../components/AuthPrompt';
import { AuthTopBar } from '../components/AuthTopBar';
import { IconTile } from '../components/IconTile';

const RESEND_SECONDS = 42;

function formatCountdown(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

/** A2 · Verifikasi Email. Shows the address from the register form (router state). */
export function VerifyEmailPage() {
  useBreadcrumbs([{ label: 'Verifikasi email' }]);
  const toast = useToast();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email ?? currentUser.email;
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  const resend = () => {
    toast('Link verifikasi dikirim ulang', `Cek inbox ${email}`);
    setSecondsLeft(RESEND_SECONDS);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <AuthTopBar />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-10 text-center">
        <IconTile icon={Mail} />
        <h1 className="text-24 leading-[1.2] font-semibold tracking-[-0.015em] text-ink lg:text-[26px]">Cek email kamu</h1>
        <p className="flex flex-col items-center gap-0.5 text-14 leading-[1.4] text-muted">
          Kami mengirim link verifikasi ke
          <span className="font-semibold break-all text-ink">{email}</span>
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <a href="https://mail.google.com" target="_blank" rel="noreferrer" className={buttonClass('primary')}>
            <Mail size={16} strokeWidth={2} />
            Buka Gmail
          </a>
          <Button disabled={secondsLeft > 0} onClick={resend}>
            {secondsLeft > 0 ? `Kirim ulang (${formatCountdown(secondsLeft)})` : 'Kirim ulang'}
          </Button>
        </div>
        <AuthPrompt
          text="Salah email?"
          action={
            <TextLink to="/register" className="text-13 leading-none">
              Ganti email
            </TextLink>
          }
        />
      </main>
    </div>
  );
}
