import type { DealStage, QuotationStatus, Tone } from '@/lib/status';

/* ------------------------------------------------------------------ */
/* Shared helpers                                                       */
/* ------------------------------------------------------------------ */

/** "Today" for the demo workspace (matches the dashboard: Kamis, 19 November 2026). */
export const TODAY = '2026-11-19';

export const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/** "2026-12-05" → "05 Des" */
export function formatDayMonth(iso: string): string {
  const [, m, d] = iso.split('-');
  return `${d} ${shortMonths[Number(m) - 1]}`;
}

/** "2026-11-30" → "30 Nov 2026" */
export function formatDate(iso: string): string {
  return `${formatDayMonth(iso)} ${iso.slice(0, 4)}`;
}

/** Whole days from TODAY to an ISO date (negative = in the past). */
export function daysFromToday(iso: string): number {
  return Math.round((Date.parse(iso) - Date.parse(TODAY)) / 86_400_000);
}

/** 1_355_000_000 → "Rp 1,36 M", 214_000_000 → "Rp 214 jt" */
export function formatCompactRupiah(value: number): string {
  if (value >= 1_000_000_000) {
    const miliar = Math.round(value / 10_000_000) / 100;
    return `Rp ${miliar.toLocaleString('id-ID', { maximumFractionDigits: 2 })} M`;
  }
  return `Rp ${Math.round(value / 1_000_000).toLocaleString('id-ID')} jt`;
}

