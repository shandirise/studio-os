import { Avatar, Card } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { sampleDeal } from '../../data';

/** Deal card as used on the pipeline board. */
export function KanbanCardSample() {
  return (
    <Card className="flex flex-col gap-2 p-3">
      <p className="text-13 leading-[1.3] font-semibold text-ink">{sampleDeal.title}</p>
      <p className="text-12 leading-[1.2] text-muted">{sampleDeal.company}</p>
      <p className="text-13 leading-[1.2] font-semibold text-ink">{formatRupiah(sampleDeal.value)}</p>
      <div className="flex items-center justify-between">
        <Avatar name={sampleDeal.owner} size="xs" className="text-10" />
        <span className="text-11-5 leading-none text-muted">{sampleDeal.closing}</span>
      </div>
    </Card>
  );
}
