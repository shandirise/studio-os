import { LogOut } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import { Avatar } from '@/components/ui';
import { cn } from '@/lib/cn';
import { portalClient, portalNav } from '../data';

/** Dropdown panel under the mobile portal header: navigation and sign out. */
export function PortalMobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 top-[52px] bg-overlay/30 lg:hidden" onClick={onClose} aria-hidden />
      <div className="absolute inset-x-0 top-full border-b border-line bg-white lg:hidden">
        <nav aria-label="Portal" className="flex flex-col px-4 py-2">
          {portalNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex h-11 items-center border-b border-line text-14 last:border-b-0',
                  isActive ? 'font-semibold text-ink underline underline-offset-[3px]' : 'font-medium text-muted',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center justify-between gap-3 border-t border-line bg-subtle px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar name={portalClient.name} size="md" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-13 font-semibold text-ink">{portalClient.name}</span>
              <span className="truncate text-12 text-muted">{portalClient.email}</span>
            </div>
          </div>
          <Link to="/portal/login" onClick={onClose} className="flex shrink-0 items-center gap-1.5 text-13 font-semibold text-danger">
            <LogOut size={15} />
            Keluar
          </Link>
        </div>
      </div>
    </>
  );
}
