import { useEffect, useState, type FormEvent } from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button, Field, Input, Modal, Select } from '@/components/ui';
import { team } from '@/data/workspace';
import type { ContactStage } from '@/lib/status';
import {
  companies,
  contactName,
  contactStages,
  leadSources,
  slugify,
  TODAY,
  type Contact,
  type LeadSource,
} from '../../contactData';

type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyId: string;
  title: string;
  stage: ContactStage;
  source: LeadSource;
  picId: string;
};

type FormErrors = Partial<Record<'firstName' | 'email', string>>;

function formFrom(contact: Contact | undefined, defaultCompanyId: string): ContactForm {
  return {
    firstName: contact?.firstName ?? '',
    lastName: contact?.lastName ?? '',
    email: contact?.email ?? '',
    phone: contact?.phone ?? '',
    companyId: contact?.companyId ?? defaultCompanyId,
    title: contact?.title ?? '',
    stage: contact?.stage ?? 'Lead',
    source: contact?.source ?? 'Referral',
    picId: contact?.picId ?? 'la',
  };
}

function validate(form: ContactForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.firstName.trim()) errors.firstName = 'Nama depan wajib diisi.';
  if (!form.email.trim()) errors.email = 'Email wajib diisi.';
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Format email tidak valid.';
  return errors;
}

type AddContactModalProps = {
  open: boolean;
  onClose: () => void;
  /** Called with the new (or updated) contact. */
  onSave: (contact: Contact) => void;
  /** When set, the modal edits this contact instead of creating one. */
  contact?: Contact;
  /** Preselected company for new contacts (e.g. from a company page). */
  defaultCompanyId?: string;
};

const companyOptions = companies.map((c) => ({ value: c.id, label: c.name }));
const picOptions = team.map((m) => ({ value: m.id, label: m.name }));

/** M1 · Tambah Kontak (also used to edit a contact). */
export function AddContactModal({ open, onClose, onSave, contact, defaultCompanyId = '' }: AddContactModalProps) {
  const [form, setForm] = useState<ContactForm>(() => formFrom(contact, defaultCompanyId));
  const [errors, setErrors] = useState<FormErrors>({});
  const editing = Boolean(contact);

  // Start from a fresh form every time the modal opens.
  useEffect(() => {
    if (open) {
      setForm(formFrom(contact, defaultCompanyId));
      setErrors({});
    }
  }, [open, contact, defaultCompanyId]);

  const set = <K extends keyof ContactForm>(key: K) => (value: ContactForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const save = (addAnother: boolean) => {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const values = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      companyId: form.companyId,
      title: form.title.trim(),
      stage: form.stage,
      source: form.source,
      picId: form.picId,
    };

    onSave(
      contact
        ? { ...contact, ...values }
        : {
            ...values,
            id: `${slugify(contactName(values))}-${Date.now().toString(36)}`,
            tags: [],
            daysSinceContact: null,
            createdAt: TODAY,
          },
    );

    if (addAnother) {
      setForm(formFrom(undefined, form.companyId));
      setErrors({});
    } else {
      onClose();
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    save(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? 'Edit Kontak' : 'Tambah Kontak'}
      subtitle={editing ? 'Perbarui data kontak' : 'Lead, prospek, atau klien baru'}
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          {!editing && <Button onClick={() => save(true)}>Simpan &amp; tambah lagi</Button>}
          <Button variant="primary" type="submit" form="contact-form">
            {editing ? 'Simpan perubahan' : 'Simpan kontak'}
          </Button>
        </>
      }
    >
      <form id="contact-form" onSubmit={onSubmit} noValidate className="grid gap-x-3 gap-y-3.5 sm:grid-cols-2">
        <Field label="Nama depan" required error={errors.firstName}>
          {(id) => (
            <Input
              id={id}
              value={form.firstName}
              onChange={(e) => set('firstName')(e.target.value)}
              invalid={Boolean(errors.firstName)}
              placeholder="Rina"
              autoFocus
            />
          )}
        </Field>
        <Field label="Nama belakang">
          {(id) => <Input id={id} value={form.lastName} onChange={(e) => set('lastName')(e.target.value)} placeholder="Wulandari" />}
        </Field>
        <Field label="Email" required error={errors.email}>
          {(id) => (
            <Input
              id={id}
              type="email"
              icon={Mail}
              value={form.email}
              onChange={(e) => set('email')(e.target.value)}
              invalid={Boolean(errors.email)}
              placeholder="rina@majubersama.co.id"
            />
          )}
        </Field>
        <Field label="Telepon">
          {(id) => (
            <Input
              id={id}
              type="tel"
              icon={Phone}
              value={form.phone}
              onChange={(e) => set('phone')(e.target.value)}
              placeholder="+62 812-3456-7788"
            />
          )}
        </Field>
        <Field label="Perusahaan">
          {(id) => (
            <Select
              id={id}
              value={form.companyId}
              onChange={(e) => set('companyId')(e.target.value)}
              options={companyOptions}
              placeholder="Pilih perusahaan"
            />
          )}
        </Field>
        <Field label="Jabatan">
          {(id) => <Input id={id} value={form.title} onChange={(e) => set('title')(e.target.value)} placeholder="Direktur Marketing" />}
        </Field>
        <Field label="Lifecycle stage">
          {(id) => (
            <Select id={id} value={form.stage} onChange={(e) => set('stage')(e.target.value as ContactStage)} options={contactStages} />
          )}
        </Field>
        <Field label="Sumber lead">
          {(id) => (
            <Select id={id} value={form.source} onChange={(e) => set('source')(e.target.value as LeadSource)} options={[...leadSources]} />
          )}
        </Field>
        <Field label="PIC" className="sm:col-span-2">
          {(id) => <Select id={id} value={form.picId} onChange={(e) => set('picId')(e.target.value)} options={picOptions} />}
        </Field>
      </form>
    </Modal>
  );
}
