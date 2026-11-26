import { SearchX } from 'lucide-react';
import { Button, EmptyState } from '@/components/ui';

type NoResultsRowProps = {
  colSpan: number;
  onReset: () => void;
};

/** Full-width table row shown when search/filters match nothing. */
export function NoResultsRow({ colSpan, onReset }: NoResultsRowProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-8">
        <EmptyState
          icon={SearchX}
          title="Tidak ada hasil"
          description="Coba kata kunci lain atau hapus filter."
          action={
            <Button size="sm" onClick={onReset}>
              Hapus filter
            </Button>
          }
        />
      </td>
    </tr>
  );
}
