import { CalendarClock } from 'lucide-react';
import { Card, EmptyState } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { TimesheetRow } from '../data';
import { formatHours, formatWeekday } from '../format';
import { TimesheetCell } from './TimesheetCell';

export type CellRef = { rowId: string; day: number };

type TimesheetGridProps = {
  days: Date[];
  /** Index of today's column, or -1 when today is not in this week. */
  todayIndex: number;
  rows: TimesheetRow[];
  readOnly: boolean;
  activeCell: CellRef | null;
  onActivateCell: (cell: CellRef) => void;
  onChange: (rowId: string, day: number, value: number | null) => void;
};

const gridCols = 'grid grid-cols-[minmax(220px,1fr)_repeat(7,78px)_70px] items-center gap-2 px-3.5';
const sum = (values: Array<number | null>) => values.reduce<number>((total, v) => total + (v ?? 0), 0);
const hoursOrDash = (hours: number) => (hours > 0 ? formatHours(hours) : '–');

/** Weekly hours grid: one row per task, editable day cells, row totals and a "Total per hari" footer. */
export function TimesheetGrid({ days, todayIndex, rows, readOnly, activeCell, onActivateCell, onChange }: TimesheetGridProps) {
  const dayTotals = days.map((_, day) => sum(rows.map((r) => r.hours[day] ?? null)));
  const weekTotal = sum(dayTotals);

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[930px]">
          <div className={cn(gridCols, 'h-9 border-b border-line bg-subtle')}>
            <span className="text-10-5 leading-none font-semibold text-muted">PROJECT / TASK</span>
            {days.map((d, i) => (
              <span
                key={d.toISOString()}
                className={cn('text-center text-11 leading-none font-semibold', i === todayIndex ? 'text-ink' : 'text-muted')}
              >
                {formatWeekday(d)}
              </span>
            ))}
            <span className="text-right text-10-5 leading-none font-semibold text-muted">TOTAL</span>
          </div>

          {rows.length === 0 ? (
            <EmptyState
              icon={CalendarClock}
              title="Belum ada entri minggu ini"
              description="Tambah entri dengan tombol “Entri” untuk mulai mencatat jam kerja."
              className="border-b border-line py-8"
            />
          ) : (
            rows.map((row) => (
              <div key={row.id} className={cn(gridCols, 'h-[54px] border-b border-line')}>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-13 leading-[1.2] font-semibold text-ink">{row.task}</span>
                  <span className="truncate text-11-5 leading-none text-muted">{row.project}</span>
                </div>
                {days.map((d, day) => (
                  <TimesheetCell
                    key={d.toISOString()}
                    value={row.hours[day] ?? null}
                    readOnly={readOnly}
                    active={activeCell?.rowId === row.id && activeCell.day === day}
                    label={`${row.task}, ${formatWeekday(d)}`}
                    onActivate={() => onActivateCell({ rowId: row.id, day })}
                    onCommit={(value) => onChange(row.id, day, value)}
                  />
                ))}
                <span className="text-right text-13 font-semibold text-ink">{hoursOrDash(sum(row.hours))}</span>
              </div>
            ))
          )}

          <div className={cn(gridCols, 'h-11 bg-subtle text-12-5 font-semibold text-ink')}>
            <span>Total per hari</span>
            {dayTotals.map((total, day) => (
              <span key={days[day]!.toISOString()} className="text-center">
                {hoursOrDash(total)}
              </span>
            ))}
            <span className="text-right text-13 font-bold">{hoursOrDash(weekTotal)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
