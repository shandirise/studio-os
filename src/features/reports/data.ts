import type { DealStage, InvoiceStatus, Tone } from '@/lib/status';

/* ------------------------------------------------------------------ */
/* Shared layout                                                       */
/* ------------------------------------------------------------------ */

export type ReportTab = 'sales' | 'pipeline' | 'projects' | 'team' | 'finance';

export type ReportTabConfig = {
  value: ReportTab;
  label: string;
  to: string;
  /** Page subtitle shown under "Reports" for this tab. */
  subtitle: string;
};

export const reportTabs: ReportTabConfig[] = [
  { value: 'sales', label: 'Sales', to: '/reports/sales', subtitle: 'Revenue, win rate, dan klien terbesar · 12 bulan terakhir' },
  { value: 'pipeline', label: 'Pipeline', to: '/reports/pipeline', subtitle: 'Konversi antar stage, lama di tiap stage, dan forecast' },
  { value: 'projects', label: 'Project', to: '/reports/projects', subtitle: 'Profitabilitas dan ketepatan waktu project' },
  { value: 'team', label: 'Tim', to: '/reports/team', subtitle: 'Utilisasi dan jam kerja per anggota' },
  { value: 'finance', label: 'Keuangan', to: '/reports/finance', subtitle: 'Arus kas dan umur piutang' },
];

export type ReportPeriod = 'month' | 'quarter' | 'year' | 'custom';

export const reportPeriods: Array<{ value: ReportPeriod; label: string }> = [
  { value: 'month', label: 'Bulan ini' },
  { value: 'quarter', label: 'Kuartal' },
  { value: 'year', label: 'Tahun' },
  { value: 'custom', label: 'Custom' },
];

/* ------------------------------------------------------------------ */
/* Shared shapes                                                       */
/* ------------------------------------------------------------------ */

export type ReportKpi = { label: string; value: string; delta: string };

export type ColumnDatum = { label: string; value: number; display: string };

export type MeterDatum = { label: string; display: string; /** 0–100 */ percent: number };

/* ------------------------------------------------------------------ */
/* Sales                                                               */
/* ------------------------------------------------------------------ */

export const salesKpis: ReportKpi[] = [
  { label: 'Revenue 12 bulan', value: 'Rp 1,42 M', delta: '14,2%' },
  { label: 'Win rate', value: '38%', delta: '3 poin' },
  { label: 'Rata-rata nilai deal', value: 'Rp 62,4 jt', delta: '6,1%' },
  { label: 'Deal Won', value: '23', delta: '4 deal' },
];

const revenueMonths = ['Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov'];

/** Revenue per month in millions of Rupiah. */
export const monthlyRevenue: ColumnDatum[] = [96, 112, 104, 125, 131, 118, 140, 152, 138, 160, 155, 148].map((value, i) => ({
  label: revenueMonths[i] ?? '',
  value,
  display: String(value),
}));

export const lostReasons: MeterDatum[] = [
  { label: 'Harga terlalu tinggi', display: '42%', percent: 42 },
  { label: 'Memilih kompetitor', display: '24%', percent: 24 },
  { label: 'Timing tidak tepat', display: '18%', percent: 18 },
  { label: 'Tidak ada respon', display: '11%', percent: 11 },
  { label: 'Lainnya', display: '5%', percent: 5 },
];

export type TopClient = { rank: number; name: string; companyId: string; dealsWon: number; revenue: number; share: number };

export const topClients: TopClient[] = [
  { rank: 1, name: 'PT Karya Logistik Prima', companyId: 'pt-karya-logistik-prima', dealsWon: 3, revenue: 524_800_000, share: 37 },
  { rank: 2, name: 'PT Maju Bersama Digital', companyId: 'pt-maju-bersama-digital', dealsWon: 2, revenue: 312_450_000, share: 22 },
  { rank: 3, name: 'PT Bumi Agro Mandiri', companyId: 'pt-bumi-agro-mandiri', dealsWon: 2, revenue: 147_000_000, share: 10 },
  { rank: 4, name: 'PT Sinar Pangan Sejahtera', companyId: 'pt-sinar-pangan-sejahtera', dealsWon: 1, revenue: 90_000_000, share: 6 },
  { rank: 5, name: 'Batik Lestari Studio', companyId: 'batik-lestari-studio', dealsWon: 1, revenue: 28_000_000, share: 2 },
];

