import { Fragment } from 'react';
import { Bell, ChevronRight, FileText, Layers, LogOut, Menu as MenuIcon, Plus, ReceiptText, Search, Settings, Target, User, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Avatar, Button, Kbd, Menu } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { useCrumbs } from './PageMeta';

type TopbarProps = {
  onOpenSearch: () => void;
  onOpenMenu: () => void;
};

function Breadcrumbs() {
  const crumbs = useCrumbs();
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-13 leading-none">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <Fragment key={`${c.label}-${i}`}>
            {i > 0 && <ChevronRight size={14} strokeWidth={2} className="shrink-0 text-faint" />}
            {/* Parent crumbs keep their width; only the current page title truncates. */}
            {c.to && !last ? (
              <Link to={c.to} className="shrink-0 font-medium whitespace-nowrap text-muted hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span className={cn(last ? 'min-w-0 truncate font-semibold text-ink' : 'shrink-0 font-medium whitespace-nowrap text-muted')}>
                {c.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}

function NotificationBell({ className }: { className?: string }) {
  return (
    <Link
      to="/notifications"
      aria-label="Notifikasi (3 belum dibaca)"
      className={cn('relative inline-flex size-8 items-center justify-center rounded-control border border-line-2 bg-white text-ink hover:bg-canvas', className)}
    >
      <Bell size={16} />
      <span className="absolute top-[5px] right-[4px] size-2 rounded-full border border-white bg-red" />
    </Link>
  );
}

function UserMenu({ size }: { size: 'lg' | 'md' }) {
  const navigate = useNavigate();
  return (
    <Menu
      items={[
        { label: 'Profil saya', icon: User, onSelect: () => navigate('/settings/profile') },
        { label: 'Settings', icon: Settings, onSelect: () => navigate('/settings/workspace') },
        { label: 'Keluar', icon: LogOut, danger: true, onSelect: () => navigate('/login') },
      ]}
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} aria-label="Menu akun" className="cursor-pointer rounded-control">
          <Avatar name={currentUser.name} size={size} />
        </button>
      )}
    />
  );
}

/** Desktop top bar: breadcrumb, global search, create menu, notifications, account. */
export function Topbar({ onOpenSearch, onOpenMenu }: TopbarProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop */}
      <header className="sticky top-0 z-30 hidden h-14 shrink-0 items-center justify-between gap-6 border-b border-line bg-white px-8 lg:flex">
        <div className="min-w-0 flex-1">
          <Breadcrumbs />
        </div>

        <button
          type="button"
          onClick={onOpenSearch}
          className="flex h-[34px] w-[260px] shrink-0 cursor-pointer items-center justify-between gap-2 rounded-control border border-line bg-subtle px-2.5 text-left hover:border-line-2 xl:w-[380px]"
        >
          <span className="flex min-w-0 items-center gap-2 text-13 text-faint">
            <Search size={14} className="shrink-0 text-muted" />
            <span className="truncate">Cari kontak, deal, project, invoice…</span>
          </span>
          <Kbd>Ctrl K</Kbd>
        </button>

        <div className="flex flex-1 items-center justify-end gap-2.5">
          <Menu
            items={[
              { label: 'Kontak', icon: Users, onSelect: () => navigate('/crm/contacts?new=1') },
              { label: 'Deal', icon: Target, onSelect: () => navigate('/crm/deals') },
              { label: 'Quotation', icon: FileText, onSelect: () => navigate('/sales/quotations/new') },
              { label: 'Invoice', icon: ReceiptText, onSelect: () => navigate('/finance/invoices/new') },
              { label: 'Project', icon: Layers, onSelect: () => navigate('/projects') },
            ]}
            trigger={({ toggle }) => (
              <Button variant="primary" size="sm" icon={Plus} onClick={toggle}>
                Buat
              </Button>
            )}
          />
          <NotificationBell />
          <UserMenu size="lg" />
        </div>
      </header>

      {/* Mobile */}
      <header className="sticky top-0 z-30 flex h-[52px] shrink-0 items-center justify-between border-b border-line bg-white px-4 lg:hidden">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onOpenMenu} aria-label="Buka menu" className="cursor-pointer text-ink">
            <MenuIcon size={20} />
          </button>
          <Link to="/" aria-label="Studio OS">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={onOpenSearch} aria-label="Cari" className="cursor-pointer text-ink">
            <Search size={18} />
          </button>
          <Link to="/notifications" aria-label="Notifikasi" className="relative text-ink">
            <Bell size={18} />
            <span className="absolute -top-0.5 right-0 size-2 rounded-full border border-white bg-red" />
          </Link>
          <UserMenu size="md" />
        </div>
      </header>
    </>
  );
}
