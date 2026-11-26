import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

const sizes = {
  md: { box: 'size-12 rounded-control', icon: 22 },
  lg: { box: 'size-16 rounded-card', icon: 28 },
} as const;

/** Subtle square holding a large outline icon, e.g. the envelope on "Cek email". */
export function IconTile({ icon: Icon, size = 'lg', className }: { icon: LucideIcon; size?: keyof typeof sizes; className?: string }) {
  const s = sizes[size];
  return (
    <span className={cn('flex shrink-0 items-center justify-center border border-line bg-subtle text-ink', s.box, className)}>
      <Icon size={s.icon} strokeWidth={1.5} />
    </span>
  );
}
