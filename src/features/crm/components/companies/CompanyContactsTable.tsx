import { useNavigate } from 'react-router';
import { Avatar, Badge, Card, Table, TD, TH, THead, TR } from '@/components/ui';
import { contactStageTone } from '@/lib/status';
import { contactName, type Contact } from '../../contactData';

/**
 * Contacts of a company. The designed KONTAK column was too narrow to show names,
 * so the job title sits under the name and the remaining columns keep their widths.
 */
export function CompanyContactsTable({ contacts }: { contacts: Contact[] }) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      <Table minWidth={480}>
        <THead>
          <TH>KONTAK</TH>
          <TH className="w-[210px]">EMAIL</TH>
          <TH className="w-[90px]">STAGE</TH>
        </THead>
        <tbody>
          {contacts.map((contact) => {
            const name = contactName(contact);
            return (
              <TR key={contact.id} onClick={() => navigate(`/crm/contacts/${contact.id}`)} className="h-[50px]">
                <TD>
                  <div className="flex items-center gap-2">
                    <Avatar name={name} className="size-7 text-11" />
                    <div className="flex min-w-0 flex-col gap-px">
                      <span className="truncate font-medium">{name}</span>
                      {contact.title && <span className="truncate text-11-5 text-muted">{contact.title}</span>}
                    </div>
                  </div>
                </TD>
                <TD className="max-w-[210px] truncate text-muted">{contact.email}</TD>
                <TD>
                  <Badge tone={contactStageTone[contact.stage]}>{contact.stage}</Badge>
                </TD>
              </TR>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
}
