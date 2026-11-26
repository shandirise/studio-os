import type { HTMLAttributes, KeyboardEvent } from 'react';
import { GripVertical, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { lineAmount } from './calc';
import { CellInput } from './CellInput';
import { formatNumber, parseNumber } from './format';
import type { LineItem } from './types';

type LineItemRowProps = {
  item: LineItem;
  onChange: (patch: Partial<LineItem>) => void;
  onRemove: () => void;
  /** Called with -1 / +1 when the grip is moved with the arrow keys. */
  onMove: (offset: -1 | 1) => void;
  /** Arms the row for dragging while the grip is held. */
  onGripPress: (pressed: boolean) => void;
  /** Native drag & drop handlers from the parent list. */
  dragProps: HTMLAttributes<HTMLDivElement>;
  dragging: boolean;
  dropTarget: boolean;
};

const inlineInput =
  'w-full min-w-0 rounded-badge bg-transparent px-1 -mx-1 outline-none transition-colors placeholder:text-faint hover:bg-canvas focus:bg-canvas';

/** One editable row in "Item jasa": grip · name/description · qty · satuan · harga · diskon · jumlah · delete. */
export function LineItemRow({ item, onChange, onRemove, onMove, onGripPress, dragProps, dragging, dropTarget }: LineItemRowProps) {
  const onGripKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      onMove(e.key === 'ArrowUp' ? -1 : 1);
    }
  };

  return (
    <div
      {...dragProps}
      className={cn(
        'flex items-center gap-2 border-b border-line px-3 py-2 transition-colors',
        dragging && 'opacity-40',
        dropTarget && 'bg-canvas',
      )}
    >
      <button
        type="button"
        aria-label="Geser untuk mengurutkan"
        title="Seret untuk mengurutkan"
        className="flex w-1 shrink-0 cursor-grab items-center justify-center text-faint hover:text-muted active:cursor-grabbing"
        onPointerDown={() => onGripPress(true)}
        onPointerUp={() => onGripPress(false)}
        onKeyDown={onGripKey}
      >
        <GripVertical size={14} className="shrink-0" />
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <input
          aria-label="Nama item"
          placeholder="Nama item"
          value={item.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className={cn(inlineInput, 'text-12-5 leading-[15px] font-semibold text-ink')}
        />
        <input
          aria-label="Deskripsi item"
          placeholder="Deskripsi singkat"
          value={item.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className={cn(inlineInput, 'text-11-5 leading-[14px] text-muted')}
        />
      </div>
      <CellInput
        aria-label="Qty"
        inputMode="numeric"
        value={item.qty}
        onChange={(e) => onChange({ qty: parseNumber(e.target.value) })}
        className="w-11"
      />
      <CellInput aria-label="Satuan" value={item.unit} onChange={(e) => onChange({ unit: e.target.value })} className="w-16" />
      <CellInput
        aria-label="Harga"
        inputMode="numeric"
        value={formatNumber(item.price)}
        onChange={(e) => onChange({ price: parseNumber(e.target.value) })}
        className="w-[104px]"
      />
      <CellInput
        aria-label="Diskon"
        inputMode="numeric"
        suffix="%"
        value={item.discount}
        onChange={(e) => onChange({ discount: Math.min(100, parseNumber(e.target.value)) })}
        className="w-[52px]"
      />
      <span className="w-[104px] shrink-0 text-right text-12-5 leading-none font-semibold text-ink">
        {formatNumber(lineAmount(item))}
      </span>
      <button
        type="button"
        aria-label="Hapus item"
        title="Hapus item"
        onClick={onRemove}
        className="flex h-5 w-3 shrink-0 cursor-pointer items-center justify-center text-muted transition-colors hover:text-danger"
      >
        <Trash2 size={15} className="shrink-0" />
      </button>
    </div>
  );
}
