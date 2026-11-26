import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

type CheckboxProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

/** 16px checkbox: ink fill with white check when on. */
export function Checkbox({ checked, onChange, label, disabled, className, ariaLabel }: CheckboxProps) {
  return (
    <label
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 text-13 text-ink select-none',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-label={ariaLabel}
      />
      <span
        className={cn(
          'flex size-4 shrink-0 items-center justify-center rounded-badge border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-ink',
          checked ? 'border-ink bg-ink text-white' : 'border-line-2 bg-white',
        )}
      >
        {checked && <Check size={11} strokeWidth={3} />}
      </span>
      {label}
    </label>
  );
}

type RadioProps = {
  checked: boolean;
  onChange?: () => void;
  label?: ReactNode;
  name?: string;
  className?: string;
};

/** 16px radio: ink ring with ink center when selected. */
export function Radio({ checked, onChange, label, name, className }: RadioProps) {
  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-2 text-13 text-ink select-none', className)}>
      <input type="radio" className="peer sr-only" name={name} checked={checked} onChange={onChange} />
      <span
        className={cn(
          'flex size-4 shrink-0 items-center justify-center rounded-full border bg-white peer-focus-visible:outline-2 peer-focus-visible:outline-ink',
          checked ? 'border-ink' : 'border-line-2',
        )}
      >
        {checked && <span className="size-2 rounded-full bg-ink" />}
      </span>
      {label}
    </label>
  );
}

type ToggleProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
};

/** 34×20 switch. */
export function Toggle({ checked, onChange, label, className }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative inline-flex h-5 w-[34px] shrink-0 cursor-pointer items-center rounded-[10px] p-0.5 transition-colors',
        checked ? 'bg-ink' : 'bg-line-2',
        className,
      )}
    >
      <span className={cn('size-4 rounded-full bg-white transition-transform', checked && 'translate-x-3.5')} />
    </button>
  );
}
