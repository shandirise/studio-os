import { currentUser } from '@/data/workspace';
import type { QuotationStatus } from '@/lib/status';
import type { LineItem, TimelineEvent } from './components/document';

/* ------------------------------------------------------------------ */
/* Clients & deals                                                     */
/* ------------------------------------------------------------------ */

export type Client = {
  /** Company slug, used by /crm/companies/:id. */
  id: string;
  company: string;
  contactName: string;
  /** Contact slug, used by /crm/contacts/:id. */
  contactId: string;
  email: string;
  address: string;
};

export const clients: Client[] = [
  {
    id: 'pt-maju-bersama-digital',
    company: 'PT Maju Bersama Digital',
    contactName: 'Rina Wulandari',
    contactId: 'rina-wulandari',
    email: 'rina@majubersama.co.id',
    address: 'Jl. Jend. Sudirman Kav. 52, Jakarta 12190',
  },
  {
    id: 'pt-sinar-pangan-sejahtera',
    company: 'PT Sinar Pangan Sejahtera',
    contactName: 'Hendra Gunawan',
    contactId: 'hendra-gunawan',
    email: 'hendra@sinarpangan.co.id',
    address: 'Jl. Raya Darmo No. 88, Surabaya 60265',
  },
  {
    id: 'cv-kopi-senja-nusantara',
    company: 'CV Kopi Senja Nusantara',
    contactName: 'Anindya Putri',
    contactId: 'anindya-putri',
    email: 'anindya@kopisenja.id',
    address: 'Jl. Braga No. 21, Bandung 40111',
  },
  {
    id: 'pt-karya-logistik-prima',
    company: 'PT Karya Logistik Prima',
    contactName: 'Bayu Santoso',
    contactId: 'bayu-santoso',
    email: 'bayu@karyalogistik.co.id',
    address: 'Kawasan Industri Pulogadung Blok C/7, Jakarta 13920',
  },
  {
    id: 'batik-lestari-studio',
    company: 'Batik Lestari Studio',
    contactName: 'Sekar Ayuningtyas',
    contactId: 'sekar-ayuningtyas',
    email: 'sekar@batiklestari.id',
    address: 'Jl. Prawirotaman No. 12, Yogyakarta 55153',
  },
  {
    id: 'tokoku-indonesia',
    company: 'Tokoku Indonesia',
    contactName: 'Fajar Ramadhan',
    contactId: 'fajar-ramadhan',
    email: 'fajar@tokoku.id',
    address: 'Jl. Kemang Raya No. 5, Jakarta 12730',
  },
  {
    id: 'pt-bumi-agro-mandiri',
    company: 'PT Bumi Agro Mandiri',
    contactName: 'Wahyu Hidayat',
    contactId: 'wahyu-hidayat',
    email: 'wahyu@bumiagro.co.id',
    address: 'Jl. Ahmad Yani No. 140, Malang 65126',
  },
];

export function clientById(id: string): Client {
  return clients.find((c) => c.id === id) ?? clients[0]!;
}

export type Deal = {
  /** Deal slug, used by /crm/deals/:id. */
  id: string;
  name: string;
  clientId: string;
  /** Short reference printed on documents, e.g. "D-0218". */
  ref: string;
};

export const deals: Deal[] = [
  { id: 'redesain-website-corporate', name: 'Redesain Website Corporate', clientId: 'pt-maju-bersama-digital', ref: 'D-0218' },
  { id: 'aplikasi-mobile-loyalty', name: 'Aplikasi Mobile Loyalty', clientId: 'pt-sinar-pangan-sejahtera', ref: 'D-0224' },
  { id: 'branding-kemasan', name: 'Branding & Kemasan', clientId: 'cv-kopi-senja-nusantara', ref: 'D-0226' },
  { id: 'sistem-dashboard-logistik', name: 'Sistem Dashboard Logistik', clientId: 'pt-karya-logistik-prima', ref: 'D-0209' },
  { id: 'katalog-digital-batik', name: 'Katalog Digital Batik', clientId: 'batik-lestari-studio', ref: 'D-0205' },
  { id: 'landing-page-promo', name: 'Landing Page Promo', clientId: 'tokoku-indonesia', ref: 'D-0201' },
  { id: 'portal-petani-mitra', name: 'Portal Petani Mitra', clientId: 'pt-bumi-agro-mandiri', ref: 'D-0197' },
];

