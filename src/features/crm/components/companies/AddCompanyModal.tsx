import { useEffect, useState, type FormEvent } from 'react';
import { Globe } from 'lucide-react';
import { Button, Field, Input, Modal, Select } from '@/components/ui';
import { team } from '@/data/workspace';
import { companySizes, slugify, TODAY, type Company, type CompanySize } from '../../contactData';

type CompanyForm = {
  name: string;
  industry: string;
  size: CompanySize;
  city: string;
  website: string;
  picId: string;
};

const emptyForm: CompanyForm = { name: '', industry: '', size: '10–50', city: '', website: '', picId: 'la' };
const picOptions = team.map((m) => ({ value: m.id, label: m.name }));

type AddCompanyModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (company: Company) => void;
};

/** "+ Perusahaan" form, styled like M1 Tambah Kontak. */
export function AddCompanyModal({ open, onClose, onSave }: AddCompanyModalProps) {
  const [form, setForm] = useState<CompanyForm>(emptyForm);
  const [nameError, setNameError] = useState<string>();

  useEffect(() => {
    if (open) {
      setForm(emptyForm);
      setNameError(undefined);
    }
  }, [open]);

  const set = <K extends keyof CompanyForm>(key: K) => (value: CompanyForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key === 'name') setNameError(undefined);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setNameError('Nama perusahaan wajib diisi.');
      return;
    }
    const city = form.city.trim() || '—';
    onSave({
      id: `${slugify(name)}-${Date.now().toString(36)}`,
      name,
      industry: form.industry.trim() || '—',
      size: form.size,
      area: city,
      city,
      picId: form.picId,
      dealsWon: 0,
      revenue: 0,
      website: form.website.trim(),
      address: '',
      npwp: '',
      clientSince: TODAY,
      paidInvoices: 0,
      outstanding: 0,
      activeProjects: 0,
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Tambah Perusahaan"
      subtitle="Klien atau calon klien baru"
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" type="submit" form="company-form">
            Simpan perusahaan
          </Button>
        </>
      }
    >
      <form id="company-form" onSubmit={onSubmit} noValidate className="grid gap-x-3 gap-y-3.5 sm:grid-cols-2">
        <Field label="Nama perusahaan" required error={nameError} className="sm:col-span-2">
          {(id) => (
            <Input
              id={id}
              value={form.name}
              onChange={(e) => set('name')(e.target.value)}
              invalid={Boolean(nameError)}
              placeholder="PT Maju Bersama Digital"
              autoFocus
            />
          )}
        </Field>
        <Field label="Industri">
          {(id) => <Input id={id} value={form.industry} onChange={(e) => set('industry')(e.target.value)} placeholder="Marketing & Media" />}
        </Field>
        <Field label="Ukuran">
          {(id) => (
            <Select id={id} value={form.size} onChange={(e) => set('size')(e.target.value as CompanySize)} options={[...companySizes]} />
          )}
        </Field>
        <Field label="Kota">
          {(id) => <Input id={id} value={form.city} onChange={(e) => set('city')(e.target.value)} placeholder="Jakarta" />}
        </Field>
        <Field label="Website">
          {(id) => (
            <Input id={id} icon={Globe} value={form.website} onChange={(e) => set('website')(e.target.value)} placeholder="majubersama.co.id" />
          )}
        </Field>
        <Field label="PIC" className="sm:col-span-2">
          {(id) => <Select id={id} value={form.picId} onChange={(e) => set('picId')(e.target.value)} options={picOptions} />}
        </Field>
      </form>
    </Modal>
  );
}
