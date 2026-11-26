import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { ColorsSection } from '../components/design-system/ColorsSection';
import { ControlsSection } from '../components/design-system/ControlsSection';
import { DataComponentsSection } from '../components/design-system/DataComponentsSection';
import { ShapeSection } from '../components/design-system/ShapeSection';
import { StatusBadgeSection } from '../components/design-system/StatusBadgeSection';
import { TypographySection } from '../components/design-system/TypographySection';

/**
 * DS · Design System. Living documentation: every sample is rendered with the real
 * tokens and UI kit components, so it stays in sync with the app.
 */
export function DesignSystemPage() {
  useBreadcrumbs([{ label: 'Design System' }]);

  return (
    <div className="min-h-dvh bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-11 px-4 py-8 lg:p-14">
        <header className="flex flex-col gap-2">
          <h1 className="text-[28px] leading-[1.15] font-bold tracking-[-0.02em] text-ink lg:text-34">Studio OS · Design System</h1>
          <p className="text-15 leading-[1.4] text-muted">
            Hitam-putih fungsional, sudut tegas (4–6 px), tanpa gradien. Warna hanya dipakai untuk status.
          </p>
        </header>
        <ColorsSection />
        <TypographySection />
        <ShapeSection />
        <ControlsSection />
        <StatusBadgeSection />
        <DataComponentsSection />
      </div>
    </div>
  );
}
