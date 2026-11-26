import { cn } from '@/lib/cn';
import { typeScale } from '../../data';
import { DsSection } from './DsSection';

/** Inter type scale: spec on the left, live sample on the right. */
export function TypographySection() {
  return (
    <DsSection title="Tipografi" description="Inter. Skala padat untuk antarmuka data.">
      <dl className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-x-6 gap-y-3 sm:grid-cols-[200px_minmax(0,1fr)]">
        {typeScale.map((row) => (
          <div key={row.spec} className="contents">
            <dt className="text-12 leading-[1.2] text-muted">{row.spec}</dt>
            <dd className={cn('text-ink', row.className)}>{row.sample}</dd>
          </div>
        ))}
      </dl>
    </DsSection>
  );
}
