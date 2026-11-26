import { useMemo, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Menu, PageHeader, useToast } from '@/components/ui';
import { TimesheetGrid, type CellRef } from '../components/TimesheetGrid';
import { TimesheetMemberSelect } from '../components/TimesheetMemberSelect';
import { TimesheetWeekNav } from '../components/TimesheetWeekNav';
import {
  designedTimesheet,
  internalTimesheetEntries,
  TIMESHEET_WEEK_START,
  TODAY,
  type TimesheetRow,
  type TimesheetStatus,
} from '../data';
import { formatHours, formatWeekRange, parseDate, toIsoDate } from '../format';
import { projectName, useTasks } from '../taskStore';

type Sheet = { rows: TimesheetRow[]; status: TimesheetStatus };

const emptySheet: Sheet = { rows: [], status: 'Belum disubmit' };
const sheetKey = (memberId: string, week: number) => `${memberId}:${week}`;

function weekDays(weekOffset: number): Date[] {
  const monday = parseDate(TIMESHEET_WEEK_START);
  return Array.from({ length: 7 }, (_, i) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + weekOffset * 7 + i));
}

/** E5 · Timesheet — weekly hours per task for one team member. Cells are editable; totals recompute. */
export function TimesheetPage() {
  useBreadcrumbs([{ label: 'Project', to: '/projects' }, { label: 'Timesheet' }]);
  const toast = useToast();
  const tasks = useTasks();
  const [memberId, setMemberId] = useState(designedTimesheet.memberId);
  const [week, setWeek] = useState(0);
  const [sheets, setSheets] = useState<Record<string, Sheet>>({
    [sheetKey(designedTimesheet.memberId, 0)]: { rows: designedTimesheet.rows, status: 'Belum disubmit' },
  });
  const [activeCell, setActiveCell] = useState<CellRef | null>({ rowId: 'r1', day: 3 });

  const key = sheetKey(memberId, week);
  const sheet = sheets[key] ?? emptySheet;
  const submitted = sheet.status === 'Disubmit';
  const days = useMemo(() => weekDays(week), [week]);
  const todayIndex = days.findIndex((d) => toIsoDate(d) === TODAY);
  const totalHours = sheet.rows.reduce((sum, r) => sum + r.hours.reduce<number>((s, h) => s + (h ?? 0), 0), 0);

  const updateSheet = (update: (s: Sheet) => Sheet) => setSheets((all) => ({ ...all, [key]: update(all[key] ?? emptySheet) }));

  const changeCell = (rowId: string, day: number, value: number | null) =>
    updateSheet((s) => ({
      ...s,
      rows: s.rows.map((r) => (r.id === rowId ? { ...r, hours: r.hours.map((h, i) => (i === day ? value : h)) } : r)),
    }));

  const addEntry = (task: string, project: string) => {
    updateSheet((s) => ({ ...s, rows: [...s.rows, { id: `r-${Date.now()}`, task, project, hours: Array.from({ length: 7 }, () => null) }] }));
    toast('Entri ditambahkan', `${task} · ${project}`);
  };

  const submit = () => {
    updateSheet((s) => ({ ...s, status: 'Disubmit' }));
    setActiveCell(null);
    toast('Timesheet disubmit', `${formatHours(totalHours)} jam dikirim untuk approval.`);
  };

  const existing = new Set(sheet.rows.map((r) => `${r.task}|${r.project}`));
  const entryOptions = [
    ...tasks.filter((t) => t.status !== 'Done').map((t) => ({ task: t.title, project: projectName(t.projectId) })),
    ...internalTimesheetEntries.map((task) => ({ task, project: 'Internal' })),
  ].filter((o) => !existing.has(`${o.task}|${o.project}`));

  return (
    <Page>
      <PageHeader
        title="Timesheet"
        subtitle="Catatan jam kerja mingguan"
        actions={
          <>
            <TimesheetMemberSelect
              memberId={memberId}
              onChange={(id) => {
                setMemberId(id);
                setActiveCell(null);
              }}
            />
            <Menu
              items={entryOptions.map((o) => ({ label: o.task, hint: o.project, onSelect: () => addEntry(o.task, o.project) }))}
              trigger={({ toggle }) => (
                <Button icon={Plus} onClick={toggle} disabled={submitted}>
                  Entri
                </Button>
              )}
            />
            <Button variant="primary" icon={Check} onClick={submit} disabled={submitted || totalHours === 0}>
              Submit timesheet
            </Button>
          </>
        }
      />

      <TimesheetWeekNav
        label={formatWeekRange(days[0]!, days[6]!)}
        status={sheet.status}
        totalHours={totalHours}
        onPrev={() => setWeek((w) => w - 1)}
        onNext={() => setWeek((w) => w + 1)}
      />

      <TimesheetGrid
        key={key}
        days={days}
        todayIndex={todayIndex}
        rows={sheet.rows}
        readOnly={submitted}
        activeCell={activeCell}
        onActivateCell={setActiveCell}
        onChange={changeCell}
      />
    </Page>
  );
}
