import { useRef, useState, type DragEvent } from 'react';
import { Upload } from 'lucide-react';
import { Button, Field, Input, Modal, Select, Textarea } from '@/components/ui';
import { DateField, formatNumber, parseNumber, TODAY } from '@/features/sales/components/document';
import { cn } from '@/lib/cn';
import { formatRupiah } from '@/lib/format';
import { paymentMethods, type Payment, type PaymentMethod } from '../../invoiceData';

const MAX_PROOF_BYTES = 5 * 1024 * 1024;
const PROOF_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

type RecordPaymentModalProps = {
  open: boolean;
  onClose: () => void;
  invoiceNumber: string;
  company: string;
  /** Outstanding amount; the default and maximum payment. */
  balance: number;
  /** Prefills the note, e.g. "DP 50%". */
  termLabel: string | null;
  onSave: (payment: Omit<Payment, 'id'>) => void;
};

/** M3 · Catat Pembayaran. Mounted only while open so every opening starts from a fresh form. */
export function RecordPaymentModal(props: RecordPaymentModalProps) {
  return props.open ? <RecordPaymentDialog {...props} /> : null;
}

function RecordPaymentDialog({ onClose, invoiceNumber, company, balance, termLabel, onSave }: RecordPaymentModalProps) {
  const [amount, setAmount] = useState(balance);
  const [date, setDate] = useState(TODAY);
  const [method, setMethod] = useState<PaymentMethod>('Transfer bank');
  const [note, setNote] = useState(`Pelunasan ${termLabel ?? 'invoice'} via BCA.`);
  const [proof, setProof] = useState<File | null>(null);
  const [proofError, setProofError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const amountError =
    amount <= 0 ? 'Masukkan jumlah pembayaran' : amount > balance ? `Melebihi sisa tagihan (${formatRupiah(balance)})` : null;

  const pickFile = (file: File | undefined) => {
    if (!file) return;
    if (!PROOF_TYPES.includes(file.type)) {
      setProofError('Format harus PNG, JPG, atau PDF');
    } else if (file.size > MAX_PROOF_BYTES) {
      setProofError('Ukuran file maksimal 5 MB');
    } else {
      setProofError(null);
      setProof(file);
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files[0]);
  };

  const save = () => {
    if (amountError) return;
    onSave({ amount, date, method, note: note.trim(), proofName: proof?.name ?? null });
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Catat Pembayaran"
      subtitle="Status invoice diperbarui otomatis"
      width={520}
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" onClick={save} disabled={Boolean(amountError)}>
            Simpan pembayaran
          </Button>
        </>
      }
    >
      <form
        className="flex flex-col gap-3.5"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <div className="flex items-center justify-between gap-4 rounded-control border border-line bg-subtle p-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-13 leading-none font-semibold text-ink">{invoiceNumber}</p>
            <p className="truncate text-12 leading-none text-muted">{company}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-0.5">
            <p className="text-11-5 leading-none text-muted">Sisa tagihan</p>
            <p className="text-16 leading-none font-bold text-ink">{formatRupiah(balance)}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Jumlah dibayar" required error={amountError}>
            {(id) => (
              <Input
                id={id}
                autoFocus
                inputMode="numeric"
                value={`Rp ${formatNumber(amount)}`}
                onChange={(e) => setAmount(parseNumber(e.target.value))}
                invalid={Boolean(amountError)}
              />
            )}
          </Field>
          <Field label="Tanggal">{(id) => <DateField id={id} value={date} onChange={setDate} />}</Field>
        </div>

        <Field label="Metode">
          {(id) => (
            <Select
              id={id}
              options={[...paymentMethods]}
              value={method}
              onChange={(e) => setMethod(paymentMethods.find((m) => m === e.target.value) ?? 'Transfer bank')}
            />
          )}
        </Field>

        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={cn(
              'flex cursor-pointer flex-col items-center gap-1.5 rounded-control border border-dashed bg-subtle p-4 text-center transition-colors hover:border-ink',
              dragging ? 'border-ink' : 'border-line-2',
            )}
          >
            <Upload size={18} className="text-ink" />
            <span className="text-13 leading-none font-semibold text-ink">{proof ? proof.name : 'Upload bukti transfer'}</span>
            <span className="text-11-5 leading-none text-muted">
              {proof ? 'Klik untuk mengganti file' : 'PNG, JPG, atau PDF · maks. 5 MB'}
            </span>
          </button>
          <input
            ref={fileInput}
            type="file"
            accept={PROOF_TYPES.join(',')}
            className="hidden"
            onChange={(e) => pickFile(e.target.files?.[0])}
          />
          {proofError && <p className="text-11-5 text-danger">{proofError}</p>}
        </div>

        <Field label="Catatan">
          {(id) => (
            <Textarea
              id={id}
              rows={1}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-14 resize-none p-2.5 leading-5"
            />
          )}
        </Field>
      </form>
    </Modal>
  );
}