export function dealById(id: string | null): Deal | undefined {
  return deals.find((d) => d.id === id);
}

/* ------------------------------------------------------------------ */
/* Quotations                                                          */
/* ------------------------------------------------------------------ */

export type QuotationComment = { id: string; author: string; time: string; text: string };

export type Quotation = {
  /** Lower-case number, e.g. "quo-2026-0012". */
  id: string;
  number: string;
  clientId: string;
  dealId: string | null;
  /** ISO dates. */
  issueDate: string;
  validUntil: string;
  subject: string;
  items: LineItem[];
  /** Overall discount in Rupiah. */
  discount: number;
  taxRate: number;
  /** "Termin & syarat" note. */
  notes: string;
  status: QuotationStatus;
  /** Team member id (see data/workspace). */
  createdBy: string;
  publicLink: string;
  timeline: TimelineEvent[];
  comments: QuotationComment[];
};

/** The record shown in the design (D2/D3); detail pages fall back to it. */
export const DESIGNED_QUOTATION_ID = 'quo-2026-0012';

const defaultTerms =
  'Termin: DP 50% saat persetujuan, pelunasan 50% saat serah terima. Revisi maksimal 2 putaran. Harga belum termasuk domain dan hosting.';

function item(id: string, name: string, description: string, qty: number, unit: string, price: number): LineItem {
  return { id, name, description, qty, unit, price, discount: 0 };
}

const websiteItems = (prefix: string): LineItem[] => [
  item(`${prefix}-1`, 'Desain UI/UX Website', 'Riset, wireframe, 12 halaman hi-fi', 1, 'paket', 28_000_000),
  item(`${prefix}-2`, 'Pengembangan Frontend', 'Next.js, responsif, animasi dasar', 1, 'paket', 42_000_000),
  item(`${prefix}-3`, 'Integrasi CMS & SEO dasar', 'Headless CMS, meta, sitemap', 1, 'paket', 15_000_000),
];

function sentTimeline(contact: string, sender: string, opened: string | null, sent: string, created: string): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  if (opened) events.push({ id: 'opened', icon: 'eye', actor: contact, action: 'membuka dokumen', time: opened });
  events.push({ id: 'sent', icon: 'send', actor: sender, action: 'mengirim ke klien', time: sent });
  events.push({ id: 'created', icon: 'file', actor: sender, action: 'membuat draft', time: created });
  return events;
}

