import { Badge } from '@/components/ui';
import { cn } from '@/lib/cn';
import { priorityTone, type Priority } from '@/lib/status';

/** Compact 19px priority badge used on task cards and rows. */
export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  return (
    <Badge tone={priorityTone[priority]} className={cn('h-[19px] text-10-5', className)}>
      {priority}
    </Badge>
  );
}
