import { KpiGrid } from '../components/KpiGrid';
import { OnTimeCard } from '../components/OnTimeCard';
import { ProjectProfitCard } from '../components/ProjectProfitCard';
import { projectKpis } from '../data';

/** G1 · Reports · Project (header and tabs come from ReportsLayout). */
export function ProjectReportPage() {
  return (
    <>
      <KpiGrid kpis={projectKpis} className="lg:grid-cols-3" />
      <ProjectProfitCard />
      <OnTimeCard />
    </>
  );
}
