/* ------------------------------------------------------------------ */
/* H1 · Notifikasi                                                     */
/* ------------------------------------------------------------------ */

export type NotificationKind = 'deal' | 'mention' | 'quotation' | 'overdue' | 'payment' | 'member' | 'import';

export type NotificationGroup = 'Hari ini' | 'Kemarin' | 'Minggu ini';

export type AppNotification = {
  id: string;
  kind: NotificationKind;
  /** Who triggered it ("Sistem" for automatic events). */
  actor: string;
  message: string;
  time: string;
  group: NotificationGroup;
  unread: boolean;
  /** Screen opened when the notification is clicked. */
  to: string;
};

export const notificationGroups: NotificationGroup[] = ['Hari ini', 'Kemarin', 'Minggu ini'];

export const notifications: AppNotification[] = [
  {
    id: 'n1',
    kind: 'deal',
    actor: 'Dimas Prakoso',
    message: 'menandai deal Won: Redesain Website',
    time: '3 jam lalu',
    group: 'Hari ini',
    unread: true,
    to: '/crm/deals/redesain-website-corporate',
  },
  {
    id: 'n2',
    kind: 'mention',
    actor: 'Laras Ayu',
    message: 'me-mention Anda di Desain Home hi-fi',
    time: '1 jam lalu',
    group: 'Hari ini',
    unread: true,
    to: '/projects/website-corporate-v1?task=TASK-142',
  },
  {
    id: 'n3',
    kind: 'quotation',
    actor: 'Rina Wulandari',
    message: 'menyetujui QUO-2026-0012',
    time: '2 jam lalu',
    group: 'Hari ini',
    unread: true,
    to: '/sales/quotations/quo-2026-0012',
  },
  {
    id: 'n4',
    kind: 'overdue',
    actor: 'Sistem',
    message: 'INV-2026-0038 overdue 9 hari',
    time: '18 Nov',
    group: 'Kemarin',
    unread: false,
    to: '/finance/invoices/inv-2026-0038',
  },
  {
    id: 'n5',
    kind: 'payment',
    actor: 'Sistem',
    message: 'INV-2026-0042 dibayar sebagian Rp 12.000.000',
    time: '18 Nov',
    group: 'Kemarin',
    unread: false,
    to: '/finance/invoices/inv-2026-0042',
  },
  {
    id: 'n6',
    kind: 'member',
    actor: 'Nadia Salsabila',
    message: 'menerima undangan dan bergabung',
    time: '16 Nov',
    group: 'Minggu ini',
    unread: false,
    to: '/settings/team',
  },
  {
    id: 'n7',
    kind: 'import',
    actor: 'Sistem',
    message: 'Import kontak selesai: 118 berhasil, 3 gagal',
    time: '15 Nov',
    group: 'Minggu ini',
    unread: false,
    to: '/crm/contacts',
  },
];

export type NotificationFilter = 'all' | 'unread' | 'mention';

/* ------------------------------------------------------------------ */
/* H2 · Command Palette                                                */
/* ------------------------------------------------------------------ */

export type PaletteGroup = 'Perusahaan' | 'Kontak' | 'Deal & Project' | 'Invoice' | 'Aksi cepat';

export type PaletteKind = 'company' | 'contact' | 'deal' | 'project' | 'invoice' | 'create' | 'settings';

export type PaletteItem = {
  id: string;
  group: PaletteGroup;
  kind: PaletteKind;
  title: string;
  /** Right-aligned context, e.g. "Deal · Negosiasi" or a shortcut hint. */
  meta: string;
  /** Extra searchable text that is not shown (e.g. the related company). */
  keywords?: string;
  to: string;
  /** Shown when the search field is empty. */
  recent?: boolean;
};

export const paletteGroups: PaletteGroup[] = ['Perusahaan', 'Kontak', 'Deal & Project', 'Invoice', 'Aksi cepat'];

