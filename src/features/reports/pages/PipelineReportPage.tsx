import { ConversionFunnelCard } from '../components/ConversionFunnelCard';
import { ForecastCard } from '../components/ForecastCard';
import { StageDurationCard } from '../components/StageDurationCard';

/** G1 · Reports · Pipeline (header and tabs come from ReportsLayout). */
export function PipelineReportPage() {
  return (
    <>
      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-4">
        <ConversionFunnelCard />
        <ForecastCard />
      </div>
      <StageDurationCard />
    </>
  );
}
