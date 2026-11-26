import { Landmark, Layers, Plus, ReceiptText, SlidersVertical, Target, User, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { PaletteItem, PaletteKind } from '../data';

const kindIcon: Record<PaletteKind, LucideIcon> = {
  company: Landmark,
  contact: User,
  deal: Target,
  project: Layers,
  invoice: ReceiptText,
  create: Plus,
  settings: SlidersVertical,
};

type PaletteResultProps = {
  item: PaletteItem;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
};

/** 38px result row. The highlighted row is ink-filled with white text. */
export function PaletteResult({ item, active, onHover, onSelect }: PaletteResultProps) {
  const Icon = kindIcon[item.kind];
  return (
    <li role="option" aria-selected={active} id={`palette-${item.id}`}>
      <button
        type="button"
        tabIndex={-1}
        onMouseMove={onHover}
        onClick={onSelect}
        className={cn(
          'flex h-[38px] w-full cursor-pointer items-center gap-3 rounded-control px-2.5 text-left',
          active ? 'bg-ink text-white' : 'text-ink',
        )}
      >
        <Icon size={16} className={cn('shrink-0', active ? 'text-white' : 'text-muted')} />
        <span className={cn('min-w-0 flex-1 truncate text-13 leading-none', active ? 'font-semibold' : 'font-medium')}>
          {item.title}
        </span>
        <span className={cn('shrink-0 truncate text-11-5 leading-none max-sm:max-w-[45%]', active ? 'text-white/70' : 'text-muted')}>
          {item.meta}
        </span>
      </button>
    </li>
  );
}
