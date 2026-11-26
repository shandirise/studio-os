import { useState } from 'react';
import { FileText, MessageSquare } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { EmptyState, Tabs, useToast } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import { ActivityComposer } from '../components/contacts/ActivityComposer';
import { ActivityTimeline } from '../components/contacts/ActivityTimeline';
import { AddContactModal } from '../components/contacts/AddContactModal';
import { ContactDealsCard } from '../components/contacts/ContactDealsCard';
import { ContactHeader } from '../components/contacts/ContactHeader';
import { ContactProfileCard } from '../components/contacts/ContactProfileCard';
import { DeleteContactModal } from '../components/contacts/DeleteContactModal';
import { FileList } from '../components/contacts/FileList';
import { NextFollowUpCard } from '../components/contacts/NextFollowUpCard';
import { RelatedDocumentsCard } from '../components/contacts/RelatedDocumentsCard';
import {
  companyById,
  composerKinds,
  contactName,
  contactRecords,
  findContact,
  type Activity,
  type ComposerKind,
  type Contact,
} from '../contactData';

type CenterTab = 'timeline' | 'notes' | 'files';

const centerTabs: Array<{ value: CenterTab; label: string }> = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'notes', label: 'Catatan' },
  { value: 'files', label: 'File' },
];

/** C2 · Kontak — Detail. Any id works; unknown ids fall back to Rina Wulandari. */
export function ContactDetailPage() {
  const { contactId } = useParams();
  const initial = findContact(contactId);
  // Re-mount when the id changes so local edits never leak between contacts.
  return <ContactDetail key={initial.id} initial={initial} />;
}

function ContactDetail({ initial }: { initial: Contact }) {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [records] = useState(() => contactRecords(initial));
  const [contact, setContact] = useState(initial);
  const [activities, setActivities] = useState<Activity[]>(records.activities);
  const [followUp, setFollowUp] = useState(records.followUp);
  const [tab, setTab] = useState<CenterTab>('timeline');
  const [editOpen, setEditOpen] = useState(false);

  const name = contactName(contact);
  const company = companyById(contact.companyId);

  useBreadcrumbs([{ label: 'CRM', to: '/crm/contacts' }, { label: 'Kontak', to: '/crm/contacts' }, { label: name }]);

  const deleteOpen = searchParams.get('delete') === '1';
  const setDeleteOpen = (open: boolean) =>
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (open) params.set('delete', '1');
        else params.delete('delete');
        return params;
      },
      { replace: true },
    );

  const logActivity = (kind: ComposerKind, text: string) => {
    const meta = composerKinds.find((k) => k.value === kind)!;
    setActivities((list) => [
      { id: `act-${Date.now()}`, kind, actor: currentUser.name, action: meta.action, time: 'Baru saja', note: text },
      ...list,
    ]);
    setTab((t) => (t === 'files' ? 'timeline' : t));
    toast(meta.saved, `Ditambahkan ke timeline ${name}.`);
  };

  const scheduleFollowUp = () => {
    const next = followUp ?? { title: `Follow-up dengan ${contact.firstName}`, when: 'Senin, 23 Nov · 10:00' };
    setFollowUp(next);
    toast('Follow-up dijadwalkan', `${next.title} · ${next.when}`);
  };

  const createDeal = () => navigate('/crm/deals?new=1');

  const notes = activities.filter((a) => a.note);

  return (
    <Page>
      <ContactHeader
        contact={contact}
        company={company}
        onScheduleFollowUp={scheduleFollowUp}
        onCreateDeal={createDeal}
        onInvite={() => toast('Undangan portal terkirim', `Dikirim ke ${contact.email}`)}
        onEdit={() => setEditOpen(true)}
        onCopyEmail={() => {
          void navigator.clipboard?.writeText(contact.email);
          toast('Email disalin', contact.email);
        }}
        onDelete={() => setDeleteOpen(true)}
      />

      <div className="grid items-start gap-4 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)_320px]">
        <div className="lg:row-span-2 xl:row-span-1">
          <ContactProfileCard
            contact={contact}
            company={company}
            onEdit={() => setEditOpen(true)}
            onAddTag={(tag) => {
              setContact((c) => ({ ...c, tags: [...c.tags, tag] }));
              toast('Tag ditambahkan', `“${tag}” ditambahkan ke ${name}.`);
            }}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-3.5">
          <ActivityComposer
            firstName={contact.firstName}
            onSave={logActivity}
            onAttach={(fileName) => toast('File dilampirkan', fileName)}
          />
          <Tabs items={centerTabs} value={tab} onChange={setTab} />
          {tab === 'timeline' && <ActivityTimeline items={activities} className="pt-1.5" />}
          {tab === 'notes' &&
            (notes.length > 0 ? (
              <ActivityTimeline items={notes} className="pt-1.5" />
            ) : (
              <EmptyState icon={MessageSquare} title="Belum ada catatan" description="Catatan, log telepon dan meeting akan muncul di sini." />
            ))}
          {tab === 'files' &&
            (records.files.length > 0 ? (
              <FileList files={records.files} />
            ) : (
              <EmptyState icon={FileText} title="Belum ada file" description="File yang dilampirkan ke kontak ini akan muncul di sini." />
            ))}
        </div>

        <div className="flex flex-col gap-3.5 lg:col-start-2 xl:col-start-3">
          <ContactDealsCard deals={records.deals} onCreateDeal={createDeal} />
          <RelatedDocumentsCard documents={records.documents} />
          <NextFollowUpCard followUp={followUp} />
        </div>
      </div>

      <AddContactModal
        open={editOpen}
        contact={contact}
        onClose={() => setEditOpen(false)}
        onSave={(updated) => {
          setContact(updated);
          toast('Kontak diperbarui', `Perubahan pada ${contactName(updated)} disimpan.`);
        }}
      />
      <DeleteContactModal
        open={deleteOpen}
        name={name}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          toast('Kontak dihapus', `${name} dihapus dari daftar kontak.`);
          navigate('/crm/contacts');
        }}
      />
    </Page>
  );
}
