import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { IconButton, useOverlayBehavior } from '@/components/ui';

type PortalDialogProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  /** Right-aligned footer on a subtle background (usually buttons). */
  footer: ReactNode;
  children: ReactNode;
};

/**
 * Confirm dialog for the client portal: a full-width bottom sheet on mobile (M4 design)
 * and a centered 460px modal on desktop, with the same header / body / footer as the UI kit Modal.
 */
export function PortalDialog({ open, onClose, title, footer, children }: PortalDialogProps) {
  useOverlayBehavior(open, onClose);
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center lg:items-center lg:p-4">
      <div className="absolute inset-0 bg-overlay/50" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex max-h-full w-full flex-col overflow-hidden border border-line bg-white lg:max-w-[460px] lg:rounded-modal"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 pt-4 pb-3.5">
          <h2 className="text-16 leading-[1.2] font-semibold text-ink">{title}</h2>
          <IconButton icon={X} label="Tutup" variant="ghost" size="sm" onClick={onClose} />
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
        <div className="flex justify-end gap-2 border-t border-line bg-subtle px-5 pt-3 pb-3.5">{footer}</div>
      </div>
    </div>,
    document.body,
  );
}
