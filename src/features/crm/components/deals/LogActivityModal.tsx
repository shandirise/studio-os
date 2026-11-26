import { useState, type FormEvent } from 'react';
import { Button, Field, Modal, Segmented, Textarea } from '@/components/ui';
import { logActivityKinds, type TimelineKind } from '../../dealData';

const FORM_ID = 'log-activity-form';

type LogActivityModalProps = {
  open: boolean;
  dealTitle: string;
  onClose: () => void;
  onLog: (kind: TimelineKind, note: string) => void;
};

/** "Log aktivitas" form on the deal detail: activity type + what happened. */
export function LogActivityModal({ open, dealTitle, onClose, onLog }: LogActivityModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Log aktivitas"
      subtitle={dealTitle}
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" type="submit" form={FORM_ID}>
            Simpan aktivitas
          </Button>
        </>
      }
    >
      {open && <LogActivityForm onLog={onLog} />}
    </Modal>
  );
}

function LogActivityForm({ onLog }: { onLog: LogActivityModalProps['onLog'] }) {
  const [kind, setKind] = useState<TimelineKind>('note');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const missing = note.trim() === '';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!missing) onLog(kind, note.trim());
  };

  return (
    <form id={FORM_ID} onSubmit={submit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1.5">
        <span className="text-12 leading-[1.2] font-medium text-ink-2">Jenis aktivitas</span>
        <Segmented options={logActivityKinds} value={kind} onChange={setKind} className="self-start" />
      </div>
      <Field label="Ringkasan" required error={submitted && missing ? 'Ringkasan wajib diisi' : undefined}>
        {(id) => (
          <Textarea
            id={id}
            autoFocus
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="mis. Klien minta diskon 5%, follow-up minggu depan."
            invalid={submitted && missing}
          />
        )}
      </Field>
    </form>
  );
}
