import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { Card, SectionLabel } from '@/components/ui';
import { nextActions } from '../../data';

/** Step 4 aside: shortcuts into the app. */
export function NextActionsCard() {
  return (
    <Card className="flex flex-col gap-1.5 p-5 pb-3">
      <SectionLabel className="mb-1.5">LANGKAH BERIKUTNYA</SectionLabel>
      {nextActions.map((action) => (
        <Link
          key={action.to}
          to={action.to}
          className="-mx-2 flex items-center gap-3 rounded-control px-2 py-2 transition-colors hover:bg-canvas"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-13 leading-none font-semibold text-ink">{action.label}</span>
            <span className="text-12 leading-[1.3] text-muted">{action.description}</span>
          </span>
          <ChevronRight size={14} className="shrink-0 text-faint" />
        </Link>
      ))}
    </Card>
  );
}
