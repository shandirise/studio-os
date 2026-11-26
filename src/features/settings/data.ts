import { FileText, Landmark, Layers, Link as LinkIcon, ShieldCheck, Upload, User, Users, type LucideIcon } from 'lucide-react';
import type { Crumb } from '@/components/layout/PageMeta';
import type { MemberStatus, Tone } from '@/lib/status';

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

/** First breadcrumb of every settings page. */
export const settingsCrumb: Crumb = { label: 'Settings', to: '/settings/profile' };

export type SettingsNavItem = { label: string; to: string; icon: LucideIcon };

export const settingsNav: SettingsNavItem[] = [
  { label: 'Profil Saya', to: '/settings/profile', icon: User },
  { label: 'Workspace', to: '/settings/workspace', icon: Landmark },
  { label: 'Tim & Role', to: '/settings/team', icon: Users },
  { label: 'Pipeline & Status', to: '/settings/pipeline', icon: Layers },
  { label: 'Template', to: '/settings/templates', icon: FileText },
  { label: 'API & Webhook', to: '/settings/api', icon: LinkIcon },
  { label: 'Import / Export', to: '/settings/import-export', icon: Upload },
  { label: 'Audit Log', to: '/settings/audit-log', icon: ShieldCheck },
];

/* ------------------------------------------------------------------ */
/* I1 · Profil Saya                                                    */
/* ------------------------------------------------------------------ */

export type NotificationId = 'task' | 'mention' | 'quotation' | 'invoice' | 'followUp';
export type NotificationChannels = { email: boolean; inApp: boolean };
export type Theme = 'light' | 'dark' | 'system';

export type ProfileForm = {
  name: string;
  email: string;
  /** Object URL of an uploaded photo; initials are shown when empty. */
  photoUrl: string | null;
  currentPassword: string;
  newPassword: string;
  twoFactor: boolean;
  notifications: Record<NotificationId, NotificationChannels>;
  theme: Theme;
  language: string;
};

export const notificationTypes: Array<{ id: NotificationId; label: string }> = [
  { id: 'task', label: 'Task di-assign' },
  { id: 'mention', label: 'Di-mention' },
  { id: 'quotation', label: 'Quotation disetujui / ditolak' },
  { id: 'invoice', label: 'Invoice dibayar & overdue' },
  { id: 'followUp', label: 'Follow-up jatuh tempo' },
];

export const initialProfile: ProfileForm = {
  name: 'Dimas Prakoso',
  email: 'dimas@kreasinusantara.id',
  photoUrl: null,
  currentPassword: 'studioos26',
  newPassword: '',
  twoFactor: false,
  notifications: {
    task: { email: true, inApp: true },
    mention: { email: true, inApp: true },
    quotation: { email: true, inApp: true },
    invoice: { email: true, inApp: true },
    followUp: { email: false, inApp: true },
  },
  theme: 'light',
  language: 'Bahasa Indonesia',
};

export const themeOptions: Array<{ value: Theme; label: string }> = [
  { value: 'light', label: 'Terang' },
  { value: 'dark', label: 'Gelap' },
  { value: 'system', label: 'Sistem' },
];

export const languageOptions = ['Bahasa Indonesia', 'English'];

/* ------------------------------------------------------------------ */
/* I2 · Workspace                                                      */
/* ------------------------------------------------------------------ */

export type BrandColor = { hex: string; className: string };

/** Brand colors offered in the design (ink and the strong status tones). */
export const brandColors: BrandColor[] = [
  { hex: '#161616', className: 'bg-ink' },
  { hex: '#1B4B8F', className: 'bg-blue-strong' },
  { hex: '#14602F', className: 'bg-green-strong' },
  { hex: '#93440A', className: 'bg-orange-strong' },
  { hex: '#58409C', className: 'bg-purple-strong' },
  { hex: '#962020', className: 'bg-red-strong' },
];

export type WorkspaceForm = {
  businessName: string;
  /** Object URL of an uploaded logo; the initial letter is shown when empty. */
  logoUrl: string | null;
  npwp: string;
  address: string;
  currency: string;
  timezone: string;
  tax: string;
  quotationFormat: string;
  invoiceFormat: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  brandColor: string;
};

