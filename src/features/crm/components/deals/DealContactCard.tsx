import { Landmark } from 'lucide-react';
import { Link } from 'react-router';
import { Avatar, Card, CardHeader } from '@/components/ui';
import type { Deal } from '../../dealData';

/** "Kontak & perusahaan" side card. */
export function DealContactCard({ contact, company }: Pick<Deal, 'contact' | 'company'>) {
  return (
    <Card>
      <CardHeader title="Kontak & perusahaan" />
      <div className="flex flex-col gap-2.5 px-4 pb-3.5">
        {contact && (
          <>
            <Link to={`/crm/contacts/${contact.id}`} className="group flex items-center gap-2.5">
              <Avatar name={contact.name} size="lg" className="size-9 text-14" />
              <span className="flex min-w-0 flex-col gap-px">
                <span className="text-13 leading-[1.2] font-semibold text-ink group-hover:underline">{contact.name}</span>
                <span className="text-12 leading-[1.2] text-muted">{contact.role}</span>
              </span>
            </Link>
            <hr className="border-line" />
          </>
        )}
        <Link to={`/crm/companies/${company.id}`} className="flex items-center gap-2.5 text-13 leading-[1.2] font-medium text-ink hover:underline">
          <Landmark size={14} className="shrink-0 text-muted" />
          {company.name}
        </Link>
      </div>
    </Card>
  );
}
