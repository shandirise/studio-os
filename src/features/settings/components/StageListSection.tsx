import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui';
import type { PipelineForm, Stage } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';
import { StageRow } from './StageRow';

/** Deal stages: drag (or arrow keys on the grip) to reorder, rename, recolor, add and delete. */
export function StageListSection({ form }: { form: SettingsForm<PipelineForm> }) {
  const { values, update } = form;
  const [armedId, setArmedId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [newId, setNewId] = useState<string | null>(null);

  // A press on the grip that never turns into a drag must not leave the row draggable.
  useEffect(() => {
    if (!armedId) return;
    const disarm = () => setArmedId((id) => (dragId ? id : null));
    window.addEventListener('pointerup', disarm);
    return () => window.removeEventListener('pointerup', disarm);
  }, [armedId, dragId]);

  const setStages = (fn: (stages: Stage[]) => Stage[]) => update((v) => ({ ...v, stages: fn(v.stages) }));

  const move = (from: number, to: number) =>
    setStages((stages) => {
      if (to < 0 || to >= stages.length || from === to) return stages;
      const next = [...stages];
      const [stage] = next.splice(from, 1);
      next.splice(to, 0, stage!);
      return next;
    });

  const addStage = () => {
    const id = `stage-${Date.now()}`;
    setNewId(id);
    setStages((stages) => [...stages, { id, name: 'Stage baru', probability: 50, tone: 'yellow' }]);
  };

  const endDrag = () => {
    setDragId(null);
    setArmedId(null);
  };

  return (
    <SettingsSection title="Stage deal" description="Seret untuk mengurutkan. Probabilitas dipakai untuk weighted value.">
      <div className="flex items-center gap-3 border-b border-line px-2 pb-2 text-10-5 leading-none font-semibold text-muted">
        <span className="w-4 shrink-0" />
        <span className="flex-1">NAMA STAGE</span>
        <span className="w-20 shrink-0 lg:w-[110px]">
          <span className="lg:hidden">PROB.</span>
          <span className="max-lg:hidden">PROBABILITAS</span>
        </span>
        <span className="w-5 shrink-0 lg:w-[90px]">
          <span className="max-lg:hidden">WARNA</span>
        </span>
        <span className="w-5 shrink-0" />
      </div>

      <div className="flex flex-col gap-4">
        {values.stages.map((stage, index) => (
          <StageRow
            key={stage.id}
            stage={stage}
            dragging={dragId === stage.id}
            draggable={armedId === stage.id}
            autoFocus={stage.id === newId}
            onChange={(patch) => setStages((stages) => stages.map((s) => (s.id === stage.id ? { ...s, ...patch } : s)))}
            onDelete={() => setStages((stages) => stages.filter((s) => s.id !== stage.id))}
            onMove={(delta) => move(index, index + delta)}
            onGripPointerDown={() => setArmedId(stage.id)}
            dragEvents={{
              onDragStart: (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', stage.id);
                setDragId(stage.id);
              },
              onDragOver: (e) => {
                if (!dragId) return;
                e.preventDefault();
                if (dragId !== stage.id) move(values.stages.findIndex((s) => s.id === dragId), index);
              },
              onDrop: (e) => e.preventDefault(),
              onDragEnd: endDrag,
            }}
          />
        ))}
      </div>

      <Button size="sm" icon={Plus} className="self-start" onClick={addStage}>
        Tambah stage
      </Button>
    </SettingsSection>
  );
}
