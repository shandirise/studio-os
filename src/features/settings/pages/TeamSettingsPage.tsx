import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Tabs, useToast, type TabItem } from '@/components/ui';
import { workspace } from '@/data/workspace';
import { InviteMemberModal } from '../components/InviteMemberModal';
import { MembersTable } from '../components/MembersTable';
import { PermissionMatrixCard } from '../components/PermissionMatrixCard';
import { SaveBar } from '../components/SaveBar';
import { SettingsPage } from '../components/SettingsPage';
import { initialMembers, initialPermissions, settingsCrumb, type Member, type Role } from '../data';
import { useSettingsForm } from '../hooks/useSettingsForm';

type TeamTab = 'members' | 'permissions';

/** "Bagas.Tri" → "Bagas Tri" */
function nameFromEmail(email: string): string {
  return email
    .split('@')[0]!
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(' ');
}

/** I3 · Tim & Role */
export function TeamSettingsPage() {
  useBreadcrumbs([settingsCrumb, { label: 'Tim & Role' }]);
  const toast = useToast();
  const [tab, setTab] = useState<TeamTab>('members');
  const [members, setMembers] = useState(initialMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const form = useSettingsForm({ permissions: initialPermissions });

  // The design lists five of the workspace's members; the count covers everyone.
  const memberCount = workspace.memberCount + members.length - initialMembers.length;

  const tabs: TabItem<TeamTab>[] = [
    { value: 'members', label: 'Anggota', count: memberCount },
    { value: 'permissions', label: 'Permission' },
  ];

  const invite = ({ email, role }: { email: string; role: Role }) => {
    const member: Member = { id: email, name: nameFromEmail(email), email, role, status: 'Undangan tertunda', lastActive: '–' };
    setMembers((list) => [...list, member]);
    setTab('members');
    toast('Undangan terkirim', `${email} diundang sebagai ${role}.`);
  };

  const changeRole = (member: Member, role: Role) => {
    setMembers((list) => list.map((m) => (m.id === member.id ? { ...m, role } : m)));
    toast('Role diperbarui', `${member.name} sekarang ${role}.`);
  };

  const remove = (member: Member) => {
    setMembers((list) => list.filter((m) => m.id !== member.id));
    toast('Anggota dihapus', `${member.name} tidak lagi punya akses ke workspace.`);
  };

  return (
    <SettingsPage title="Tim & Role" subtitle="Anggota workspace dan hak akses">
      <div className="flex items-center justify-between gap-4">
        <Tabs items={tabs} value={tab} onChange={setTab} className="min-w-0 flex-1" />
        <Button variant="primary" icon={Plus} onClick={() => setInviteOpen(true)}>
          Undang anggota
        </Button>
      </div>

      {tab === 'members' && (
        <MembersTable
          members={members}
          onChangeRole={changeRole}
          onResendInvite={(m) => toast('Undangan dikirim ulang', `Email undangan baru dikirim ke ${m.email}.`)}
          onRemove={remove}
        />
      )}
      <PermissionMatrixCard form={form} />

      <InviteMemberModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={invite}
        existingEmails={members.map((m) => m.email)}
      />
      <SaveBar form={form} savedMessage="Hak akses per role sudah diperbarui." />
    </SettingsPage>
  );
}
