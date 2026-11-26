import { useState } from 'react';
import { Ellipsis, Pencil, Plus, Trash2 } from 'lucide-react';
import { Button, Card, IconButton, Menu, Table, TD, TH, THead, TR } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import type { CatalogItem, TemplatesForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { CatalogItemModal } from './CatalogItemModal';
import { SettingsSection } from './SettingsSection';

/** Service catalog table with add / edit / delete. */
export function CatalogSection({ form }: { form: SettingsForm<TemplatesForm> }) {
  const { values, update } = form;
  // `undefined` = closed, `null` = adding a new item.
  const [editing, setEditing] = useState<CatalogItem | null | undefined>(undefined);

  const setCatalog = (fn: (items: CatalogItem[]) => CatalogItem[]) => update((v) => ({ ...v, catalog: fn(v.catalog) }));

  const save = (item: CatalogItem) => {
    setCatalog((items) => (items.some((i) => i.id === item.id) ? items.map((i) => (i.id === item.id ? item : i)) : [...items, item]));
    setEditing(undefined);
  };

  return (
    <SettingsSection title="Katalog jasa" description="Dipakai di line-item editor quotation & invoice">
      <Card className="overflow-hidden">
        <Table minWidth={640}>
          <THead>
            <TH>JASA</TH>
            <TH className="w-[100px]">SATUAN</TH>
            <TH className="w-[150px]" align="right">
              HARGA
            </TH>
            <TH className="w-[90px]">PAJAK</TH>
            <TH className="w-[50px]" aria-label="Aksi" />
          </THead>
          <tbody>
            {values.catalog.map((item) => (
              <TR key={item.id} className="h-[52px] [&>td]:py-2">
                <TD>
                  <div className="flex flex-col gap-px">
                    <span>{item.name}</span>
                    {item.description && <span className="text-11-5 text-muted">{item.description}</span>}
                  </div>
                </TD>
                <TD>{item.unit}</TD>
                <TD align="right" className="font-semibold whitespace-nowrap">
                  {formatRupiah(item.price)}
                </TD>
                <TD className="whitespace-nowrap">{item.tax}</TD>
                <TD>
                  <Menu
                    items={[
                      { label: 'Ubah', icon: Pencil, onSelect: () => setEditing(item) },
                      { label: 'Hapus', icon: Trash2, danger: true, onSelect: () => setCatalog((items) => items.filter((i) => i.id !== item.id)) },
                    ]}
                    trigger={({ toggle }) => (
                      <IconButton icon={Ellipsis} label={`Aksi untuk ${item.name}`} variant="ghost" className="size-[26px]" onClick={toggle} />
                    )}
                  />
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Card>
      <Button size="sm" icon={Plus} className="self-start" onClick={() => setEditing(null)}>
        Tambah jasa
      </Button>

      {editing !== undefined && <CatalogItemModal item={editing} onClose={() => setEditing(undefined)} onSave={save} />}
    </SettingsSection>
  );
}
