import { TriangleAlert } from 'lucide-react';
import { Button, Modal } from '@/components/ui';

type DeleteContactModalProps = {
  open: boolean;
  /** Full name of the contact being deleted. */
  name: string;
  onClose: () => void;
  onConfirm: () => void;
};

/** M5 · Hapus Kontak? confirmation. */
export function DeleteContactModal({ open, name, onClose, onConfirm }: DeleteContactModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Hapus Kontak?"
      width={460}
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" onClick={onConfirm}>
            Hapus kontak
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3.5">
        <p className="text-13-5 leading-5 text-ink-2">
          Kontak {name} beserta riwayat aktivitasnya akan dihapus permanen. Deal dan dokumen terkait tidak ikut terhapus.
        </p>
        <div className="flex items-start gap-2.5 rounded-control bg-red-soft p-3" role="alert">
          <TriangleAlert size={16} className="mt-px shrink-0 text-red" />
          <p className="text-12-5 leading-[18px] font-semibold text-red-strong">Tindakan ini tidak bisa dibatalkan.</p>
        </div>
      </div>
    </Modal>
  );
}
