import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import { cn } from '@/lib/cn';

export type TabItem<T extends string = string> = {
  value: T;
  label: ReactNode;
  count?: number | string;
  /** When set, the tab is a router link and active state follows the URL. */
  to?: string;
};

type TabsProps<T extends string> = {
  items: TabItem<T>[];
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
};

function TabLabel({ active, label, count }: { active: boolean; label: ReactNode; count?: number | string }) {
  return (
    <>
      {label}
      {count !== undefined && (
        <span
          className={cn(
            'rounded-badge px-1.5 py-px text-11 leading-[13px] font-semibold',
            active ? 'bg-ink text-white' : 'bg-subtle text-muted',
          )}
        >
          {count}
        </span>
      )}
    </>
  );
}

const tabClass = (active: boolean) =>
  cn(
    '-mb-px flex shrink-0 cursor-pointer items-center gap-1.5 border-b-2 py-[9px] text-13 leading-4 whitespace-nowrap transition-colors',
    active ? 'border-ink font-semibold text-ink' : 'border-transparent font-medium text-muted hover:text-ink',
  );

/** Underlined tabs with optional count chips. Works controlled or as route links. */
export function Tabs<T extends string>({ items, value, onChange, className }: TabsProps<T>) {
  return (
    <div className={cn('flex gap-[22px] overflow-x-auto border-b border-line', className)} role="tablist">
      {items.map((item) =>
        item.to ? (
          <NavLink key={item.value} to={item.to} end className={({ isActive }) => tabClass(isActive)}>
            {({ isActive }) => <TabLabel active={isActive} label={item.label} count={item.count} />}
          </NavLink>
        ) : (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={item.value === value}
            className={tabClass(item.value === value)}
            onClick={() => onChange?.(item.value)}
          >
            <TabLabel active={item.value === value} label={item.label} count={item.count} />
          </button>
        ),
      )}
    </div>
  );
}

type SegmentedProps<T extends string> = {
  options: Array<{ value: T; label: ReactNode }>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/** Pill switcher, e.g. "Bulan ini · Kuartal · Tahun" or "Kanban · Tabel". */
export function Segmented<T extends string>({ options, value, onChange, className }: SegmentedProps<T>) {
  return (
    <div className={cn('inline-flex shrink-0 gap-0.5 rounded-control border border-line bg-subtle p-0.5', className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              'flex h-7 cursor-pointer items-center gap-1.5 rounded-badge px-3 text-12 whitespace-nowrap transition-colors',
              active ? 'border border-line bg-white font-semibold text-ink' : 'font-medium text-muted hover:text-ink',
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
