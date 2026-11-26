import { Briefcase, LayoutGrid, Send, ShieldCheck, User, Users, type LucideIcon } from 'lucide-react';

/* ── A1 Login ─────────────────────────────────────────────── */

export type DemoRole = {
  role: 'Owner' | 'Manager' | 'Staff' | 'Client';
  description: string;
  icon: LucideIcon;
  /** Landing route for this role. */
  to: string;
};

/** "Coba Demo" one-click logins. */
export const demoRoles: DemoRole[] = [
  { role: 'Owner', description: 'Akses penuh', icon: ShieldCheck, to: '/' },
  { role: 'Manager', description: 'CRM, Sales, Finance', icon: Briefcase, to: '/' },
  { role: 'Staff', description: 'Task & timesheet', icon: User, to: '/my-tasks' },
  { role: 'Client', description: 'Portal klien', icon: Users, to: '/portal' },
];

/** Product mock on the dark login panel. */
export const productSummary = {
  kpis: [
    { label: 'Revenue', value: 'Rp 148,2 jt' },
    { label: 'Outstanding', value: 'Rp 62,5 jt' },
    { label: 'Win rate', value: '38%' },
  ],
  /** Bar heights in px; the last one is the current month. */
  bars: [40, 56, 48, 70, 62, 84, 76, 96],
  invoice: 'INV-2026-0041 · PT Maju Bersama',
} as const;

/* ── A2 Register ──────────────────────────────────────────── */

export const setupSteps: Array<{ icon: LucideIcon; text: string }> = [
  { icon: LayoutGrid, text: 'Buat workspace dan atur pajak serta nomor dokumen' },
  { icon: Users, text: 'Undang tim dan klien dengan satu klik' },
  { icon: Send, text: 'Kirim quotation pertama hari ini' },
];

/* ── A5 Terima Undangan ───────────────────────────────────── */

export const invitation = {
  inviter: 'Dimas Prakoso',
  role: 'Staff',
  name: 'Nadia Salsabila',
  email: 'nadia@kreasinusantara.id',
  expiresAt: '24 Nov 2026',
} as const;

/* ── A6 Onboarding ────────────────────────────────────────── */

export type OnboardingStepId = 'workspace' | 'finance' | 'team' | 'done';

export const onboardingSteps: Array<{ id: OnboardingStepId; label: string; title: string; description: string }> = [
  {
    id: 'workspace',
    label: 'Workspace',
    title: 'Profil workspace',
    description: 'Nama dan detail ini tampil di quotation, invoice, dan portal klien.',
  },
  {
    id: 'finance',
    label: 'Keuangan',
    title: 'Pengaturan keuangan',
    description: 'Dipakai otomatis di quotation dan invoice. Bisa diubah nanti di Settings.',
  },
  {
    id: 'team',
    label: 'Undang Tim',
    title: 'Undang tim',
    description: 'Kirim undangan lewat email. Anggota bisa langsung masuk setelah menerima.',
  },
  {
    id: 'done',
    label: 'Selesai',
    title: 'Workspace siap dipakai',
    description: 'Pengaturan dasar sudah tersimpan. Semua bisa diubah nanti di Settings.',
  },
];

export type WorkspaceForm = {
  name: string;
  businessType: string;
  teamSize: string;
  timezone: string;
  address: string;
};

export type FinanceForm = {
  currency: CurrencyCode;
  tax: string;
  quotationFormat: string;
  invoiceFormat: string;
  bank: string;
  accountNumber: string;
  accountName: string;
};

export type InviteRole = 'Manager' | 'Staff' | 'Client';
export type TeamInvite = { id: number; email: string; role: InviteRole };

export type OnboardingForm = {
  workspace: WorkspaceForm;
  finance: FinanceForm;
  invites: TeamInvite[];
};

export const initialOnboarding: OnboardingForm = {
  workspace: {
    name: 'Kreasi Nusantara',
    businessType: 'Agency',
    teamSize: '6–15 orang',
    timezone: 'WIB · Jakarta (GMT+7)',
    address: 'Jl. Kemang Raya No. 18, Jakarta Selatan',
  },
  finance: {
    currency: 'IDR',
    tax: 'PPN 11%',
    quotationFormat: 'QUO-{YYYY}-{0000}',
    invoiceFormat: 'INV-{YYYY}-{0000}',
    bank: 'BCA',
    accountNumber: '123 456 7890',
    accountName: 'Kreasi Nusantara',
  },
  invites: [
    { id: 1, email: 'laras@kreasinusantara.id', role: 'Manager' },
    { id: 2, email: 'rizky@kreasinusantara.id', role: 'Staff' },
  ],
};

export const businessTypes = ['Agency', 'Software house', 'Konsultan', 'Freelancer', 'Production house'];
export const teamSizes = ['1–5 orang', '6–15 orang', '16–50 orang', '50+ orang'];
export const timezones = ['WIB · Jakarta (GMT+7)', 'WITA · Makassar (GMT+8)', 'WIT · Jayapura (GMT+9)'];

export type CurrencyCode = 'IDR' | 'USD' | 'SGD';

export const currencies: Array<{ value: CurrencyCode; label: string; symbol: string; sampleSubtotal: number }> = [
  { value: 'IDR', label: 'IDR · Rupiah Indonesia', symbol: 'Rp', sampleSubtotal: 10_000_000 },
  { value: 'USD', label: 'USD · Dolar Amerika', symbol: 'US$', sampleSubtotal: 1_000 },
  { value: 'SGD', label: 'SGD · Dolar Singapura', symbol: 'S$', sampleSubtotal: 1_000 },
];

export const taxes: Array<{ value: string; rate: number }> = [
  { value: 'PPN 11%', rate: 0.11 },
  { value: 'PPN 12%', rate: 0.12 },
  { value: 'Tanpa pajak', rate: 0 },
];

export const banks = ['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB Niaga'];

export const inviteRoles: Array<{ role: InviteRole; description: string }> = [
  { role: 'Manager', description: 'CRM, Sales, Finance' },
  { role: 'Staff', description: 'Task & timesheet' },
  { role: 'Client', description: 'Portal klien' },
];

/** Shortcuts offered on the last onboarding step. */
export const nextActions: Array<{ label: string; description: string; to: string }> = [
  { label: 'Tambah kontak pertama', description: 'Catat lead dan klien di CRM', to: '/crm/contacts?new=1' },
  { label: 'Buat quotation', description: 'Kirim penawaran dalam hitungan menit', to: '/sales/quotations/new' },
  { label: 'Atur tim & peran', description: 'Kelola anggota dan undangan', to: '/settings/team' },
];