const initialQuotations: Quotation[] = [
  {
    id: 'quo-2026-0014',
    number: 'QUO-2026-0014',
    clientId: 'pt-sinar-pangan-sejahtera',
    dealId: 'aplikasi-mobile-loyalty',
    issueDate: '2026-11-15',
    validUntil: '2026-11-30',
    subject: 'Pengembangan aplikasi mobile loyalty PT Sinar Pangan Sejahtera',
    items: [
      item('q14-1', 'Desain UI/UX Aplikasi', 'Riset pengguna, 28 layar hi-fi', 1, 'paket', 48_000_000),
      item('q14-2', 'Aplikasi Mobile', 'iOS & Android, React Native', 2, 'platform', 60_000_000),
      item('q14-3', 'Pengembangan Backend & API', 'Poin, voucher, panel admin', 1, 'paket', 72_000_000),
    ],
    discount: 0,
    taxRate: 0.11,
    notes: defaultTerms,
    status: 'Terkirim',
    createdBy: 'la',
    publicLink: 'studio.os/q/3Fa9…k2',
    timeline: sentTimeline('Hendra Gunawan', 'Laras Ayu', null, '12 mnt lalu', '1 hari lalu'),
    comments: [],
  },
  {
    id: 'quo-2026-0013',
    number: 'QUO-2026-0013',
    clientId: 'cv-kopi-senja-nusantara',
    dealId: 'branding-kemasan',
    issueDate: '2026-11-14',
    validUntil: '2026-11-28',
    subject: 'Branding dan desain kemasan CV Kopi Senja Nusantara',
    items: [
      item('q13-1', 'Identitas Brand', 'Logo, palet warna, panduan brand', 1, 'paket', 18_000_000),
      item('q13-2', 'Desain Kemasan', 'Kemasan kopi 250 g & 1 kg', 6, 'varian', 3_500_000),
      item('q13-3', 'Foto Produk', '20 foto produk & lifestyle', 1, 'paket', 6_000_000),
    ],
    discount: 0,
    taxRate: 0.11,
    notes: defaultTerms,
    status: 'Draft',
    createdBy: 'dp',
    publicLink: 'studio.os/q/7Tq1…m4',
    timeline: [{ id: 'created', icon: 'file', actor: 'Dimas Prakoso', action: 'membuat draft', time: '5 hari lalu' }],
    comments: [],
  },
  {
    id: 'quo-2026-0012',
    number: 'QUO-2026-0012',
    clientId: 'pt-maju-bersama-digital',
    dealId: 'redesain-website-corporate',
    issueDate: '2026-11-12',
    validUntil: '2026-11-26',
    subject: 'Redesain dan pengembangan website corporate PT Maju Bersama Digital',
    items: websiteItems('q12'),
    discount: 0,
    taxRate: 0.11,
    notes: defaultTerms,
    status: 'Dilihat',
    createdBy: 'la',
    publicLink: 'studio.os/q/8Hk2…x9',
    timeline: sentTimeline('Rina Wulandari', 'Laras Ayu', '2 jam lalu', '4 hari lalu', '5 hari lalu'),
    comments: [
      {
        id: 'c1',
        author: 'Rina Wulandari',
        time: '2 jam lalu',
        text: 'Apakah item CMS bisa ditambah modul blog? Mohon revisi estimasi.',
      },
    ],
  },
  {
    id: 'quo-2026-0011',
    number: 'QUO-2026-0011',
    clientId: 'pt-karya-logistik-prima',
    dealId: 'sistem-dashboard-logistik',
    issueDate: '2026-10-28',
    validUntil: '2026-11-11',
    subject: 'Sistem dashboard monitoring armada PT Karya Logistik Prima',
    items: [
      item('q11-1', 'Desain UI/UX Dashboard', 'Riset, wireframe, 16 layar hi-fi', 1, 'paket', 36_000_000),
      item('q11-2', 'Pengembangan Dashboard Web', 'React, peta armada real-time', 1, 'paket', 96_000_000),
      item('q11-3', 'Integrasi API Armada', 'GPS tracker & sistem gudang', 1, 'paket', 48_000_000),
    ],
    discount: 0,
    taxRate: 0.11,
    notes: defaultTerms,
    status: 'Disetujui',
    createdBy: 'dp',
    publicLink: 'studio.os/q/2Lm8…p5',
    timeline: [
      { id: 'approved', icon: 'check', actor: 'Bayu Santoso', action: 'menyetujui quotation', time: '18 hari lalu' },
      ...sentTimeline('Bayu Santoso', 'Dimas Prakoso', '20 hari lalu', '21 hari lalu', '22 hari lalu'),
    ],
    comments: [],
  },
  {
    id: 'quo-2026-0010',
    number: 'QUO-2026-0010',
    clientId: 'batik-lestari-studio',
    dealId: 'katalog-digital-batik',
    issueDate: '2026-10-20',
    validUntil: '2026-11-03',
    subject: 'Katalog digital koleksi Batik Lestari Studio',
    items: [
      item('q10-1', 'Desain Katalog Digital', 'Art direction & 40 halaman produk', 1, 'paket', 14_000_000),
      item('q10-2', 'Pengembangan Website Katalog', 'Filter koleksi, tautan WhatsApp', 1, 'paket', 18_000_000),
    ],
    discount: 0,
    taxRate: 0.11,
    notes: defaultTerms,
    status: 'Ditolak',
    createdBy: 'la',
    publicLink: 'studio.os/q/9Wc4…r7',
    timeline: [
      { id: 'rejected', icon: 'x', actor: 'Sekar Ayuningtyas', action: 'menolak quotation', time: '25 hari lalu' },
      ...sentTimeline('Sekar Ayuningtyas', 'Laras Ayu', '27 hari lalu', '29 hari lalu', '30 hari lalu'),
    ],
    comments: [],
  },
  {
    id: 'quo-2026-0009',
    number: 'QUO-2026-0009',
    clientId: 'tokoku-indonesia',
    dealId: 'landing-page-promo',
    issueDate: '2026-10-15',
    validUntil: '2026-11-05',
    subject: 'Landing page promo akhir tahun Tokoku Indonesia',
    items: [
      item('q09-1', 'Desain Landing Page', '1 halaman, 3 variasi hero', 1, 'paket', 8_000_000),
      item('q09-2', 'Pengembangan Landing Page', 'Responsif, form leads, analytics', 1, 'paket', 10_000_000),
    ],
    discount: 0,
    taxRate: 0.11,
    notes: defaultTerms,
    status: 'Kadaluarsa',
    createdBy: 'la',
    publicLink: 'studio.os/q/5Nd7…t1',
    timeline: sentTimeline('Fajar Ramadhan', 'Laras Ayu', '30 hari lalu', '35 hari lalu', '35 hari lalu'),
    comments: [],
  },
  {
    id: 'quo-2026-0008',
    number: 'QUO-2026-0008',
    clientId: 'pt-bumi-agro-mandiri',
    dealId: 'portal-petani-mitra',
    issueDate: '2026-10-02',
    validUntil: '2026-10-16',
    subject: 'Portal kemitraan petani PT Bumi Agro Mandiri',
    items: [
      item('q08-1', 'Desain UI/UX Portal', 'Riset lapangan, 20 layar hi-fi', 1, 'paket', 32_000_000),
      item('q08-2', 'Pengembangan Portal Web', 'Pendaftaran mitra, laporan panen', 1, 'paket', 64_000_000),
      item('q08-3', 'Integrasi Pembayaran', 'Virtual account & payout mitra', 1, 'paket', 20_000_000),
    ],
    discount: 0,
    taxRate: 0.11,
    notes: defaultTerms,
    status: 'Disetujui',
    createdBy: 'dp',
    publicLink: 'studio.os/q/4Gh3…w8',
    timeline: [
      { id: 'approved', icon: 'check', actor: 'Wahyu Hidayat', action: 'menyetujui quotation', time: '1 bulan lalu' },
      ...sentTimeline('Wahyu Hidayat', 'Dimas Prakoso', '1 bulan lalu', '1 bulan lalu', '1 bulan lalu'),
    ],
    comments: [],
  },
];

