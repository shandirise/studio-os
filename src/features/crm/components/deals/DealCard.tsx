import { Calendar, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router';
import { Avatar } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { cn } from '@/lib/cn';
import { formatRupiah } from '@/lib/format';
import { formatDayMonth, type Deal } from '../../dealData';
import { DEAL_DRAG_TYPE } from './useDropZone';

type DealCardProps = {
  deal: Deal;
  dragging: boolean;
  onDragStart: (dealId: string) => void;
  onDragEnd: () => void;
};

/** Kanban card: title, client, value, stale warning, PIC and closing date. Draggable; click opens the deal. */
export function DealCard({ deal, dragging, onDragStart, onDragEnd }: DealCardProps) {
  const owner = memberById(deal.ownerId);

  return (
    <Link
      to={`/crm/deals/${deal.id}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(DEAL_DRAG_TYPE, deal.id);
        e.dataTransfer.effectAllowed = 'move';
        onDragStart(deal.id);
      }}
      onDragEnd={onDragEnd}
      className={cn(
        'flex w-full cursor-grab flex-col items-start gap-2 rounded-card border border-line bg-white p-3 transition-[border-color,opacity] hover:border-line-2 active:cursor-grabbing',
        dragging && 'opacity-40',
      )}
    >
      <span className="w-full text-13 leading-[1.3] font-semibold text-ink">{deal.title}</span>
      <span className="text-12 leading-[1.2] text-muted">{deal.client}</span>
      <span className="text-13 leading-none font-semibold text-ink">{formatRupiah(deal.value)}</span>
      {deal.stale && (
        <span className="inline-flex items-center gap-[5px] rounded-badge bg-yellow-soft px-[7px] py-[3px] text-10-5 leading-none font-semibold text-yellow-strong">
          <TriangleAlert size={12} />
          Tanpa aktivitas &gt; 7 hari
        </span>
      )}
      <span className="flex w-full items-center justify-between">
        <Avatar name={owner.name} size="xs" className="text-10" />
        <span className="flex items-center gap-[5px] text-11-5 leading-none text-muted">
          <Calendar size={12} className="text-faint" />
          {formatDayMonth(deal.closingDate)}
        </span>
      </span>
    </Link>
  );
}
