import { cn } from '@/lib/cn';
import { radii, spacingSteps } from '../../data';
import { DsSection } from './DsSection';

/** Corner radius samples and the 4-px spacing scale. */
export function ShapeSection() {
  return (
    <DsSection
      title="Radius, spacing, elevasi"
      description="Sudut: 3 badge · 4 kontrol · 6 kartu · 8 modal & drawer. Spacing kelipatan 4. Tanpa shadow berat, tanpa gradien."
    >
      <div className="flex flex-wrap items-start gap-5">
        {radii.map((r) => (
          <div key={r.label} className="flex w-[88px] flex-col gap-2">
            <span className={cn('h-14 border border-line-2 bg-subtle', r.className)} />
            <span className="text-12 leading-[1.2] text-muted">{r.label}</span>
          </div>
        ))}
        <div className="flex h-[49px] items-end gap-2.5">
          {spacingSteps.map((step) => (
            <div key={step.value} className="flex flex-col items-center gap-1.5">
              <span className={cn('bg-ink', step.className)} />
              <span className="text-11 leading-none text-muted">{step.value}</span>
            </div>
          ))}
        </div>
      </div>
    </DsSection>
  );
}
