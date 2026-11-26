const hints = [
  { keys: '↑ ↓', label: 'Pilih' },
  { keys: 'Enter', label: 'Buka' },
  { keys: 'Esc', label: 'Tutup' },
];

/** Footer strip with keyboard hints. */
export function PaletteHints() {
  return (
    <div className="flex h-9 shrink-0 items-center gap-[18px] border-t border-line bg-subtle px-4 text-11 leading-none">
      {hints.map((h) => (
        <span key={h.keys} className="flex items-center gap-1.5">
          <span className="font-semibold text-ink">{h.keys}</span>
          <span className="text-muted">{h.label}</span>
        </span>
      ))}
    </div>
  );
}
