import type { CatalogItem, LineItem } from './types';

/** Service catalog used by "Pilih dari katalog jasa". */
export const serviceCatalog: CatalogItem[] = [
  { id: 'uiux', name: 'Desain UI/UX Website', description: 'Riset, wireframe, 12 halaman hi-fi', unit: 'paket', price: 28_000_000 },
  { id: 'frontend', name: 'Pengembangan Frontend', description: 'Next.js, responsif, animasi dasar', unit: 'paket', price: 42_000_000 },
  { id: 'cms', name: 'Integrasi CMS & SEO dasar', description: 'Headless CMS, meta, sitemap', unit: 'paket', price: 15_000_000 },
  { id: 'backend', name: 'Pengembangan Backend & API', description: 'REST API, autentikasi, panel admin', unit: 'paket', price: 48_000_000 },
  { id: 'mobile', name: 'Aplikasi Mobile', description: 'iOS & Android, React Native', unit: 'platform', price: 60_000_000 },
  { id: 'brand', name: 'Identitas Brand', description: 'Logo, palet warna, panduan brand', unit: 'paket', price: 18_000_000 },
  { id: 'copy', name: 'Copywriting Halaman', description: 'Naskah SEO-friendly per halaman', unit: 'halaman', price: 750_000 },
  { id: 'maintenance', name: 'Maintenance & Support', description: 'Update, backup, monitoring', unit: 'bulan', price: 4_500_000 },
];

/** New line item with a unique id. */
export function createLineItem(values: Partial<Omit<LineItem, 'id'>> = {}): LineItem {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    qty: 1,
    unit: 'paket',
    price: 0,
    discount: 0,
    ...values,
  };
}
