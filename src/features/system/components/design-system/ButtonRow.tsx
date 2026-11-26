import { Copy, Ellipsis, Pencil, Plus, Trash2 } from 'lucide-react';
import { Button, IconButton, Menu, useToast } from '@/components/ui';

/** Every button variant and size, plus an icon button that opens a Menu. */
export function ButtonRow() {
  const toast = useToast();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" onClick={() => toast('Perubahan disimpan')}>
        Simpan
      </Button>
      <Button>Batal</Button>
      <Button variant="ghost">Lihat detail</Button>
      <Button variant="danger">Hapus</Button>
      <Button disabled>Nonaktif</Button>
      <Button variant="primary" icon={Plus}>
        Kontak
      </Button>
      <Button size="sm">Kecil</Button>
      <Button variant="primary" size="lg">
        Besar
      </Button>
      <Menu
        align="left"
        trigger={({ toggle }) => <IconButton icon={Ellipsis} label="Aksi lainnya" onClick={toggle} />}
        items={[
          { label: 'Edit', icon: Pencil },
          { label: 'Duplikat', icon: Copy },
          { label: 'Hapus', icon: Trash2, danger: true },
        ]}
      />
    </div>
  );
}
