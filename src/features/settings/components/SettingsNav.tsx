import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router';
import { SectionLabel } from '@/components/ui';
import { cn } from '@/lib/cn';
import { settingsNav } from '../data';

/** Settings sub-navigation: 232px column on desktop, horizontal scrolling tabs on mobile. */
export function SettingsNav() {
  const { pathname } = useLocation();
  const listRef = useRef<HTMLDivElement>(null);

  // On mobile the tabs scroll sideways; keep the current one in view.
  useEffect(() => {
    listRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [pathname]);

  return (
    <nav aria-label="Settings" className="shrink-0 border-b border-line bg-white lg:w-[232px] lg:border-r lg:border-b-0 lg:bg-transparent">
      <div
        ref={listRef}
        className="flex gap-0.5 overflow-x-auto px-4 py-2 lg:sticky lg:top-14 lg:flex-col lg:overflow-visible lg:px-3 lg:py-5"
      >
        <SectionLabel className="mb-2 max-lg:hidden">SETTINGS</SectionLabel>
        {settingsNav.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex h-8 shrink-0 items-center gap-2.5 rounded-control border px-2.5 text-13 leading-none whitespace-nowrap transition-colors',
                isActive ? 'border-line bg-subtle font-semibold text-ink' : 'border-transparent font-medium text-ink-2 hover:bg-subtle',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} className={isActive ? 'text-ink' : 'text-muted'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
