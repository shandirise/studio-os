import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, PageHeader, Segmented, Tabs, useToast, type TabItem } from '@/components/ui';
import { ActivityFormModal } from '../components/activities/ActivityFormModal';
import { ActivityList } from '../components/activities/ActivityList';
import { MiniCalendar } from '../components/activities/MiniCalendar';
import { MonthCalendar } from '../components/activities/MonthCalendar';
import {
  activities as initialActivities,
  activityInTab,
  addDays,
  formatLongDate,
  olderCompletedCount,
  tabForDate,
  TODAY,
  type Activity,
  type ActivityTab,
} from '../dealData';

type View = 'list' | 'calendar';

const viewOptions: Array<{ value: View; label: string }> = [
  { value: 'list', label: 'List' },
  { value: 'calendar', label: 'Kalender' },
];

const byDueTime = (a: Activity, b: Activity) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);

/** C7 · Aktivitas & Follow-up. Tabs by due status, a mini calendar, and a month calendar view. */
export function ActivitiesPage() {
  useBreadcrumbs([{ label: 'CRM', to: '/crm/contacts' }, { label: 'Aktivitas' }]);
  const toast = useToast();
  const [view, setView] = useState<View>('list');
  const [tab, setTab] = useState<ActivityTab>('today');
  const [items, setItems] = useState<Activity[]>(initialActivities);
  /** A calendar day picked by the user; overrides the tab filter. */
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [month, setMonth] = useState({ year: 2026, month: 10 });
  const [formOpen, setFormOpen] = useState(false);

  const count = (t: ActivityTab) => items.filter((a) => activityInTab(a, t)).length;
  const tabs: TabItem<ActivityTab>[] = [
    { value: 'overdue', label: 'Terlambat', count: count('overdue') },
    { value: 'today', label: 'Hari ini', count: count('today') },
    { value: 'upcoming', label: 'Mendatang', count: count('upcoming') },
    { value: 'done', label: 'Selesai', count: count('done') + olderCompletedCount },
  ];

  const listed = useMemo(
    () => items.filter((a) => (dateFilter ? a.date === dateFilter : activityInTab(a, tab))).sort(byDueTime),
    [items, tab, dateFilter],
  );
  const markedDates = useMemo(() => new Set(items.filter((a) => !a.done).map((a) => a.date)), [items]);

  const shiftMonth = (delta: number) =>
    setMonth(({ year, month: m }) => {
      const next = m + delta;
      return { year: year + Math.floor(next / 12), month: (next + 12) % 12 };
    });

  const update = (id: string, patch: Partial<Activity>) =>
    setItems((list) => list.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  const find = (id: string) => items.find((a) => a.id === id);

  const toggle = (id: string, done: boolean) => {
    update(id, { done });
    const title = find(id)?.title ?? '';
    toast(done ? 'Aktivitas selesai' : 'Aktivitas dibuka lagi', title);
  };

  const postpone = (id: string) => {
    const activity = find(id);
    if (!activity) return;
    const date = addDays(activity.date, 1);
    update(id, { date });
    toast('Aktivitas ditunda', `${activity.title} → ${formatLongDate(date)}`);
  };

  const remove = (id: string) => {
    const title = find(id)?.title ?? '';
    setItems((list) => list.filter((a) => a.id !== id));
    toast('Aktivitas dihapus', title);
  };

  const create = (activity: Activity) => {
    setItems((list) => [...list, activity]);
    setFormOpen(false);
    setDateFilter(null);
    setTab(activity.done ? 'done' : tabForDate(activity.date));
    setView('list');
    toast('Aktivitas ditambahkan', `${activity.title} · ${formatLongDate(activity.date)}`);
  };

  const selectDate = (iso: string) => {
    setView('list');
    if (iso === TODAY) {
      setDateFilter(null);
      setTab('today');
    } else {
      setDateFilter(iso);
    }
  };

  const selectTab = (next: ActivityTab) => {
    setTab(next);
    setDateFilter(null);
    setView('list');
  };

  return (
    <Page>
      <PageHeader
        title="Aktivitas & Follow-up"
        subtitle="Semua hal yang perlu ditindaklanjuti"
        actions={
          <>
            <Segmented options={viewOptions} value={view} onChange={setView} />
            <Button variant="primary" icon={Plus} onClick={() => setFormOpen(true)}>
              Aktivitas
            </Button>
          </>
        }
      />

      <Tabs items={tabs} value={tab} onChange={selectTab} />

      {view === 'list' ? (
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ActivityList
            activities={listed}
            header={
              dateFilter && (
                <div className="flex items-center justify-between gap-3 border-b border-line bg-subtle px-4 py-2.5">
                  <span className="text-12-5 font-semibold text-ink">Aktivitas · {formatLongDate(dateFilter)}</span>
                  <button
                    type="button"
                    onClick={() => setDateFilter(null)}
                    className="cursor-pointer text-12 font-semibold text-ink underline underline-offset-2"
                  >
                    Tampilkan semua
                  </button>
                </div>
              )
            }
            onToggle={toggle}
            onPostpone={postpone}
            onDelete={remove}
          />
          <MiniCalendar
            year={month.year}
            month={month.month}
            selectedDate={dateFilter ?? TODAY}
            markedDates={markedDates}
            onSelect={selectDate}
            onPrevMonth={() => shiftMonth(-1)}
            onNextMonth={() => shiftMonth(1)}
          />
        </div>
      ) : (
        <MonthCalendar
          year={month.year}
          month={month.month}
          activities={items}
          onSelectDate={selectDate}
          onPrevMonth={() => shiftMonth(-1)}
          onNextMonth={() => shiftMonth(1)}
        />
      )}

      <ActivityFormModal open={formOpen} defaultDate={dateFilter ?? TODAY} onClose={() => setFormOpen(false)} onCreate={create} />
    </Page>
  );
}
