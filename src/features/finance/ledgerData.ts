/** Mock data for F4 · Pembayaran and F5 · Pengeluaran. Dates are ISO strings (sortable). */

export type LedgerStat = { label: string; value: string };

export type SortDirection = 'desc' | 'asc';

export type PeriodOption = { label: string; /** Inclusive start date (ISO). */ from: string };

/** "Today" in the demo is 19 Nov 2026. */
export const periodOptions: PeriodOption[] = [
  { label: '7 hari terakhir', from: '2026-11-13' },
  { label: '14 hari terakhir', from: '2026-11-06' },
  { label: 'Bulan ini', from: '2026-11-01' },
];

const dateFormat = new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

/** "2026-11-19" → "19 Nov 2026" */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00`));
}

export function sortByDate<T extends { date: string }>(rows: T[], direction: SortDirection): T[] {
  const sign = direction === 'desc' ? -1 : 1;
  return [...rows].sort((a, b) => sign * a.date.localeCompare(b.date));
}

/* ------------------------------------------------------------------ */
/* F4 · Pembayaran                                                     */
/* ------------------------------------------------------------------ */

export type PaymentMethod = 'Transfer bank' | 'QRIS' | 'E-wallet' | 'Tunai';

export const paymentMethods: PaymentMethod[] = ['Transfer bank', 'QRIS', 'E-wallet', 'Tunai'];

export type Payment = {
  id: string;
  date: string;
  invoiceId: string;
  invoiceNumber: string;
  client: string;
  method: PaymentMethod;
  amount: number;
  recordedBy: string;
};

export const paymentStats: LedgerStat[] = [
  { label: 'Diterima bulan ini', value: 'Rp 148,2 jt' },
  { label: 'Transfer bank', value: 'Rp 121,0 jt' },
  { label: 'E-wallet & QRIS', value: 'Rp 19,2 jt' },
  { label: 'Tunai', value: 'Rp 8,0 jt' },
];

/** Total recorded payments (the table shows the latest page). */
export const paymentCount = 52;
export const paymentPageSize = 7;

export const payments: Payment[] = [
  { id: 'pay-1', date: '2026-11-19', invoiceId: 'inv-2026-0042', invoiceNumber: 'INV-2026-0042', client: 'Tokoku Indonesia', method: 'Transfer bank', amount: 12_000_000, recordedBy: 'Laras Ayu' },
  { id: 'pay-2', date: '2026-11-17', invoiceId: 'inv-2026-0040', invoiceNumber: 'INV-2026-0040', client: 'PT Bumi Agro Mandiri', method: 'Transfer bank', amount: 31_500_000, recordedBy: 'Dimas Prakoso' },
  { id: 'pay-3', date: '2026-11-14', invoiceId: 'inv-2026-0039', invoiceNumber: 'INV-2026-0039', client: 'PT Karya Logistik Prima', method: 'Transfer bank', amount: 60_000_000, recordedBy: 'Dimas Prakoso' },
  { id: 'pay-4', date: '2026-11-12', invoiceId: 'inv-2026-0037', invoiceNumber: 'INV-2026-0037', client: 'Batik Lestari Studio', method: 'QRIS', amount: 5_200_000, recordedBy: 'Laras Ayu' },
  { id: 'pay-5', date: '2026-11-08', invoiceId: 'inv-2026-0035', invoiceNumber: 'INV-2026-0035', client: 'PT Bumi Agro Mandiri', method: 'Transfer bank', amount: 49_000_000, recordedBy: 'Dimas Prakoso' },
  { id: 'pay-6', date: '2026-11-05', invoiceId: 'inv-2026-0033', invoiceNumber: 'INV-2026-0033', client: 'CV Kopi Senja', method: 'Tunai', amount: 8_000_000, recordedBy: 'Laras Ayu' },
  { id: 'pay-7', date: '2026-11-02', invoiceId: 'inv-2026-0032', invoiceNumber: 'INV-2026-0032', client: 'Tokoku Indonesia', method: 'E-wallet', amount: 14_000_000, recordedBy: 'Dimas Prakoso' },
];

/* ------------------------------------------------------------------ */
/* F5 · Pengeluaran                                                    */
/* ------------------------------------------------------------------ */

export type ExpenseCategory = 'Software' | 'Freelancer' | 'Iklan' | 'Operasional';

export const expenseCategories: ExpenseCategory[] = ['Software', 'Freelancer', 'Iklan', 'Operasional'];

/** "Internal" expenses are not tied to a client project. */
export const expenseProjects = ['Internal', 'Website Corporate v1', 'Aplikasi Mobile Loyalty', 'Landing Page Promo', 'Dashboard Logistik'];

export type Expense = {
  id: string;
  date: string;
  category: ExpenseCategory;
  description: string;
  project: string;
  amount: number;
  recordedBy: string;
};

export const expenseTotal = { label: 'Total pengeluaran · Nov 2026', value: 'Rp 38.750.000' };

/** Share of this month's spend per category, in percent. */
export const expenseBreakdown: Array<{ category: ExpenseCategory; percent: number }> = [
  { category: 'Software', percent: 32 },
  { category: 'Freelancer', percent: 28 },
  { category: 'Iklan', percent: 24 },
  { category: 'Operasional', percent: 16 },
];

export const expenseCount = 38;
export const expensePageSize = 6;

export const expenses: Expense[] = [
  { id: 'exp-1', date: '2026-11-18', category: 'Software', description: 'Lisensi Figma Organization (12 kursi)', project: 'Internal', amount: 6_480_000, recordedBy: 'Dimas Prakoso' },
  { id: 'exp-2', date: '2026-11-16', category: 'Freelancer', description: 'Ilustrator · aset kampanye', project: 'Aplikasi Mobile Loyalty', amount: 4_500_000, recordedBy: 'Laras Ayu' },
  { id: 'exp-3', date: '2026-11-14', category: 'Iklan', description: 'Meta Ads · promo Landing Page', project: 'Landing Page Promo', amount: 3_200_000, recordedBy: 'Laras Ayu' },
  { id: 'exp-4', date: '2026-11-11', category: 'Operasional', description: 'Sewa coworking space', project: 'Internal', amount: 7_500_000, recordedBy: 'Dimas Prakoso' },
  { id: 'exp-5', date: '2026-11-08', category: 'Software', description: 'Vercel Pro + domain', project: 'Website Corporate v1', amount: 1_150_000, recordedBy: 'Dimas Prakoso' },
  { id: 'exp-6', date: '2026-11-05', category: 'Freelancer', description: 'QA tester · 3 hari', project: 'Dashboard Logistik', amount: 2_700_000, recordedBy: 'Laras Ayu' },
];

/** Route of a project detail page, or undefined for internal spend. */
export function projectPath(project: string): string | undefined {
  if (project === 'Internal') return undefined;
  return `/projects/${project.toLowerCase().replace(/\s+/g, '-')}`;
}
