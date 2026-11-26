import { KpiGrid } from '../components/KpiGrid';
import { LostReasonsCard } from '../components/LostReasonsCard';
import { MonthlyRevenueCard } from '../components/MonthlyRevenueCard';
import { TopClientsCard } from '../components/TopClientsCard';
import { salesKpis } from '../data';

/** G1 · Reports · Sales (header and tabs come from ReportsLayout). */
export function SalesReportPage() {
  return (
    <>
      <KpiGrid kpis={salesKpis} className="lg:grid-cols-4" />
      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-4">
        <MonthlyRevenueCard />
        <LostReasonsCard />
      </div>
      <TopClientsCard />
    </>
  );
}
