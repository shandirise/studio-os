import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

type ChipGroupProps = {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
};

/** Editable list of master-data values: removable chips plus an inline "+ Tambah" field. */
export function ChipGroup({ label, items, onChange }: ChipGroupProps) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');

  const close = () => {
    setDraft('');
    setAdding(false);
  };

  const commit = () => {
    const value = draft.trim();
    if (value && !items.some((item) => item.toLowerCase() === value.toLowerCase())) onChange([...items, value]);
    close();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Escape') {
      close();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-12 leading-none font-medium text-ink-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex h-7 items-center gap-1.5 rounded-control border border-line bg-subtle pr-2 pl-2.5 text-12 leading-none font-medium text-ink"
          >
            {item}
            <button
              type="button"
              aria-label={`Hapus ${item}`}
              onClick={() => onChange(items.filter((i) => i !== item))}
              className="cursor-pointer text-faint hover:text-ink"
            >
              <X size={12} strokeWidth={2} />
            </button>
          </span>
        ))}
        {adding ? (
          <input
            autoFocus
            value={draft}
            aria-label={`Tambah ${label.toLowerCase()}`}
            placeholder="Ketik lalu Enter"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={commit}
            className="h-7 w-36 rounded-control border border-ink bg-white px-2.5 text-12 font-medium text-ink outline-none placeholder:text-faint"
          />
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="inline-flex h-7 cursor-pointer items-center rounded-control border border-line-2 bg-white px-2.5 text-12 leading-none font-medium text-ink hover:bg-canvas"
          >
            + Tambah
          </button>
        )}
      </div>
    </div>
  );
}