/** Design counts per tab (the list only holds the first page of 42 documents). */
export const quotationTabCounts: Record<QuotationStatus | 'all', number> = {
  all: 42,
  Draft: 6,
  Terkirim: 14,
  Dilihat: 5,
  Disetujui: 12,
  Ditolak: 3,
  Kadaluarsa: 2,
};

export const QUOTATION_TOTAL_COUNT = 42;

/* ------------------------------------------------------------------ */
/* In-memory store: edits survive navigation until the page reloads.   */
/* ------------------------------------------------------------------ */

const store = new Map(initialQuotations.map((q) => [q.id, q]));

export function listQuotations(): Quotation[] {
  return [...store.values()];
}

/** Looks a quotation up by id and falls back to the designed record. */
export function findQuotation(id: string | undefined): Quotation {
  return (id && store.get(id)) || store.get(DESIGNED_QUOTATION_ID)!;
}

export function saveQuotation(quotation: Quotation): void {
  store.set(quotation.id, quotation);
}

function nextQuotationNumber(): string {
  const last = Math.max(...listQuotations().map((q) => Number(q.number.slice(-4))));
  return `QUO-2026-${String(last + 1).padStart(4, '0')}`;
}

/** A new draft, prefilled like the design (website deal for PT Maju Bersama Digital). */
export function createQuotationDraft(): Quotation {
  const number = nextQuotationNumber();
  return {
    ...findQuotation(DESIGNED_QUOTATION_ID),
    id: number.toLowerCase(),
    number,
    items: websiteItems(number.toLowerCase()),
    status: 'Draft',
    createdBy: 'dp',
    publicLink: 'studio.os/q/6Rb5…n3',
    timeline: [{ id: 'created', icon: 'file', actor: currentUser.name, action: 'membuat draft', time: 'baru saja' }],
    comments: [],
  };
}
