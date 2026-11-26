import { Copy, Download, Ellipsis, Pencil, Plus } from 'lucide-react';
import { Avatar, Button, IconButton, Menu } from '@/components/ui';
import { companyMark, type Company } from '../../contactData';

type CompanyHeaderProps = {
  company: Company;
  onAddContact: () => void;
  onCreateDeal: () => void;
  onEdit: () => void;
  onCopyLink: () => void;
  onExport: () => void;
};

/** C4 header: company mark, name, industry · size · area, and actions. */
export function CompanyHeader({ company, onAddContact, onCreateDeal, onEdit, onCopyLink, onExport }: CompanyHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3.5">
        <Avatar name={companyMark(company.name)} className="size-12 bg-subtle text-18" />
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-22 leading-[26px] font-semibold tracking-[-0.01em] text-ink">{company.name}</h1>
          <p className="text-13 leading-4 text-muted">
            {company.industry} · {company.size} karyawan · {company.area}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button icon={Plus} onClick={onAddContact}>
          Tambah kontak
        </Button>
        <Button variant="primary" icon={Plus} onClick={onCreateDeal}>
          Buat deal
        </Button>
        <Menu
          trigger={({ toggle }) => <IconButton icon={Ellipsis} label="Aksi lainnya" onClick={toggle} />}
          items={[
            { label: 'Edit perusahaan', icon: Pencil, onSelect: onEdit },
            { label: 'Salin tautan', icon: Copy, onSelect: onCopyLink },
            { label: 'Export data', icon: Download, onSelect: onExport },
          ]}
        />
      </div>
    </div>
  );
}