export const initialWorkspace: WorkspaceForm = {
  businessName: 'Kreasi Nusantara',
  logoUrl: null,
  npwp: '01.234.567.8-421.000',
  address: 'Jl. Dago Asri No. 18, Bandung 40135',
  currency: 'IDR · Rupiah',
  timezone: 'WIB · Asia/Jakarta',
  tax: 'PPN 11%',
  quotationFormat: 'QUO-{YYYY}-{0000}',
  invoiceFormat: 'INV-{YYYY}-{0000}',
  bank: 'BCA',
  accountNumber: '123 456 7890',
  accountName: 'Kreasi Nusantara',
  brandColor: '#161616',
};

export const workspaceEmail = 'halo@kreasinusantara.id';

/** Letter of the default logo mark shown until a logo is uploaded. */
export const workspaceLogoMark = 'S';

/** Next sequence numbers, used to preview the document number format. */
export const nextDocumentNumber = { year: 2026, quotation: 12, invoice: 44 };

export const currencyOptions = ['IDR · Rupiah', 'USD · US Dollar', 'SGD · Singapore Dollar'];
export const timezoneOptions = ['WIB · Asia/Jakarta', 'WITA · Asia/Makassar', 'WIT · Asia/Jayapura'];
export const taxOptions = ['PPN 11%', 'PPN 12%', 'Tanpa pajak'];
export const bankOptions = ['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB Niaga'];

/* ------------------------------------------------------------------ */
/* I3 · Tim & Role                                                     */
/* ------------------------------------------------------------------ */

export type Role = 'Owner' | 'Manager' | 'Staff';

export type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: MemberStatus;
  lastActive: string;
};

/** The design lists five of the workspace's eight members. */
export const initialMembers: Member[] = [
  { id: 'dp', name: 'Dimas Prakoso', email: 'dimas@kreasinusantara.id', role: 'Owner', status: 'Aktif', lastActive: 'Sekarang' },
  { id: 'la', name: 'Laras Ayu', email: 'laras@kreasinusantara.id', role: 'Manager', status: 'Aktif', lastActive: '12 menit lalu' },
  { id: 'ra', name: 'Rizky Aditya', email: 'rizky@kreasinusantara.id', role: 'Staff', status: 'Aktif', lastActive: '1 jam lalu' },
  { id: 'ns', name: 'Nadia Salsabila', email: 'nadia@kreasinusantara.id', role: 'Staff', status: 'Aktif', lastActive: '2 jam lalu' },
  { id: 'bt', name: 'Bagas Tri', email: 'bagas@kreasinusantara.id', role: 'Staff', status: 'Undangan tertunda', lastActive: '–' },
];

export const roles: Role[] = ['Owner', 'Manager', 'Staff'];

export type PermissionAction = 'view' | 'create' | 'update' | 'delete';

/** Column order and the single-letter header used in the matrix. */
export const permissionActions: Array<{ key: PermissionAction; short: string; label: string }> = [
  { key: 'view', short: 'L', label: 'Lihat' },
  { key: 'create', short: 'B', label: 'Buat' },
  { key: 'update', short: 'U', label: 'Ubah' },
  { key: 'delete', short: 'H', label: 'Hapus' },
];

export type PermissionModule = 'dashboard' | 'crm' | 'quotation' | 'project' | 'finance' | 'reports' | 'settings' | 'auditLog';
export type PermissionSet = Record<PermissionAction, boolean>;
export type PermissionMatrix = Record<PermissionModule, Record<Role, PermissionSet>>;

export const permissionModules: Array<{ id: PermissionModule; label: string }> = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'crm', label: 'CRM (kontak, deal)' },
  { id: 'quotation', label: 'Quotation' },
  { id: 'project', label: 'Project & Task' },
  { id: 'finance', label: 'Invoice & Finance' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
  { id: 'auditLog', label: 'Audit Log' },
];

/** "1100" → { view: true, create: true, update: false, delete: false } */
function permissionSet(bits: string): PermissionSet {
  const [view, create, update, del] = bits.split('').map((b) => b === '1');
  return { view: !!view, create: !!create, update: !!update, delete: !!del };
}

