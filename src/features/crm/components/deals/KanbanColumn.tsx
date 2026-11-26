import { ChevronRight, Plus } from 'lucide-react';
import { Dot } from '@/components/ui';
import { cn } from '@/lib/cn';
import { dealStageTone, type DealStage } from '@/lib/status';
import { formatCompactRupiah, type Deal } from '../../dealData';
import { DealCard } from './DealCard';
import { useDropZone } from './useDropZone';

type KanbanColumnProps = {
  stage: DealStage;
  deals: Deal[];
  totals: { count: number; value: number };
  draggingId: string | null;
  onDragStart: (dealId: string) => void;
  onDragEnd: () => void;
  onDropDeal: (dealId: string, stage: DealStage) => void;
  /** Open stages show a "Tambah" button. */
  onAdd?: (stage: DealStage) => void;
  /** Closed stages (Won/Lost) can be collapsed back to a narrow rail. */
  onCollapse?: () => void;
};

/** One pipeline stage: header with count, total value, deal cards and an add button. */
export function KanbanColumn({
  stage,
  deals,
  totals,
  draggingId,
  onDragStart,
  onDragEnd,
  onDropDeal,
  onAdd,
  onCollapse,
}: KanbanColumnProps) {
  const { isOver, dropProps } = useDropZone((id) => onDropDeal(id, stage));

  return (
    <section
      aria-label={stage}
      {...dropProps}
      className={cn(
        'flex w-[246px] shrink-0 flex-col gap-2.5 rounded-card bg-gray-soft p-2.5 lg:w-auto lg:min-w-[236px] lg:flex-1 lg:basis-0',
        isOver && 'outline-2 -outline-offset-2 outline-faint outline-dashed',
      )}
    >
      <header className="flex items-center justify-between p-0.5">
        <div className="flex min-w-0 items-center gap-2">
          <Dot tone={dealStageTone[stage]} className="size-2" />
          <h2 className="truncate text-13 leading-none font-semibold text-ink">{stage}</h2>
          <span className="text-11-5 leading-none whitespace-nowrap text-muted">{totals.count} deal</span>
        </div>
        {onCollapse && (
          <button
            type="button"
            onClick={onCollapse}
            aria-label={`Ciutkan kolom ${stage}`}
            className="flex size-5 cursor-pointer items-center justify-center rounded-badge text-muted hover:bg-subtle hover:text-ink"
          >
            <ChevronRight size={14} />
          </button>
        )}
      </header>
      <p className="text-12 leading-none text-muted">{formatCompactRupiah(totals.value)}</p>

      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          deal={deal}
          dragging={deal.id === draggingId}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}

      {onAdd ? (
        <button
          type="button"
          onClick={() => onAdd(stage)}
          className="flex h-[30px] w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-control border border-dashed border-line-2 text-12 font-medium text-muted transition-colors hover:bg-subtle hover:text-ink"
        >
          <Plus size={13} />
          Tambah
        </button>
      ) : (
        deals.length === 0 && (
          <p className="rounded-control border border-dashed border-line-2 px-3 py-4 text-center text-12 text-muted">
            Tarik deal ke sini
          </p>
        )
      )}
    </section>
  );
}
