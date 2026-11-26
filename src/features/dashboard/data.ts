import type { BarDatum } from '@/components/charts/BarChart';
import type { DealStage, InvoiceStatus, Tone } from '@/lib/status';

export type Period = 'month' | 'quarter' | 'year' | 'custom';

export const periodOptions: Array<{ value: Period; label: string }> = [
  { value: 'month', label: 'Bulan ini' },
  { value: 'quarter', label: 'Kuartal' },
  { value: 'year', label: 'Tahun' },
  { value: 'custom', label: 'Custom' },
];

export type Kpi = {
  label: string;
  /** Shorter label used on mobile. */
  shortLabel: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  /** Hidden on the mobile dashboard. */
  desktopOnly?: boolean;
};

export const kpis: Kpi[] = [
  { label: 'Revenue diterima', shortLabel: 'Revenue', value: 'Rp 148,2 jt', delta: '12,4%', trend: 'up' },
  { label: 'Invoice outstanding', shortLabel: 'Outstanding', value: 'Rp 62,5 jt', delta: '4,1%', trend: 'down' },
  { label: 'Nilai pipeline aktif', shortLabel: 'Pipeline', value: 'Rp 486 jt', delta: '18,0%', trend: 'up' },
  { label: 'Win rate', shortLabel: 'Win rate', value: '38%', delta: '3 poin', trend: 'up' },
  { label: 'Project aktif', shortLabel: 'Project aktif', value: '12', delta: '2 project', trend: 'up', desktopOnly: true },
];

/** Revenue per month, in millions of Rupiah. */
export const monthlyRevenue: BarDatum[] = [
  { label: 'Des', value: 96 },
  { label: 'Jan', value: 112 },
  { label: 'Feb', value: 104 },
  { label: 'Mar', value: 125 },
  { label: 'Apr', value: 131 },
  { label: 'Mei', value: 118 },
  { label: 'Jun', value: 140 },
  { label: 'Jul', value: 152 },
  { label: 'Agu', value: 138 },
  { label: 'Sep', value: 160 },
  { label: 'Okt', value: 155 },
  { label: 'Nov', value: 148 },
];

export const funnel: Array<{ stage: DealStage; count: number; tone: Tone }> = [
  { stage: 'Lead Masuk', count: 48, tone: 'gray' },
  { stage: 'Kualifikasi', count: 31, tone: 'blue' },
  { stage: 'Proposal Dikirim', count: 19, tone: 'purple' },
  { stage: 'Negosiasi', count: 11, tone: 'orange' },
  { stage: 'Won', count: 7, tone: 'green' },
];

export type DueInvoice = {
  id: string;
  number: string;
  client: string;
  dueDate: string;
  balance: number;
  status: InvoiceStatus;
  /** Short label shown in the badge (e.g. "Sebagian"). */
  statusLabel?: string;
};

export const dueInvoices: DueInvoice[] = [
  { id: 'inv-2026-0036', number: 'INV-2026-0036', client: 'PT Karya Logistik Prima', dueDate: '02 Nov 2026', balance: 24_500_000, status: 'Overdue' },
  { id: 'inv-2026-0038', number: 'INV-2026-0038', client: 'Batik Lestari Studio', dueDate: '10 Nov 2026', balance: 8_200_000, status: 'Overdue' },
  { id: 'inv-2026-0041', number: 'INV-2026-0041', client: 'PT Maju Bersama Digital', dueDate: '21 Nov 2026', balance: 47_175_000, status: 'Terkirim' },
  {
    id: 'inv-2026-0042',
    number: 'INV-2026-0042',
    client: 'Tokoku Indonesia',
    dueDate: '25 Nov 2026',
    balance: 12_000_000,
    status: 'Dibayar Sebagian',
    statusLabel: 'Sebagian',
  },
  { id: 'inv-2026-0043', number: 'INV-2026-0043', client: 'PT Bumi Agro Mandiri', dueDate: '30 Nov 2026', balance: 18_600_000, status: 'Terkirim' },
];

export type FollowUp = { id: string; title: string; context: string; time: string; done: boolean };

export const followUps: FollowUp[] = [
  { id: 'f1', title: 'Telepon Anindya Putri', context: 'Deal Branding & Kemasan', time: '10:00', done: false },
  { id: 'f2', title: 'Kirim ulang quotation QUO-0014', context: 'PT Sinar Pangan', time: '11:30', done: false },
  { id: 'f3', title: 'Meeting kickoff Batik Lestari', context: 'Zoom', time: '14:00', done: false },
  { id: 'f4', title: 'Tagih DP Tokoku Indonesia', context: 'INV-2026-0042', time: '16:00', done: true },
];

export type AtRiskProject = { id: string; name: string; client: string; progress: number; daysLeft: number; tone: Tone };

export const atRiskProjects: AtRiskProject[] = [
  { id: 'aplikasi-mobile-loyalty', name: 'Aplikasi Mobile Loyalty', client: 'PT Sinar Pangan', progress: 42, daysLeft: 5, tone: 'red' },
  { id: 'dashboard-logistik', name: 'Dashboard Logistik', client: 'PT Karya Logistik', progress: 58, daysLeft: 12, tone: 'orange' },
  { id: 'katalog-digital-batik', name: 'Katalog Digital Batik', client: 'Batik Lestari', progress: 35, daysLeft: 9, tone: 'red' },
];

export type TeamActivity = { id: string; who: string; whoFull: string; action: string; when: string };

export const teamActivity: TeamActivity[] = [
  { id: 'a1', who: 'Laras', whoFull: 'Laras Ayu', action: 'mengirim quotation QUO-2026-0014', when: '12 mnt' },
  { id: 'a2', who: 'Rizky', whoFull: 'Rizky Aditya', action: 'memindahkan task Desain Home ke Review', when: '1 jam' },
  { id: 'a3', who: 'Nadia', whoFull: 'Nadia Salsabila', action: 'mencatat 3,5 jam di Aplikasi Mobile', when: '2 jam' },
  { id: 'a4', who: 'Dimas', whoFull: 'Dimas Prakoso', action: 'menandai deal Won: Redesain Website', when: '3 jam' },
];
