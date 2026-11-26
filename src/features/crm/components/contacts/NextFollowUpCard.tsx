import { Calendar } from 'lucide-react';
import { Card, SectionLabel } from '@/components/ui';
import type { FollowUp } from '../../contactData';

/** Small card with the next scheduled follow-up. */
export function NextFollowUpCard({ followUp }: { followUp: FollowUp | null }) {
  return (
    <Card className="flex flex-col gap-1.5 p-3.5">
      <SectionLabel className="text-10">Follow-up berikutnya</SectionLabel>
      {followUp ? (
        <>
          <p className="text-13 leading-[17px] font-semibold text-ink">{followUp.title}</p>
          <p className="flex items-center gap-1.5 text-12 leading-3 text-muted">
            <Calendar size={13} className="shrink-0" />
            {followUp.when}
          </p>
        </>
      ) : (
        <p className="text-12-5 text-muted">Belum ada follow-up terjadwal.</p>
      )}
    </Card>
  );
}
