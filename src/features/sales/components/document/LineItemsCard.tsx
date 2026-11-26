import { useState, type HTMLAttributes } from 'react';
import { Layers, Plus } from 'lucide-react';
import { Button, Card, CardHeader } from '@/components/ui';
import { cn } from '@/lib/cn';
import { createLineItem } from './catalog';
import { CatalogModal } from './CatalogModal';
import { LineItemRow } from './LineItemRow';
import type { LineItem } from './types';

type LineItemsCardProps = {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
};

function moveItem(items: LineItem[], from: number, to: number): LineItem[] {
  if (to < 0 || to >= items.length || from === to) return items;
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved!);
  return next;
}

const headCell = 'shrink-0 text-right';

/** "Item jasa": editable, reorderable line items with a catalog picker. */
export function LineItemsCard({ items, onChange }: LineItemsCardProps) {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [armedId, setArmedId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const update = (id: string, patch: Partial<LineItem>) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const resetDrag = () => {
    setArmedId(null);
    setDragId(null);
    setOverId(null);
  };

  const dragProps = (item: LineItem, index: number): HTMLAttributes<HTMLDivElement> => ({
    draggable: armedId === item.id,
    onDragStart: (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item.id);
      setDragId(item.id);
    },
    onDragOver: (e) => {
      if (!dragId) return;
      e.preventDefault();
      setOverId(item.id);
    },
    onDrop: (e) => {
      e.preventDefault();
      const from = items.findIndex((i) => i.id === dragId);
      if (from !== -1) onChange(moveItem(items, from, index));
      resetDrag();
    },
    onDragEnd: resetDrag,
  });

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader title="Item jasa" subtitle="Seret untuk mengurutkan" />
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex h-[30px] items-center gap-2 border-y border-line bg-subtle px-3 text-10-5 leading-none font-semibold text-muted">
            <span className="w-1 shrink-0" />
            <span className="min-w-0 flex-1">ITEM</span>
            <span className={cn(headCell, 'w-11')}>QTY</span>
            <span className={cn(headCell, 'w-16')}>SATUAN</span>
            <span className={cn(headCell, 'w-[104px]')}>HARGA</span>
            <span className={cn(headCell, 'w-[52px]')}>DISKON</span>
            <span className={cn(headCell, 'w-[104px]')}>JUMLAH</span>
            <span className="w-3 shrink-0" />
          </div>
          {items.map((item, index) => (
            <LineItemRow
              key={item.id}
              item={item}
              onChange={(patch) => update(item.id, patch)}
              onRemove={() => onChange(items.filter((i) => i.id !== item.id))}
              onMove={(offset) => onChange(moveItem(items, index, index + offset))}
              onGripPress={(pressed) => setArmedId(pressed ? item.id : null)}
              dragProps={dragProps(item, index)}
              dragging={dragId === item.id}
              dropTarget={overId === item.id && dragId !== item.id}
            />
          ))}
          {items.length === 0 && (
            <p className="border-b border-line px-4 py-5 text-center text-12 text-muted">
              Belum ada item. Tambah item atau pilih dari katalog jasa.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5 px-3 py-2.5">
        <Button size="sm" icon={Plus} onClick={() => onChange([...items, createLineItem()])}>
          Tambah item
        </Button>
        <Button size="sm" variant="ghost" icon={Layers} onClick={() => setCatalogOpen(true)}>
          Pilih dari katalog jasa
        </Button>
      </div>
      <CatalogModal
        open={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        onPick={({ name, description, unit, price }) => {
          onChange([...items, createLineItem({ name, description, unit, price })]);
          setCatalogOpen(false);
        }}
      />
    </Card>
  );
}
