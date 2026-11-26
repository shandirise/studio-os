import { useState, type FormEvent } from 'react';
import { Button, Field, Input, Modal } from '@/components/ui';

type CreateApiKeyModalProps = {
  onClose: () => void;
  onCreate: (name: string) => void;
};

/** Asks for a label before generating a new API key. Mount it only while open. */
export function CreateApiKeyModal({ onClose, onCreate }: CreateApiKeyModalProps) {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const error = name.trim() ? undefined : 'Beri nama agar kunci mudah dikenali';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!error) onCreate(name.trim());
  };

  return (
    <Modal
      open
      onClose={onClose}
      width={460}
      title="Buat API key"
      subtitle="Kunci hanya ditampilkan sekali saat dibuat"
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" type="submit" form="create-api-key">
            Buat kunci
          </Button>
        </>
      }
    >
      <form id="create-api-key" onSubmit={submit} noValidate>
        <Field label="Nama kunci" required error={submitted ? error : undefined}>
          {(id) => (
            <Input
              id={id}
              placeholder="Mis. Integrasi Make"
              value={name}
              invalid={submitted && !!error}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          )}
        </Field>
      </form>
    </Modal>
  );
}
