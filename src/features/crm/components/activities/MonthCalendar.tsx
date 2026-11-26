import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import { monthGrid, monthNames, TODAY, type Activity } from '../../dealData';

const weekdays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const MAX_PER_DAY = 2;

type MonthCalendarProps = {
  year: number;
  /** Zero-based month. */
  month: number;
  activities: Activity[];
  onSelectDate: (iso: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

/** "Kalender" view: full month grid with up to two activities per day. */
export function MonthCalendar({ year, month, activities, onSelectDate, onPrevMonth, onNextMonth }: MonthCalendarProps) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-14 leading-none font-semibold text-ink">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-1">
          <IconButton icon={ChevronLeft} label="Bulan sebelumnya" className="size-[26px]" onClick={onPrevMonth} />
          <IconButton icon={ChevronRight} label="Bulan berikutnya" className="size-[26px]" onClick={onNextMonth} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-7 border-y border-line bg-subtle">
            {weekdays.map((d) => (
              <span key={d} className="px-2.5 py-2 text-11-5 font-semibold text-muted">
                {d}
              </span>
            ))}
          </div>
          {monthGrid(year, month).map((week, w) => (
            <div key={w} className="grid grid-cols-7 border-b border-line last:border-b-0">
              {week.map((iso, d) => {
                if (!iso) return <span key={`empty-${d}`} className="min-h-24 border-r border-line bg-canvas last:border-r-0" />;
                const items = activities.filter((a) => a.date === iso).sort((a, b) => a.time.localeCompare(b.time));
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => onSelectDate(iso)}
                    className="flex min-h-24 cursor-pointer flex-col items-stretch gap-1 border-r border-line p-2 text-left transition-colors last:border-r-0 hover:bg-canvas"
                  >
                    <span
                      className={cn(
                        'flex size-6 items-center justify-center rounded-control text-12-5 leading-none',
                        iso === TODAY ? 'bg-ink font-semibold text-white' : 'text-ink',
                      )}
                    >
                      {Number(iso.slice(8))}
                    </span>
                    {items.slice(0, MAX_PER_DAY).map((a) => (
                      <span
                        key={a.id}
                        className={cn(
                          'truncate rounded-badge bg-subtle px-1.5 py-[3px] text-11 leading-none font-medium',
                          a.done ? 'text-faint line-through' : 'text-ink',
                        )}
                      >
                        {a.time} {a.title}
                      </span>
                    ))}
                    {items.length > MAX_PER_DAY && (
                      <span className="px-1.5 text-11 leading-none text-muted">+{items.length - MAX_PER_DAY} lainnya</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
