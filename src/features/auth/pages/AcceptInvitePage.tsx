import { useState, type FormEvent } from 'react';
import { Clock, Lock, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { LogoMark } from '@/components/layout/Logo';
import { Badge, Button, Card, Field, Input, useToast } from '@/components/ui';
import { workspace } from '@/data/workspace';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { invitation } from '../data';

/** A5 · Terima Undangan: centered card on canvas. */
export function AcceptInvitePage() {
  useBreadcrumbs([{ label: 'Terima undangan' }]);
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = useState<string>(invitation.name);
  const [password, setPassword] = useState('Nadia2026!');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast(`Selamat bergabung di ${workspace.name}`, `Anda masuk sebagai ${invitation.role}.`);
    navigate('/my-tasks');
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-canvas p-4">
      <Card className="flex w-full max-w-[440px] flex-col gap-[18px] p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <LogoMark className="size-11 text-24" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-18 leading-none font-bold text-ink">{workspace.name}</p>
            <p className="text-12 leading-none text-muted">
              {workspace.type} · {workspace.memberCount} anggota
            </p>
          </div>
        </div>

        <h1 className="text-22 leading-[1.25] font-semibold tracking-[-0.01em] text-ink">Anda diundang bergabung</h1>

        <p className="flex flex-wrap items-center gap-x-[5px] gap-y-2.5 text-14 leading-[1.45] text-muted">
          <span className="font-semibold text-ink">{invitation.inviter}</span>
          <span>mengundang Anda ke workspace sebagai</span>
          <Badge tone="dark" dot={false}>
            {invitation.role}
          </Badge>
        </p>

        <form onSubmit={submit} className="contents">
          <Field label="Nama lengkap">
            {(id) => (
              <Input id={id} icon={User} required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            )}
          </Field>
          <Field label="Email">{(id) => <Input id={id} type="email" icon={Mail} value={invitation.email} disabled />}</Field>
          <Field label="Buat password">
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
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Gabung workspace
          </Button>
        </form>

        <p className="flex items-center justify-center gap-1.5 text-12 leading-none text-muted">
          <Clock size={13} />
          Undangan berlaku sampai {invitation.expiresAt}
        </p>
      </Card>
    </div>
  );
}
