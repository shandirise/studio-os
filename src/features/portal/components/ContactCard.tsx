import { Mail, MessageSquare } from 'lucide-react';
import { Avatar, Card, SectionLabel, buttonClass } from '@/components/ui';
import { projectManager } from '../data';

/** Home card with the client's PIC at the agency and quick contact buttons. */
export function ContactCard() {
  const button = buttonClass('secondary', 'sm', 'flex-1');
  return (
    <Card className="flex flex-col gap-2.5 p-3.5 lg:gap-3 lg:p-4">
      <SectionLabel className="text-10 max-lg:hidden">KONTAK ANDA</SectionLabel>
      <div className="flex items-center gap-2.5 lg:gap-3">
        <Avatar name={projectManager.name} size="xl" className="max-lg:size-9 lg:text-15" />
        <div className="flex flex-col gap-0.5">
          <span className="text-13-5 leading-none font-semibold text-ink lg:text-14 lg:leading-[1.1]">{projectManager.name}</span>
          <span className="text-12 leading-none text-muted">{projectManager.role}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <a href={`mailto:${projectManager.email}`} className={button}>
          <Mail size={14} strokeWidth={2} className="max-lg:hidden" />
          Email
        </a>
        <a href={`https://wa.me/${projectManager.whatsapp}`} target="_blank" rel="noreferrer" className={button}>
          <MessageSquare size={14} strokeWidth={2} className="max-lg:hidden" />
          WhatsApp
        </a>
      </div>
    </Card>
  );
}
