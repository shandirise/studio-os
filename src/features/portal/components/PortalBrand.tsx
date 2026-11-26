import { LogoMark } from '@/components/layout/Logo';
import { workspace } from '@/data/workspace';
import { cn } from '@/lib/cn';

const sizes = {
  /** Document sheets: 24px mark, 13px name. */
  doc: { gap: 'gap-2', mark: 'size-6 text-13', name: 'text-13' },
  /** Portal header: 28px mark, 15px name. */
  header: { gap: 'gap-2.5', mark: 'size-7 text-15', name: 'text-15' },
  /** Login card: 32px / 16px on mobile, 36px / 18px on desktop. */
  login: { gap: 'gap-2.5', mark: 'size-8 text-18 lg:size-9 lg:text-20', name: 'text-16 lg:text-18' },
} as const;

type PortalBrandProps = {
  size?: keyof typeof sizes;
  className?: string;
};

/** Workspace mark + name: the agency brand the client sees across the portal. */
export function PortalBrand({ size = 'header', className }: PortalBrandProps) {
  const s = sizes[size];
  return (
    <span className={cn('inline-flex items-center', s.gap, className)}>
      <LogoMark className={s.mark} />
      <span className={cn('leading-none font-bold whitespace-nowrap text-ink', s.name)}>{workspace.name}</span>
    </span>
  );
}