/** Owner · Manager · Staff, four bits each (L B U H), as in the design. */
function row(owner: string, manager: string, staff: string): Record<Role, PermissionSet> {
  return { Owner: permissionSet(owner), Manager: permissionSet(manager), Staff: permissionSet(staff) };
}

export const initialPermissions: PermissionMatrix = {
  dashboard: row('1111', '1111', '1000'),
  crm: row('1111', '1111', '1000'),
  quotation: row('1111', '1111', '0000'),
  project: row('1111', '1111', '1010'),
  finance: row('1111', '1111', '0000'),
  reports: row('1000', '1000', '0000'),
  settings: row('1111', '1000', '1000'),
  auditLog: row('1000', '0000', '0000'),
};

/* ------------------------------------------------------------------ */
/* I4 · Pipeline & Status                                              */
/* ------------------------------------------------------------------ */

export type Stage = { id: string; name: string; probability: number; tone: Tone };

export const initialStages: Stage[] = [
  { id: 'lead', name: 'Lead Masuk', probability: 10, tone: 'gray' },
  { id: 'qualify', name: 'Kualifikasi', probability: 25, tone: 'blue' },
  { id: 'proposal', name: 'Proposal Dikirim', probability: 50, tone: 'purple' },
  { id: 'negotiation', name: 'Negosiasi', probability: 75, tone: 'orange' },
  { id: 'won', name: 'Won', probability: 100, tone: 'green' },
  { id: 'lost', name: 'Lost', probability: 0, tone: 'red' },
];

export const stageTones: Tone[] = ['gray', 'blue', 'purple', 'orange', 'green', 'red', 'yellow', 'dark'];

export type MasterDataGroup = { id: string; label: string; items: string[] };

export const initialMasterData: MasterDataGroup[] = [
  { id: 'lostReasons', label: 'Alasan deal kalah', items: ['Harga terlalu tinggi', 'Memilih kompetitor', 'Timing tidak tepat', 'Tidak ada respon', 'Lainnya'] },
  { id: 'taskColumns', label: 'Kolom task default', items: ['To Do', 'In Progress', 'Review', 'Done'] },
  { id: 'expenseCategories', label: 'Kategori pengeluaran', items: ['Software', 'Iklan', 'Freelancer', 'Operasional'] },
  { id: 'leadSources', label: 'Sumber lead', items: ['Website', 'Referral', 'Instagram', 'LinkedIn'] },
  { id: 'tags', label: 'Tag', items: ['VIP', 'Hot', 'UMKM', 'Retainer'] },
];

export type PipelineForm = { stages: Stage[]; masterData: MasterDataGroup[] };

/* ------------------------------------------------------------------ */
/* I5 · Template                                                       */
/* ------------------------------------------------------------------ */

export type PdfLayout = 'klasik' | 'modern' | 'ringkas';

export const pdfLayouts: Array<{ value: PdfLayout; label: string }> = [
  { value: 'klasik', label: 'Klasik' },
  { value: 'modern', label: 'Modern' },
  { value: 'ringkas', label: 'Ringkas' },
];

export type EmailTemplateId = 'quotation' | 'invoice' | 'reminder' | 'receipt';
export type EmailTemplate = { label: string; subject: string; body: string };

export const emailTemplateOrder: EmailTemplateId[] = ['quotation', 'invoice', 'reminder', 'receipt'];

export const emailVariables = ['{{nama_klien}}', '{{nomor_invoice}}', '{{jatuh_tempo}}', '{{total}}', '{{link_dokumen}}'];

export type CatalogItem = { id: string; name: string; description: string; unit: string; price: number; tax: string };

export const catalogUnits = ['paket', 'bulan', 'jam', 'halaman'];
export const catalogTaxes = ['PPN 11%', 'PPN 12%', 'Tanpa pajak'];

export type TemplatesForm = {
  layout: PdfLayout;
  showLogo: boolean;
  showNpwp: boolean;
  showPageNumber: boolean;
  footer: string;
  emails: Record<EmailTemplateId, EmailTemplate>;
  catalog: CatalogItem[];
};

