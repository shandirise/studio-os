import type { HTMLAttributes, KeyboardEvent } from 'react';
import { GripVertical, Trash2 } from 'lucide-react';
import { IconButton, Input } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Stage } from '../data';
import { PercentInput } from './PercentInput';
import { TonePicker } from './TonePicker';

type StageRowProps = {
  stage: Stage;
  /** Row is being dragged. */
  dragging: boolean;
  /** Row may start a native drag (armed from the grip). */
  draggable: boolean;
  autoFocus?: boolean;
  onChange: (patch: Partial<Stage>) => void;
  onDelete: () => void;
  /** Keyboard reorder: -1 = up, 1 = down. */
  onMove: (delta: -1 | 1) => void;
  /** Arms dragging; only the grip starts a drag so the inputs stay selectable. */
  onGripPointerDown: () => void;
  dragEvents: Pick<HTMLAttributes<HTMLDivElement>, 'onDragStart' | 'onDragOver' | 'onDragEnd' | 'onDrop'>;
};

/** One deal stage: grip, name, probability, color, delete. */
export function StageRow({ stage, dragging, draggable, autoFocus, onChange, onDelete, onMove, onGripPointerDown, dragEvents }: StageRowProps) {
  const onGripKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      onMove(e.key === 'ArrowUp' ? -1 : 1);
    }
  };

  return (
    <div
      draggable={draggable}
      {...dragEvents}
      className={cn('flex h-11 items-center gap-3 border-b border-line bg-white px-2 transition-opacity', dragging && 'opacity-40')}
    >
      <button
        type="button"
        aria-label={`Urutkan ${stage.name} (panah atas/bawah)`}
        title="Seret untuk mengurutkan"
        onPointerDown={onGripPointerDown}
        onKeyDown={onGripKey}
        className="-mx-1.5 flex w-4 shrink-0 cursor-grab justify-center text-faint hover:text-ink active:cursor-grabbing"
      >
        <GripVertical size={16} />
      </button>
      <Input
        aria-label="Nama stage"
        value={stage.name}
        onChange={(e) => onChange({ name: e.target.value })}
        autoFocus={autoFocus}
        className="min-w-0 flex-1"
        inputClassName="h-8"
      />
      <PercentInput
        label={`Probabilitas ${stage.name}`}
        value={stage.probability}
        onChange={(probability) => onChange({ probability })}
        className="w-20 shrink-0 lg:w-[110px]"
      />
      <div className="flex shrink-0 lg:w-[90px]">
        <TonePicker value={stage.tone} onChange={(tone) => onChange({ tone })} label={stage.name} />
      </div>
      <IconButton
        icon={Trash2}
        label={`Hapus stage ${stage.name}`}
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="-mx-1 shrink-0 text-faint hover:text-danger"
      />
    </div>
  );
}
