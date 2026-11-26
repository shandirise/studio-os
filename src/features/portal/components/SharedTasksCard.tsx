import { Badge, Card, CardHeader } from '@/components/ui';
import { cn } from '@/lib/cn';
import { sharedTasks, sharedTaskTone } from '../data';

/** Tasks the agency shares with the client (read only). */
export function SharedTasksCard() {
  return (
    <Card className="min-w-0">
      <CardHeader title="Task yang dibagikan" subtitle="Hanya baca" className="max-lg:[&_p]:hidden" />
      <ul className="px-3.5 pb-2.5 lg:px-4 lg:pb-3">
        {sharedTasks.map((task) => (
          <li
            key={task.id}
            className={cn(
              'flex h-10 items-center justify-between gap-3 border-b border-line last:border-b-0',
              task.desktopOnly && 'max-lg:hidden',
            )}
          >
            <span className="min-w-0 truncate text-13 leading-none text-ink">{task.title}</span>
            <Badge tone={sharedTaskTone[task.status]} className="max-lg:h-[19px] max-lg:text-10-5">
              {task.status}
            </Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
