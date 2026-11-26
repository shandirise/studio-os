import { useState } from 'react';
import { FileText, Target, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { EmptyState, Tabs, useToast, type TabItem } from '@/components/ui';
import { CompanyContactsTable } from '../components/companies/CompanyContactsTable';
import { CompanyDealsTable } from '../components/companies/CompanyDealsTable';
import { CompanyHeader } from '../components/companies/CompanyHeader';
import { CompanyProfileCard } from '../components/companies/CompanyProfileCard';
import { LifetimeValueCard } from '../components/companies/LifetimeValueCard';
import { ActivityTimeline } from '../components/contacts/ActivityTimeline';
import { AddContactModal } from '../components/contacts/AddContactModal';
import { FileList } from '../components/contacts/FileList';
import { companyRecords, contactName, contacts as allContacts, findCompany, type Company, type Contact } from '../contactData';

type CompanyTab = 'timeline' | 'contacts' | 'deals' | 'files';

/** C4 · Perusahaan — Detail. Any id works; unknown ids fall back to PT Maju Bersama Digital. */
export function CompanyDetailPage() {
  const { companyId } = useParams();
  const company = findCompany(companyId);
  // Re-mount when the id changes so local state never leaks between companies.
  return <CompanyDetail key={company.id} company={company} />;
}

function CompanyDetail({ company }: { company: Company }) {
  useBreadcrumbs([{ label: 'CRM', to: '/crm/contacts' }, { label: 'Perusahaan', to: '/crm/companies' }, { label: company.name }]);
  const toast = useToast();
  const navigate = useNavigate();

  const [records] = useState(() => companyRecords(company));
  const [members, setMembers] = useState<Contact[]>(() => allContacts.filter((c) => c.companyId === company.id));
  const [tab, setTab] = useState<CompanyTab>('contacts');
  const [addOpen, setAddOpen] = useState(false);

  const tabs: Array<TabItem<CompanyTab>> = [
    { value: 'timeline', label: 'Timeline' },
    { value: 'contacts', label: 'Kontak', count: members.length },
    { value: 'deals', label: 'Deals', count: records.deals.length },
    { value: 'files', label: 'File', count: records.files.length },
  ];

  return (
    <Page>
      <CompanyHeader
        company={company}
        onAddContact={() => setAddOpen(true)}
        onCreateDeal={() => navigate('/crm/deals?new=1')}
        onEdit={() => toast('Mode edit dibuka', `Perbarui profil ${company.name}.`)}
        onCopyLink={() => {
          void navigator.clipboard?.writeText(window.location.href);
          toast('Tautan disalin', window.location.href);
        }}
        onExport={() => toast('Export dimulai', `Data ${company.name} sedang disiapkan.`)}
      />

      <div className="grid items-start gap-4 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_300px]">
        <div className="lg:row-span-2 xl:row-span-1">
          <CompanyProfileCard company={company} onEdit={() => toast('Mode edit dibuka', `Perbarui profil ${company.name}.`)} />
        </div>

        <div className="flex min-w-0 flex-col gap-3.5">
          <Tabs items={tabs} value={tab} onChange={setTab} />
          {tab === 'timeline' && <ActivityTimeline items={records.timeline} className="pt-1.5" />}
          {tab === 'contacts' &&
            (members.length > 0 ? (
              <CompanyContactsTable contacts={members} />
            ) : (
              <EmptyState icon={Users} title="Belum ada kontak" description="Tambahkan kontak pertama untuk perusahaan ini." />
            ))}
          {tab === 'deals' &&
            (records.deals.length > 0 ? (
              <CompanyDealsTable deals={records.deals} />
            ) : (
              <EmptyState icon={Target} title="Belum ada deal aktif" description="Deal untuk perusahaan ini akan muncul di sini." />
            ))}
          {tab === 'files' &&
            (records.files.length > 0 ? (
              <FileList files={records.files} />
            ) : (
              <EmptyState icon={FileText} title="Belum ada file" description="Kontrak, brief dan dokumen lain akan muncul di sini." />
            ))}
          {/* Recent activity stays visible under the list tabs, as in the design. */}
          {tab !== 'timeline' && <ActivityTimeline items={records.recent} className="pt-2.5" />}
        </div>

        <div className="flex flex-col gap-3.5 lg:col-start-2 xl:col-start-3">
          <LifetimeValueCard company={company} activeDeals={records.deals.length} />
        </div>
      </div>

      <AddContactModal
        open={addOpen}
        defaultCompanyId={company.id}
        onClose={() => setAddOpen(false)}
        onSave={(contact) => {
          if (contact.companyId === company.id) setMembers((list) => [...list, contact]);
          setTab('contacts');
          toast('Kontak disimpan', `${contactName(contact)} ditambahkan ke ${company.name}.`);
        }}
      />
    </Page>
  );
}