/* ------------------------------------------------------------------ */
/* Pipeline                                                            */
/* ------------------------------------------------------------------ */

export type FunnelStep = {
  stage: DealStage;
  count: number;
  tone: Tone;
  /** Share that moved on from the previous stage, e.g. "65%". */
  conversion?: string;
};

export const conversionFunnel: FunnelStep[] = [
  { stage: 'Lead Masuk', count: 148, tone: 'gray' },
  { stage: 'Kualifikasi', count: 96, tone: 'blue', conversion: '65%' },
  { stage: 'Proposal Dikirim', count: 61, tone: 'purple', conversion: '64%' },
  { stage: 'Negosiasi', count: 38, tone: 'orange', conversion: '62%' },
  { stage: 'Won', count: 23, tone: 'green', conversion: '61%' },
];

export const forecast: ColumnDatum[] = [
  { label: 'Des', value: 118, display: 'Rp 118 jt' },
  { label: 'Jan', value: 142, display: 'Rp 142 jt' },
  { label: 'Feb', value: 96, display: 'Rp 96 jt' },
];

export type StageHealth = 'Sehat' | 'Perlu perhatian';

export const stageHealthTone: Record<StageHealth, Tone> = { Sehat: 'green', 'Perlu perhatian': 'yellow' };

export type StageDuration = { stage: DealStage; avgDays: string; activeDeals: number; longest: string; health: StageHealth };

export const stageDurations: StageDuration[] = [
  { stage: 'Lead Masuk', avgDays: '4,2 hari', activeDeals: 12, longest: 'Landing Page Promo · 11 hari', health: 'Sehat' },
  { stage: 'Kualifikasi', avgDays: '6,8 hari', activeDeals: 9, longest: 'Branding & Kemasan · 14 hari', health: 'Sehat' },
  { stage: 'Proposal Dikirim', avgDays: '9,5 hari', activeDeals: 7, longest: 'Aplikasi Mobile Loyalty · 21 hari', health: 'Perlu perhatian' },
  { stage: 'Negosiasi', avgDays: '12,1 hari', activeDeals: 5, longest: 'Redesain Website · 9 hari', health: 'Sehat' },
];

/* ------------------------------------------------------------------ */
/* Project                                                             */
/* ------------------------------------------------------------------ */

export const projectKpis: ReportKpi[] = [
  { label: 'Margin rata-rata', value: '38%', delta: '2 poin' },
  { label: 'Project selesai tepat waktu', value: '82%', delta: '5 poin' },
  { label: 'Total profit', value: 'Rp 412 jt', delta: '9,4%' },
];

export type Punctuality = 'Tepat waktu' | 'Berisiko' | 'Terlambat';

export const punctualityTone: Record<Punctuality, Tone> = { 'Tepat waktu': 'green', Berisiko: 'yellow', Terlambat: 'red' };

export type ProjectProfit = {
  id: string;
  name: string;
  revenue: string;
  laborCost: string;
  expenses: string;
  profit: string;
  /** Margin in percent. */
  margin: number;
  punctuality: Punctuality;
};

