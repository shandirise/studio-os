import { useState, type FormEvent } from 'react';
import { Paperclip } from 'lucide-react';
import { Button, IconButton, Input, useToast } from '@/components/ui';

/** Drawer footer: comment input, attach button and "Kirim". */
export function CommentComposer({ onSubmit }: { onSubmit: (body: string) => void }) {
  const toast = useToast();
  const [body, setBody] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;
    onSubmit(text);
    setBody('');
  };

  return (
    <form onSubmit={submit} className="flex shrink-0 items-center gap-2 border-t border-line px-5 py-3">
      <Input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Tulis komentar, @mention…"
        aria-label="Tulis komentar"
        className="flex-1"
        inputClassName="h-[34px]"
      />
      <IconButton
        icon={Paperclip}
        label="Lampirkan file"
        className="size-[34px]"
        onClick={() => toast('Lampirkan file', 'Pilih file dari komputer untuk dilampirkan ke task.')}
      />
      <Button variant="primary" type="submit">
        Kirim
      </Button>
    </form>
  );
}
