import { useState } from 'react';
import { Button, Field, Input, Modal, useToast } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import { SettingsSection } from './SettingsSection';

/** "Zona bahaya" card; deleting asks the user to type the workspace name. */
export function DangerZoneSection({ workspaceName }: { workspaceName: string }) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  const close = () => {
    setOpen(false);
    setConfirmation('');
  };

  const confirm = () => {
    close();
    toast('Permintaan penghapusan dikirim', `Konfirmasi terakhir dikirim ke ${currentUser.email}.`);
  };

  return (
    <SettingsSection
      danger
      title="Zona bahaya"
      description="Menghapus workspace akan menghapus semua kontak, project, dan invoice secara permanen."
      className="gap-3"
    >
      <Button variant="danger" size="sm" className="self-start" onClick={() => setOpen(true)}>
        Hapus workspace
      </Button>

      <Modal
        open={open}
        onClose={close}
        width={460}
        title="Hapus workspace?"
        subtitle="Tindakan ini tidak bisa dibatalkan."
        footer={
          <>
            <Button onClick={close}>Batal</Button>
            <Button variant="danger" disabled={confirmation !== workspaceName} onClick={confirm}>
              Hapus workspace
            </Button>
          </>
        }
      >
        <Field label={`Ketik "${workspaceName}" untuk konfirmasi`}>
          {(id) => <Input id={id} value={confirmation} onChange={(e) => setConfirmation(e.target.value)} autoFocus />}
        </Field>
      </Modal>
    </SettingsSection>
  );
}
