import { CircleCheck } from 'lucide-react';
import type { OnboardingForm } from '../../data';
import { SummaryRow } from '../SummaryRow';

/** Step 4 · Recap of everything entered in the wizard. */
export function DoneSummary({ form }: { form: OnboardingForm }) {
  const { workspace, finance, invites } = form;
  const invited = invites.filter((invite) => invite.email.trim()).length;

  return (
    <>
      <div className="flex items-center gap-3 rounded-card border border-line bg-green-soft p-3.5 text-green-strong">
        <CircleCheck className="shrink-0" />
        <p className="text-13 leading-[1.4] font-medium">
          {invited > 0 ? `${invited} undangan siap dikirim saat Anda masuk ke dashboard.` : 'Anda bisa mengundang tim kapan saja.'}
        </p>
      </div>
      <div className="flex flex-col gap-3.5">
        <SummaryRow label="Workspace" value={`${workspace.name} · ${workspace.businessType}`} />
        <SummaryRow label="Mata uang & pajak" value={`${finance.currency} · ${finance.tax}`} />
        <SummaryRow label="Rekening" value={`${finance.bank} · ${finance.accountNumber}`} />
        <SummaryRow label="Anggota diundang" value={`${invited} orang`} />
      </div>
    </>
  );
}
