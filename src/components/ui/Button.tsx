import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-white hover:bg-ink-2',
  secondary: 'border border-line-2 bg-white text-ink hover:bg-canvas',
  ghost: 'text-ink hover:bg-subtle',
  danger: 'border border-danger-line bg-white text-danger hover:bg-red-soft',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-7 px-2.5 text-12',
  md: 'h-[34px] px-3.5 text-13',
  lg: 'h-10 px-3.5 text-13',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading icon. */
  icon?: LucideIcon;
  /** Trailing icon. */
  iconRight?: LucideIcon;
  /** Render as a router link instead of a button. */
  to?: string;
  children?: ReactNode;
};

export function buttonClass(variant: ButtonVariant = 'secondary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-[7px] whitespace-nowrap rounded-control font-semibold leading-none transition-colors',
    'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-subtle disabled:text-faint',
    variantClass[variant],
    sizeClass[size],
    className,
  );
}

/**
 * Button from the design system.
 * primary = ink fill, secondary = outlined, ghost = text only, danger = red outlined.
 */
export function Button({
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  to,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const iconSize = size === 'sm' ? 14 : 16;
  const content = (
    <>
      {Icon && <Icon size={iconSize} strokeWidth={2} />}
      {children}
      {IconRight && <IconRight size={iconSize} strokeWidth={2} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={buttonClass(variant, size, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      {content}
    </button>
  );
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
  /** Accessible label (also used as tooltip). */
  label: string;
  variant?: 'outline' | 'ghost';
  size?: 'sm' | 'md';
};

/** Square icon-only button: 32px outlined by default, 28px ghost in modals. */
export function IconButton({ icon: Icon, label, variant = 'outline', size = 'md', className, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-control text-ink transition-colors',
        variant === 'outline' ? 'border border-line-2 bg-white hover:bg-canvas' : 'hover:bg-subtle',
        size === 'md' ? 'size-8' : 'size-7',
        className,
      )}
      {...rest}
    >
      <Icon size={16} />
    </button>
  );
}

/** Underlined inline text link, e.g. "Lihat laporan". */
export function TextLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={cn('text-12 font-semibold text-ink underline underline-offset-2 hover:text-ink-2', className)}>
      {children}
    </Link>
  );
}
