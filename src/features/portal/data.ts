import { memberById, workspace } from '@/data/workspace';
import type { ProjectStatus, Tone } from '@/lib/status';

/* ------------------------------------------------------------------ */
/* Client portal: signed-in client and the agency they work with.      */
/* ------------------------------------------------------------------ */

/** Demo "today" (matches the rest of the app: Kamis, 19 November 2026). */
export const portalToday = '19 Nov 2026';
export const portalTodayShort = '19 Nov';

export const portalClient = {
  name: 'Rina Wulandari',
  firstName: 'Rina',
  email: 'rina@majubersama.co.id',
  company: 'PT Maju Bersama Digital',
  address: 'Jl. Jend. Sudirman Kav. 52, Jakarta 12190',
} as const;

/** Agency details printed on quotation and invoice documents. */
export const issuer = {
  name: workspace.name,
  address: 'Jl. Dago Asri No. 18, Bandung 40135',
  email: 'halo@kreasinusantara.id',
  npwp: '01.234.567.8-421.000',
} as const;

export const bankAccount = {
  bank: 'BCA',
  holder: workspace.name,
  number: '123 456 7890',
} as const;

/** The client's PIC at the agency. */
export const projectManager = {
  ...memberById('la'),
  whatsapp: '6281221340218',
};

export type PortalNavItem = { label: string; to: string; end?: boolean };

export const portalNav: PortalNavItem[] = [
  { label: 'Beranda', to: '/portal', end: true },
  { label: 'Project', to: '/portal/projects' },
  { label: 'Quotation', to: '/portal/quotations' },
  { label: 'Invoice', to: '/portal/invoices' },
  { label: 'File', to: '/portal/files' },
];

export type PortalNotification = { id: string; label: string; to: string };

