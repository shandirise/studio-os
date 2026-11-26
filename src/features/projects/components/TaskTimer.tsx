import { useState, type FormEvent } from 'react';
import { Timer } from 'lucide-react';
import { Button, Input, useToast } from '@/components/ui';
import type { Task } from '../data';
import { formatClock, formatDuration, parseHours } from '../format';
import { taskActions, useRunningTimer } from '../taskStore';

/** Live timer card: elapsed time, logged total, manual entry and Start / Stop. */
export function TaskTimer({ task }: { task: Task }) {
  const toast = useToast();
  const timer = useRunningTimer();
  const running = timer?.taskId === task.id;
  const [manualOpen, setManualOpen] = useState(false);
  const [manualHours, setManualHours] = useState('');

  const stop = () => {
    const seconds = taskActions.stopTimer();
    toast('Waktu tercatat', `${formatDuration(seconds)} ditambahkan ke ${task.title}.`);
  };

  const start = () => {
    taskActions.startTimer(task.id);
    toast('Timer dimulai', task.title);
  };

  const saveManual = (e: FormEvent) => {
    e.preventDefault();
    const hours = parseHours(manualHours);
    if (!hours) return;
    taskActions.logTime(task.id, Math.round(hours * 3600));
    toast('Waktu ditambahkan', `${formatDuration(hours * 3600)} dicatat manual ke ${task.title}.`);
    setManualHours('');
    setManualOpen(false);
  };

  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <Timer size={18} className="text-ink" />
          <div className="flex flex-col gap-px">
            <span className="text-18 leading-none font-semibold text-ink tabular-nums">
              {formatClock(running ? timer.elapsed : 0)}
            </span>
            <span className="text-11-5 leading-none text-muted">Total tercatat {formatDuration(task.loggedSeconds)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setManualOpen((o) => !o)} aria-expanded={manualOpen}>
            Input manual
          </Button>
          {running ? (
            <Button size="sm" variant="danger" onClick={stop}>
              Stop
            </Button>
          ) : (
            <Button size="sm" variant="primary" onClick={start}>
              Start
            </Button>
          )}
        </div>
      </div>

      {manualOpen && (
        <form onSubmit={saveManual} className="flex items-center gap-2 border-t border-line pt-3">
          <Input
            autoFocus
            inputMode="decimal"
            value={manualHours}
            onChange={(e) => setManualHours(e.target.value)}
            placeholder="mis. 1,5"
            aria-label="Jumlah jam"
            suffix="jam"
            className="w-36"
            inputClassName="h-8"
          />
          <Button size="sm" variant="primary" type="submit" disabled={!parseHours(manualHours)}>
            Simpan
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setManualOpen(false)}>
            Batal
          </Button>
        </form>
      )}
    </div>
  );
}
