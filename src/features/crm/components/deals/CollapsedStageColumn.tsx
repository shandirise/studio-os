import { ChevronLeft } from 'lucide-react';
import { Dot } from '@/components/ui';
import { cn } from '@/lib/cn';
import { dealStageTone, type DealStage } from '@/lib/status';
import { useDropZone } from './useDropZone';

type CollapsedStageColumnProps = {
  stage: DealStage;
  count: number;
  onExpand: () => void;
  onDropDeal: (dealId: string, stage: DealStage) => void;
};

/** Narrow 44px rail for the closed stages (Won / Lost). Accepts drops; click expands it. */
export function CollapsedStageColumn({ stage, count, onExpand, onDropDeal }: CollapsedStageColumnProps) {
  const { isOver, dropProps } = useDropZone((id) => onDropDeal(id, stage));

  return (
    <button
      type="button"
      onClick={onExpand}
      aria-label={`Buka kolom ${stage} (${count} deal)`}
      {...dropProps}
      className={cn(
        'flex w-11 shrink-0 cursor-pointer flex-col items-center gap-2.5 rounded-card bg-gray-soft py-3 transition-colors hover:bg-dark-soft/50',
        isOver && 'outline-2 -outline-offset-2 outline-faint outline-dashed',
      )}
    >
      {/* The design's chevron frame is only as tall as its 7px glyph. */}
      <ChevronLeft size={14} className="-my-[3.5px] text-muted" />
      <Dot tone={dealStageTone[stage]} className="size-2" />
      <span className="text-12 leading-none font-semibold text-ink">{stage}</span>
      <span className="text-11-5 leading-none text-muted">{count}</span>
    </button>
  );
}