export const portalNotifications: PortalNotification[] = [
  { id: 'n1', label: 'QUO-2026-0012 menunggu persetujuan Anda', to: '/portal/quotations/quo-2026-0012' },
  { id: 'n2', label: 'INV-2026-0041 jatuh tempo 21 Nov 2026', to: '/portal/invoices' },
  { id: 'n3', label: 'Laras Ayu mengunggah Moodboard-v2.pdf', to: '/portal/files' },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type PortalProject = {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  /** Second line under the progress bar on the home screen. */
  summary: string;
  deadline: string;
  /** Hidden on the mobile home screen, which only lists the main project. */
  desktopOnly?: boolean;
};

export const portalProjects: PortalProject[] = [
  {
    id: 'website-corporate-v1',
    name: 'Website Corporate v1',
    status: 'Berjalan',
    progress: 64,
    summary: 'Fase desain · deadline 28 Feb 2027',
    deadline: '28 Feb 2027',
  },
  {
    id: 'maintenance-tahunan',
    name: 'Maintenance Tahunan',
    status: 'Belum Mulai',
    progress: 20,
    summary: 'Mulai Januari 2027',
    deadline: '31 Des 2027',
    desktopOnly: true,
  },
];

export const mainProject = portalProjects[0]!;

export type MilestoneStatus = 'Selesai' | 'Berjalan' | 'Belum mulai';

export const milestoneTone: Record<MilestoneStatus, Tone> = {
  Selesai: 'green',
  Berjalan: 'blue',
  'Belum mulai': 'gray',
};

export type Milestone = {
  id: string;
  title: string;
  /** Shorter title used on mobile. */
  shortTitle?: string;
  date: string;
  status: MilestoneStatus;
};

export const milestones: Milestone[] = [
  { id: 'm1', title: 'Kickoff & riset', date: '10 Nov 2026', status: 'Selesai' },
  { id: 'm2', title: 'Desain UI/UX', date: '12 Des 2026', status: 'Berjalan' },
  { id: 'm3', title: 'Pengembangan frontend', shortTitle: 'Pengembangan', date: '30 Jan 2027', status: 'Belum mulai' },
  { id: 'm4', title: 'QA & peluncuran', date: '28 Feb 2027', status: 'Belum mulai' },
];

export type SharedTaskStatus = 'Done' | 'In Progress' | 'To Do';

export const sharedTaskTone: Record<SharedTaskStatus, Tone> = {
  Done: 'green',
  'In Progress': 'blue',
  'To Do': 'gray',
};

export type SharedTask = {
  id: string;
  title: string;
  status: SharedTaskStatus;
  /** Not listed on the mobile project screen. */
  desktopOnly?: boolean;
};

export const sharedTasks: SharedTask[] = [
  { id: 't1', title: 'Riset kompetitor', status: 'Done' },
  { id: 't2', title: 'Wireframe halaman utama', status: 'Done', desktopOnly: true },
  { id: 't3', title: 'Desain Home hi-fi', status: 'In Progress' },
  { id: 't4', title: 'Desain halaman Layanan', status: 'To Do' },
];

export type TeamMessage = { id: string; author: string; time: string; body: string };

export const teamMessages: TeamMessage[] = [
  { id: 'msg1', author: 'Laras Ayu', time: '2 hari lalu', body: 'Moodboard v2 sudah diunggah. Mohon masukan sebelum Jumat.' },
];

/* ------------------------------------------------------------------ */
/* Files                                                               */
/* ------------------------------------------------------------------ */

export type FileSource = 'team' | 'client';

export const fileSourceLabel: Record<FileSource, string> = {
  team: 'Dari tim',
  client: 'Dari Anda',
};

export type PortalFile = {
  id: string;
  name: string;
  size: string;
  date: string;
  source: FileSource;
};

export const portalFiles: PortalFile[] = [
  { id: 'f1', name: 'Moodboard-v2.pdf', size: '2,4 MB', date: '19 Nov', source: 'team' },
  { id: 'f2', name: 'Sitemap-Website.pdf', size: '640 KB', date: '14 Nov', source: 'team' },
  { id: 'f3', name: 'Logo-PT-Maju-vector.zip', size: '8,1 MB', date: '10 Nov', source: 'client' },
  { id: 'f4', name: 'Brief-final.docx', size: '120 KB', date: '05 Nov', source: 'client' },
];

/** Shown in the "File terbaru" card on the home screen. */
export const recentFiles = portalFiles.filter((f) => f.source === 'team');

/** Shown in the "File" card on the project screen. */
export const projectFiles = [portalFiles[0]!, portalFiles[1]!, portalFiles[3]!];

/* ------------------------------------------------------------------ */
/* Documents: quotation and invoice                                    */
/* ------------------------------------------------------------------ */

export type LineItem = { id: string; name: string; description: string; qty: number; price: number };

const lineItems: LineItem[] = [
  { id: 'li1', name: 'Desain UI/UX Website', description: 'Riset, wireframe, 12 halaman hi-fi', qty: 1, price: 28_000_000 },
  { id: 'li2', name: 'Pengembangan Frontend', description: 'Next.js, responsif, animasi dasar', qty: 1, price: 42_000_000 },
  { id: 'li3', name: 'Integrasi CMS & SEO dasar', description: 'Headless CMS, meta, sitemap', qty: 1, price: 15_000_000 },
];

export type DocumentMetaRow = { label: string; value: string; desktopOnly?: boolean };

/** Everything printed on a quotation / invoice sheet. */
export type PortalDocumentData = {
  title: string;
  number: string;
  meta: DocumentMetaRow[];
  subject: string;
  items: LineItem[];
  subtotal: number;
  tax: number;
  /** Dark highlighted row at the bottom of the totals, e.g. "TOTAL" or "DP 50%". */
  due: { label: string; amount: number };
  notes: { title: string; mobileTitle?: string; body: string };
};

export type PortalQuotationStatus = 'Menunggu' | 'Disetujui' | 'Ditolak';

export const portalQuotationTone: Record<PortalQuotationStatus, Tone> = {
  Menunggu: 'purple',
  Disetujui: 'green',
  Ditolak: 'red',
};

export type PortalQuotation = {
  id: string;
  number: string;
  projectName: string;
  validUntil: string;
  validUntilShort: string;
  total: number;
  status: PortalQuotationStatus;
  document: PortalDocumentData;
};

export const portalQuotations: PortalQuotation[] = [
  {
    id: 'quo-2026-0012',
    number: 'QUO-2026-0012',
    projectName: 'Redesain Website Corporate',
    validUntil: '26 Nov 2026',
    validUntilShort: '26 Nov',
    total: 94_350_000,
    status: 'Menunggu',
    document: {
      title: 'PENAWARAN',
      number: 'QUO-2026-0012',
      meta: [
        { label: 'Tanggal', value: '12 Nov 2026' },
        { label: 'Berlaku sampai', value: '26 Nov 2026' },
        { label: 'Referensi', value: 'Deal #D-0218' },
      ],
      subject: 'Redesain dan pengembangan website corporate',
      items: lineItems,
      subtotal: 85_000_000,
      tax: 9_350_000,
      due: { label: 'TOTAL', amount: 94_350_000 },
      notes: {
        title: 'TERMIN PEMBAYARAN',
        body: 'DP 50% (Rp 47.175.000) saat persetujuan, pelunasan 50% saat serah terima. Transfer ke BCA 123 456 7890 a.n. Kreasi Nusantara.',
      },
    },
  },
];

/** Looks up a quotation by route id, falling back to the one in the design. */
export function quotationById(id: string | undefined): PortalQuotation {
  return portalQuotations.find((q) => q.id === id) ?? portalQuotations[0]!;
}

export type PortalInvoice = {
  id: string;
  number: string;
  statusLabel: string;
  dueDate: string;
  dueDateShort: string;
  daysLeft: number;
  amountDue: number;
  document: PortalDocumentData;
};

export const portalInvoice: PortalInvoice = {
  id: 'inv-2026-0041',
  number: 'INV-2026-0041',
  statusLabel: 'Belum dibayar',
  dueDate: '21 Nov 2026',
  dueDateShort: '21 Nov',
  daysLeft: 2,
  amountDue: 47_175_000,
  document: {
    title: 'INVOICE',
    number: 'INV-2026-0041',
    meta: [
      { label: 'Tanggal terbit', value: '07 Nov 2026' },
      { label: 'Jatuh tempo', value: '21 Nov 2026' },
      { label: 'Referensi', value: 'QUO-2026-0012', desktopOnly: true },
    ],
    subject: 'Redesain dan pengembangan website corporate PT Maju Bersama Digital',
    items: lineItems,
    subtotal: 85_000_000,
    tax: 9_350_000,
    due: { label: 'DP 50%', amount: 47_175_000 },
    notes: {
      title: 'INSTRUKSI PEMBAYARAN',
      mobileTitle: 'INSTRUKSI',
      body: 'Transfer ke BCA 123 456 7890 a.n. Kreasi Nusantara.',
    },
  },
};

export type PaymentRecord = { id: string; label: string; date: string };
