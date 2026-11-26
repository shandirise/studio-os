import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

/** 72px subtle tile holding the page's large outline icon. */
export function StatusTile({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={cn('flex size-[72px] shrink-0 items-center justify-center rounded-card border border-line bg-subtle text-ink', className)}>
      <Icon size={28} strokeWidth={1.5} />
    </span>
  );
}
