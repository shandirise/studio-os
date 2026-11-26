import { cn } from '@/lib/cn';

/** 28px black "S" mark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex size-7 shrink-0 items-center justify-center rounded-control bg-ink text-15 leading-none font-bold text-white',
        className,
      )}
    >
      S
    </span>
  );
}

/** Mark + wordmark. Pass `name` to show a workspace name instead (client portal). */
export function Logo({ name = 'Studio OS', className }: { name?: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="text-16 leading-none font-bold tracking-[-0.01em] whitespace-nowrap text-ink">{name}</span>
    </span>
  );
}
