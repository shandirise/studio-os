import { useState } from 'react';
import { Card, CardHeader, Checkbox } from '@/components/ui';
import { cn } from '@/lib/cn';
import { followUps as initialFollowUps } from '../data';

export function FollowUpCard() {
  const [items, setItems] = useState(initialFollowUps);
  const toggle = (id: string, done: boolean) => setItems((list) => list.map((f) => (f.id === id ? { ...f, done } : f)));

  return (
    <Card className="self-start">
      <CardHeader title="Follow-up hari ini" subtitle={`${items.length} tugas`} />
      <ul className="px-4 pb-3">
        {items.map((f, i) => (
          <li
            key={f.id}
            className={cn(
              'flex items-center gap-2.5 border-b border-line py-2.5',
              // On mobile the design shows three items and keeps the time on the right.
              i === 2 && 'max-lg:hidden',
            )}
          >
            <Checkbox checked={f.done} onChange={(done) => toggle(f.id, done)} ariaLabel={f.title} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className={cn('truncate text-13 font-medium', f.done ? 'text-faint line-through' : 'text-ink')}>{f.title}</span>
              <span className="truncate text-11-5 text-muted max-lg:hidden">
                {f.context} · {f.time}
              </span>
            </div>
            <span className="text-11-5 text-muted lg:hidden">{f.time}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
