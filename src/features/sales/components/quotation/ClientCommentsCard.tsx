import { useState } from 'react';
import { Avatar, Button, Card, CardHeader, Textarea, useToast } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import type { QuotationComment } from '../../data';

type ClientCommentsCardProps = {
  comments: QuotationComment[];
  onReply: (text: string) => void;
};

/** "Komentar klien": comment thread from the client portal with an inline reply box. */
export function ClientCommentsCard({ comments, onReply }: ClientCommentsCardProps) {
  const toast = useToast();
  const [replying, setReplying] = useState(false);
  const [draft, setDraft] = useState('');

  const send = () => {
    if (!draft.trim()) return;
    onReply(draft.trim());
    setDraft('');
    setReplying(false);
    toast('Balasan terkirim', 'Klien akan menerima notifikasi email.');
  };

  return (
    <Card className="min-w-0">
      <CardHeader title="Komentar klien" />
      <div className="flex flex-col gap-2.5 px-4 pb-3.5">
        {comments.length === 0 && (
          <p className="rounded-control border border-line bg-subtle p-3.5 text-center text-12-5 font-medium text-muted">
            Belum ada komentar
          </p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="flex gap-2.5">
            <Avatar name={c.author} className="size-7" />
            <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <p className="text-12 leading-[1.2] font-semibold text-ink">
                {c.author} · {c.time}
              </p>
              <p className="rounded-control border border-line bg-subtle p-2.5 text-12-5 leading-[1.4] text-ink">{c.text}</p>
            </div>
          </div>
        ))}
        {replying ? (
          <div className="flex flex-col gap-2">
            <Textarea
              autoFocus
              rows={3}
              placeholder={`Balas sebagai ${currentUser.name}…`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              aria-label="Balasan komentar"
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => setReplying(false)}>
                Batal
              </Button>
              <Button size="sm" variant="primary" onClick={send} disabled={!draft.trim()}>
                Kirim balasan
              </Button>
            </div>
          </div>
        ) : (
          <Button size="sm" className="self-start" onClick={() => setReplying(true)}>
            Balas komentar
          </Button>
        )}
      </div>
    </Card>
  );
}