export const initialTemplates: TemplatesForm = {
  layout: 'modern',
  showLogo: true,
  showNpwp: true,
  showPageNumber: false,
  footer: 'Terima kasih atas kepercayaan Anda.',
  emails: {
    quotation: {
      label: 'Kirim quotation',
      subject: 'Penawaran {{nomor_quotation}} dari {{nama_bisnis}}',
      body: 'Halo {{nama_klien}}, terlampir penawaran {{nomor_quotation}} senilai {{total}}. Penawaran berlaku sampai {{jatuh_tempo}}. Terima kasih.',
    },
    invoice: {
      label: 'Kirim invoice',
      subject: 'Invoice {{nomor_invoice}} dari {{nama_bisnis}}',
      body: 'Halo {{nama_klien}}, terlampir invoice {{nomor_invoice}} sebesar {{total}} dengan jatuh tempo {{jatuh_tempo}}. Lihat dokumen: {{link_dokumen}}. Terima kasih.',
    },
    reminder: {
      label: 'Pengingat jatuh tempo',
      subject: 'Pengingat: {{nomor_invoice}} jatuh tempo {{jatuh_tempo}}',
      body: 'Halo {{nama_klien}}, kami mengingatkan bahwa invoice {{nomor_invoice}} sebesar {{total}} akan jatuh tempo pada {{jatuh_tempo}}. Terima kasih.',
    },
    receipt: {
      label: 'Terima kasih pembayaran',
      subject: 'Pembayaran {{nomor_invoice}} diterima',
      body: 'Halo {{nama_klien}}, pembayaran untuk invoice {{nomor_invoice}} sebesar {{total}} sudah kami terima. Terima kasih atas kepercayaan Anda.',
    },
  },
  catalog: [
    { id: 'uiux', name: 'Desain UI/UX Website', description: 'Riset, wireframe, hi-fi', unit: 'paket', price: 28_000_000, tax: 'PPN 11%' },
    { id: 'frontend', name: 'Pengembangan Frontend', description: 'Next.js, responsif', unit: 'paket', price: 42_000_000, tax: 'PPN 11%' },
    { id: 'maintenance', name: 'Maintenance bulanan', description: 'Update & monitoring', unit: 'bulan', price: 3_000_000, tax: 'PPN 11%' },
  ],
};

/** Sample invoice rendered in the PDF template preview. */
export const previewInvoice = {
  number: 'INV-2026-0044',
  clientName: 'Rina Wulandari',
  clientCompany: 'PT Maju Bersama Digital',
  clientAddress: 'Jl. Jend. Sudirman Kav. 52, Jakarta 12190',
  date: '12 Nov 2026',
  validUntil: '26 Nov 2026',
  reference: 'Deal #D-0218',
  title: 'Redesain dan pengembangan website corporate PT Maju Bersama Digital',
  item: { name: 'Desain UI/UX Website', note: 'Riset & hi-fi', qty: 1, price: 28_000_000 },
  subtotal: 28_000_000,
  total: 31_080_000,
};

/* ------------------------------------------------------------------ */
/* I6 · API & Webhook                                                  */
/* ------------------------------------------------------------------ */

export type ApiKey = { id: string; name: string; maskedKey: string; createdAt: string; lastUsed: string };

export const initialApiKeys: ApiKey[] = [
  { id: 'zapier', name: 'Integrasi Zapier', maskedKey: 'sos_live_••••••••a91c', createdAt: '02 Okt 2026', lastUsed: '2 jam lalu' },
  { id: 'internal', name: 'Dashboard internal', maskedKey: 'sos_live_••••••••77be', createdAt: '14 Sep 2026', lastUsed: '3 hari lalu' },
];

/** The key created just before the designed state, still shown once in full. */
export const freshApiKey = 'sos_live_8f3a91c2d7b04e5a6c1d9e2f7b3a0c58';

export type Webhook = { id: string; url: string; events: string[]; active: boolean };

export const initialWebhooks: Webhook[] = [
  { id: 'zapier', url: 'https://hooks.zapier.com/hooks/catch/…', events: ['deal.won', 'invoice.paid'], active: true },
  { id: 'internal', url: 'https://api.kreasinusantara.id/webhook', events: ['invoice.overdue'], active: true },
];

export type Delivery = { id: string; time: string; event: string; ok: boolean; response: string };

