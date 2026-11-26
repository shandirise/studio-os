import { useState } from 'react';
import { Bell, LogOut, Menu as MenuIcon, X } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Avatar, Menu } from '@/components/ui';
import { cn } from '@/lib/cn';
import { portalClient, portalNav, portalNotifications } from '../data';
import { PortalBrand } from './PortalBrand';
import { PortalMobileMenu } from './PortalMobileMenu';

function NotificationMenu() {
  const navigate = useNavigate();
  return (
    <Menu
      items={portalNotifications.map((n) => ({ label: n.label, onSelect: () => navigate(n.to) }))}
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} aria-label="Notifikasi" className="inline-flex cursor-pointer text-ink hover:text-ink-2">
          <Bell size={18} />
        </button>
      )}
    />
  );
}

function AccountMenu() {
  const navigate = useNavigate();
  return (
    <Menu
      items={[{ label: 'Keluar', icon: LogOut, danger: true, onSelect: () => navigate('/portal/login') }]}
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} aria-label="Menu akun" className="cursor-pointer rounded-control">
          <Avatar name={portalClient.name} size="md" />
        </button>
      )}
    />
  );
}

/** Client portal top bar: brand, underlined nav, notifications and account (desktop); brand + menu (mobile). */
export function PortalHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white">
      {/* Desktop */}
      <div className="hidden h-[59px] items-center justify-between px-14 lg:flex">
        <Link to="/portal" aria-label="Beranda portal">
          <PortalBrand />
        </Link>
        <nav aria-label="Portal" className="flex items-center gap-7">
          {portalNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'text-13-5 leading-none transition-colors',
                  isActive ? 'font-semibold text-ink underline underline-offset-[3px]' : 'font-medium text-muted hover:text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <NotificationMenu />
          <AccountMenu />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex h-[51px] items-center justify-between px-4 lg:hidden">
        <Link to="/portal" aria-label="Beranda portal" onClick={() => setMenuOpen(false)}>
          <PortalBrand />
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          className="cursor-pointer text-ink"
        >
          {menuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>
      {menuOpen && <PortalMobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
