import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Kbd, SectionLabel } from '@/components/ui';
import { PaletteHints } from './components/PaletteHints';
import { PaletteResult } from './components/PaletteResult';
import { paletteGroups, searchPalette, type PaletteItem, type PaletteKind } from './data';

type CommandPaletteProps = { open: boolean; onClose: () => void };

/** Ctrl/⌘ shortcuts shown next to the quick actions. */
const shortcutKind: Record<string, PaletteKind> = { i: 'create', ',': 'settings' };

/** H2 · Command Palette — global search over companies, contacts, deals, projects and invoices. */
export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  if (!open) return null;
  // Mounting on open resets the query and highlight every time.
  return createPortal(<PaletteDialog onClose={onClose} />, document.body);
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const groups = useMemo(() => {
    const results = searchPalette(query);
    return paletteGroups
      .map((group) => ({ group, items: results.filter((r) => r.group === group) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  // Keyboard order follows the visual group order.
  const ordered = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const active = ordered[activeIndex];
  const hasMatches = ordered.some((item) => item.group !== 'Aksi cepat');

  const openItem = (item: PaletteItem) => {
    onClose();
    navigate(item.to);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const shortcut = (e.ctrlKey || e.metaKey) && shortcutKind[e.key.toLowerCase()];
      if (shortcut) {
        e.preventDefault();
        const action = ordered.find((item) => item.kind === shortcut);
        if (action) openItem(action);
        return;
      }
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => (i + 1) % ordered.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => (i - 1 + ordered.length) % ordered.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (active) openItem(active);
          break;
        case 'Escape':
          onClose();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Lock page scroll while open.
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  // Keep the highlighted row visible when moving with the arrow keys.
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center px-4 pt-16 lg:pt-[120px]">
      <div className="absolute inset-0 bg-overlay/50" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pencarian global"
        className="relative flex h-fit max-h-[calc(100dvh-96px)] w-full max-w-[640px] flex-col overflow-hidden rounded-modal border border-line bg-white lg:max-h-[calc(100dvh-160px)]"
      >
        <div className="flex h-[52px] shrink-0 items-center gap-2.5 border-b border-line px-4">
          <Search size={18} className="shrink-0 text-ink-2" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Cari kontak, deal, project, invoice…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={active ? `palette-${active.id}` : undefined}
            className="min-w-0 flex-1 bg-transparent text-15 leading-none text-ink outline-none placeholder:text-faint"
          />
          <Kbd>Esc</Kbd>
        </div>

        <div ref={listRef} id="palette-results" role="listbox" className="overflow-y-auto">
          {query.trim() && !hasMatches && (
            <p className="px-4 pt-4 pb-1 text-12-5 text-muted">Tidak ada hasil untuk “{query.trim()}”</p>
          )}
          {groups.map(({ group, items }) => (
            <div key={group} role="group" aria-label={group} className="flex flex-col gap-0.5 px-2 pt-2 pb-1">
              <SectionLabel className="mb-1.5 text-10 leading-none tracking-[0.06em]">{group}</SectionLabel>
              <ul role="presentation" className="flex flex-col gap-0.5">
                {items.map((item) => (
                  <PaletteResult
                    key={item.id}
                    item={item}
                    active={item === active}
                    onHover={() => setActiveIndex(ordered.indexOf(item))}
                    onSelect={() => openItem(item)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <PaletteHints />
      </div>
    </div>
  );
}
