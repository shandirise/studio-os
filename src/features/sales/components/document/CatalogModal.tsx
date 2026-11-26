import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input, Modal } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { serviceCatalog } from './catalog';
import type { CatalogItem } from './types';

type CatalogModalProps = {
  open: boolean;
  onClose: () => void;
  onPick: (item: CatalogItem) => void;
};

/** "Pilih dari katalog jasa": searchable list of standard services. */
export function CatalogModal({ open, onClose, onPick }: CatalogModalProps) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const results = serviceCatalog.filter((s) => `${s.name} ${s.description}`.toLowerCase().includes(q));

  return (
    <Modal open={open} onClose={onClose} title="Katalog jasa" subtitle="Pilih jasa untuk ditambahkan sebagai item" width={520}>
      <div className="flex flex-col gap-3">
        <Input icon={Search} placeholder="Cari jasa…" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
        <ul className="flex flex-col overflow-hidden rounded-control border border-line">
          {results.map((service) => (
            <li key={service.id} className="border-b border-line last:border-b-0">
              <button
                type="button"
                onClick={() => onPick(service)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-3 py-2.5 text-left hover:bg-canvas"
              >
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-13 font-semibold text-ink">{service.name}</span>
                  <span className="truncate text-12 text-muted">{service.description}</span>
                </span>
                <span className="shrink-0 text-right text-12 text-muted">
                  <span className="font-semibold text-ink">{formatRupiah(service.price)}</span> / {service.unit}
                </span>
              </button>
            </li>
          ))}
          {results.length === 0 && <li className="px-3 py-6 text-center text-12 text-muted">Jasa tidak ditemukan</li>}
        </ul>
      </div>
    </Modal>
  );
}
