import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type EditorLayoutProps = {
  /** Form cards, stacked with 14px gaps. */
  form: ReactNode;
  /** The document paper rendered in the live preview column. */
  preview: ReactNode;
  previewOpen: boolean;
  onPreviewOpenChange: (open: boolean) => void;
};

const linkButton = 'cursor-pointer text-12 leading-none text-muted underline underline-offset-2 hover:text-ink';

/**
 * Editor body: form on the left, sticky live preview (470px) on the right.
 * Stacks below xl, where two columns no longer fit next to the sidebar.
 */
export function EditorLayout({ form, preview, previewOpen, onPreviewOpenChange }: EditorLayoutProps) {
  return (
    <div
      className={cn(
        'grid items-start gap-4',
        // 90rem = 1440px; a rem breakpoint so Tailwind orders it after `xl`.
        previewOpen && 'xl:grid-cols-[minmax(0,1fr)_400px] min-[90rem]:grid-cols-[minmax(0,1fr)_470px]',
      )}
    >
      {!previewOpen && (
        <div className="flex justify-end">
          <button type="button" className={linkButton} onClick={() => onPreviewOpenChange(true)}>
            Tampilkan live preview
          </button>
        </div>
      )}
      <div className="flex min-w-0 flex-col gap-3.5">{form}</div>
      {previewOpen && (
        <section aria-label="Live preview" className="flex min-w-0 flex-col gap-2.5 xl:sticky xl:top-4">
          <div className="flex items-center justify-between">
            <h2 className="text-13 leading-none font-semibold text-ink">Live preview</h2>
            <button type="button" className={linkButton} onClick={() => onPreviewOpenChange(false)}>
              Sembunyikan
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[420px]">{preview}</div>
          </div>
        </section>
      )}
    </div>
  );
}
