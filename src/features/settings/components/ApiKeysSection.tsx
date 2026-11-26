import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Badge, Button, Card, Table, TD, TH, THead, TR, useToast } from '@/components/ui';
import { freshApiKey, initialApiKeys, type ApiKey } from '../data';
import { CreateApiKeyModal } from './CreateApiKeyModal';
import { NewApiKeyBanner } from './NewApiKeyBanner';
import { SettingsSection } from './SettingsSection';

/** "sos_live_" + 32 random hex characters. */
function generateApiKey(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return `sos_live_${Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')}`;
}

/** API keys: the one-time banner for the newest key, the key list (revoke) and key creation. */
export function ApiKeysSection() {
  const toast = useToast();
  const [keys, setKeys] = useState(initialApiKeys);
  const [newKey, setNewKey] = useState<string | null>(freshApiKey);
  const [creating, setCreating] = useState(false);

  const copy = (value: string) => {
    void navigator.clipboard?.writeText(value).catch(() => undefined);
    toast('API key disalin', 'Simpan di tempat aman. Kunci ini tidak akan ditampilkan lagi.');
  };

  const create = (name: string) => {
    const value = generateApiKey();
    const key: ApiKey = { id: value, name, maskedKey: `sos_live_••••••••${value.slice(-4)}`, createdAt: '19 Nov 2026', lastUsed: 'Belum pernah' };
    setKeys((list) => [key, ...list]);
    setNewKey(value);
    setCreating(false);
    toast('API key dibuat', `${name} siap dipakai.`);
  };

  const revoke = (key: ApiKey) => {
    setKeys((list) => list.filter((k) => k.id !== key.id));
    toast('API key dicabut', `${key.name} tidak bisa dipakai lagi.`);
  };

  return (
    <SettingsSection title="API keys" description="Kunci hanya ditampilkan sekali saat dibuat">
      {newKey && <NewApiKeyBanner key={newKey} apiKey={newKey} onCopy={() => copy(newKey)} />}

      <Card className="overflow-hidden">
        <Table minWidth={640}>
          <THead>
            <TH>NAMA</TH>
            <TH className="w-[200px]">KUNCI</TH>
            <TH className="w-[110px]">DIBUAT</TH>
            <TH className="w-[150px]">TERAKHIR DIPAKAI</TH>
            <TH className="w-[90px]" aria-label="Aksi" />
          </THead>
          <tbody>
            {keys.map((key) => (
              <TR key={key.id} className="h-[46px] [&>td]:py-2">
                <TD className="font-semibold">{key.name}</TD>
                <TD className="whitespace-nowrap text-muted">{key.maskedKey}</TD>
                <TD className="whitespace-nowrap">{key.createdAt}</TD>
                <TD className="whitespace-nowrap">{key.lastUsed}</TD>
                <TD>
                  <button
                    type="button"
                    onClick={() => revoke(key)}
                    aria-label={`Cabut ${key.name}`}
                    className="cursor-pointer rounded-badge transition-opacity hover:opacity-75"
                  >
                    <Badge tone="gray">Cabut</Badge>
                  </button>
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Card>

      <Button size="sm" icon={Plus} className="self-start" onClick={() => setCreating(true)}>
        Buat API key
      </Button>

      {creating && <CreateApiKeyModal onClose={() => setCreating(false)} onCreate={create} />}
    </SettingsSection>
  );
}
