import { Field, Textarea } from '@/components/ui';
import { cn } from '@/lib/cn';
import { EditorCard } from './EditorCard';

type NotesCardProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/** "Termin & syarat" / "Instruksi pembayaran": a single Catatan textarea. */
export function NotesCard({ title, value, onChange, className }: NotesCardProps) {
  return (
    <EditorCard title={title} className={cn('gap-3', className)}>
      <Field label="Catatan">
        {(id) => (
          <Textarea
            id={id}
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="field-sizing-content min-h-[104px] resize-none p-2.5 leading-5"
          />
        )}
      </Field>
    </EditorCard>
  );
}
