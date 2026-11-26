import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge, IconButton } from '@/components/ui';
import { timesheetStatusTone, type TimesheetStatus } from '../data';
import { formatHours } from '../format';

type TimesheetWeekNavProps = {
  label: string;
  status: TimesheetStatus;
  totalHours: number;
  onPrev: () => void;
  onNext: () => void;
};

/** Week switcher with submission status and the week total. */
export function TimesheetWeekNav({ label, status, totalHours, onPrev, onNext }: TimesheetWeekNavProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <IconButton icon={ChevronLeft} label="Minggu sebelumnya" onClick={onPrev} />
      <h2 className="text-14 leading-none font-semibold text-ink">{label}</h2>
      <IconButton icon={ChevronRight} label="Minggu berikutnya" onClick={onNext} />
      <Badge tone={timesheetStatusTone[status]}>{status}</Badge>
      <p className="ml-auto flex items-baseline gap-2.5">
        <span className="text-12-5 text-muted">Total minggu ini</span>
        <span className="text-16 leading-none font-bold text-ink">{formatHours(totalHours)} jam</span>
      </p>
    </div>
  );
}
