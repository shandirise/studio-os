import { Dot } from '@/components/ui';
import { cn } from '@/lib/cn';
import { neutralSwatches, toneSwatches } from '../../data';
import { DsSection } from './DsSection';

/** Neutral palette chips and the eight status tones. */
export function ColorsSection() {
  return (
    <DsSection title="Warna" description="Ink #161616 sebagai warna utama (bukan #000). Netral hangat untuk permukaan.">
      <ul className="flex flex-wrap gap-4">
        {neutralSwatches.map((swatch) => (
          <li key={swatch.name} className="flex w-[120px] flex-col gap-2">
            <span className={cn('h-16 rounded-control border border-line', swatch.className)} />
            <span className="text-12 leading-[1.2] font-semibold text-ink">{swatch.name}</span>
            <span className="text-11 leading-[1.2] text-muted">{swatch.hex}</span>
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap gap-4">
        {toneSwatches.map((swatch) => (
          <li key={swatch.tone} className="flex w-[120px] flex-col gap-2">
            <span className={cn('flex h-10 items-center gap-1.5 rounded-control px-2.5 text-11-5 leading-none font-semibold', swatch.className)}>
              <Dot tone={swatch.tone} className="size-[7px]" />
              {swatch.tone}
            </span>
            <span className="text-10 leading-[1.2] text-muted">{swatch.hex}</span>
          </li>
        ))}
      </ul>
    </DsSection>
  );
}
