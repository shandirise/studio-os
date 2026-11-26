import { cn } from '@/lib/cn';
import { initials } from '@/lib/format';

const sizes = {
  xs: 'size-[22px] text-9',
  sm: 'size-[26px] text-10',
  md: 'size-[30px] text-11',
  lg: 'size-8 text-12',
  xl: 'size-10 text-14',
  '2xl': 'size-16 text-22',
} as const;

type AvatarProps = {
  /** Full name; initials are derived automatically. */
  name: string;
  size?: keyof typeof sizes;
  /** `dark` is used for workspace / company marks. */
  variant?: 'light' | 'dark';
  className?: string;
};

/** Square initials avatar with 4px corners. */
export function Avatar({ name, size = 'md', variant = 'light', className }: AvatarProps) {
  return (
    <span
      title={name}
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center rounded-control font-semibold leading-none',
        variant === 'dark' ? 'bg-ink text-white' : 'bg-avatar text-ink',
        sizes[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
