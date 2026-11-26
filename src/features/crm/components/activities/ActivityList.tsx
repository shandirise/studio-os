import type { ReactNode } from 'react';
import { CircleCheck } from 'lucide-react';
import { Card, EmptyState } from '@/components/ui';
import type { Activity } from '../../dealData';
import { ActivityRow } from './ActivityRow';

type ActivityListProps = {
  activities: Activity[];
  /** Optional heading row, e.g. when the list is filtered to one calendar day. */
  header?: ReactNode;
  onToggle: (id: string, done: boolean) => void;
  onPostpone: (id: string) => void;
  onDelete: (id: string) => void;
};

/** Card listing follow-ups as rows. */
export function ActivityList({ activities, header, onToggle, onPostpone, onDelete }: ActivityListProps) {
  return (
    <Card className="min-w-0 self-start overflow-hidden">
      {header}
      {activities.length === 0 ? (
        <EmptyState icon={CircleCheck} title="Tidak ada aktivitas" description="Semua follow-up di sini sudah beres." className="py-10" />
      ) : (
        <ul>
          {activities.map((a) => (
            <ActivityRow
              key={a.id}
              activity={a}
              onToggle={(done) => onToggle(a.id, done)}
              onPostpone={() => onPostpone(a.id)}
              onDelete={() => onDelete(a.id)}
            />
          ))}
        </ul>
      )}
    </Card>
  );
}
