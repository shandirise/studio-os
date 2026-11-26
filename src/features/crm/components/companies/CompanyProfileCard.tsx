import { Clock, FileText, Globe, MapPin, User } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { formatShortDate, type Company } from '../../contactData';
import { ProfileField } from '../contacts/ProfileField';

const editClass = 'cursor-pointer text-12 font-semibold text-ink underline underline-offset-2 hover:text-ink-2';

/** "Profil" card on the company detail page. */
export function CompanyProfileCard({ company, onEdit }: { company: Company; onEdit: () => void }) {
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
        <ProfileField icon={Globe} label="Website">
          {company.website ? (
            <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="hover:underline">
              {company.website}
            </a>
          ) : (
            '—'
          )}
        </ProfileField>
        <ProfileField icon={MapPin} label="Alamat">
          {company.address || '—'}
        </ProfileField>
        <ProfileField icon={FileText} label="NPWP">
          {company.npwp || '—'}
        </ProfileField>
        <ProfileField icon={User} label="PIC">
          {memberById(company.picId).name}
        </ProfileField>
        <ProfileField icon={Clock} label="Klien sejak">
          {formatShortDate(company.clientSince)}
        </ProfileField>
      </div>
    </Card>
  );
}
