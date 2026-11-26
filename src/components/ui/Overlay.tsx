import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { IconButton } from './Button';

/** Open overlays, newest last — only the top one reacts to Escape. */
const overlayStack: symbol[] = [];

/**
 * Closes on Escape and locks page scroll while an overlay is open.
 * Stacked overlays (a modal over a drawer) close one at a time.
 */
export function useOverlayBehavior(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const id = Symbol('overlay');
    overlayStack.push(id);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && overlayStack[overlayStack.length - 1] === id) onClose();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      overlayStack.splice(overlayStack.indexOf(id), 1);
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Footer content, right-aligned on a subtle background (usually buttons). */
  footer?: ReactNode;
  /** Width in px; the design uses 460 (confirm) and 560 (form). */
  width?: number;
  children: ReactNode;
};

/** Centered dialog: 50% ink overlay, 8px corners, header / body / footer. */
export function Modal({ open, onClose, title, subtitle, footer, width = 560, children }: ModalProps) {
  useOverlayBehavior(open, onClose);
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-overlay/50" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex max-h-full w-full flex-col overflow-hidden rounded-modal border border-line bg-white"
        style={{ maxWidth: width }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 pt-4 pb-3.5">
          <div className="flex min-w-0 flex-col gap-[3px]">
            <h2 className="text-16 leading-[1.2] font-semibold text-ink">{title}</h2>
            {subtitle && <p className="text-12-5 leading-[1.3] text-muted">{subtitle}</p>}
          </div>
          <IconButton icon={X} label="Tutup" variant="ghost" size="sm" onClick={onClose} />
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
        {footer && (
          <div className="flex flex-wrap justify-end gap-2 border-t border-line bg-subtle px-5 pt-3 pb-3.5">{footer}</div>
        )}
      </div>
    </div>,
    document.body,
  );
}

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  /** Width in px (design: 600 for task detail, 520 for audit log). */
  width?: number;
  /** Full custom content: compose with DrawerHeader / body / footer yourself. */
  children: ReactNode;
  className?: string;
};

/** Right-side panel over a 45% ink overlay. */
export function Drawer({ open, onClose, width = 600, children, className }: DrawerProps) {
  useOverlayBehavior(open, onClose);
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-overlay/45" onClick={onClose} aria-hidden />
      <aside
        role="dialog"
        aria-modal="true"
        className={cn('relative flex h-full w-full flex-col border-l border-line bg-white', className)}
        style={{ maxWidth: width }}
      >
        {children}
      </aside>
    </div>,
    document.body,
  );
}
