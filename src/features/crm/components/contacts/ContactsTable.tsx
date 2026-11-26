import type { MouseEvent } from 'react';
import { Link } from 'react-router';
import { Avatar, Badge, Checkbox, Table, TD, TH, THead, TR, Tag } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { contactStageTone } from '@/lib/status';
import { companyById, contactName, formatShortDate, lastContactedLabel, type Company, type Contact } from '../../contactData';
import { SortableTH, type SortDirection } from './SortableTH';

type ContactsTableProps = {
  rows: Contact[];
  companies: Company[];
  selected: Set<string>;
  onToggle: (id: string, on: boolean) => void;
  onToggleAll: (on: boolean) => void;
  sort: SortDirection | null;
  onSort: () => void;
  onOpen: (id: string) => void;
};

const stop = (e: MouseEvent) => e.stopPropagation();

function TagCell({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  const [first, ...rest] = tags;
  return (
    <div className="flex items-center gap-1.5" title={tags.join(', ')}>
      <Tag>{first}</Tag>
      {rest.length > 0 && <Tag>+{rest.length}</Tag>}
    </div>
  );
}

/** C1 contacts table: selectable rows that open the contact detail. */
export function ContactsTable({ rows, companies, selected, onToggle, onToggleAll, sort, onSort, onOpen }: ContactsTableProps) {
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));

  return (
    <Table minWidth={1134}>
      <THead>
        <TH className="w-10">
          <Checkbox checked={allSelected} onChange={onToggleAll} ariaLabel="Pilih semua kontak di halaman ini" />
        </TH>
        <SortableTH direction={sort} onSort={onSort}>
          NAMA
        </SortableTH>
        <TH className="w-[214px]">EMAIL / TELEPON</TH>
        <TH className="w-[140px]">PERUSAHAAN</TH>
        <TH className="w-[100px]">STAGE</TH>
        <TH className="w-14">PIC</TH>
        <TH className="w-[84px]">SUMBER</TH>
        <TH className="w-[100px]">TAG</TH>
        <TH className="w-[106px]">DIHUBUNGI</TH>
        <TH className="w-[100px]">DIBUAT</TH>
      </THead>
      <tbody>
        {rows.map((contact) => {
          const name = contactName(contact);
          const company = companyById(contact.companyId, companies);
          const pic = memberById(contact.picId);
          const isSelected = selected.has(contact.id);
          return (
            <TR key={contact.id} selected={isSelected} onClick={() => onOpen(contact.id)} className="h-[54px]">
              <TD onClick={stop}>
                <Checkbox checked={isSelected} onChange={(on) => onToggle(contact.id, on)} ariaLabel={`Pilih ${name}`} />
              </TD>
              <TD>
                <div className="flex items-center gap-2">
                  <Avatar name={name} className="size-7 text-11" />
                  <div className="flex min-w-0 flex-col gap-px">
                    <span className="truncate font-medium">{name}</span>
                    <span className="truncate text-11-5 text-muted">{contact.title}</span>
                  </div>
                </div>
              </TD>
              <TD>
                <div className="flex min-w-0 flex-col gap-px">
                  <span className="truncate">{contact.email}</span>
                  <span className="truncate text-11-5 text-muted">{contact.phone}</span>
                </div>
              </TD>
              <TD>
                {company && (
                  <Link to={`/crm/companies/${company.id}`} onClick={stop} className="hover:underline">
                    {company.name}
                  </Link>
                )}
              </TD>
              <TD>
                <Badge tone={contactStageTone[contact.stage]}>{contact.stage}</Badge>
              </TD>
              <TD>
                <Avatar name={pic.name} size="xs" className="text-10" />
              </TD>
              <TD>{contact.source}</TD>
              <TD>
                <TagCell tags={contact.tags} />
              </TD>
              <TD>{lastContactedLabel(contact.daysSinceContact)}</TD>
              <TD>{formatShortDate(contact.createdAt)}</TD>
            </TR>
          );
        })}
      </tbody>
    </Table>
  );
}
