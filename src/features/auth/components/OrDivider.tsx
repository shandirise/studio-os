import { cn } from '@/lib/cn';

/** Hairline divider with a centered "atau". */
export function OrDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)} role="separator">
      <span className="h-px flex-1 bg-line" />
      <span className="text-12 leading-none text-faint">atau</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
