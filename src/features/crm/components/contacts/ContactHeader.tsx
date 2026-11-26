import { Calendar, Copy, Ellipsis, Pencil, Plus, Send, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { Avatar, Badge, Button, IconButton, Menu } from '@/components/ui';
import { contactStageTone } from '@/lib/status';
import { contactName, type Company, type Contact } from '../../contactData';

type ContactHeaderProps = {
  contact: Contact;
  company?: Company;
  onScheduleFollowUp: () => void;
  onCreateDeal: () => void;
  onInvite: () => void;
  onEdit: () => void;
  onCopyEmail: () => void;
  onDelete: () => void;
};

/** C2 header: avatar, name + stage, role · company, and actions. */
export function ContactHeader({
  contact,
  company,
  onScheduleFollowUp,
  onCreateDeal,
  onInvite,
  onEdit,
  onCopyEmail,
  onDelete,
}: ContactHeaderProps) {
  const name = contactName(contact);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3.5">
        <Avatar name={name} className="size-12 text-18" />
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-22 leading-[26px] font-semibold tracking-[-0.01em] text-ink">{name}</h1>
            <Badge tone={contactStageTone[contact.stage]}>{contact.stage}</Badge>
          </div>
          <p className="text-13 leading-4 text-muted">
            {contact.title}
            {contact.title && company && ' · '}
            {company && (
              <Link to={`/crm/companies/${company.id}`} className="hover:text-ink hover:underline">
                {company.name}
              </Link>
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button icon={Calendar} onClick={onScheduleFollowUp}>
          Jadwalkan follow-up
        </Button>
        <Button icon={Plus} onClick={onCreateDeal}>
          Buat deal
        </Button>
        <Button variant="primary" icon={Send} onClick={onInvite}>
          Undang ke Portal
        </Button>
        <Menu
          trigger={({ toggle }) => <IconButton icon={Ellipsis} label="Aksi lainnya" onClick={toggle} />}
          items={[
            { label: 'Edit kontak', icon: Pencil, onSelect: onEdit },
            { label: 'Salin email', icon: Copy, onSelect: onCopyEmail },
            { label: 'Hapus kontak', icon: Trash2, danger: true, onSelect: onDelete },
          ]}
        />
      </div>
    </div>
  );
}