/** 2_400_000 → "2,4 MB", 86_000 → "86 KB" */
export function formatFileSize(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} MB`;
  return `${Math.max(1, Math.round(bytes / 1_000))} KB`;
}

/** "Redesain Website Corporate" → "redesain-website-corporate" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* ------------------------------------------------------------------ */
/* Deals                                                                */
/* ------------------------------------------------------------------ */

export const openStages = ['Lead Masuk', 'Kualifikasi', 'Proposal Dikirim', 'Negosiasi'] as const satisfies DealStage[];
export const closedStages = ['Won', 'Lost'] as const satisfies DealStage[];
export const allStages: DealStage[] = [...openStages, ...closedStages];

export function isOpenStage(stage: DealStage): boolean {
  return (openStages as readonly DealStage[]).includes(stage);
}

/** Default win probability per stage (%), used for the weighted pipeline value. */
export const stageProbability: Record<DealStage, number> = {
  'Lead Masuk': 10,
  Kualifikasi: 25,
  'Proposal Dikirim': 40,
  Negosiasi: 60,
  Won: 100,
  Lost: 0,
};

export const dealSources = ['Referral', 'Website', 'Instagram', 'LinkedIn', 'Event'] as const;
export type DealSource = (typeof dealSources)[number];

export type DealContact = { id: string; name: string; role: string };

export type Deal = {
  /** Slug, used in /crm/deals/:dealId */
  id: string;
  title: string;
  /** Short client name shown on cards, e.g. "PT Maju Bersama". */
  client: string;
  company: { id: string; name: string };
  contact?: DealContact;
  value: number;
  stage: DealStage;
  /** Team member id of the PIC. */
  ownerId: string;
  /** ISO date of the expected closing. */
  closingDate: string;
  source: DealSource;
  /** No activity logged for more than 7 days. */
  stale?: boolean;
};

const rina: DealContact = { id: 'rina-wulandari', name: 'Rina Wulandari', role: 'Direktur Marketing' };
const anindya: DealContact = { id: 'anindya-putri', name: 'Anindya Putri', role: 'Brand Manager' };

const majuBersama = { id: 'pt-maju-bersama-digital', name: 'PT Maju Bersama Digital' };
const sinarPangan = { id: 'pt-sinar-pangan-sejahtera', name: 'PT Sinar Pangan Sejahtera' };

/** The deals loaded on the board (the most recently updated ones per stage). */
export const deals: Deal[] = [
  {
    id: 'landing-page-promo',
    title: 'Landing Page Promo',
    client: 'Tokoku Indonesia',
    company: { id: 'tokoku-indonesia', name: 'Tokoku Indonesia' },
    contact: { id: 'yoga-pratama', name: 'Yoga Pratama', role: 'Head of Product' },
    value: 18_000_000,
    stage: 'Lead Masuk',
    ownerId: 'dp',
    closingDate: '2026-12-12',
    source: 'Website',
    stale: true,
  },
  {
    id: 'katalog-digital-batik',
    title: 'Katalog Digital Batik',
    client: 'Batik Lestari Studio',
    company: { id: 'batik-lestari-studio', name: 'Batik Lestari Studio' },
    contact: { id: 'siti-rahmawati', name: 'Siti Rahmawati', role: 'Founder' },
    value: 32_000_000,
    stage: 'Lead Masuk',
    ownerId: 'la',
    closingDate: '2026-12-20',
    source: 'Instagram',
  },
  {
    id: 'branding-kemasan-produk',
    title: 'Branding & Kemasan Produk',
    client: 'CV Kopi Senja',
    company: { id: 'cv-kopi-senja-nusantara', name: 'CV Kopi Senja Nusantara' },
    contact: { id: 'budi-santoso', name: 'Budi Santoso', role: 'Owner' },
    value: 45_000_000,
    stage: 'Kualifikasi',
    ownerId: 'dp',
    closingDate: '2026-12-05',
    source: 'Instagram',
  },
  {
    id: 'kampanye-digital-q1',
    title: 'Kampanye Digital Q1',
    client: 'PT Sinar Pangan',
    company: sinarPangan,
    contact: anindya,
    value: 60_000_000,
    stage: 'Kualifikasi',
    ownerId: 'la',
    closingDate: '2026-12-15',
    source: 'Website',
  },
  {
    id: 'maintenance-tahunan',
    title: 'Maintenance Tahunan',
    client: 'PT Maju Bersama',
    company: majuBersama,
    contact: rina,
    value: 36_000_000,
    stage: 'Proposal Dikirim',
    ownerId: 'la',
    closingDate: '2026-11-30',
    source: 'Referral',
  },
  {
    id: 'aplikasi-mobile-loyalty',
    title: 'Aplikasi Mobile Loyalty',
    client: 'PT Sinar Pangan',
    company: sinarPangan,
    contact: anindya,
    value: 240_000_000,
    stage: 'Proposal Dikirim',
    ownerId: 'dp',
    closingDate: '2026-12-10',
    source: 'Event',
    stale: true,
  },
  {
    id: 'redesain-website-corporate',
    title: 'Redesain Website Corporate',
    client: 'PT Maju Bersama',
    company: majuBersama,
    contact: rina,
    value: 85_000_000,
    stage: 'Negosiasi',
    ownerId: 'la',
    closingDate: '2026-11-30',
    source: 'Referral',
  },
  {
    id: 'sistem-dashboard-logistik',
    title: 'Sistem Dashboard Logistik',
    client: 'PT Karya Logistik',
    company: { id: 'pt-karya-logistik-prima', name: 'PT Karya Logistik Prima' },
    contact: { id: 'hendra-gunawan', name: 'Hendra Gunawan', role: 'CEO' },
    value: 180_000_000,
    stage: 'Negosiasi',
    ownerId: 'dp',
    closingDate: '2026-12-18',
    source: 'LinkedIn',
  },
];

/** The record designed in C6; detail pages fall back to it for unknown ids. */
export const mainDealId = 'redesain-website-corporate';

export function findDeal(id: string | undefined): Deal {
  return deals.find((d) => d.id === id) ?? deals.find((d) => d.id === mainDealId)!;
}

/**
 * Deals per stage that exist in the workspace but are not loaded on the board.
 * Column counts, totals and the summary add these to the cards on the board.
 */
export const offBoardDeals: Record<DealStage, { count: number; value: number; weighted: number }> = {
  'Lead Masuk': { count: 10, value: 164_000_000, weighted: 12_000_000 },
  Kualifikasi: { count: 7, value: 233_000_000, weighted: 50_000_000 },
  'Proposal Dikirim': { count: 5, value: 136_000_000, weighted: 48_000_000 },
  Negosiasi: { count: 3, value: 126_000_000, weighted: 75_350_000 },
  Won: { count: 23, value: 1_284_000_000, weighted: 0 },
  Lost: { count: 14, value: 512_000_000, weighted: 0 },
};

/** Value of deals won earlier this month (before any deal is moved to Won on the board). */
const wonThisMonthBase = 142_000_000;

export function stageTotals(list: Deal[], stage: DealStage): { count: number; value: number } {
  const inStage = list.filter((d) => d.stage === stage);
  return {
    count: offBoardDeals[stage].count + inStage.length,
    value: offBoardDeals[stage].value + inStage.reduce((sum, d) => sum + d.value, 0),
  };
}

export function pipelineSummary(list: Deal[]): { total: number; weighted: number; wonThisMonth: number } {
  let total = 0;
  let weighted = 0;
  for (const stage of openStages) {
    total += offBoardDeals[stage].value;
    weighted += offBoardDeals[stage].weighted;
  }
  let wonThisMonth = wonThisMonthBase;
  for (const deal of list) {
    if (isOpenStage(deal.stage)) {
      total += deal.value;
      weighted += (deal.value * stageProbability[deal.stage]) / 100;
    } else if (deal.stage === 'Won') {
      wonThisMonth += deal.value;
    }
  }
  return { total, weighted, wonThisMonth };
}

export const lostReasons = ['Harga terlalu tinggi', 'Memilih kompetitor', 'Timing tidak tepat', 'Tidak ada respon', 'Lainnya'] as const;
export type LostReason = (typeof lostReasons)[number];

/* Filters ----------------------------------------------------------- */

export type ValueRange = 'all' | 'small' | 'medium' | 'large';
export type ClosingRange = 'all' | 'this-month' | 'next-month';

export type DealFilters = {
  query: string;
  ownerId: string;
  value: ValueRange;
  closing: ClosingRange;
  source: string;
};

export const emptyDealFilters: DealFilters = { query: '', ownerId: 'all', value: 'all', closing: 'all', source: 'all' };

export const valueRangeOptions: Array<{ value: ValueRange; label: string }> = [
  { value: 'all', label: 'Semua nilai' },
  { value: 'small', label: '< Rp 50 jt' },
  { value: 'medium', label: 'Rp 50–100 jt' },
  { value: 'large', label: '> Rp 100 jt' },
];

export const closingRangeOptions: Array<{ value: ClosingRange; label: string }> = [
  { value: 'all', label: 'Semua tanggal' },
  { value: 'this-month', label: 'November 2026' },
  { value: 'next-month', label: 'Desember 2026' },
];

export function matchesDealFilters(deal: Deal, f: DealFilters): boolean {
  const q = f.query.trim().toLowerCase();
  if (q && !`${deal.title} ${deal.client} ${deal.company.name}`.toLowerCase().includes(q)) return false;
  if (f.ownerId !== 'all' && deal.ownerId !== f.ownerId) return false;
  if (f.source !== 'all' && deal.source !== f.source) return false;
  if (f.value === 'small' && deal.value >= 50_000_000) return false;
  if (f.value === 'medium' && (deal.value < 50_000_000 || deal.value > 100_000_000)) return false;
  if (f.value === 'large' && deal.value <= 100_000_000) return false;
  if (f.closing === 'this-month' && !deal.closingDate.startsWith('2026-11')) return false;
  if (f.closing === 'next-month' && !deal.closingDate.startsWith('2026-12')) return false;
  return true;
}

/* Deal detail ------------------------------------------------------- */

export type TimelineKind = 'note' | 'quotation' | 'stage' | 'meeting' | 'call' | 'email';

export type TimelineEntry = {
  id: string;
  kind: TimelineKind;
  who: string;
  action: string;
  /** Optional note shown in a box under the entry. */
  note?: string;
  when: string;
};

/** Options of the "Log aktivitas" form and the timeline action they produce. */
export const logActivityKinds: Array<{ value: TimelineKind; label: string; action: string }> = [
  { value: 'note', label: 'Catatan', action: 'menambahkan catatan' },
  { value: 'call', label: 'Telepon', action: 'mencatat telepon' },
  { value: 'email', label: 'Email', action: 'mencatat email' },
  { value: 'meeting', label: 'Meeting', action: 'mencatat meeting' },
];

export type DealQuotation ={ id: string; number: string; total: number; date: string; status: QuotationStatus };
export type DealFile = { id: string; name: string; size: string };

export type DealDetail = { timeline: TimelineEntry[]; quotations: DealQuotation[]; files: DealFile[] };

const designedDetail: DealDetail = {
  timeline: [
    {
      id: 't-1',
      kind: 'note',
      who: 'Laras Ayu',
      action: 'mencatat negosiasi harga',
      note: 'Klien minta diskon 5%. Alternatif: tambah fase maintenance 3 bulan gratis.',
      when: 'Hari ini',
    },
    { id: 't-2', kind: 'quotation', who: 'Laras Ayu', action: 'mengirim QUO-2026-0012', when: '4 hari lalu' },
    { id: 't-3', kind: 'stage', who: 'Dimas Prakoso', action: 'memindahkan ke Negosiasi', when: '6 hari lalu' },
    { id: 't-4', kind: 'meeting', who: 'Laras Ayu', action: 'presentasi proposal · 60 menit', when: '9 hari lalu' },
  ],
  quotations: [{ id: 'quo-2026-0012', number: 'QUO-2026-0012', total: 94_350_000, date: '12 Nov 2026', status: 'Dilihat' }],
  files: [
    { id: 'f-1', name: 'Brief-Website-MajuBersama.pdf', size: '2,4 MB' },
    { id: 'f-2', name: 'Moodboard-referensi.zip', size: '18 MB' },
  ],
};

/** Timeline, quotations and files for a deal. Only the designed record has full history. */
export function dealDetail(deal: Deal, ownerName: string): DealDetail {
  if (deal.id === mainDealId) return designedDetail;
  return {
    timeline: [
      { id: 't-1', kind: 'stage', who: ownerName, action: `memindahkan ke ${deal.stage}`, when: '3 hari lalu' },
      { id: 't-2', kind: 'call', who: ownerName, action: 'telepon perkenalan · 20 menit', when: '8 hari lalu' },
      { id: 't-3', kind: 'note', who: 'Dimas Prakoso', action: 'membuat deal', when: '2 minggu lalu' },
    ],
    quotations: [],
    files: [],
  };
}

/* ------------------------------------------------------------------ */
/* Activities                                                           */
/* ------------------------------------------------------------------ */

export type ActivityType = 'call' | 'send' | 'meeting' | 'task' | 'billing';

export const activityTypeOptions: Array<{ value: ActivityType; label: string }> = [
  { value: 'call', label: 'Telepon' },
  { value: 'send', label: 'Kirim dokumen / email' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'task', label: 'Tugas' },
  { value: 'billing', label: 'Penagihan' },
];

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  /** Related record, e.g. "Deal · Branding & Kemasan Produk". */
  context: string;
  /** ISO date */
  date: string;
  /** "10:00" */
  time: string;
  ownerId: string;
  done: boolean;
};

export type ActivityTab = 'overdue' | 'today' | 'upcoming' | 'done';

/** Activities completed before the ones listed below (counted in the "Selesai" tab). */
export const olderCompletedCount = 37;

export const activities: Activity[] = [
  // Terlambat
  { id: 'a-01', type: 'call', title: 'Follow-up proposal Maintenance Tahunan', context: 'PT Maju Bersama Digital', date: '2026-11-17', time: '10:00', ownerId: 'la', done: false },
  { id: 'a-02', type: 'send', title: 'Kirim revisi estimasi Aplikasi Mobile', context: 'Deal · Aplikasi Mobile Loyalty', date: '2026-11-17', time: '14:00', ownerId: 'dp', done: false },
  { id: 'a-03', type: 'call', title: 'Konfirmasi brief Landing Page Promo', context: 'Tokoku Indonesia', date: '2026-11-17', time: '16:00', ownerId: 'dp', done: false },
  // Hari ini
  { id: 'a-04', type: 'call', title: 'Telepon Anindya Putri', context: 'Deal · Branding & Kemasan Produk', date: TODAY, time: '10:00', ownerId: 'la', done: false },
  { id: 'a-05', type: 'send', title: 'Kirim ulang quotation QUO-2026-0014', context: 'PT Sinar Pangan Sejahtera', date: TODAY, time: '11:30', ownerId: 'la', done: false },
  { id: 'a-06', type: 'meeting', title: 'Meeting kickoff Batik Lestari', context: 'Zoom · Katalog Digital Batik', date: TODAY, time: '14:00', ownerId: 'dp', done: false },
  { id: 'a-07', type: 'billing', title: 'Tagih DP Tokoku Indonesia', context: 'INV-2026-0042', date: TODAY, time: '16:00', ownerId: 'dp', done: true },
  // Mendatang
  { id: 'a-08', type: 'meeting', title: 'Presentasi konsep Kampanye Digital Q1', context: 'Google Meet · Kampanye Digital Q1', date: '2026-11-21', time: '10:00', ownerId: 'la', done: false },
  { id: 'a-09', type: 'call', title: 'Telepon Hendra Gunawan', context: 'Deal · Sistem Dashboard Logistik', date: '2026-11-21', time: '13:00', ownerId: 'dp', done: false },
  { id: 'a-10', type: 'meeting', title: 'Negosiasi final Redesain Website', context: 'Kantor klien · Redesain Website Corporate', date: '2026-11-24', time: '10:00', ownerId: 'la', done: false },
  { id: 'a-11', type: 'billing', title: 'Kirim invoice DP Batik Lestari', context: 'Katalog Digital Batik', date: '2026-11-24', time: '15:00', ownerId: 'dp', done: false },
  { id: 'a-12', type: 'task', title: 'Review kontrak maintenance', context: 'PT Maju Bersama Digital', date: '2026-12-01', time: '09:00', ownerId: 'la', done: false },
  { id: 'a-13', type: 'meeting', title: 'Meeting kickoff Branding & Kemasan', context: 'Zoom · Branding & Kemasan Produk', date: '2026-12-02', time: '14:00', ownerId: 'dp', done: false },
  { id: 'a-14', type: 'send', title: 'Follow-up quotation QUO-2026-0015', context: 'CV Kopi Senja Nusantara', date: '2026-12-03', time: '11:00', ownerId: 'la', done: false },
  { id: 'a-15', type: 'call', title: 'Telepon Budi Santoso', context: 'Deal · Branding & Kemasan Produk', date: '2026-12-07', time: '10:00', ownerId: 'dp', done: false },
  { id: 'a-16', type: 'billing', title: 'Tagih pelunasan Tokoku Indonesia', context: 'INV-2026-0042', date: '2026-12-10', time: '16:00', ownerId: 'dp', done: false },
  // Selesai sebelumnya
  { id: 'a-17', type: 'send', title: 'Kirim quotation QUO-2026-0014', context: 'PT Sinar Pangan Sejahtera', date: '2026-11-16', time: '09:30', ownerId: 'la', done: true },
  { id: 'a-18', type: 'call', title: 'Telepon Rina Wulandari', context: 'Deal · Redesain Website Corporate', date: '2026-11-12', time: '15:00', ownerId: 'la', done: true },
  { id: 'a-19', type: 'meeting', title: 'Presentasi proposal Redesain Website', context: 'Kantor klien · Redesain Website Corporate', date: '2026-11-10', time: '10:00', ownerId: 'la', done: true },
];

/** Which tab lists an activity (done items due today stay under "Hari ini"). */
export function activityInTab(activity: Activity, tab: ActivityTab): boolean {
  const offset = daysFromToday(activity.date);
  switch (tab) {
    case 'overdue':
      return offset < 0 && !activity.done;
    case 'today':
      return offset === 0;
    case 'upcoming':
      return offset > 0 && !activity.done;
    case 'done':
      return activity.done;
  }
}

/** Tab an activity lands in when it is (re)scheduled for a date. */
export function tabForDate(iso: string): ActivityTab {
  const offset = daysFromToday(iso);
  return offset < 0 ? 'overdue' : offset === 0 ? 'today' : 'upcoming';
}

/** Senin … Minggu */
export const weekdayInitials = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];

/** (2026, 10, 1) → "2026-11-01" — month is zero-based. */
export function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/** "2026-11-19" + 1 → "2026-11-20" */
export function addDays(iso: string, days: number): string {
  const d = new Date(Date.parse(iso) + days * 86_400_000);
  return toIsoDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

/** Monday-first weeks of a month; empty cells are null. Month is zero-based. */
export function monthGrid(year: number, month: number): Array<Array<string | null>> {
  const startOffset = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: Array<string | null> = [
    ...Array<null>(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => toIsoDate(year, month, i + 1)),
  ];
  while (cells.length % 7) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
}

/** "2026-11-21" → "21 November 2026" */
export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${Number(d)} ${monthNames[Number(m) - 1]} ${y}`;
}

