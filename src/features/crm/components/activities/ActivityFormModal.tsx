import { useState, type FormEvent } from 'react';
import { Button, Field, Input, Modal, Select } from '@/components/ui';
import { team } from '@/data/workspace';
import { activityTypeOptions, TODAY, type Activity, type ActivityType } from '../../dealData';

const FORM_ID = 'activity-form';
const ownerOptions = team.map((m) => ({ value: m.id, label: m.name }));

type ActivityFormModalProps = {
  open: boolean;
  /** Date pre-filled in the form (e.g. the day picked in the calendar). */
  defaultDate: string;
  onClose: () => void;
  onCreate: (activity: Activity) => void;
};

/** "Aktivitas baru" form: what, related record, when and who. */
export function ActivityFormModal({ open, defaultDate, onClose, onCreate }: ActivityFormModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Aktivitas baru"
      subtitle="Jadwalkan follow-up untuk kontak atau deal"
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" type="submit" form={FORM_ID}>
            Simpan aktivitas
          </Button>
        </>
      }
    >
      {open && <ActivityForm defaultDate={defaultDate} onCreate={onCreate} />}
    </Modal>
  );
}

function ActivityForm({ defaultDate, onCreate }: Pick<ActivityFormModalProps, 'defaultDate' | 'onCreate'>) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ActivityType>('call');
  const [context, setContext] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState('09:00');
  const [ownerId, setOwnerId] = useState('dp');
  const [submitted, setSubmitted] = useState(false);
  const titleMissing = title.trim() === '';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (titleMissing) return;
    onCreate({
      id: `a-${Date.now()}`,
      type,
      title: title.trim(),
      context: context.trim() || 'Tanpa relasi',
      date: date || TODAY,
      time: time || '09:00',
      ownerId,
      done: false,
    });
  };

  return (
    <form id={FORM_ID} onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
      <Field label="Judul" required error={submitted && titleMissing ? 'Judul wajib diisi' : undefined} className="sm:col-span-2">
        {(id) => (
          <Input
            id={id}
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="mis. Telepon Anindya Putri"
            invalid={submitted && titleMissing}
          />
        )}
      </Field>
      <Field label="Jenis">
        {(id) => (
          <Select id={id} options={activityTypeOptions} value={type} onChange={(e) => setType(e.target.value as ActivityType)} />
        )}
      </Field>
      <Field label="PIC">
        {(id) => <Select id={id} options={ownerOptions} value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />}
      </Field>
      <Field label="Terkait dengan" className="sm:col-span-2">
        {(id) => (
          <Input
            id={id}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="mis. Deal · Branding & Kemasan Produk"
          />
        )}
      </Field>
      <Field label="Tanggal">
        {(id) => <Input id={id} type="date" value={date} onChange={(e) => setDate(e.target.value)} />}
      </Field>
      <Field label="Jam">
        {(id) => <Input id={id} type="time" value={time} onChange={(e) => setTime(e.target.value)} />}
      </Field>
    </form>
  );
}
