import { Badge } from '@/components/ui';
import { badgeRows } from '../../data';
import { DsSection } from './DsSection';

/** All status badges per domain, rendered from the shared tone maps. */
export function StatusBadgeSection() {
  return (
    <DsSection title="Status badge" description="Selalu teks + titik warna, tidak mengandalkan warna saja.">
      <dl className="flex flex-col gap-4">
        {badgeRows.map((row) => (
          <div key={row.label} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
            <dt className="w-[130px] shrink-0 text-12 leading-[1.2] font-medium text-muted">{row.label}</dt>
            <dd className="flex flex-wrap gap-2.5">
              {row.items.map(([status, tone]) => (
                <Badge key={status} tone={tone}>
                  {status}
                </Badge>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </DsSection>
  );
}