/** "Hari ini 10:00", "Kemarin 15:00", "Besok 09:00", "21 Nov 10:00" */
export function activityDueLabel(activity: Activity): string {
  const offset = daysFromToday(activity.date);
  const day = offset === 0 ? 'Hari ini' : offset === -1 ? 'Kemarin' : offset === 1 ? 'Besok' : formatDayMonth(activity.date);
  return `${day} ${activity.time}`;
}

/* ------------------------------------------------------------------ */
/* CSV import                                                           */
/* ------------------------------------------------------------------ */

export const importFile = { name: 'kontak-november.csv', rows: 124, columns: 7 };

export const IGNORED_FIELD = 'Tidak diimport';

export const contactFieldOptions = ['Nama', 'Email', 'Telepon', 'Perusahaan', 'Jabatan', 'Sumber lead', 'Catatan', 'Tag', IGNORED_FIELD];

export type CsvColumn = {
  id: string;
  header: string;
  sample: string;
  /** Field suggested by auto-matching. */
  suggestedField: string;
};

export const csvColumns: CsvColumn[] = [
  { id: 'c-1', header: 'Nama Lengkap', sample: 'Rina Wulandari', suggestedField: 'Nama' },
  { id: 'c-2', header: 'Email', sample: 'rina@majubersama.co.id', suggestedField: 'Email' },
  { id: 'c-3', header: 'No HP', sample: '0812-3456-7788', suggestedField: 'Telepon' },
  { id: 'c-4', header: 'Perusahaan', sample: 'PT Maju Bersama', suggestedField: 'Perusahaan' },
  { id: 'c-5', header: 'Jabatan', sample: 'Direktur Marketing', suggestedField: 'Jabatan' },
  { id: 'c-6', header: 'Asal Lead', sample: 'Referral', suggestedField: 'Sumber lead' },
  { id: 'c-7', header: 'Catatan Internal', sample: 'VIP, retainer', suggestedField: IGNORED_FIELD },
];

