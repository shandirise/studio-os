import { Input } from '@/components/ui';
import { cn } from '@/lib/cn';

type PercentInputProps = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  className?: string;
};

/** 0–100 number field rendered as "25%": the % sign trails the digits like in the design. */
export function PercentInput({ value, onChange, label, className }: PercentInputProps) {
  const text = String(value);

  return (
    <div className={cn('relative', className)}>
      <Input
        type="text"
        inputMode="numeric"
        aria-label={label}
        value={text}
        onChange={(e) => onChange(Math.min(100, Number(e.target.value.replace(/\D/g, '').slice(0, 3) || 0)))}
        inputClassName="h-8 tabular-nums"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-13 text-ink tabular-nums"
        style={{ left: `calc(11px + ${text.length}ch)` }}
      >
        %
      </span>
    </div>
  );
}
