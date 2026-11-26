import { LayoutGrid, Layers, Menu, ReceiptText, Users, type LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/cn';

type Tab = {
  label: string;
  /** Where the tab navigates to. */
  to: string;
  icon: LucideIcon;
  /** Path prefixes that mark this tab as active. */
  match: string[];
};

const tabs: Tab[] = [
  { label: 'Home', to: '/', icon: LayoutGrid, match: [] },
  { label: 'CRM', to: '/crm/contacts', icon: Users, match: ['/crm', '/sales'] },
  { label: 'Project', to: '/projects', icon: Layers, match: ['/projects', '/my-tasks', '/timesheet'] },
  { label: 'Finance', to: '/finance/invoices', icon: ReceiptText, match: ['/finance'] },
];

const itemClass = (active: boolean) =>
  cn('flex flex-col items-center gap-1 text-10-5 leading-none', active ? 'font-semibold text-ink' : 'font-medium text-faint');

/** Bottom tab bar shown below the lg breakpoint. */
export function MobileNav({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { pathname } = useLocation();
  const isActive = (tab: Tab) => (tab.to === '/' ? pathname === '/' : tab.match.some((p) => pathname.startsWith(p)));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[60px] items-center justify-around border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      {tabs.map((tab) => {
        const active = isActive(tab);
        const Icon = tab.icon;
        return (
          <Link key={tab.label} to={tab.to} className={itemClass(active)} aria-current={active ? 'page' : undefined}>
            <Icon size={18} strokeWidth={active ? 2 : 1.75} />
            {tab.label}
          </Link>
        );
      })}
      <button type="button" onClick={onOpenMenu} className={cn(itemClass(false), 'cursor-pointer')}>
        <Menu size={18} />
        Menu
      </button>
    </nav>
  );
}
