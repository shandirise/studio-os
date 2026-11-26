import { Clock, Flag, Globe, Landmark, Mail, MapPin, Phone, User } from 'lucide-react';
import { Link } from 'react-router';
import { Card, CardHeader, Menu, Tag } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { contactTagOptions, formatShortDate, type Company, type Contact } from '../../contactData';
import { ProfileField } from './ProfileField';

type ContactProfileCardProps = {
  contact: Contact;
  company?: Company;
  onEdit: () => void;
  onAddTag: (tag: string) => void;
};

const editClass = 'cursor-pointer text-12 font-semibold text-ink underline underline-offset-2 hover:text-ink-2';

/** "Profil" card on the contact detail page. */
export function ContactProfileCard({ contact, company, onEdit, onAddTag }: ContactProfileCardProps) {
  const availableTags = contactTagOptions.filter((t) => !contact.tags.includes(t));

  return (
    <Card>
      <CardHeader
        title="Profil"
        action={
          <button type="button" className={editClass} onClick={onEdit}>
            Edit
          </button>
        }
      />
      <div className="flex flex-col px-4 pb-4">
        <ProfileField icon={Mail} label="Email">
          <a href={`mailto:${contact.email}`} className="hover:underline">
            {contact.email}
          </a>
        </ProfileField>
        <ProfileField icon={Phone} label="Telepon">
          {contact.phone || '—'}
        </ProfileField>
        <ProfileField icon={Landmark} label="Perusahaan">
          {company ? (
            <Link to={`/crm/companies/${company.id}`} className="hover:underline">
              {company.name}
            </Link>
          ) : (
            '—'
          )}
        </ProfileField>
        <ProfileField icon={MapPin} label="Alamat">
          {contact.address ?? company?.address ?? '—'}
        </ProfileField>
        <ProfileField icon={Globe} label="Sosial media">
          {contact.social ?? '—'}
        </ProfileField>
        <ProfileField icon={User} label="PIC">
          {memberById(contact.picId).name}
        </ProfileField>
        <ProfileField icon={Flag} label="Sumber lead">
          {contact.source}
        </ProfileField>
        <ProfileField icon={Clock} label="Dibuat">
          {formatShortDate(contact.createdAt)}
        </ProfileField>

        <div className="flex flex-wrap items-center gap-1.5 pt-3">
          {contact.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {availableTags.length > 0 && (
            <Menu
              align="left"
              trigger={({ toggle }) => (
                <button
                  type="button"
                  onClick={toggle}
                  className="inline-flex h-[22px] cursor-pointer items-center rounded-control border border-line-2 bg-white px-2.5 text-12 font-medium text-ink hover:bg-canvas"
                >
                  + Tag
                </button>
              )}
              items={availableTags.map((tag) => ({ label: tag, onSelect: () => onAddTag(tag) }))}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
