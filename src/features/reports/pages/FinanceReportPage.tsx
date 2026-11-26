import { CashFlowCard } from '../components/CashFlowCard';
import { OldestReceivablesCard } from '../components/OldestReceivablesCard';
import { ReceivablesAgingCard } from '../components/ReceivablesAgingCard';

/** G1 · Reports · Keuangan (header and tabs come from ReportsLayout). */
export function FinanceReportPage() {
  return (
    <>
      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-4">
        <CashFlowCard />
        <ReceivablesAgingCard />
      </div>
      <OldestReceivablesCard />
    </>
  );
}
