import { Info } from 'lucide-react';
import { inviteRoles } from '../../data';
import { InfoNote } from '../InfoNote';
import { SummaryCard } from '../SummaryCard';

/** Step 3 aside: what each role can access. */
export function RolesPreview() {
  return (
    <>
      <SummaryCard title="AKSES PER PERAN" rows={inviteRoles.map(({ role, description }) => ({ label: role, value: description }))} />
      <InfoNote icon={Info}>Undangan berlaku 7 hari dan bisa dikirim ulang dari Settings · Tim.</InfoNote>
    </>
  );
}
