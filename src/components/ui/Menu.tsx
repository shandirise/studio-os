import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export type MenuItem = {
  label: string;
  icon?: LucideIcon;
  onSelect?: () => void;
  danger?: boolean;
  /** Optional keyboard hint on the right. */
  hint?: string;
};

type MenuProps = {
  /** Render prop for the trigger; call `toggle` on click. */
  trigger: (props: { open: boolean; toggle: () => void }) => ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
  className?: string;
};

/** Small dropdown menu anchored to its trigger. Closes on outside click / Escape. */
export function Menu({ trigger, items, align = 'right', className }: MenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <div
          role="menu"
          className={cn(
            'absolute top-full z-40 mt-1 min-w-44 rounded-card border border-line bg-white p-1 shadow-[0_4px_16px_rgba(22,22,22,0.08)]',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {items.map(({ label, icon: Icon, onSelect, danger, hint }) => (
            <button
              key={label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onSelect?.();
              }}
              className={cn(
                'flex h-8 w-full cursor-pointer items-center gap-2.5 rounded-control px-2.5 text-left text-13 font-medium whitespace-nowrap hover:bg-subtle',
                danger ? 'text-danger' : 'text-ink',
              )}
            >
              {Icon && <Icon size={15} />}
              <span className="flex-1">{label}</span>
              {hint && <span className="text-11 text-faint">{hint}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
