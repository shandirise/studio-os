import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { ExportModulesSection } from '../components/ExportModulesSection';
import { FullExportCard } from '../components/FullExportCard';
import { ImportHistorySection } from '../components/ImportHistorySection';
import { SettingsPage } from '../components/SettingsPage';
import { settingsCrumb } from '../data';

/** I7 · Import / Export. Nothing here is editable, so the save bar never appears. */
export function ImportExportSettingsPage() {
  useBreadcrumbs([settingsCrumb, { label: 'Import / Export' }]);

  return (
    <SettingsPage title="Import / Export" subtitle="Riwayat import dan ekspor data">
      <ImportHistorySection />
      <ExportModulesSection />
      <FullExportCard />
    </SettingsPage>
  );
}
