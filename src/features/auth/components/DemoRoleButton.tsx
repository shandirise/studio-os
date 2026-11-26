import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { DemoRole } from '../data';

/**
 * One-click demo login tile. Desktop shows icon + role + description,
 * mobile collapses to role + arrow (38px tall).
 */
export function DemoRoleButton({ role, description, icon: Icon, to }: DemoRole) {
  return (
    <Link
      to={to}
      className="flex h-[38px] min-w-0 flex-1 items-center gap-2.5 rounded-control border border-line-2 bg-white px-2.5 transition-colors hover:bg-canvas lg:h-auto lg:px-3 lg:py-2.5"
    >
      <Icon className="shrink-0 text-ink max-lg:hidden" />
      <span className="flex min-w-0 flex-1 flex-col gap-px">
        <span className="text-13 leading-none font-semibold text-ink lg:leading-[1.2]">{role}</span>
        <span className="truncate text-11-5 leading-[1.2] text-muted max-lg:hidden">{description}</span>
      </span>
      <ArrowRight size={14} strokeWidth={2} className="shrink-0 text-faint" />
    </Link>
  );
}