export const initialDeliveries: Delivery[] = [
  { id: 'd1', time: '19 Nov 11:02', event: 'invoice.paid', ok: true, response: 'Diterima dalam 184 ms' },
  { id: 'd2', time: '18 Nov 16:40', event: 'deal.won', ok: true, response: 'Diterima dalam 212 ms' },
  { id: 'd3', time: '17 Nov 09:15', event: 'invoice.overdue', ok: false, response: 'Timeout setelah 10 detik' },
];

export type ApiForm = { webhooks: Webhook[] };

/* ------------------------------------------------------------------ */
/* I7 · Import / Export                                                */
/* ------------------------------------------------------------------ */

export type ImportRecord = { id: string; file: string; kind: string; date: string; ok: boolean; result: string };

export const importHistory: ImportRecord[] = [
  { id: 'i1', file: 'kontak-november.csv', kind: 'Kontak', date: '15 Nov 2026', ok: true, result: '118 berhasil, 3 gagal' },
  { id: 'i2', file: 'perusahaan-q3.csv', kind: 'Perusahaan', date: '02 Okt 2026', ok: true, result: '42 berhasil' },
  { id: 'i3', file: 'kontak-lama.csv', kind: 'Kontak', date: '12 Sep 2026', ok: false, result: 'Format kolom salah' },
];

export const exportModules = ['Kontak', 'Perusahaan', 'Deal', 'Quotation', 'Invoice', 'Pembayaran', 'Pengeluaran', 'Timesheet'];

/* ------------------------------------------------------------------ */
/* I8 · Audit Log                                                      */
/* ------------------------------------------------------------------ */

export type AuditAction = 'Ubah' | 'Buat' | 'Login' | 'Hapus' | 'Export';
export type AuditModule = 'CRM' | 'Quotation' | 'Project' | 'Finance' | 'Settings' | 'Akun';

export const auditActionTone: Record<AuditAction, Tone> = {
  Ubah: 'gray',
  Buat: 'green',
  Login: 'blue',
  Hapus: 'red',
  Export: 'purple',
};

export const auditActions: AuditAction[] = ['Ubah', 'Buat', 'Login', 'Hapus', 'Export'];
export const auditModules: AuditModule[] = ['CRM', 'Quotation', 'Project', 'Finance', 'Settings', 'Akun'];

export type AuditUser = { name: string; role: Role; ip: string };

export const auditUsers: AuditUser[] = [
  { name: 'Dimas Prakoso', role: 'Owner', ip: '103.28.12.40' },
  { name: 'Laras Ayu', role: 'Manager', ip: '103.28.12.41' },
  { name: 'Rizky Aditya', role: 'Staff', ip: '36.72.115.9' },
  { name: 'Nadia Salsabila', role: 'Staff', ip: '114.124.8.22' },
];

export type AuditChange = { field: string; before: string; after: string };

export type AuditEntry = {
  id: string;
  /** Epoch milliseconds. */
  at: number;
  user: AuditUser;
  action: AuditAction;
  module: AuditModule;
  object: string;
  ip: string;
  changes: AuditChange[];
};

/** "Today" in the demo data (matches the dashboard date). */
export const auditToday = new Date(2026, 10, 19);

/** Server-side total shown in the table footer. */
export const auditLogTotal = 2418;
export const auditPageSize = 6;

const [dimas, laras, rizky, nadia] = auditUsers as [AuditUser, AuditUser, AuditUser, AuditUser];

