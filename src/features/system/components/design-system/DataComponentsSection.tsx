import { Button, Card, EmptyState, KpiCard, Skeleton } from '@/components/ui';
import { DsSection } from './DsSection';
import { KanbanCardSample } from './KanbanCardSample';
import { ToastSample } from './ToastSample';

/** KPI tile, kanban card, toast, empty state and skeleton. */
export function DataComponentsSection() {
  return (
    <DsSection title="Komponen data">
      <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard label="Revenue diterima" value="Rp 148,2 jt" delta="12,4%" trend="up" />
        <KanbanCardSample />
        <ToastSample />
        <Card>
          <EmptyState
            title="Belum ada kontak"
            description="Tambah kontak pertama atau import CSV"
            action={
              <Button to="/crm/contacts?new=1" variant="primary" size="sm">
                Tambah kontak
              </Button>
            }
          />
        </Card>
        <Card className="flex flex-col gap-2.5 p-4" aria-label="Memuat">
          <Skeleton className="w-[140px]" />
          <Skeleton className="w-[100px]" />
          <Skeleton className="w-[120px]" />
        </Card>
      </div>
    </DsSection>
  );
}
