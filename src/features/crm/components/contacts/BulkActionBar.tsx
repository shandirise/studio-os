import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Menu, type MenuItem } from '@/components/ui';
import { cn } from '@/lib/cn';

const actionClass =
  'inline-flex h-[26px] shrink-0 cursor-pointer items-center whitespace-nowrap rounded-control border border-dark px-2.5 text-12 font-medium text-white transition-colors hover:bg-ink-2';

/** Outlined action on the dark bulk bar. */
export function BulkActionButton({ className, type = 'button', ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={cn(actionClass, className)} {...rest} />;
}

/** Bulk action that opens a dropdown (e.g. "Ubah PIC" → team members). */
export function BulkActionMenu({ label, items }: { label: string; items: MenuItem[] }) {
  return (
    <Menu
      align="left"
      trigger={({ toggle }) => <BulkActionButton onClick={toggle}>{label}</BulkActionButton>}
      items={items}
    />
  );
}

type BulkActionBarProps = {
  /** e.g. "2 kontak dipilih" */
  label: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Dark bar shown above a table while rows are selected. */
export function BulkActionBar({ label, children, className }: BulkActionBarProps) {
  return (
    <div
      className={cn('flex min-h-10 flex-wrap items-center gap-3 rounded-card bg-ink px-3.5 py-[7px]', className)}
      role="toolbar"
      aria-label="Aksi massal"
    >
      <span className="text-13 font-semibold whitespace-nowrap text-white">{label}</span>
      {children}
    </div>
  );
}
