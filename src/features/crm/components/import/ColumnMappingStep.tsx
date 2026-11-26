import { Check, TriangleAlert } from 'lucide-react';
import { Select } from '@/components/ui';
import { cn } from '@/lib/cn';
import { analyzeMapping, contactFieldOptions, csvColumns, IGNORED_FIELD, type ColumnMapping } from '../../dealData';

type ColumnMappingStepProps = {
  mapping: ColumnMapping;
  onChange: (columnId: string, field: string) => void;
};

const gridCols = 'grid grid-cols-[230px_170px_minmax(0,1fr)] items-center gap-4 px-3.5';

/** Step 2: match every CSV column to a Studio OS contact field. */
export function ColumnMappingStep({ mapping, onChange }: ColumnMappingStepProps) {
  const { mapped, duplicates, missing, isSuggested } = analyzeMapping(mapping);

  return (
    <>
      <div className="overflow-x-auto rounded-card border border-line">
        <div className="min-w-[620px]">
          <div className={cn(gridCols, 'h-8 border-b border-line bg-subtle text-10-5 leading-none font-semibold text-muted')}>
            <span>KOLOM CSV</span>
            <span>CONTOH DATA</span>
            <span>FIELD STUDIO OS</span>
          </div>
          {csvColumns.map((column) => {
            const field = mapping[column.id] ?? IGNORED_FIELD;
            const ignored = field === IGNORED_FIELD;
            return (
              <div key={column.id} className={cn(gridCols, 'h-11 border-b border-line last:border-b-0')}>
                <span className="truncate text-13 leading-none font-medium text-ink">{column.header}</span>
                <span className="truncate text-12-5 leading-none text-muted">{column.sample}</span>
                <Select
                  aria-label={`Field untuk kolom ${column.header}`}
                  options={contactFieldOptions}
                  value={field}
                  onChange={(e) => onChange(column.id, e.target.value)}
                  invalid={duplicates.includes(field)}
                  className={cn('[&>select]:h-[30px] [&>select]:text-12-5', ignored && '[&>select]:bg-subtle [&>select]:text-faint')}
                />
              </div>
            );
          })}
        </div>
      </div>

      {duplicates.length > 0 || missing.length > 0 ? (
        <p className="flex items-center gap-2 text-12-5 leading-none text-danger">
          <TriangleAlert size={13} />
          {duplicates.length > 0
            ? `Field ${duplicates.join(', ')} dipilih untuk lebih dari satu kolom`
            : `Field ${missing.join(' dan ')} wajib dipetakan`}
        </p>
      ) : (
        <p className="flex items-center gap-2 text-12-5 leading-none text-muted">
          <Check size={13} strokeWidth={2.5} className="text-green-strong" />
          {mapped} dari {csvColumns.length} kolom {isSuggested ? 'otomatis cocok' : 'dipetakan'}
        </p>
      )}
    </>
  );
}
