import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Modal, useToast } from '@/components/ui';
import { ColumnMappingStep } from '../components/import/ColumnMappingStep';
import { ImportFileBar } from '../components/import/ImportFileBar';
import { ImportStepper } from '../components/import/ImportStepper';
import { PreviewStep } from '../components/import/PreviewStep';
import {
  analyzeMapping,
  importFile,
  importSummary,
  suggestedMapping,
  type ColumnMapping,
  type DuplicateStrategy,
} from '../dealData';

const steps = {
  mapping: {
    index: 1,
    width: 760,
    title: 'Import CSV · Mapping kolom',
    subtitle: 'Cocokkan kolom file dengan field di Studio OS',
  },
  preview: {
    index: 2,
    width: 860,
    title: 'Import CSV · Preview & validasi',
    subtitle: 'Periksa baris yang bermasalah sebelum diimport',
  },
} as const;

/**
 * C8 · Import CSV — a dialog over the app (as designed), with two working steps.
 * `?step=preview` opens step 3; closing returns to the contact list.
 */
export function ImportContactsPage() {
  useBreadcrumbs([{ label: 'CRM', to: '/crm/contacts' }, { label: 'Kontak', to: '/crm/contacts' }, { label: 'Import CSV' }]);
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const stepKey = searchParams.get('step') === 'preview' ? 'preview' : 'mapping';
  const step = steps[stepKey];

  const [fileName, setFileName] = useState(importFile.name);
  const [mapping, setMapping] = useState<ColumnMapping>(suggestedMapping);
  const [strategy, setStrategy] = useState<DuplicateStrategy>('skip');

  const mappingValid = analyzeMapping(mapping).valid;
  const importCount = importSummary.valid + (strategy === 'skip' ? 0 : importSummary.duplicates);

  const close = () => navigate('/crm/contacts');
  const goTo = (next: keyof typeof steps) => setSearchParams(next === 'preview' ? { step: 'preview' } : {});

  const finish = () => {
    toast('Import selesai', `${importCount} kontak dari ${fileName} ditambahkan ke CRM.`);
    navigate('/crm/contacts');
  };

  return (
    <Modal
      open
      onClose={close}
      width={step.width}
      title={step.title}
      subtitle={step.subtitle}
      footer={
        stepKey === 'mapping' ? (
          <>
            <Button onClick={close}>Kembali</Button>
            <Button variant="primary" iconRight={ArrowRight} disabled={!mappingValid} onClick={() => goTo('preview')}>
              Lanjut ke preview
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => goTo('mapping')}>Kembali</Button>
            <Button variant="primary" onClick={finish}>
              Import {importCount} baris
            </Button>
          </>
        )
      }
    >
      <div className="flex flex-col gap-3.5">
        <div className="-mx-5 overflow-x-auto px-5">
          <ImportStepper current={step.index} />
        </div>
        {stepKey === 'mapping' ? (
          <>
            <ImportFileBar
              fileName={fileName}
              rows={importFile.rows}
              columns={importFile.columns}
              onReplace={(name) => {
                setFileName(name);
                toast('File diganti', name);
              }}
            />
            <ColumnMappingStep mapping={mapping} onChange={(id, field) => setMapping((m) => ({ ...m, [id]: field }))} />
          </>
        ) : (
          <PreviewStep strategy={strategy} onStrategyChange={setStrategy} />
        )}
      </div>
    </Modal>
  );
}
