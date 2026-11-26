import { Copy } from 'lucide-react';
import { Button, Card, SectionLabel, useToast } from '@/components/ui';
import { bankAccount } from '../data';

/** "Cara pembayaran": the agency's bank account with a copy button. */
export function PaymentMethodCard() {
  const toast = useToast();

  const copy = () => {
    void navigator.clipboard?.writeText(bankAccount.number.replace(/\s/g, '')).catch(() => undefined);
    toast('Nomor rekening disalin', `${bankAccount.bank} ${bankAccount.number} a.n. ${bankAccount.holder}`);
  };

  return (
    <Card className="flex flex-col gap-2.5 p-3.5 lg:gap-3 lg:p-4">
      <SectionLabel className="text-10">CARA PEMBAYARAN</SectionLabel>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-[3px] rounded-control border border-line bg-subtle p-2.5 lg:gap-y-1.5 lg:p-3">
        <p className="text-12 leading-none text-muted lg:col-span-2 lg:text-13 lg:font-semibold lg:text-ink">
          {bankAccount.bank} · {bankAccount.holder}
        </p>
        <p className="col-start-1 text-[17px] leading-none font-bold text-ink lg:text-20 lg:tracking-[-0.005em]">{bankAccount.number}</p>
        <Button size="sm" icon={Copy} onClick={copy} className="col-start-2 row-span-2 row-start-1 lg:row-span-1 lg:row-start-2">
          Salin
        </Button>
      </div>
    </Card>
  );
}
