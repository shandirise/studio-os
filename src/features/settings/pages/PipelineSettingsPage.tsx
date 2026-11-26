import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { MasterDataSection } from '../components/MasterDataSection';
import { SaveBar } from '../components/SaveBar';
import { SettingsPage } from '../components/SettingsPage';
import { StageListSection } from '../components/StageListSection';
import { initialMasterData, initialStages, settingsCrumb, type PipelineForm } from '../data';
import { useSettingsForm } from '../hooks/useSettingsForm';

/** I4 · Pipeline & Status */
export function PipelineSettingsPage() {
  useBreadcrumbs([settingsCrumb, { label: 'Pipeline & Status' }]);
  const form = useSettingsForm<PipelineForm>({ stages: initialStages, masterData: initialMasterData });

  return (
    <SettingsPage title="Pipeline & Status" subtitle="Stage deal, alasan kalah, kolom task, dan master data">
      <StageListSection form={form} />
      <MasterDataSection form={form} />
      <SaveBar form={form} savedMessage="Stage deal dan master data sudah diperbarui." />
    </SettingsPage>
  );
}
