import type { PipelineForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { ChipGroup } from './ChipGroup';
import { SettingsSection } from './SettingsSection';

/** Lost reasons, task columns, expense categories, lead sources and tags. */
export function MasterDataSection({ form }: { form: SettingsForm<PipelineForm> }) {
  const { values, update } = form;

  const setItems = (groupId: string, items: string[]) =>
    update((v) => ({ ...v, masterData: v.masterData.map((g) => (g.id === groupId ? { ...g, items } : g)) }));

  return (
    <SettingsSection title="Master data">
      {values.masterData.map((group) => (
        <ChipGroup key={group.id} label={group.label} items={group.items} onChange={(items) => setItems(group.id, items)} />
      ))}
    </SettingsSection>
  );
}
