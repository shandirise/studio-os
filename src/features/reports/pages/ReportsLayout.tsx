import { useState } from 'react';
import { Download } from 'lucide-react';
import { Outlet, useLocation } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, PageHeader, Segmented, Tabs, useToast } from '@/components/ui';
import { reportPeriods, reportTabs, type ReportPeriod } from '../data';

const tabItems = reportTabs.map(({ value, label, to }) => ({ value, label, to }));

/** G1 · Reports — shared header (period, export) and report tabs; each tab renders below. */
export function ReportsLayout() {
  const { pathname } = useLocation();
  const toast = useToast();
  const [period, setPeriod] = useState<ReportPeriod>('year');
  const tab = reportTabs.find((t) => pathname.startsWith(t.to)) ?? reportTabs[0]!;

  useBreadcrumbs([{ label: 'Reports', to: '/reports/sales' }, { label: tab.label }]);

  const exportReport = (format: 'CSV' | 'PDF') =>
    toast(`Export ${format} dimulai`, `Laporan ${tab.label} sedang disiapkan untuk diunduh.`);

  return (
    <Page>
      <PageHeader
        title="Reports"
        subtitle={tab.subtitle}
        actions={
          <>
            <Segmented options={reportPeriods} value={period} onChange={setPeriod} />
            <Button icon={Download} onClick={() => exportReport('CSV')}>
              Export CSV
            </Button>
            <Button icon={Download} onClick={() => exportReport('PDF')}>
              Export PDF
            </Button>
          </>
        }
      />
      <Tabs items={tabItems} />
      <Outlet />
    </Page>
  );
}
