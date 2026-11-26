import { useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { Badge, Card, Table, TD, TH, THead, TR, Tag, useToast } from '@/components/ui';
import { cn } from '@/lib/cn';
import { initialDeliveries, type ApiForm, type Delivery } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';

/** Webhook endpoints (active switch is part of the form) and the delivery log with resend. */
export function WebhookSection({ form }: { form: SettingsForm<ApiForm> }) {
  const { values, update } = form;
  const toast = useToast();
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  const toggleActive = (id: string) =>
    update((v) => ({ ...v, webhooks: v.webhooks.map((w) => (w.id === id ? { ...w, active: !w.active } : w)) }));

  const resend = (delivery: Delivery) => {
    setDeliveries((list) => list.map((d) => (d.id === delivery.id ? { ...d, ok: true, response: 'Diterima dalam 198 ms' } : d)));
    toast('Webhook dikirim ulang', `${delivery.event} berhasil diterima.`);
  };

  return (
    <SettingsSection title="Webhook">
      <Card className="overflow-hidden">
        <Table minWidth={640}>
          <THead>
            <TH>URL TUJUAN</TH>
            <TH className="w-[230px]">EVENT</TH>
            <TH className="w-20">AKTIF</TH>
          </THead>
          <tbody>
            {values.webhooks.map((hook) => (
              <TR key={hook.id} className="h-[46px] [&>td]:py-2">
                <TD className="max-w-0 truncate font-semibold">{hook.url}</TD>
                <TD>
                  <div className="flex flex-wrap gap-2">
                    {hook.events.map((event) => (
                      <Tag key={event}>{event}</Tag>
                    ))}
                  </div>
                </TD>
                <TD>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={hook.active}
                    aria-label={`Aktifkan webhook ${hook.url}`}
                    title={hook.active ? 'Aktif · klik untuk menonaktifkan' : 'Nonaktif · klik untuk mengaktifkan'}
                    onClick={() => toggleActive(hook.id)}
                    className={cn(
                      'flex size-6 cursor-pointer items-center justify-center rounded-control hover:bg-subtle',
                      hook.active ? 'text-muted' : 'text-faint',
                    )}
                  >
                    {hook.active ? <Check size={16} /> : <Minus size={16} />}
                  </button>
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Card>

      <p className="text-13 leading-none font-semibold text-ink">Log pengiriman</p>
      <Card className="overflow-hidden">
        <Table minWidth={680}>
          <THead>
            <TH className="w-[150px]">WAKTU</TH>
            <TH className="w-[150px]">EVENT</TH>
            <TH className="w-[120px]">STATUS</TH>
            <TH>RESPON</TH>
            <TH className="w-[124px]" aria-label="Aksi" />
          </THead>
          <tbody>
            {deliveries.map((d) => (
              <TR key={d.id} className="h-11 [&>td]:py-2">
                <TD className="whitespace-nowrap">{d.time}</TD>
                <TD>{d.event}</TD>
                <TD>
                  <Badge tone={d.ok ? 'green' : 'red'}>{d.ok ? '200 OK' : '500 Error'}</Badge>
                </TD>
                <TD className="text-muted">{d.response}</TD>
                <TD>
                  {!d.ok && (
                    <button
                      type="button"
                      onClick={() => resend(d)}
                      className="cursor-pointer rounded-badge transition-opacity hover:opacity-75"
                    >
                      <Badge tone="gray">Kirim ulang</Badge>
                    </button>
                  )}
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Card>
    </SettingsSection>
  );
}