/** Column id → Studio OS field. */
export type ColumnMapping = Record<string, string>;

export const suggestedMapping: ColumnMapping = Object.fromEntries(csvColumns.map((c) => [c.id, c.suggestedField]));

const requiredImportFields = ['Nama', 'Email'];

export function analyzeMapping(mapping: ColumnMapping) {
  const fields = Object.values(mapping).filter((f) => f !== IGNORED_FIELD);
  const duplicates = [...new Set(fields.filter((f, i) => fields.indexOf(f) !== i))];
  const missing = requiredImportFields.filter((f) => !fields.includes(f));
  const isSuggested = csvColumns.every((c) => mapping[c.id] === c.suggestedField);
  return { mapped: fields.length, duplicates, missing, isSuggested, valid: duplicates.length === 0 && missing.length === 0 };
}

export type ImportRowStatus ='Valid' | 'Email tidak valid' | 'Email kosong' | 'Duplikat';

export const importRowTone: Record<ImportRowStatus, Tone> = {
  Valid: 'green',
  'Email tidak valid': 'red',
  'Email kosong': 'red',
  Duplikat: 'yellow',
};

export type ImportPreviewRow = { line: number; name: string; email: string; company: string; status: ImportRowStatus };

export const importPreviewRows: ImportPreviewRow[] = [
  { line: 1, name: 'Rina Wulandari', email: 'rina@majubersama.co.id', company: 'PT Maju Bersama', status: 'Valid' },
  { line: 2, name: 'Budi Santoso', email: 'budi@kopisenja.id', company: 'CV Kopi Senja', status: 'Valid' },
  { line: 3, name: 'Anindya Putri', email: 'anindya@sinarpangan', company: 'PT Sinar Pangan', status: 'Email tidak valid' },
  { line: 4, name: 'Hendra Gunawan', email: 'hendra@karyalogistik.id', company: 'PT Karya Logistik', status: 'Duplikat' },
  { line: 5, name: 'Siti Rahmawati', email: 'siti@batiklestari.id', company: 'Batik Lestari', status: 'Valid' },
  { line: 6, name: 'Yoga Pratama', email: '', company: 'Tokoku Indonesia', status: 'Email kosong' },
];

export const importSummary = { valid: 118, errors: 3, duplicates: 3 };

export type DuplicateStrategy = 'skip' | 'overwrite' | 'create';

export const duplicateStrategyOptions: Array<{ value: DuplicateStrategy; label: string }> = [
  { value: 'skip', label: 'Lewati' },
  { value: 'overwrite', label: 'Timpa' },
  { value: 'create', label: 'Buat baru' },
];
