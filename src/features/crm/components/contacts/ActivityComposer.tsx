import { useRef, useState } from 'react';
import { Paperclip, User } from 'lucide-react';
import { Button, Card, FilterChip, Menu, Textarea } from '@/components/ui';
import { team } from '@/data/workspace';
import { composerKinds, type ComposerKind } from '../../contactData';

type ActivityComposerProps = {
  /** First name used in the placeholder ("…dengan Rina…"). */
  firstName: string;
  onSave: (kind: ComposerKind, text: string) => void;
  onAttach: (fileName: string) => void;
};

const placeholders: Record<ComposerKind, (name: string) => string> = {
  note: (name) => `Tulis catatan tentang interaksi dengan ${name}…`,
  call: (name) => `Tulis ringkasan telepon dengan ${name}…`,
  meeting: (name) => `Tulis hasil meeting dengan ${name}…`,
};

const iconButtonClass = 'cursor-pointer rounded-badge text-muted transition-colors hover:text-ink';

/** Log a note, call or meeting on the contact timeline. */
export function ActivityComposer({ firstName, onSave, onAttach }: ActivityComposerProps) {
  const [kind, setKind] = useState<ComposerKind>('note');
  const [text, setText] = useState('');
  // The kit's Textarea does not accept a ref, so focus goes through a wrapper element.
  const cardRef = useRef<HTMLDivElement>(null);
  const focusText = () => cardRef.current?.querySelector('textarea')?.focus();
  const fileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    if (!text.trim()) {
      focusText();
      return;
    }
    onSave(kind, text.trim());
    setText('');
  };

  const mention = (name: string) => {
    setText((t) => `${t}${t && !t.endsWith(' ') ? ' ' : ''}@${name} `);
    focusText();
  };

  return (
    <Card className="p-3.5">
      <div ref={cardRef} className="flex flex-col gap-2.5">
        <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Jenis aktivitas">
          {composerKinds.map((k) => (
            <FilterChip
              key={k.value}
              chevron={false}
              active={kind === k.value}
              role="radio"
              aria-checked={kind === k.value}
              onClick={() => setKind(k.value)}
            >
              {k.label}
            </FilterChip>
          ))}
        </div>
        <Textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) save();
          }}
          placeholder={placeholders[kind](firstName)}
          aria-label="Isi aktivitas"
          className="min-h-[60px] p-2.5 leading-5"
        />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className={iconButtonClass}
              aria-label="Lampirkan file"
              title="Lampirkan file"
              onClick={() => fileRef.current?.click()}
            >
              <Paperclip size={15} />
            </button>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onAttach(file.name);
                e.target.value = '';
              }}
            />
            <Menu
              align="left"
              trigger={({ toggle }) => (
                <button
                  type="button"
                  className={iconButtonClass}
                  aria-label="Sebut anggota tim"
                  title="Sebut anggota tim"
                  onClick={toggle}
                >
                  <User size={15} />
                </button>
              )}
              items={team.map((m) => ({
                label: m.name,
                onSelect: () => mention(m.name),
              }))}
            />
          </div>
          <Button variant="primary" size="sm" onClick={save}>
            Simpan
          </Button>
        </div>
      </div>
    </Card>
  );
}
