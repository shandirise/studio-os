import type { ComponentProps, ReactNode, SelectHTMLAttributes } from 'react';
import { useId } from 'react';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

const controlBase =
  'w-full rounded-control border bg-white text-13 text-ink outline-none transition-colors placeholder:text-faint ' +
  'focus:border-ink disabled:bg-subtle disabled:text-muted';

type FieldProps = {
  label?: ReactNode;
  required?: boolean;
  /** Helper text under the control. */
  hint?: ReactNode;
  /** Error message; shown in red under the control. */
  error?: ReactNode;
  className?: string;
  /** Receives the generated id so the label can point at the control. */
  children: (id: string) => ReactNode;
};

/**
 * Label + control + hint/error, stacked with a 6px gap.
 *
 * <Field label="Email" required>{(id) => <Input id={id} icon={Mail} />}</Field>
 */
export function Field({ label, required, hint, error, className, children }: FieldProps) {
  const id = useId();
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="flex items-center gap-1 text-12 leading-[1.2] font-medium text-ink-2">
          {label}
          {required && <span className="font-normal text-danger">*</span>}
        </label>
      )}
      {children(id)}
      {error ? <p className="text-11-5 text-danger">{error}</p> : hint && <p className="text-11-5 text-muted">{hint}</p>}
    </div>
  );
}

/** Accepts a `ref`, forwarded to the <input>. */
type InputProps = ComponentProps<'input'> & {
  icon?: LucideIcon;
  invalid?: boolean;
  /** Content rendered inside the right edge (e.g. a unit or kbd hint). */
  suffix?: ReactNode;
  /** Classes for the outer wrapper (width, margins). */
  className?: string;
  /** Classes for the <input> itself (height, font). */
  inputClassName?: string;
};

/** 36px text input with optional leading icon. */
export function Input({ icon: Icon, invalid, suffix, className, inputClassName, ...rest }: InputProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      {Icon && <Icon size={16} className="pointer-events-none absolute left-2.5 text-faint" />}
      <input
        className={cn(
          controlBase,
          'h-9 px-2.5',
          Icon && 'pl-8',
          suffix ? 'pr-10' : undefined,
          invalid ? 'border-red' : 'border-line-2',
          inputClassName,
        )}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      {suffix && <span className="absolute right-2.5 text-12 text-muted">{suffix}</span>}
    </div>
  );
}

export type SelectOption = string | { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
  options: SelectOption[];
  placeholder?: string;
};

/** Native select styled as the design's dropdown field. */
export function Select({ invalid, options, placeholder, className, ...rest }: SelectProps) {
  const showingPlaceholder = Boolean(placeholder) && (rest.value ?? rest.defaultValue ?? '') === '';
  return (
    <div className={cn('relative flex items-center', className)}>
      <select
        className={cn(
          controlBase,
          'h-9 cursor-pointer appearance-none pr-8 pl-2.5',
          invalid ? 'border-red' : 'border-line-2',
          showingPlaceholder && 'text-faint',
        )}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      <ChevronDown size={14} strokeWidth={2} className="pointer-events-none absolute right-2.5 text-muted" />
    </div>
  );
}

/** Accepts a `ref`, forwarded to the <textarea>. */
type TextareaProps = ComponentProps<'textarea'> & { invalid?: boolean };

export function Textarea({ invalid, className, rows = 3, ...rest }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(controlBase, 'resize-y px-2.5 py-2 leading-[1.5]', invalid ? 'border-red' : 'border-line-2', className)}
      {...rest}
    />
  );
}
