import { cn } from '@/lib/cn';
import { brandColors, type WorkspaceForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';

/** Brand color swatches; the selected one gets an ink border and its hex is shown. */
export function BrandColorSection({ form }: { form: SettingsForm<WorkspaceForm> }) {
  const { values, set } = form;

  return (
    <SettingsSection title="Warna brand" description="Dipakai di PDF dan Client Portal">
      <div className="flex flex-wrap items-center gap-2.5" role="radiogroup" aria-label="Warna brand">
        {brandColors.map((color) => {
          const selected = color.hex === values.brandColor;
          return (
            <button
              key={color.hex}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={color.hex}
              title={color.hex}
              onClick={() => set('brandColor', color.hex)}
              className={cn(
                'size-8 cursor-pointer rounded-control border transition-transform hover:scale-105',
                color.className,
                selected ? 'border-ink' : 'border-line',
              )}
            />
          );
        })}
        <span className="text-12-5 font-medium text-ink">{values.brandColor}</span>
      </div>
    </SettingsSection>
  );
}
