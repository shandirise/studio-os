import { Plus, Trash2 } from 'lucide-react';
import { Button, IconButton, Input, Select } from '@/components/ui';
import { inviteRoles, type InviteRole, type TeamInvite } from '../../data';

type TeamFieldsProps = {
  invites: TeamInvite[];
  onChange: (invites: TeamInvite[]) => void;
};

const grid = 'grid grid-cols-[minmax(0,1fr)_112px_32px] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_160px_32px] sm:gap-3';

/** Step 3 · Invite rows (email + role), add and remove. */
export function TeamFields({ invites, onChange }: TeamFieldsProps) {
  const update = (id: number, patch: Partial<TeamInvite>) =>
    onChange(invites.map((invite) => (invite.id === id ? { ...invite, ...patch } : invite)));
  const add = () => onChange([...invites, { id: Date.now(), email: '', role: 'Staff' }]);
  const remove = (id: number) => onChange(invites.filter((invite) => invite.id !== id));

  return (
    <div className="flex flex-col gap-2.5">
      {invites.length > 0 && (
        <div className={grid}>
          <span className="text-12 leading-[1.2] font-medium text-ink-2">Email</span>
          <span className="text-12 leading-[1.2] font-medium text-ink-2">Peran</span>
        </div>
      )}
      {invites.map((invite) => (
        <div key={invite.id} className={grid}>
          <Input
            type="email"
            aria-label="Email anggota"
            placeholder="nama@perusahaan.com"
            value={invite.email}
            onChange={(e) => update(invite.id, { email: e.target.value })}
          />
          <Select
            aria-label="Peran"
            options={inviteRoles.map((r) => r.role)}
            value={invite.role}
            onChange={(e) => update(invite.id, { role: e.target.value as InviteRole })}
          />
          <IconButton icon={Trash2} label="Hapus undangan" variant="ghost" onClick={() => remove(invite.id)} />
        </div>
      ))}
      <Button size="sm" icon={Plus} className="self-start" onClick={add}>
        Tambah anggota
      </Button>
    </div>
  );
}
