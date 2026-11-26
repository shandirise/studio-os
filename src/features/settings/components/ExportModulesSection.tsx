import { Download } from 'lucide-react';
import { useToast } from '@/components/ui';
import { exportModules } from '../data';
import { SettingsSection } from './SettingsSection';

/** One CSV download tile per module. */
export function ExportModulesSection() {
  const toast = useToast();

  return (
    <SettingsSection title="Export per modul" description="Unduh sebagai CSV">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {exportModules.map((module) => (
          <button
            key={module}
            type="button"
            onClick={() => toast(`Export ${module} dimulai`, `File ${module.toLowerCase()}.csv akan terunduh sebentar lagi.`)}
            className="flex h-11 cursor-pointer items-center justify-between gap-2 rounded-control border border-line-2 bg-white px-3 text-13 leading-none font-medium text-ink transition-colors hover:bg-canvas"
          >
            {module}
            <Download size={15} className="shrink-0 text-ink-2" />
          </button>
        ))}
      </div>
    </SettingsSection>
  );
}
