import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { Avatar, Card, useToast } from '@/components/ui';
import { portalClient, projectManager, teamMessages, type TeamMessage } from '../data';

/** "Pesan ke tim": latest messages from the agency (desktop) and a composer. */
export function TeamMessagesCard() {
  const toast = useToast();
  const [messages, setMessages] = useState<TeamMessage[]>(teamMessages);
  const [draft, setDraft] = useState('');

  const send = (e: FormEvent) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setMessages((list) => [...list, { id: `msg-${Date.now()}`, author: portalClient.name, time: 'baru saja', body }]);
    setDraft('');
    toast('Pesan terkirim', `${projectManager.name} akan membalas di sini.`);
  };

  return (
    <Card className="flex min-w-0 flex-col gap-2.5 p-3.5 lg:gap-3 lg:p-4">
      <h3 className="text-14 leading-none font-semibold text-ink">Pesan ke tim</h3>

      <ul className="flex flex-col gap-3 max-lg:hidden">
        {messages.map((m) => (
          <li key={m.id} className="flex gap-2.5">
            <Avatar name={m.author} size="sm" />
            <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <p className="text-12 leading-none font-semibold text-ink">
                {m.author} · {m.time}
              </p>
              <p className="rounded-control border border-line bg-subtle p-2.5 text-12-5 leading-[1.5] text-ink">{m.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <form
        onSubmit={send}
        className="flex h-9 items-center gap-2 rounded-control border border-line-2 bg-white px-2.5 focus-within:border-ink lg:h-[34px]"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Tulis pesan…"
          aria-label="Tulis pesan"
          className="min-w-0 flex-1 bg-transparent text-13 text-ink outline-none placeholder:text-faint"
        />
        <button type="submit" aria-label="Kirim pesan" className="shrink-0 cursor-pointer text-ink-2 hover:text-ink">
          <Send size={16} />
        </button>
      </form>
    </Card>
  );
}
