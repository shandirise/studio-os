import { useState } from 'react';
import { Button, Card, Textarea } from '@/components/ui';
import type { TimelineEntry } from '../../dealData';
import { DealTimeline } from './DealTimeline';

type DealNotesTabProps = {
  /** Timeline entries that carry a note. */
  notes: TimelineEntry[];
  onAddNote: (text: string) => void;
};

/** "Catatan" tab: quick composer plus every note logged on the deal. */
export function DealNotesTab({ notes, onAddNote }: DealNotesTabProps) {
  const [text, setText] = useState('');

  const save = () => {
    if (!text.trim()) return;
    onAddNote(text.trim());
    setText('');
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col gap-2.5 p-3">
        <Textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tulis catatan untuk tim, mis. hasil negosiasi atau kebutuhan klien…"
          aria-label="Catatan baru"
        />
        <div className="flex justify-end">
          <Button variant="primary" size="sm" onClick={save} disabled={!text.trim()}>
            Simpan catatan
          </Button>
        </div>
      </Card>
      <DealTimeline entries={notes} />
    </div>
  );
}
