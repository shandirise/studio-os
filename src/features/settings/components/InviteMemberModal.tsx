import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { Button, Field, Input, Modal, Select } from '@/components/ui';
import type { Role } from '../data';

type InviteMemberModalProps = {
  open: boolean;
  onClose: () => void;
  onInvite: (invite: { email: string; role: Role }) => void;
  /** Emails already in the workspace. */
  existingEmails: string[];
};

const inviteRoles: Role[] = ['Staff', 'Manager'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "Undang anggota" dialog: email + role. */
export function InviteMemberModal({ open, onClose, onInvite, existingEmails }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('Staff');
  const [submitted, setSubmitted] = useState(false);

  const normalized = email.trim().toLowerCase();
  const error = !EMAIL_PATTERN.test(normalized)
    ? 'Masukkan alamat email yang valid'
    : existingEmails.includes(normalized)
      ? 'Email ini sudah terdaftar di workspace'
      : undefined;

  const close = () => {
    setEmail('');
    setRole('Staff');
    setSubmitted(false);
    onClose();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (error) return;
    onInvite({ email: normalized, role });
    close();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Undang anggota"
      subtitle="Undangan berlaku 7 hari dan dikirim lewat email."
      footer={
        <>
          <Button onClick={close}>Batal</Button>
          <Button variant="primary" icon={Send} type="submit" form="invite-member">
            Kirim undangan
          </Button>
        </>
      }
    >
      <form id="invite-member" onSubmit={submit} className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_160px]" noValidate>
        <Field label="Email" required error={submitted ? error : undefined}>
          {(id) => (
            <Input
              id={id}
              type="email"
              placeholder="nama@kreasinusantara.id"
              value={email}
              invalid={submitted && !!error}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          )}
        </Field>
        <Field label="Role">
          {(id) => <Select id={id} options={inviteRoles} value={role} onChange={(e) => setRole(e.target.value as Role)} />}
        </Field>
      </form>
    </Modal>
  );
}
