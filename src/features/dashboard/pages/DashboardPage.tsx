import { useState } from 'react';
import { Download } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, KpiCard, PageHeader, Segmented, useToast } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import { cn } from '@/lib/cn';
import { AtRiskProjectsCard } from '../components/AtRiskProjectsCard';
import { DueInvoicesCard } from '../components/DueInvoicesCard';
import { FollowUpCard } from '../components/FollowUpCard';
import { FunnelCard } from '../components/FunnelCard';
import { RevenueCard } from '../components/RevenueCard';
import { TeamActivityCard } from '../components/TeamActivityCard';
import { kpis, periodOptions, type Period } from '../data';

/** B1 · Dashboard (Owner/Manager). Mobile shows the condensed variant from the design. */
export function DashboardPage() {
  useBreadcrumbs([{ label: 'Dashboard' }]);
  const toast = useToast();
  const [period, setPeriod] = useState<Period>('month');

  return (
    <Page>
      <PageHeader
        title={`Selamat pagi, ${currentUser.firstName}`}
        subtitle={
          <>
            Kamis, 19 November 2026<span className="max-lg:hidden"> · Ringkasan kondisi bisnis hari ini</span>
          </>
        }
        className="max-lg:[&_h1]:text-20"
        actions={
          <>
            <Segmented
              options={periodOptions}
              value={period}
              onChange={setPeriod}
              className="max-lg:[&>button:last-child]:hidden"
            />
            <Button icon={Download} className="max-lg:hidden" onClick={() => toast('Export dimulai', 'File ringkasan dashboard sedang disiapkan.')}>
              Export
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-5 lg:gap-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={
              <>
                <span className="max-lg:hidden">{kpi.label}</span>
                <span className="lg:hidden">{kpi.shortLabel}</span>
              </>
            }
            value={kpi.value}
            delta={kpi.delta}
            trend={kpi.trend}
            className={cn(kpi.desktopOnly && 'max-lg:hidden', 'max-lg:[&>p:nth-child(2)]:text-[19px]')}
          />
        ))}
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-4">
        <RevenueCard />
        <div className="max-lg:hidden">
          <FunnelCard />
        </div>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-4">
        <DueInvoicesCard />
        <FollowUpCard />
      </div>

      <div className="grid gap-4 max-lg:hidden lg:grid-cols-[minmax(0,1fr)_400px]">
        <AtRiskProjectsCard />
        <TeamActivityCard />
      </div>
    </Page>
  );
}
