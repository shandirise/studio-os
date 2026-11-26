import { useState } from 'react';
import { Badge, Button, Field, Modal, Radio, Textarea } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatRupiah } from '@/lib/format';
import { lostReasons, type LostReason } from '../../dealData';

type DealLostModalProps = {
  /** The deal being marked lost; the modal is open while this is set. */
  deal: { title: string; value: number } | null;
  onClose: () => void;
  onConfirm: (reason: LostReason, note: string) => void;
};

/** M2 · Alasan Deal Lost — asks why a deal was lost before moving it to the Lost stage. */
export function DealLostModal({ deal, onClose, onConfirm }: DealLostModalProps) {
  const [reason, setReason] = useState<LostReason>('Harga terlalu tinggi');
  const [note, setNote] = useState('');

  const reset = () => {
    setReason('Harga terlalu tinggi');
    setNote('');
  };
  const close = () => {
    reset();
    onClose();
  };
  const confirm = () => {
    onConfirm(reason, note.trim());
    reset();
  };

  return (
    <Modal
      open={deal !== null}
      onClose={close}
      width={520}
      title="Alasan Deal Lost"
      subtitle="Membantu analisis win rate di Reports"
      footer={
        <>
          <Button onClick={close}>Batal</Button>
          <Button variant="danger" onClick={confirm}>
            Tandai Lost
          </Button>
        </>
      }
    >
      {deal && (
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between gap-2.5 rounded-control border border-line bg-subtle p-3">
            <span className="text-13 leading-none font-medium text-ink">
              {deal.title} · {formatRupiah(deal.value)}
            </span>
            <Badge tone="red">Lost</Badge>
          </div>

          <p className="text-12 leading-none font-medium text-ink-2">Alasan kalah</p>
          <div role="radiogroup" aria-label="Alasan kalah" className="flex flex-col gap-3.5">
            {lostReasons.map((r) => (
              <Radio
                key={r}
                name="lost-reason"
                checked={reason === r}
                onChange={() => setReason(r)}
                label={r}
                className={cn(
                  'flex h-[38px] gap-2.5 rounded-control border px-3 transition-colors',
                  reason === r ? 'border-ink font-semibold' : 'border-line-2 hover:bg-canvas',
                )}
              />
            ))}
          </div>

          <Field label="Catatan (opsional)">
            {(id) => (
              <Textarea
                id={id}
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Klien memilih agency dengan estimasi lebih rendah."
                className="min-h-16 px-2.5 py-2.5"
              />
            )}
          </Field>
        </div>
      )}
    </Modal>
  );
}