const designedEntries: Array<Omit<AuditEntry, 'id' | 'ip'>> = [
  {
    at: new Date(2026, 10, 19, 11, 2, 14).getTime(),
    user: laras,
    action: 'Ubah',
    module: 'Finance',
    object: 'Invoice INV-2026-0042',
    changes: [
      { field: 'Status', before: 'Draft', after: 'Terkirim' },
      { field: 'Jatuh tempo', before: '30 Nov 2026', after: '25 Nov 2026' },
      { field: 'Dibayar', before: 'Rp 0', after: 'Rp 12.000.000' },
      { field: 'Catatan', before: '–', after: 'DP diterima via BCA' },
    ],
  },
  {
    at: new Date(2026, 10, 19, 10, 48, 3).getTime(),
    user: dimas,
    action: 'Buat',
    module: 'CRM',
    object: 'Deal · Maintenance Tahunan',
    changes: [
      { field: 'Stage', before: '–', after: 'Lead Masuk' },
      { field: 'Nilai', before: '–', after: 'Rp 36.000.000' },
    ],
  },
  { at: new Date(2026, 10, 19, 9, 12, 55).getTime(), user: rizky, action: 'Login', module: 'Akun', object: 'Sesi baru', changes: [] },
  {
    at: new Date(2026, 10, 18, 17, 30, 21).getTime(),
    user: dimas,
    action: 'Hapus',
    module: 'CRM',
    object: 'Kontak · Maya Kusuma',
    changes: [{ field: 'Stage', before: 'Lead', after: '–' }],
  },
  { at: new Date(2026, 10, 18, 15, 4, 10).getTime(), user: laras, action: 'Export', module: 'CRM', object: 'Kontak (1.248 baris)', changes: [] },
  {
    at: new Date(2026, 10, 18, 11, 21, 47).getTime(),
    user: dimas,
    action: 'Ubah',
    module: 'Settings',
    object: 'Workspace · Pajak default',
    changes: [{ field: 'Pajak default', before: 'PPN 10%', after: 'PPN 11%' }],
  },
];

const generatedObjects: Record<AuditAction, Array<{ module: AuditModule; object: string }>> = {
  Ubah: [
    { module: 'Finance', object: 'Invoice INV-2026-0039' },
    { module: 'CRM', object: 'Deal · Redesain Website' },
    { module: 'Project', object: 'Project · Aplikasi Mobile Loyalty' },
    { module: 'CRM', object: 'Kontak · Anindya Putri' },
    { module: 'Quotation', object: 'Quotation QUO-2026-0014' },
    { module: 'Project', object: 'Task · Desain Home' },
  ],
  Buat: [
    { module: 'CRM', object: 'Kontak · Budi Santoso' },
    { module: 'Quotation', object: 'Quotation QUO-2026-0011' },
    { module: 'Project', object: 'Task · Wireframe Checkout' },
    { module: 'Finance', object: 'Invoice INV-2026-0040' },
    { module: 'CRM', object: 'Deal · Kampanye Digital Q1' },
  ],
  Login: [{ module: 'Akun', object: 'Sesi baru' }],
  Hapus: [
    { module: 'Project', object: 'Task · Draft lama' },
    { module: 'CRM', object: 'Kontak · Duplikat Rina W.' },
    { module: 'Project', object: 'File · brief-v1.pdf' },
  ],
  Export: [
    { module: 'Finance', object: 'Invoice (312 baris)' },
    { module: 'CRM', object: 'Deal (86 baris)' },
    { module: 'Project', object: 'Timesheet (540 baris)' },
  ],
};

/** Small deterministic PRNG so the generated history is stable between reloads. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/**
 * The browsable part of the log: the six designed entries followed by older,
 * generated history (50 pages of 6 entries).
 */
function buildAuditLog(count: number): AuditEntry[] {
  const random = seeded(26);
  const pick = <T,>(list: T[]) => list[Math.floor(random() * list.length)]!;
  const entries: AuditEntry[] = designedEntries.map((e, i) => ({ ...e, id: String(i + 1), ip: e.user.ip }));
  let at = entries[entries.length - 1]!.at;

  while (entries.length < count) {
    at -= Math.round((12 + random() * 150) * 60_000 + random() * 59_000);
    const action = pick<AuditAction>(['Ubah', 'Ubah', 'Ubah', 'Buat', 'Buat', 'Login', 'Login', 'Hapus', 'Export']);
    const user = pick([dimas, laras, laras, rizky, nadia]);
    const target = pick(generatedObjects[action]);
    entries.push({ id: String(entries.length + 1), at, user, action, ip: user.ip, changes: [], ...target });
  }
  return entries;
}

export const auditLog: AuditEntry[] = buildAuditLog(50 * auditPageSize);

export type DateRange = 'today' | 'yesterday' | 'week' | 'month';

export const dateRanges: Array<{ value: DateRange; label: string }> = [
  { value: 'today', label: 'Hari ini' },
  { value: 'yesterday', label: 'Kemarin' },
  { value: 'week', label: '7 hari terakhir' },
  { value: 'month', label: '30 hari terakhir' },
];
