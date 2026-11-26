import { cn } from '@/lib/cn';
import { pdfLayouts, type PdfLayout } from '../data';

/** Line widths of the mini document sketch inside each thumbnail. */
const sketchLines = ['w-[60px]', 'w-[90px]', 'w-[70px]', 'w-[80px]'];

type LayoutPickerProps = {
  value: PdfLayout;
  onChange: (layout: PdfLayout) => void;
};

/** Three 92×120 layout thumbnails; the selected one has a 2px ink border. */
export function LayoutPicker({ value, onChange }: LayoutPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-12 leading-none font-medium text-ink-2">Layout</span>
      <div className="flex gap-2.5" role="radiogroup" aria-label="Layout">
        {pdfLayouts.map((layout) => {
          const selected = layout.value === value;
          return (
            <button
              key={layout.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(layout.value)}
              className="group flex w-[92px] cursor-pointer flex-col items-center gap-1.5"
            >
              <span
                className={cn(
                  'flex h-[120px] w-full flex-col gap-[5px] overflow-hidden rounded-control bg-white transition-colors',
                  selected ? 'border-2 border-ink p-[9px]' : 'border border-line-2 p-2.5 group-hover:border-faint',
                )}
              >
                <span className={cn('h-2 w-full shrink-0 rounded-[2px]', selected ? 'bg-ink' : 'bg-line-2')} />
                {sketchLines.map((width) => (
                  <span key={width} className={cn('h-1 shrink-0 rounded-[2px] bg-line', width)} />
                ))}
              </span>
              <span className={cn('text-12 leading-none text-ink', selected ? 'font-semibold' : 'font-medium')}>{layout.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
