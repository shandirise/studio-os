import { Ellipsis, Send, ShieldCheck, Trash2, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Avatar, Badge, Card, IconButton, Menu, Table, TD, TH, THead, TR, type MenuItem } from '@/components/ui';
import { memberStatusTone } from '@/lib/status';
import { roles, type Member, type Role } from '../data';

type MembersTableProps = {
  members: Member[];
  onChangeRole: (member: Member, role: Role) => void;
  onResendInvite: (member: Member) => void;
  onRemove: (member: Member) => void;
};

/** Workspace members with role, status, last activity and a row action menu. */
export function MembersTable({ members, onChangeRole, onResendInvite, onRemove }: MembersTableProps) {
  const navigate = useNavigate();

  const actionsFor = (member: Member): MenuItem[] => {
    if (member.role === 'Owner') return [{ label: 'Lihat profil', icon: User, onSelect: () => navigate('/settings/profile') }];
    return [
      ...roles
        .filter((role) => role !== 'Owner' && role !== member.role)
        .map((role) => ({ label: `Jadikan ${role}`, icon: ShieldCheck, onSelect: () => onChangeRole(member, role) })),
      ...(member.status === 'Undangan tertunda'
        ? [{ label: 'Kirim ulang undangan', icon: Send, onSelect: () => onResendInvite(member) }]
        : []),
      { label: 'Hapus dari workspace', icon: Trash2, danger: true, onSelect: () => onRemove(member) },
    ];
  };

  return (
    <Card className="overflow-hidden">
      <Table minWidth={720}>
        <THead>
          <TH>ANGGOTA</TH>
          <TH className="w-[130px]">ROLE</TH>
          <TH className="w-[150px]">STATUS</TH>
          <TH className="w-[140px]">TERAKHIR AKTIF</TH>
          <TH className="w-[50px]" aria-label="Aksi" />
        </THead>
        <tbody>
          {members.map((member) => (
            <TR key={member.id} className="h-[50px] [&>td]:py-2">
              <TD>
                <div className="flex items-center gap-2">
                  <Avatar name={member.name} className="size-7" />
                  <div className="flex min-w-0 flex-col gap-px">
                    <span className="truncate font-medium">{member.name}</span>
                    <span className="truncate text-11-5 text-muted">{member.email}</span>
                  </div>
                </div>
              </TD>
              <TD>{member.role}</TD>
              <TD>
                <Badge tone={memberStatusTone[member.status]}>{member.status}</Badge>
              </TD>
              <TD className="text-muted">{member.lastActive}</TD>
              <TD>
                <Menu
                  items={actionsFor(member)}
                  trigger={({ toggle }) => (
                    <IconButton icon={Ellipsis} label={`Aksi untuk ${member.name}`} variant="ghost" className="size-[26px]" onClick={toggle} />
                  )}
                />
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
