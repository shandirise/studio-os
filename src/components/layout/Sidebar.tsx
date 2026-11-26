import { ChevronDown, ChevronLeft, ChevronRight, CircleHelp, LogOut, SlidersVertical } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import { Avatar, useToast } from '@/components/ui';
import { navGroups, type NavItem } from '@/config/navigation';
import { currentUser, workspace } from '@/data/workspace';
import { cn } from '@/lib/cn';
import { Logo, LogoMark } from './Logo';

type SidebarProps = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  /** Called after a link is clicked (closes the mobile drawer). */
  onNavigate?: () => void;
  className?: string;
};

function SidebarLink({ item, collapsed, onNavigate }: { item: NavItem; collapsed?: boolean; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'flex h-8 shrink-0 items-center gap-2.5 rounded-control px-2.5 text-13 leading-none transition-colors',
          collapsed && 'justify-center px-0',
          isActive ? 'bg-ink font-semibold text-white' : 'font-medium text-ink-2 hover:bg-subtle',
        )
      }
    >
      <Icon size={16} />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );
}

/** App sidebar: brand, workspace switcher, grouped navigation and user block. */
export function Sidebar({ collapsed, onToggleCollapse, onNavigate, className }: SidebarProps) {
  const toast = useToast();
  return (
    <aside className={cn('flex h-full flex-col border-r border-line bg-white', collapsed ? 'w-16' : 'w-60', className)}>
      <div className={cn('flex h-14 shrink-0 items-center border-b border-line px-4', collapsed ? 'justify-center' : 'justify-between')}>
        <Link to="/" onClick={onNavigate} aria-label="Studio OS">
          {collapsed ? <LogoMark /> : <Logo />}
        </Link>
        {onToggleCollapse && !collapsed && (
          <button type="button" onClick={onToggleCollapse} aria-label="Ciutkan sidebar" className="cursor-pointer text-muted hover:text-ink">
            <ChevronLeft size={16} strokeWidth={2} />
          </button>
        )}
      </div>

      <div className={cn('shrink-0 px-3 pt-3 pb-1', collapsed && 'px-2')}>
        <button
          type="button"
          className={cn(
            'flex w-full cursor-pointer items-center gap-2.5 rounded-control border border-line bg-subtle px-2.5 py-2 text-left hover:border-line-2',
            collapsed && 'justify-center px-0',
          )}
        >
          <Avatar name={workspace.name} size="sm" variant="dark" />
          {!collapsed && (
            <>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-13 leading-[1.3] font-semibold text-ink">{workspace.name}</span>
                <span className="truncate text-11 leading-[1.2] text-muted">
                  {workspace.type} · {workspace.memberCount} anggota
                </span>
              </span>
              <ChevronDown size={16} strokeWidth={2} className="text-ink" />
            </>
          )}
        </button>
      </div>

      <nav className={cn('flex min-h-0 flex-1 flex-col gap-px overflow-y-auto px-3 py-2', collapsed && 'px-2')}>
        {navGroups.map((group, i) => (
          <div key={group.label} className={cn('flex flex-col gap-px', i > 0 && 'mt-2')}>
            {collapsed ? (
              i > 0 && <div className="mx-2 mb-1 border-t border-line" />
            ) : (
              <p className="mb-[3px] px-0 text-10-5 leading-none font-semibold tracking-[0.08em] text-faint">{group.label}</p>
            )}
            {group.items.map((item) => (
              <SidebarLink key={item.to} item={item} collapsed={collapsed} onNavigate={onNavigate} />
            ))}
          </div>
        ))}
      </nav>

      <div className={cn('flex shrink-0 flex-col gap-px border-t border-line px-3 pt-2 pb-3', collapsed && 'px-2')}>
        <SidebarLink item={{ label: 'Settings', to: '/settings', icon: SlidersVertical }} collapsed={collapsed} onNavigate={onNavigate} />
        <button
          type="button"
          onClick={() => toast('Pusat bantuan', 'Dokumentasi dan kontak support akan tersedia di sini.')}
          title={collapsed ? 'Bantuan' : undefined}
          className={cn(
            'flex h-8 shrink-0 cursor-pointer items-center gap-2.5 rounded-control px-2.5 text-13 leading-none font-medium text-ink-2 hover:bg-subtle',
            collapsed && 'justify-center px-0',
          )}
        >
          <CircleHelp size={16} />
          {!collapsed && 'Bantuan'}
        </button>
        {collapsed ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Lebarkan sidebar"
            className="mt-2 flex h-8 cursor-pointer items-center justify-center rounded-control text-muted hover:bg-subtle hover:text-ink"
          >
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        ) : (
          <div className="flex items-center gap-2.5 px-2.5 pt-2.5">
            <Avatar name={currentUser.name} size="md" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-12-5 leading-[1.3] font-semibold text-ink">{currentUser.name}</span>
              <span className="text-11 leading-[1.2] text-muted">{currentUser.role}</span>
            </div>
            <Link to="/login" aria-label="Keluar" title="Keluar" className="text-muted hover:text-ink">
              <LogOut size={16} />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
