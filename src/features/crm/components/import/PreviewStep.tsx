import { Badge, Segmented, Table, TD, TH, THead, TR } from '@/components/ui';
import { cn } from '@/lib/cn';
import {
  duplicateStrategyOptions,
  importPreviewRows,
  importRowTone,
  importSummary,
  type DuplicateStrategy,
} from '../../dealData';

type PreviewStepProps = {
  strategy: DuplicateStrategy;
  onStrategyChange: (strategy: DuplicateStrategy) => void;
};

/** Step 3: validation summary, duplicate handling and a preview of the first rows. */
export function PreviewStep({ strategy, onStrategyChange }: PreviewStepProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        <Badge tone="green">{importSummary.valid} valid</Badge>
        <Badge tone="red">{importSummary.errors} error</Badge>
        <Badge tone="yellow">{importSummary.duplicates} duplikat</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-12-5 leading-none font-medium text-ink">Data duplikat:</span>
        <Segmented options={duplicateStrategyOptions} value={strategy} onChange={onStrategyChange} />
      </div>

      <div className="overflow-hidden rounded-card border border-line">
        <Table minWidth={720}>
          <THead>
            <TH className="w-11">#</TH>
            <TH className="w-[150px]">NAMA</TH>
            <TH>EMAIL</TH>
            <TH className="w-40">PERUSAHAAN</TH>
            <TH className="w-[150px]">STATUS</TH>
          </THead>
          <tbody>
            {importPreviewRows.map((row) => (
              <TR key={row.line} className={cn('h-[42px]', importRowTone[row.status] === 'red' && 'bg-canvas')}>
                <TD className="py-0 text-muted">{row.line}</TD>
                <TD className="py-0">{row.name}</TD>
                <TD className="py-0">{row.email}</TD>
                <TD className="py-0">{row.company}</TD>
                <TD className="py-0">
                  <Badge tone={importRowTone[row.status]}>{row.status}</Badge>
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
