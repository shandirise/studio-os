import { useState } from 'react';
import { Checkbox, FilterChip, Radio, Segmented, Tag, Toggle } from '@/components/ui';
import { boardViews, type BoardView } from '../../data';

/** Checkbox, radio, toggle, segmented control, filter chips and tags, all interactive. */
export function SelectionRow() {
  const [checks, setChecks] = useState([false, true]);
  const [radio, setRadio] = useState(1);
  const [toggles, setToggles] = useState([false, true]);
  const [view, setView] = useState<BoardView>('kanban');
  const [stageFilter, setStageFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState(true);

  const flip = (list: boolean[], i: number, next: boolean) => list.map((v, j) => (j === i ? next : v));

  return (
    <div className="flex flex-wrap items-center gap-6">
      {checks.map((checked, i) => (
        <Checkbox key={`c${i}`} checked={checked} onChange={(next) => setChecks((l) => flip(l, i, next))} ariaLabel={`Checkbox ${i + 1}`} />
      ))}
      {[0, 1].map((i) => (
        <Radio key={`r${i}`} name="ds-radio" checked={radio === i} onChange={() => setRadio(i)} />
      ))}
      {toggles.map((checked, i) => (
        <Toggle key={`t${i}`} checked={checked} onChange={(next) => setToggles((l) => flip(l, i, next))} label={`Toggle ${i + 1}`} />
      ))}
      <Segmented options={boardViews} value={view} onChange={setView} />
      <FilterChip active={stageFilter} onClick={() => setStageFilter((v) => !v)}>
        Stage
      </FilterChip>
      <FilterChip active={activeFilter} chevron={false} onClick={() => setActiveFilter((v) => !v)}>
        Aktif
      </FilterChip>
      <Tag>VIP</Tag>
      <Tag>Referral</Tag>
    </div>
  );
}
