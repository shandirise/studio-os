import type { ContactStage, DealStage, InvoiceStatus, ProjectStatus, QuotationStatus } from '@/lib/status';
import { currentUser, team } from '@/data/workspace';

/* ------------------------------------------------------------------ */
/* Shared helpers                                                       */
/* ------------------------------------------------------------------ */

/** "Today" for the demo workspace (matches the dashboard: Kamis, 19 November 2026). */
export const TODAY = '2026-11-19';

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/** "2026-03-02" → "02 Mar 2026" */
export function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d} ${shortMonths[Number(m) - 1]} ${y}`;
}

/** Whole days between an ISO date and TODAY. */
export function daysAgo(iso: string): number {
  return Math.round((Date.parse(TODAY) - Date.parse(iso)) / 86_400_000);
}

/** "Rina Wulandari" → "rina-wulandari" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** The signed-in user's team-member id (used by the "Kontak saya" tab). */
export const currentMemberId = team.find((m) => m.name === currentUser.name)?.id ?? 'dp';

/* ------------------------------------------------------------------ */
/* Contacts                                                             */
/* ------------------------------------------------------------------ */

export const contactStages: ContactStage[] = ['Lead', 'Prospek', 'Klien', 'Tidak aktif'];

export const leadSources = ['Referral', 'Instagram', 'Website', 'LinkedIn', 'Event'] as const;
export type LeadSource = (typeof leadSources)[number];

export const contactTagOptions = ['VIP', 'Hot', 'Retainer', 'Marketing', 'F&B', 'Logistik', 'UMKM', 'Tech', 'Agro'];

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  /** Jabatan */
  title: string;
  email: string;
  phone: string;
  companyId: string;
  stage: ContactStage;
  /** Team member id of the PIC. */
  picId: string;
  source: LeadSource;
  tags: string[];
  /** Days since the last interaction; null = never contacted. */
  daysSinceContact: number | null;
  /** ISO date */
  createdAt: string;
  address?: string;
  social?: string;
};

export function contactName(contact: Pick<Contact, 'firstName' | 'lastName'>): string {
  return [contact.firstName, contact.lastName].filter(Boolean).join(' ');
}

/** 0 → "Hari ini", 1 → "Kemarin", null → "Belum pernah", n → "n hari lalu" */
export function lastContactedLabel(days: number | null): string {
  if (days === null) return 'Belum pernah';
  if (days === 0) return 'Hari ini';
  if (days === 1) return 'Kemarin';
  return `${days} hari lalu`;
}

export const contacts: Contact[] = [
  {
    id: 'rina-wulandari',
    firstName: 'Rina',
    lastName: 'Wulandari',
    title: 'Direktur Marketing',
    email: 'rina@majubersama.co.id',
    phone: '+62 812-3456-7788',
    companyId: 'pt-maju-bersama-digital',
    stage: 'Klien',
    picId: 'la',
    source: 'Referral',
    tags: ['VIP', 'Marketing', 'Retainer'],
    daysSinceContact: 2,
    createdAt: '2026-03-02',
    address: 'Jl. Jend. Sudirman Kav. 52, Jakarta',
    social: 'linkedin.com/in/rinaw',
  },
  {
    id: 'budi-santoso',
    firstName: 'Budi',
    lastName: 'Santoso',
    title: 'Owner',
    email: 'budi@kopisenja.id',
    phone: '+62 813-9988-1200',
    companyId: 'cv-kopi-senja-nusantara',
    stage: 'Prospek',
    picId: 'dp',
    source: 'Instagram',
    tags: ['F&B'],
    daysSinceContact: 5,
    createdAt: '2026-10-14',
    address: 'Jl. Braga No. 21, Bandung',
    social: 'instagram.com/kopisenja',
  },
  {
    id: 'anindya-putri',
    firstName: 'Anindya',
    lastName: 'Putri',
    title: 'Brand Manager',
    email: 'anindya@sinarpangan.co.id',
    phone: '+62 821-5544-3321',
    companyId: 'pt-sinar-pangan-sejahtera',
    stage: 'Lead',
    picId: 'la',
    source: 'Website',
    tags: ['Hot'],
    daysSinceContact: null,
    createdAt: '2026-11-16',
    address: 'Kawasan Industri MM2100 Blok C-5, Bekasi',
  },
  {
    id: 'hendra-gunawan',
    firstName: 'Hendra',
    lastName: 'Gunawan',
    title: 'CEO',
    email: 'hendra@karyalogistik.id',
    phone: '+62 811-2233-4455',
    companyId: 'pt-karya-logistik-prima',
    stage: 'Klien',
    picId: 'dp',
    source: 'LinkedIn',
    tags: ['VIP', 'Logistik'],
    daysSinceContact: 1,
    createdAt: '2026-01-21',
    address: 'Jl. Rungkut Industri III No. 8, Surabaya',
    social: 'linkedin.com/in/hendragunawan',
  },
  {
    id: 'siti-rahmawati',
    firstName: 'Siti',
    lastName: 'Rahmawati',
    title: 'Founder',
    email: 'siti@batiklestari.id',
    phone: '+62 878-1122-9090',
    companyId: 'batik-lestari-studio',
    stage: 'Prospek',
    picId: 'la',
    source: 'Referral',
    tags: ['UMKM'],
    daysSinceContact: 3,
    createdAt: '2026-09-30',
    address: 'Jl. Prawirotaman No. 14, Yogyakarta',
    social: 'instagram.com/batiklestari',
  },
  {
    id: 'yoga-pratama',
    firstName: 'Yoga',
    lastName: 'Pratama',
    title: 'Head of Product',
    email: 'yoga@tokoku.id',
    phone: '+62 856-7788-2211',
    companyId: 'tokoku-indonesia',
    stage: 'Lead',
    picId: 'dp',
    source: 'LinkedIn',
    tags: ['Tech'],
    daysSinceContact: 9,
    createdAt: '2026-11-08',
    address: 'Jl. MH Thamrin No. 9, Jakarta Pusat',
    social: 'linkedin.com/in/yogapratama',
  },
  {
    id: 'maya-kusuma',
    firstName: 'Maya',
    lastName: 'Kusuma',
    title: 'General Manager',
    email: 'maya@tamansari.id',
    phone: '+62 812-0099-7766',
    companyId: 'hotel-taman-sari-bandung',
    stage: 'Tidak aktif',
    picId: 'la',
    source: 'Website',
    tags: [],
    daysSinceContact: 112,
    createdAt: '2026-05-11',
    address: 'Jl. Dago No. 101, Bandung',
  },
  {
    id: 'fajar-nugroho',
    firstName: 'Fajar',
    lastName: 'Nugroho',
    title: 'Operations Lead',
    email: 'fajar@bumiagro.co.id',
    phone: '+62 819-3344-5566',
    companyId: 'pt-bumi-agro-mandiri',
    stage: 'Klien',
    picId: 'dp',
    source: 'Referral',
    tags: ['Agro'],
    daysSinceContact: 0,
    createdAt: '2026-02-19',
    address: 'Jl. Pemuda No. 150, Semarang',
  },
  {
    id: 'agus-setiawan',
    firstName: 'Agus',
    lastName: 'Setiawan',
    title: 'Finance Manager',
    email: 'agus@majubersama.co.id',
    phone: '+62 812-7711-3020',
    companyId: 'pt-maju-bersama-digital',
    stage: 'Klien',
    picId: 'la',
    source: 'Referral',
    tags: ['Retainer'],
    daysSinceContact: 12,
    createdAt: '2026-03-04',
    address: 'Jl. Jend. Sudirman Kav. 52, Jakarta',
  },
  {
    id: 'tiara-widya',
    firstName: 'Tiara',
    lastName: 'Widya',
    title: 'Brand Lead',
    email: 'tiara@majubersama.co.id',
    phone: '+62 813-4400-1288',
    companyId: 'pt-maju-bersama-digital',
    stage: 'Prospek',
    picId: 'la',
    source: 'Referral',
    tags: ['Marketing'],
    daysSinceContact: 6,
    createdAt: '2026-06-17',
    address: 'Jl. Jend. Sudirman Kav. 52, Jakarta',
    social: 'linkedin.com/in/tiarawidya',
  },
  {
    id: 'dewi-lestari',
    firstName: 'Dewi',
    lastName: 'Lestari',
    title: 'Procurement Manager',
    email: 'dewi@karyalogistik.id',
    phone: '+62 811-5566-7012',
    companyId: 'pt-karya-logistik-prima',
    stage: 'Klien',
    picId: 'dp',
    source: 'LinkedIn',
    tags: ['Logistik'],
    daysSinceContact: 21,
    createdAt: '2026-02-03',
  },
  {
    id: 'bayu-firmansyah',
    firstName: 'Bayu',
    lastName: 'Firmansyah',
    title: 'Marketing Manager',
    email: 'bayu@sinarpangan.co.id',
    phone: '+62 822-1144-9087',
    companyId: 'pt-sinar-pangan-sejahtera',
    stage: 'Prospek',
    picId: 'la',
    source: 'Event',
    tags: ['F&B'],
    daysSinceContact: 4,
    createdAt: '2026-08-22',
  },
  {
    id: 'citra-ayuningtyas',
    firstName: 'Citra',
    lastName: 'Ayuningtyas',
    title: 'Digital Lead',
    email: 'citra@sinarpangan.co.id',
    phone: '+62 821-9090-3344',
    companyId: 'pt-sinar-pangan-sejahtera',
    stage: 'Lead',
    picId: 'ra',
    source: 'Website',
    tags: ['Hot'],
    daysSinceContact: 2,
    createdAt: '2026-11-14',
  },
  {
    id: 'rudi-hartono',
    firstName: 'Rudi',
    lastName: 'Hartono',
    title: 'Direktur Utama',
    email: 'rudi@sinarpangan.co.id',
    phone: '+62 811-8800-1212',
    companyId: 'pt-sinar-pangan-sejahtera',
    stage: 'Klien',
    picId: 'dp',
    source: 'Referral',
    tags: ['VIP'],
    daysSinceContact: 30,
    createdAt: '2026-04-09',
  },
  {
    id: 'wulan-sari',
    firstName: 'Wulan',
    lastName: 'Sari',
    title: 'Supply Chain Lead',
    email: 'wulan@bumiagro.co.id',
    phone: '+62 819-2211-6655',
    companyId: 'pt-bumi-agro-mandiri',
    stage: 'Klien',
    picId: 'dp',
    source: 'Referral',
    tags: ['Agro'],
    daysSinceContact: 8,
    createdAt: '2026-02-25',
  },
  {
    id: 'nina-kartika',
    firstName: 'Nina',
    lastName: 'Kartika',
    title: 'Creative Director',
    email: 'nina@batiklestari.id',
    phone: '+62 878-6655-0101',
    companyId: 'batik-lestari-studio',
    stage: 'Prospek',
    picId: 'ra',
    source: 'Instagram',
    tags: ['UMKM'],
    daysSinceContact: 16,
    createdAt: '2026-10-02',
  },
  {
    id: 'andi-wijaya',
    firstName: 'Andi',
    lastName: 'Wijaya',
    title: 'CTO',
    email: 'andi@tokoku.id',
    phone: '+62 856-3030-4499',
    companyId: 'tokoku-indonesia',
    stage: 'Klien',
    picId: 'ns',
    source: 'LinkedIn',
    tags: ['Tech'],
    daysSinceContact: 5,
    createdAt: '2026-07-15',
  },
  {
    id: 'lina-marlina',
    firstName: 'Lina',
    lastName: 'Marlina',
    title: 'Growth Manager',
    email: 'lina@tokoku.id',
    phone: '+62 857-1212-8080',
    companyId: 'tokoku-indonesia',
    stage: 'Lead',
    picId: 'dp',
    source: 'Event',
    tags: [],
    daysSinceContact: null,
    createdAt: '2026-11-17',
  },
  {
    id: 'bambang-sutrisno',
    firstName: 'Bambang',
    lastName: 'Sutrisno',
    title: 'Direktur',
    email: 'bambang@sentosaproperti.co.id',
    phone: '+62 811-9191-2323',
    companyId: 'pt-sentosa-properti-indonesia',
    stage: 'Klien',
    picId: 'la',
    source: 'Referral',
    tags: ['VIP'],
    daysSinceContact: 18,
    createdAt: '2026-05-27',
  },
  {
    id: 'ratna-dewi',
    firstName: 'Ratna',
    lastName: 'Dewi',
    title: 'Marketing Executive',
    email: 'ratna@sentosaproperti.co.id',
    phone: '+62 813-2323-7676',
    companyId: 'pt-sentosa-properti-indonesia',
    stage: 'Prospek',
    picId: 'la',
    source: 'Website',
    tags: [],
    daysSinceContact: 7,
    createdAt: '2026-09-12',
  },
  {
    id: 'hana-pertiwi',
    firstName: 'Hana',
    lastName: 'Pertiwi',
    title: 'Pemilik Klinik',
    email: 'hana@kliniksehat.id',
    phone: '+62 812-4545-1919',
    companyId: 'klinik-sehat-bersama',
    stage: 'Lead',
    picId: 'dp',
    source: 'Instagram',
    tags: ['Hot'],
    daysSinceContact: 1,
    createdAt: '2026-11-13',
  },
  {
    id: 'eko-prasetyo',
    firstName: 'Eko',
    lastName: 'Prasetyo',
    title: 'Owner',
    email: 'eko@rumahrempah.id',
    phone: '+62 858-7070-3131',
    companyId: 'cv-rumah-rempah',
    stage: 'Klien',
    picId: 'la',
    source: 'Referral',
    tags: ['F&B', 'UMKM'],
    daysSinceContact: 25,
    createdAt: '2026-06-05',
  },
  {
    id: 'sri-handayani',
    firstName: 'Sri',
    lastName: 'Handayani',
    title: 'Kepala Akademik',
    email: 'sri@edukasicerdas.id',
    phone: '+62 812-6868-2424',
    companyId: 'pt-edukasi-cerdas-nusantara',
    stage: 'Prospek',
    picId: 'dp',
    source: 'Event',
    tags: [],
    daysSinceContact: 11,
    createdAt: '2026-10-21',
  },
  {
    id: 'galih-ramadhan',
    firstName: 'Galih',
    lastName: 'Ramadhan',
    title: 'Product Manager',
    email: 'galih@edukasicerdas.id',
    phone: '+62 815-3434-5858',
    companyId: 'pt-edukasi-cerdas-nusantara',
    stage: 'Lead',
    picId: 'ns',
    source: 'Website',
    tags: ['Tech'],
    daysSinceContact: null,
    createdAt: '2026-11-18',
  },
];

/** Looks up a contact by slug and falls back to the designed record (Rina Wulandari). */
export function findContact(id: string | undefined): Contact {
  return contacts.find((c) => c.id === id) ?? contacts[0]!;
}

/** Aggregates shown in the header and tabs (the mock list is one page of the full workspace). */
export const contactTotals = {
  all: 1248,
  mine: 214,
  newLeads: 18,
  stale: 63,
} as const;

export type ContactTab = 'all' | 'mine' | 'new' | 'stale';

export const contactTabs: Array<{ value: ContactTab; label: string; count: number }> = [
  { value: 'all', label: 'Semua kontak', count: contactTotals.all },
  { value: 'mine', label: 'Kontak saya', count: contactTotals.mine },
  { value: 'new', label: 'Lead baru minggu ini', count: contactTotals.newLeads },
  { value: 'stale', label: 'Belum dihubungi > 14 hari', count: contactTotals.stale },
];

export function matchesContactTab(contact: Contact, tab: ContactTab): boolean {
  switch (tab) {
    case 'mine':
      return contact.picId === currentMemberId;
    case 'new':
      return contact.stage === 'Lead' && daysAgo(contact.createdAt) <= 7;
    case 'stale':
      return contact.daysSinceContact === null || contact.daysSinceContact > 14;
    default:
      return true;
  }
}

export type CreatedRange = '7d' | '30d' | '90d' | 'year';

export const createdRangeOptions: Array<{ value: CreatedRange; label: string; days: number }> = [
  { value: '7d', label: '7 hari terakhir', days: 7 },
  { value: '30d', label: '30 hari terakhir', days: 30 },
  { value: '90d', label: '90 hari terakhir', days: 90 },
  { value: 'year', label: 'Tahun ini', days: daysAgo('2026-01-01') },
];

/* ------------------------------------------------------------------ */
/* Contact detail: activity, deals, documents, files                   */
/* ------------------------------------------------------------------ */

export type ActivityKind = 'call' | 'note' | 'meeting' | 'quotation' | 'deal' | 'invoice' | 'won' | 'system';

export type Activity = {
  id: string;
  kind: ActivityKind;
  actor: string;
  action: string;
  time: string;
  note?: string;
};

export const contactActivities: Activity[] = [
  {
    id: 'act-1',
    kind: 'call',
    actor: 'Laras Ayu',
    action: 'mencatat telepon',
    time: '2 hari lalu',
    note: 'Rina setuju scope fase 1. Minta revisi estimasi waktu jadi 8 minggu.',
  },
  { id: 'act-2', kind: 'quotation', actor: 'Laras Ayu', action: 'mengirim quotation QUO-2026-0012', time: '4 hari lalu' },
  { id: 'act-3', kind: 'deal', actor: 'Dimas Prakoso', action: 'memindahkan deal ke Negosiasi', time: '6 hari lalu' },
  {
    id: 'act-4',
    kind: 'meeting',
    actor: 'Laras Ayu',
    action: 'meeting discovery · 45 menit',
    time: '2 minggu lalu',
    note: 'Kebutuhan: website baru, integrasi CRM, target live Februari.',
  },
  { id: 'act-5', kind: 'system', actor: 'Sistem', action: 'kontak dibuat dari referral Hendra Gunawan', time: '02 Mar 2026' },
];

export type ComposerKind = 'note' | 'call' | 'meeting';

export const composerKinds: Array<{ value: ComposerKind; label: string; action: string; saved: string }> = [
  { value: 'note', label: 'Catatan', action: 'menambahkan catatan', saved: 'Catatan disimpan' },
  { value: 'call', label: 'Telepon', action: 'mencatat telepon', saved: 'Log telepon disimpan' },
  { value: 'meeting', label: 'Meeting', action: 'mencatat meeting', saved: 'Log meeting disimpan' },
];

export type RelatedDeal = {
  id: string;
  name: string;
  value: number;
  stage: DealStage;
  picId: string;
  closeDate: string;
};

export const relatedDeals: RelatedDeal[] = [
  { id: 'redesain-website-corporate', name: 'Redesain Website Corporate', value: 85_000_000, stage: 'Negosiasi', picId: 'la', closeDate: '2026-12-12' },
  { id: 'maintenance-tahunan', name: 'Maintenance Tahunan', value: 36_000_000, stage: 'Proposal Dikirim', picId: 'dp', closeDate: '2027-01-08' },
];

export type RelatedDocument =
  | { id: string; type: 'quotation'; label: string; status: QuotationStatus; to: string }
  | { id: string; type: 'project'; label: string; status: ProjectStatus; to: string }
  | { id: string; type: 'invoice'; label: string; status: InvoiceStatus; to: string };

export const relatedDocuments: RelatedDocument[] = [
  { id: 'quo-2026-0012', type: 'quotation', label: 'QUO-2026-0012', status: 'Terkirim', to: '/sales/quotations/quo-2026-0012' },
  { id: 'website-corporate-v1', type: 'project', label: 'Website Corporate v1', status: 'Berjalan', to: '/projects/website-corporate-v1' },
  { id: 'inv-2026-0041', type: 'invoice', label: 'INV-2026-0041', status: 'Terkirim', to: '/finance/invoices/inv-2026-0041' },
];

export const nextFollowUp: FollowUp = {
  title: 'Kirim revisi estimasi waktu',
  when: 'Jumat, 21 Nov · 10:00',
};

export type CrmFile = {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
};

export const contactFiles: CrmFile[] = [
  { id: 'f-1', name: 'Brief-Website-Corporate.pdf', size: '1,2 MB', uploadedBy: 'Laras Ayu', uploadedAt: '12 Nov 2026' },
  { id: 'f-2', name: 'Catatan-Discovery-Meeting.docx', size: '86 KB', uploadedBy: 'Laras Ayu', uploadedAt: '05 Nov 2026' },
  { id: 'f-3', name: 'Moodboard-Brand.png', size: '3,4 MB', uploadedBy: 'Rizky Aditya', uploadedAt: '03 Nov 2026' },
];

export type FollowUp = { title: string; when: string };

/** Activity, deals, documents and files for a contact. Only the designed record has the full set. */
export function contactRecords(contact: Contact) {
  const designed = contact.id === contacts[0]!.id;
  const created: Activity = {
    id: `${contact.id}-created`,
    kind: 'system',
    actor: 'Sistem',
    action: `kontak dibuat dari ${contact.source}`,
    time: formatShortDate(contact.createdAt),
  };
  return {
    activities: designed ? contactActivities : [created],
    deals: designed ? relatedDeals : [],
    documents: designed ? relatedDocuments : [],
    files: designed ? contactFiles : [],
    followUp: designed ? nextFollowUp : null,
  };
}

/* ------------------------------------------------------------------ */
/* Companies                                                            */
/* ------------------------------------------------------------------ */

export const companySizes = ['1–10', '10–50', '50–200', '200–500', '500+'] as const;
export type CompanySize = (typeof companySizes)[number];

export type Company = {
  id: string;
  name: string;
  industry: string;
  size: CompanySize;
  /** Area shown under the name, e.g. "Jakarta Selatan". */
  area: string;
  city: string;
  picId: string;
  dealsWon: number;
  /** Lifetime revenue in Rupiah. */
  revenue: number;
  website: string;
  address: string;
  npwp: string;
  /** ISO date */
  clientSince: string;
  paidInvoices: number;
  outstanding: number;
  activeProjects: number;
};

/** Drops legal prefixes so the avatar shows "MB" for "PT Maju Bersama Digital". */
export function companyMark(name: string): string {
  return name.replace(/^(PT|CV)\.?\s+/i, '');
}

export const companies: Company[] = [
  {
    id: 'pt-maju-bersama-digital',
    name: 'PT Maju Bersama Digital',
    industry: 'Marketing & Media',
    size: '50–200',
    area: 'Jakarta Selatan',
    city: 'Jakarta',
    picId: 'la',
    dealsWon: 2,
    revenue: 312_450_000,
    website: 'majubersama.co.id',
    address: 'Jl. Jend. Sudirman Kav. 52, Jakarta',
    npwp: '02.345.678.9-012.000',
    clientSince: '2026-03-02',
    paidInvoices: 5,
    outstanding: 47_175_000,
    activeProjects: 1,
  },
  {
    id: 'pt-karya-logistik-prima',
    name: 'PT Karya Logistik Prima',
    industry: 'Logistik',
    size: '200–500',
    area: 'Surabaya',
    city: 'Surabaya',
    picId: 'dp',
    dealsWon: 3,
    revenue: 524_800_000,
    website: 'karyalogistik.id',
    address: 'Jl. Rungkut Industri III No. 8, Surabaya',
    npwp: '01.882.415.2-609.000',
    clientSince: '2026-01-21',
    paidInvoices: 8,
    outstanding: 62_500_000,
    activeProjects: 2,
  },
  {
    id: 'pt-sinar-pangan-sejahtera',
    name: 'PT Sinar Pangan Sejahtera',
    industry: 'F&B Manufaktur',
    size: '200–500',
    area: 'Bekasi',
    city: 'Bekasi',
    picId: 'la',
    dealsWon: 1,
    revenue: 90_000_000,
    website: 'sinarpangan.co.id',
    address: 'Kawasan Industri MM2100 Blok C-5, Bekasi',
    npwp: '03.117.902.6-431.000',
    clientSince: '2026-04-09',
    paidInvoices: 2,
    outstanding: 15_000_000,
    activeProjects: 1,
  },
  {
    id: 'pt-bumi-agro-mandiri',
    name: 'PT Bumi Agro Mandiri',
    industry: 'Agribisnis',
    size: '50–200',
    area: 'Semarang',
    city: 'Semarang',
    picId: 'dp',
    dealsWon: 2,
    revenue: 147_000_000,
    website: 'bumiagro.co.id',
    address: 'Jl. Pemuda No. 150, Semarang',
    npwp: '02.764.330.1-503.000',
    clientSince: '2026-02-19',
    paidInvoices: 4,
    outstanding: 0,
    activeProjects: 1,
  },
  {
    id: 'cv-kopi-senja-nusantara',
    name: 'CV Kopi Senja Nusantara',
    industry: 'F&B Retail',
    size: '10–50',
    area: 'Bandung',
    city: 'Bandung',
    picId: 'dp',
    dealsWon: 0,
    revenue: 0,
    website: 'kopisenja.id',
    address: 'Jl. Braga No. 21, Bandung',
    npwp: '04.551.208.7-423.000',
    clientSince: '2026-10-14',
    paidInvoices: 0,
    outstanding: 0,
    activeProjects: 0,
  },
  {
    id: 'batik-lestari-studio',
    name: 'Batik Lestari Studio',
    industry: 'Fashion',
    size: '10–50',
    area: 'Yogyakarta',
    city: 'Yogyakarta',
    picId: 'la',
    dealsWon: 1,
    revenue: 28_000_000,
    website: 'batiklestari.id',
    address: 'Jl. Prawirotaman No. 14, Yogyakarta',
    npwp: '05.209.774.3-541.000',
    clientSince: '2026-09-30',
    paidInvoices: 1,
    outstanding: 7_000_000,
    activeProjects: 1,
  },
  {
    id: 'tokoku-indonesia',
    name: 'Tokoku Indonesia',
    industry: 'E-commerce',
    size: '50–200',
    area: 'Jakarta Pusat',
    city: 'Jakarta',
    picId: 'dp',
    dealsWon: 1,
    revenue: 24_000_000,
    website: 'tokoku.id',
    address: 'Jl. MH Thamrin No. 9, Jakarta Pusat',
    npwp: '02.903.611.8-071.000',
    clientSince: '2026-07-15',
    paidInvoices: 1,
    outstanding: 0,
    activeProjects: 0,
  },
  {
    id: 'hotel-taman-sari-bandung',
    name: 'Hotel Taman Sari Bandung',
    industry: 'Hospitality',
    size: '50–200',
    area: 'Bandung',
    city: 'Bandung',
    picId: 'la',
    dealsWon: 0,
    revenue: 0,
    website: 'tamansarihotel.id',
    address: 'Jl. Dago No. 101, Bandung',
    npwp: '04.338.120.5-423.000',
    clientSince: '2026-05-11',
    paidInvoices: 0,
    outstanding: 0,
    activeProjects: 0,
  },
  {
    id: 'pt-sentosa-properti-indonesia',
    name: 'PT Sentosa Properti Indonesia',
    industry: 'Properti',
    size: '200–500',
    area: 'Tangerang',
    city: 'Tangerang',
    picId: 'la',
    dealsWon: 1,
    revenue: 65_000_000,
    website: 'sentosaproperti.co.id',
    address: 'Jl. Boulevard Gading Serpong Blok M5, Tangerang',
    npwp: '02.611.459.0-451.000',
    clientSince: '2026-05-27',
    paidInvoices: 2,
    outstanding: 12_500_000,
    activeProjects: 1,
  },
  {
    id: 'klinik-sehat-bersama',
    name: 'Klinik Sehat Bersama',
    industry: 'Kesehatan',
    size: '10–50',
    area: 'Depok',
    city: 'Depok',
    picId: 'dp',
    dealsWon: 0,
    revenue: 0,
    website: 'kliniksehat.id',
    address: 'Jl. Margonda Raya No. 88, Depok',
    npwp: '06.120.874.2-412.000',
    clientSince: '2026-11-13',
    paidInvoices: 0,
    outstanding: 0,
    activeProjects: 0,
  },
  {
    id: 'cv-rumah-rempah',
    name: 'CV Rumah Rempah',
    industry: 'F&B Retail',
    size: '10–50',
    area: 'Malang',
    city: 'Malang',
    picId: 'la',
    dealsWon: 1,
    revenue: 18_500_000,
    website: 'rumahrempah.id',
    address: 'Jl. Ijen No. 32, Malang',
    npwp: '05.874.233.9-623.000',
    clientSince: '2026-06-05',
    paidInvoices: 2,
    outstanding: 0,
    activeProjects: 0,
  },
  {
    id: 'pt-edukasi-cerdas-nusantara',
    name: 'PT Edukasi Cerdas Nusantara',
    industry: 'Pendidikan',
    size: '50–200',
    area: 'Jakarta Barat',
    city: 'Jakarta',
    picId: 'dp',
    dealsWon: 0,
    revenue: 0,
    website: 'edukasicerdas.id',
    address: 'Jl. Panjang No. 5, Jakarta Barat',
    npwp: '03.556.102.4-086.000',
    clientSince: '2026-10-21',
    paidInvoices: 0,
    outstanding: 0,
    activeProjects: 0,
  },
];

/** Looks up a company by slug and falls back to the designed record (PT Maju Bersama Digital). */
export function findCompany(id: string | undefined): Company {
  return companies.find((c) => c.id === id) ?? companies[0]!;
}

export function companyById(id: string, list: Company[] = companies): Company | undefined {
  return list.find((c) => c.id === id);
}

/** Aggregates for the companies header (the mock list is one page of the full workspace). */
export const companyTotals = {
  count: 186,
  revenueLabel: 'Rp 1,13 M',
} as const;

export const industryOptions = [...new Set(companies.map((c) => c.industry))].sort();
export const cityOptions = [...new Set(companies.map((c) => c.city))].sort();

export const companyActivities: Activity[] = [
  { id: 'cact-1', kind: 'invoice', actor: 'Sistem', action: 'INV-2026-0041 dikirim', time: '12 hari lalu' },
  { id: 'cact-2', kind: 'won', actor: 'Dimas Prakoso', action: 'menandai deal Won: Redesain Website', time: '3 jam lalu' },
];

/** Full company timeline shown on the "Timeline" tab. */
export const companyTimeline: Activity[] = [
  { id: 'ctl-1', kind: 'won', actor: 'Dimas Prakoso', action: 'menandai deal Won: Redesain Website', time: '3 jam lalu' },
  {
    id: 'ctl-2',
    kind: 'call',
    actor: 'Laras Ayu',
    action: 'mencatat telepon dengan Rina Wulandari',
    time: '2 hari lalu',
    note: 'Rina setuju scope fase 1. Minta revisi estimasi waktu jadi 8 minggu.',
  },
  { id: 'ctl-3', kind: 'quotation', actor: 'Laras Ayu', action: 'mengirim quotation QUO-2026-0012', time: '4 hari lalu' },
  { id: 'ctl-4', kind: 'invoice', actor: 'Sistem', action: 'INV-2026-0041 dikirim', time: '12 hari lalu' },
  {
    id: 'ctl-5',
    kind: 'meeting',
    actor: 'Laras Ayu',
    action: 'meeting discovery · 45 menit',
    time: '2 minggu lalu',
    note: 'Kebutuhan: website baru, integrasi CRM, target live Februari.',
  },
  { id: 'ctl-6', kind: 'system', actor: 'Sistem', action: 'perusahaan dibuat dari referral Hendra Gunawan', time: '02 Mar 2026' },
];

export const companyFiles: CrmFile[] = [
  { id: 'cf-1', name: 'Kontrak-Retainer-2026.pdf', size: '540 KB', uploadedBy: 'Dimas Prakoso', uploadedAt: '18 Nov 2026' },
  { id: 'cf-2', name: 'QUO-2026-0012.pdf', size: '212 KB', uploadedBy: 'Laras Ayu', uploadedAt: '15 Nov 2026' },
  { id: 'cf-3', name: 'Brief-Website-Corporate.pdf', size: '1,2 MB', uploadedBy: 'Laras Ayu', uploadedAt: '12 Nov 2026' },
  { id: 'cf-4', name: 'Logo-Maju-Bersama.zip', size: '8,6 MB', uploadedBy: 'Rizky Aditya', uploadedAt: '04 Nov 2026' },
  { id: 'cf-5', name: 'NPWP-Perusahaan.pdf', size: '320 KB', uploadedBy: 'Dimas Prakoso', uploadedAt: '02 Mar 2026' },
];

/** Contacts per company, derived from the contacts list. */
export function contactCountByCompany(): Record<string, number> {
  return contacts.reduce<Record<string, number>>((acc, c) => {
    acc[c.companyId] = (acc[c.companyId] ?? 0) + 1;
    return acc;
  }, {});
}

/** Timeline, deals and files for a company. Only the designed record has the full set. */
export function companyRecords(company: Company) {
  const designed = company.id === companies[0]!.id;
  const created: Activity = {
    id: `${company.id}-created`,
    kind: 'system',
    actor: 'Sistem',
    action: 'perusahaan ditambahkan ke CRM',
    time: formatShortDate(company.clientSince),
  };
  return {
    recent: designed ? companyActivities : [created],
    timeline: designed ? companyTimeline : [created],
    deals: designed ? relatedDeals : [],
    files: designed ? companyFiles : [],
  };
}
