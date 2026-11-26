import { useState } from 'react';
import type { DealStage } from '@/lib/status';
import { closedStages, openStages, stageTotals, type Deal } from '../../dealData';
import { CollapsedStageColumn } from './CollapsedStageColumn';
import { KanbanColumn } from './KanbanColumn';

type DealsKanbanProps = {
  /** All deals on the board (used for counts and totals). */
  deals: Deal[];
  /** Deals matching the current filters (rendered as cards). */
  visibleDeals: Deal[];
  onMove: (dealId: string, stage: DealStage) => void;
  onAdd: (stage: DealStage) => void;
};

/** Pipeline board: four open stages plus collapsible Won / Lost rails. Cards move with drag and drop. */
export function DealsKanban({ deals, visibleDeals, onMove, onAdd }: DealsKanbanProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<DealStage[]>([]);

  const toggle = (stage: DealStage) =>
    setExpanded((list) => (list.includes(stage) ? list.filter((s) => s !== stage) : [...list, stage]));

  const columnProps = {
    draggingId,
    onDragStart: setDraggingId,
    onDragEnd: () => setDraggingId(null),
    onDropDeal: onMove,
  };

  return (
    <div className="-mx-4 flex min-h-[420px] flex-1 gap-3 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
      {openStages.map((stage) => (
        <KanbanColumn
          key={stage}
          stage={stage}
          deals={visibleDeals.filter((d) => d.stage === stage)}
          totals={stageTotals(deals, stage)}
          onAdd={onAdd}
          {...columnProps}
        />
      ))}
      {closedStages.map((stage) =>
        expanded.includes(stage) ? (
          <KanbanColumn
            key={stage}
            stage={stage}
            deals={visibleDeals.filter((d) => d.stage === stage)}
            totals={stageTotals(deals, stage)}
            onCollapse={() => toggle(stage)}
            {...columnProps}
          />
        ) : (
          <CollapsedStageColumn
            key={stage}
            stage={stage}
            count={stageTotals(deals, stage).count}
            onExpand={() => toggle(stage)}
            onDropDeal={onMove}
          />
        ),
      )}
    </div>
  );
}
