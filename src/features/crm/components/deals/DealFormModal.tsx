import { useState, type FormEvent } from 'react';
import { Button, Field, Input, Modal, Select } from '@/components/ui';
import { team } from '@/data/workspace';
import type { DealStage } from '@/lib/status';
import { dealSources, openStages, slugify, TODAY, type Deal, type DealSource } from '../../dealData';

const FORM_ID = 'deal-form';
const ownerOptions = team.map((m) => ({ value: m.id, label: m.name }));

type DealFormModalProps = {
  /** Stage the new deal starts in; the modal is open while this is set. */
  stage: DealStage | null;
  onClose: () => void;
  onCreate: (deal: Deal) => void;
};

/** "Deal baru" form, opened from the header button or a column's "Tambah". */
export function DealFormModal({ stage, onClose, onCreate }: DealFormModalProps) {
  return (
    <Modal
      open={stage !== null}
      onClose={onClose}
      title="Deal baru"
      subtitle="Tambahkan peluang penjualan ke pipeline"
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" type="submit" form={FORM_ID}>
            Simpan deal
          </Button>
        </>
      }
    >
      {stage && <DealForm initialStage={stage} onCreate={onCreate} />}
    </Modal>
  );
}

function DealForm({ initialStage, onCreate }: { initialStage: DealStage; onCreate: (deal: Deal) => void }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [value, setValue] = useState('');
  const [stage, setStage] = useState<DealStage>(initialStage);
  const [ownerId, setOwnerId] = useState('dp');
  const [closingDate, setClosingDate] = useState(TODAY);
  const [source, setSource] = useState<DealSource>('Referral');
  const [submitted, setSubmitted] = useState(false);

  const titleMissing = title.trim() === '';
  const companyMissing = company.trim() === '';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (titleMissing || companyMissing) return;
    onCreate({
      id: `${slugify(title)}-${Date.now().toString(36)}`,
      title: title.trim(),
      client: company.trim(),
      company: { id: slugify(company), name: company.trim() },
      contact: contact.trim() ? { id: slugify(contact), name: contact.trim(), role: 'Kontak' } : undefined,
      value: Number(value) || 0,
      stage,
      ownerId,
      closingDate,
      source,
    });
  };

  return (
    <form id={FORM_ID} onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
      <Field label="Judul deal" required error={submitted && titleMissing ? 'Judul deal wajib diisi' : undefined} className="sm:col-span-2">
        {(id) => (
          <Input
            id={id}
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="mis. Redesain Website Corporate"
            invalid={submitted && titleMissing}
          />
        )}
      </Field>
      <Field label="Perusahaan" required error={submitted && companyMissing ? 'Perusahaan wajib diisi' : undefined}>
        {(id) => (
          <Input
            id={id}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="mis. PT Maju Bersama"
            invalid={submitted && companyMissing}
          />
        )}
      </Field>
      <Field label="Kontak">
        {(id) => (
          <Input id={id} value={contact} onChange={(e) => setContact(e.target.value)} placeholder="mis. Rina Wulandari" />
        )}
      </Field>
      <Field label="Nilai (Rp)">
        {(id) => (
          <Input
            id={id}
            type="number"
            min={0}
            step={500_000}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0"
          />
        )}
      </Field>
      <Field label="Stage">
        {(id) => <Select id={id} options={[...openStages]} value={stage} onChange={(e) => setStage(e.target.value as DealStage)} />}
      </Field>
      <Field label="PIC">
        {(id) => <Select id={id} options={ownerOptions} value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />}
      </Field>
      <Field label="Perkiraan closing">
        {(id) => <Input id={id} type="date" value={closingDate} onChange={(e) => setClosingDate(e.target.value)} />}
      </Field>
      <Field label="Sumber">
        {(id) => (
          <Select id={id} options={[...dealSources]} value={source} onChange={(e) => setSource(e.target.value as DealSource)} />
        )}
      </Field>
    </form>
  );
}
