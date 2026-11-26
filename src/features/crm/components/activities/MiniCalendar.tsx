import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import { monthGrid, monthNames, TODAY, weekdayInitials } from '../../dealData';

type MiniCalendarProps = {
  year: number;
  /** Zero-based month. */
  month: number;
  selectedDate: string;
  /** Dates that have open activities (shown with a dot). */
  markedDates: Set<string>;
  onSelect: (iso: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

/** Month picker beside the activity list; dots mark days with open follow-ups. */
export function MiniCalendar({ year, month, selectedDate, markedDates, onSelect, onPrevMonth, onNextMonth }: MiniCalendarProps) {
  return (
    <Card className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-14 leading-none font-semibold text-ink">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-1">
          <IconButton icon={ChevronLeft} label="Bulan sebelumnya" className="size-[26px]" onClick={onPrevMonth} />
          <IconButton icon={ChevronRight} label="Bulan berikutnya" className="size-[26px]" onClick={onNextMonth} />
        </div>
      </div>

      <div className="grid grid-cols-7">
        {weekdayInitials.map((d, i) => (
          <span key={i} className="text-center text-11 leading-none font-semibold text-faint">
            {d}
          </span>
        ))}
      </div>

      {monthGrid(year, month).map((week, w) => (
        <div key={w} className="grid grid-cols-7 gap-0.5">
          {week.map((iso, d) =>
            iso ? (
              <button
                key={iso}
                type="button"
                onClick={() => onSelect(iso)}
                aria-pressed={iso === selectedDate}
                aria-label={iso}
                className={cn(
                  'flex h-[34px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-control text-12-5 leading-none transition-colors',
                  iso === selectedDate ? 'bg-ink font-semibold text-white' : 'text-ink hover:bg-subtle',
                  iso === TODAY && iso !== selectedDate && 'font-semibold underline underline-offset-2',
                )}
              >
                {Number(iso.slice(8))}
                {markedDates.has(iso) && (
                  <span className={cn('size-1 rounded-full', iso === selectedDate ? 'bg-white' : 'bg-ink')} />
                )}
              </button>
            ) : (
              <span key={`empty-${d}`} />
            ),
          )}
        </div>
      ))}
    </Card>
  );
}
