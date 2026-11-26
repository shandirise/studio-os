import { useState } from 'react';
import { Button, Checkbox, Field, Input } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatRupiah } from '@/lib/format';
import { issuer, portalClient, type PortalQuotation } from '../data';
import { PortalDialog } from './PortalDialog';

type ApproveQuotationModalProps = {
  open: boolean;
  onClose: () => void;
  quotation: PortalQuotation;
  /** Called with the signer's full name once the client confirms. */
  onApprove: (signerName: string) => void;
};

/** M4 · Setujui Quotation: name, optional signature and explicit agreement before approving. */
export function ApproveQuotationModal({ open, onClose, quotation, onApprove }: ApproveQuotationModalProps) {
  const [name, setName] = useState<string>(portalClient.name);
  const [signature, setSignature] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameMissing = name.trim().length === 0;

  const submit = () => {
    setSubmitted(true);
    if (agreed && !nameMissing) onApprove(name.trim());
  };

  return (
    <PortalDialog
      open={open}
      onClose={onClose}
      title="Setujui Quotation"
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" onClick={submit}>
            Setujui
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-0.5 rounded-control border border-line bg-subtle p-3">
          <p className="text-13 leading-none font-semibold text-ink">{quotation.number}</p>
          <p className="text-12 leading-[1.3] text-muted">
            {formatRupiah(quotation.total)} · {issuer.name}
          </p>
        </div>

        <Field label="Nama lengkap" required error={submitted && nameMissing ? 'Nama lengkap wajib diisi.' : undefined}>
          {(id) => (
            <Input
              id={id}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              invalid={submitted && nameMissing}
            />
          )}
        </Field>

        <Field label="Tanda tangan (opsional)">
          {(id) => (
            <input
              id={id}
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Ketik atau gambar tanda tangan"
              className={cn(
                'h-[84px] w-full rounded-control border border-dashed border-line-2 bg-white px-3 text-center text-ink outline-none placeholder:text-12-5 placeholder:text-faint focus:border-ink',
                signature ? 'text-22 italic' : 'text-12-5',
              )}
            />
          )}
        </Field>

        <div className="flex flex-col gap-1.5">
          <Checkbox
            checked={agreed}
            onChange={setAgreed}
            className="items-start gap-2.5 text-12-5 leading-[1.5]"
            label="Saya menyetujui penawaran ini beserta syarat dan termin pembayarannya."
          />
          {submitted && !agreed && <p className="pl-[26px] text-11-5 text-danger">Centang persetujuan untuk melanjutkan.</p>}
        </div>
      </div>
    </PortalDialog>
  );
}