/** Small mock search index. Quick actions are always listed. */
export const paletteIndex: PaletteItem[] = [
  { id: 'c-maju', group: 'Perusahaan', kind: 'company', title: 'PT Maju Bersama Digital', meta: 'Perusahaan · Jakarta', to: '/crm/companies/pt-maju-bersama-digital', recent: true },
  { id: 'c-karya', group: 'Perusahaan', kind: 'company', title: 'PT Karya Logistik Prima', meta: 'Perusahaan · Surabaya', to: '/crm/companies/pt-karya-logistik-prima' },
  { id: 'c-batik', group: 'Perusahaan', kind: 'company', title: 'Batik Lestari Studio', meta: 'Perusahaan · Yogyakarta', to: '/crm/companies/batik-lestari-studio' },
  { id: 'c-tokoku', group: 'Perusahaan', kind: 'company', title: 'Tokoku Indonesia', meta: 'Perusahaan · Bandung', to: '/crm/companies/tokoku-indonesia' },

  { id: 'p-rina', group: 'Kontak', kind: 'contact', title: 'Rina Wulandari', meta: 'PT Maju Bersama Digital', to: '/crm/contacts/rina-wulandari', recent: true },
  { id: 'p-budi', group: 'Kontak', kind: 'contact', title: 'Budi Santoso', meta: 'CV Kopi Senja', to: '/crm/contacts/budi-santoso' },
  { id: 'p-anindya', group: 'Kontak', kind: 'contact', title: 'Anindya Putri', meta: 'PT Sinar Pangan Sejahtera', to: '/crm/contacts/anindya-putri' },
  { id: 'p-yoga', group: 'Kontak', kind: 'contact', title: 'Yoga Pratama', meta: 'PT Karya Logistik Prima', to: '/crm/contacts/yoga-pratama' },

  {
    id: 'd-redesain',
    group: 'Deal & Project',
    kind: 'deal',
    title: 'Redesain Website Corporate',
    meta: 'Deal · Negosiasi',
    keywords: 'PT Maju Bersama Digital',
    to: '/crm/deals/redesain-website-corporate',
    recent: true,
  },
  {
    id: 'pr-website',
    group: 'Deal & Project',
    kind: 'project',
    title: 'Website Corporate v1',
    meta: 'Project · Berjalan',
    keywords: 'PT Maju Bersama Digital',
    to: '/projects/website-corporate-v1',
    recent: true,
  },
  {
    id: 'd-branding',
    group: 'Deal & Project',
    kind: 'deal',
    title: 'Branding & Kemasan',
    meta: 'Deal · Proposal Dikirim',
    keywords: 'PT Sinar Pangan Sejahtera',
    to: '/crm/deals/branding-kemasan',
  },
  {
    id: 'pr-loyalty',
    group: 'Deal & Project',
    kind: 'project',
    title: 'Aplikasi Mobile Loyalty',
    meta: 'Project · Berjalan',
    keywords: 'Tokoku Indonesia',
    to: '/projects/aplikasi-mobile-loyalty',
  },
  {
    id: 'pr-logistik',
    group: 'Deal & Project',
    kind: 'project',
    title: 'Dashboard Logistik',
    meta: 'Project · Berjalan',
    keywords: 'PT Karya Logistik Prima',
    to: '/projects/dashboard-logistik',
  },

  { id: 'i-0041', group: 'Invoice', kind: 'invoice', title: 'INV-2026-0041', meta: 'PT Maju Bersama Digital · Terkirim', to: '/finance/invoices/inv-2026-0041', recent: true },
  { id: 'i-0036', group: 'Invoice', kind: 'invoice', title: 'INV-2026-0036', meta: 'PT Karya Logistik Prima · Overdue', to: '/finance/invoices/inv-2026-0036' },
  { id: 'i-0038', group: 'Invoice', kind: 'invoice', title: 'INV-2026-0038', meta: 'Batik Lestari Studio · Overdue', to: '/finance/invoices/inv-2026-0038' },
  { id: 'i-0042', group: 'Invoice', kind: 'invoice', title: 'INV-2026-0042', meta: 'Tokoku Indonesia · Dibayar Sebagian', to: '/finance/invoices/inv-2026-0042' },

  { id: 'a-invoice', group: 'Aksi cepat', kind: 'create', title: 'Buat invoice', meta: 'Ctrl I', to: '/finance/invoices/new' },
  { id: 'a-settings', group: 'Aksi cepat', kind: 'settings', title: 'Buka Settings', meta: 'Ctrl ,', to: '/settings' },
];

/** Items to show for a query: recent items when empty, otherwise matches; quick actions always. */
export function searchPalette(query: string): PaletteItem[] {
  const q = query.trim().toLowerCase();
  return paletteIndex.filter((item) => {
    if (item.group === 'Aksi cepat') return true;
    if (!q) return item.recent;
    return [item.title, item.meta, item.keywords].some((text) => text?.toLowerCase().includes(q));
  });
}
