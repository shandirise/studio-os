import { useState, type DragEvent } from 'react';

/** MIME type used to carry the dragged deal id. */
export const DEAL_DRAG_TYPE = 'text/plain';

/**
 * Native HTML5 drop target for a dragged deal card.
 * Returns the props to spread on the target element and whether a card hovers it.
 */
export function useDropZone(onDropDeal: (dealId: string) => void) {
  const [isOver, setIsOver] = useState(false);

  const dropProps = {
    onDragOver: (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (!isOver) setIsOver(true);
    },
    onDragLeave: (e: DragEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsOver(false);
    },
    onDrop: (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      setIsOver(false);
      const id = e.dataTransfer.getData(DEAL_DRAG_TYPE);
      if (id) onDropDeal(id);
    },
  };

  return { isOver, dropProps };
}