export const projectProfits: ProjectProfit[] = [
  { id: 'portal-petani-mitra', name: 'Portal Petani Mitra', revenue: 'Rp 98 jt', laborCost: 'Rp 41 jt', expenses: 'Rp 9 jt', profit: 'Rp 48 jt', margin: 49, punctuality: 'Tepat waktu' },
  { id: 'dashboard-logistik', name: 'Dashboard Logistik', revenue: 'Rp 130 jt', laborCost: 'Rp 62 jt', expenses: 'Rp 12 jt', profit: 'Rp 56 jt', margin: 43, punctuality: 'Berisiko' },
  { id: 'aplikasi-mobile-loyalty', name: 'Aplikasi Mobile Loyalty', revenue: 'Rp 180 jt', laborCost: 'Rp 94 jt', expenses: 'Rp 22 jt', profit: 'Rp 64 jt', margin: 36, punctuality: 'Terlambat' },
  { id: 'website-corporate-v1', name: 'Website Corporate v1', revenue: 'Rp 62 jt', laborCost: 'Rp 27 jt', expenses: 'Rp 6 jt', profit: 'Rp 29 jt', margin: 47, punctuality: 'Tepat waktu' },
];

export const onTimeSummary = { total: 34, onTime: 28, late: 6 };

/* ------------------------------------------------------------------ */
/* Tim                                                                 */
/* ------------------------------------------------------------------ */

export const utilization: MeterDatum[] = [
  { label: 'Rizky Aditya', display: '82%', percent: 82 },
  { label: 'Nadia Salsabila', display: '76%', percent: 76 },
  { label: 'Laras Ayu', display: '54%', percent: 54 },
  { label: 'Dimas Prakoso', display: '31%', percent: 31 },
];

export type MemberHours = { name: string; role?: string; billable: number; nonBillable: number };

export const memberHours: MemberHours[] = [
  { name: 'Rizky Aditya', billable: 131, nonBillable: 18 },
  { name: 'Nadia Salsabila', billable: 122, nonBillable: 24 },
  { name: 'Laras Ayu', role: 'Manager', billable: 86, nonBillable: 41 },
  { name: 'Dimas Prakoso', role: 'Owner', billable: 49, nonBillable: 63 },
];

export const weeklyHours: ColumnDatum[] = [128, 142, 136, 118, 150, 144].map((value, i) => ({
  label: `M${i + 1}`,
  value,
  display: `${value} j`,
}));

/** Week drawn in ink: the busiest one. */
export const busiestWeek = 4;

/* ------------------------------------------------------------------ */
/* Keuangan                                                            */
/* ------------------------------------------------------------------ */

/** Cash in / out per month in millions of Rupiah. */
export type CashFlowMonth = { label: string; cashIn: number; cashOut: number };

export const cashFlow: CashFlowMonth[] = [
  { label: 'Jun', cashIn: 96, cashOut: 52 },
  { label: 'Jul', cashIn: 112, cashOut: 60 },
  { label: 'Agu', cashIn: 104, cashOut: 48 },
  { label: 'Sep', cashIn: 125, cashOut: 71 },
  { label: 'Okt', cashIn: 131, cashOut: 66 },
  { label: 'Nov', cashIn: 148, cashOut: 39 },
];

export const receivablesAging: MeterDatum[] = [
  { label: '0–30 hari', display: 'Rp 29,8 jt', percent: 47.7 },
  { label: '31–60 hari', display: 'Rp 24,5 jt', percent: 39.2 },
  { label: '61–90 hari', display: 'Rp 8,2 jt', percent: 13.1 },
  { label: '> 90 hari', display: 'Rp 0', percent: 0 },
];

export type Receivable = { id: string; number: string; client: string; dueDate: string; age: string; balance: number; status: InvoiceStatus };

export const oldestReceivables: Receivable[] = [
  { id: 'inv-2026-0036', number: 'INV-2026-0036', client: 'PT Karya Logistik Prima', dueDate: '02 Nov 2026', age: '17 hari', balance: 24_500_000, status: 'Overdue' },
  { id: 'inv-2026-0038', number: 'INV-2026-0038', client: 'Batik Lestari Studio', dueDate: '10 Nov 2026', age: '9 hari', balance: 8_200_000, status: 'Overdue' },
  { id: 'inv-2026-0041', number: 'INV-2026-0041', client: 'PT Maju Bersama Digital', dueDate: '21 Nov 2026', age: '–', balance: 47_175_000, status: 'Terkirim' },
];
