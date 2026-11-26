import { useState } from 'react';
import { Tabs } from '@/components/ui';
import { quotationTabs, type QuotationTab } from '../../data';
import { ButtonRow } from './ButtonRow';
import { DsSection } from './DsSection';
import { InputRow } from './InputRow';
import { SelectionRow } from './SelectionRow';

/** "Tombol & input": buttons, input states, selection controls and tabs. */
export function ControlsSection() {
  const [tab, setTab] = useState<QuotationTab>('all');

  return (
    <DsSection title="Tombol & input">
      <ButtonRow />
      <InputRow />
      <SelectionRow />
      <Tabs items={quotationTabs} value={tab} onChange={setTab} />
    </DsSection>
  );
}
