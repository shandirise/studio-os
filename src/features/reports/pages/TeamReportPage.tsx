import { MemberHoursCard } from '../components/MemberHoursCard';
import { UtilizationCard } from '../components/UtilizationCard';
import { WeeklyHoursCard } from '../components/WeeklyHoursCard';

/** G1 · Reports · Tim (header and tabs come from ReportsLayout). */
export function TeamReportPage() {
  return (
    <>
      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-4">
        <UtilizationCard />
        <MemberHoursCard />
      </div>
      <WeeklyHoursCard />
    </>
  );
}
