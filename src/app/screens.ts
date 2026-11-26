/**
 * Every screen from the Figma file, grouped like the canvas sections.
 * Powers the /screens overview so the whole product can be browsed at once.
 */
export type ScreenEntry = {
  code: string;
  title: string;
  path: string;
  /** The design also has a mobile version of this screen. */
  mobile?: boolean;
};

export type ScreenSection = { title: string; note: string; screens: ScreenEntry[] };

export const screenSections: ScreenSection[] = [
  {
    title: 'DS · Design System',
    note: 'Token dan komponen',
    screens: [{ code: 'DS', title: 'Design System', path: '/design-system' }],
  },
  {
    title: 'A · Auth & Onboarding',
    note: 'Login, register, verifikasi, password, undangan, onboarding',
    screens: [
      { code: 'A1', title: 'Login', path: '/login', mobile: true },
      { code: 'A2', title: 'Register', path: '/register' },
      { code: 'A2', title: 'Verifikasi Email', path: '/verify-email' },
      { code: 'A3', title: 'Lupa Password', path: '/forgot-password' },
      { code: 'A3', title: 'Lupa Password · Terkirim', path: '/forgot-password?sent=1' },
      { code: 'A4', title: 'Reset Password', path: '/reset-password' },
      { code: 'A5', title: 'Terima Undangan', path: '/invite' },
      { code: 'A6', title: 'Onboarding Wizard', path: '/onboarding?step=2' },
    ],
  },
  {
    title: 'B · Dashboard',
    note: 'Versi Owner/Manager',
    screens: [{ code: 'B1', title: 'Dashboard', path: '/', mobile: true }],
  },
  {
    title: 'C · CRM',
    note: 'Kontak, perusahaan, deals, aktivitas, import',
    screens: [
      { code: 'C1', title: 'Kontak', path: '/crm/contacts' },
      { code: 'C2', title: 'Kontak — Detail', path: '/crm/contacts/rina-wulandari' },
      { code: 'C3', title: 'Perusahaan — List', path: '/crm/companies' },
      { code: 'C4', title: 'Perusahaan — Detail', path: '/crm/companies/pt-maju-bersama-digital' },
      { code: 'C5', title: 'Deals — Pipeline', path: '/crm/deals' },
      { code: 'C6', title: 'Deal — Detail', path: '/crm/deals/redesain-website-corporate' },
      { code: 'C7', title: 'Aktivitas & Follow-up', path: '/crm/activities' },
      { code: 'C8', title: 'Import CSV · Mapping kolom', path: '/crm/import' },
      { code: 'C8', title: 'Import CSV · Preview & validasi', path: '/crm/import?step=preview' },
    ],
  },
  {
    title: 'D · Sales — Quotation',
    note: 'List, editor dengan live preview, detail',
    screens: [
      { code: 'D1', title: 'Quotation — List', path: '/sales/quotations' },
      { code: 'D2', title: 'Quotation — Editor', path: '/sales/quotations/new' },
      { code: 'D3', title: 'Quotation — Detail', path: '/sales/quotations/quo-2026-0012' },
    ],
  },
  {
    title: 'E · Project',
    note: 'List, detail, task, my tasks, timesheet',
    screens: [
      { code: 'E1', title: 'Project — List', path: '/projects' },
      { code: 'E2', title: 'Project — Detail (Task)', path: '/projects/website-corporate-v1' },
      { code: 'E3', title: 'Task Detail (drawer)', path: '/projects/website-corporate-v1?task=TASK-142' },
      { code: 'E4', title: 'My Tasks', path: '/my-tasks', mobile: true },
      { code: 'E5', title: 'Timesheet', path: '/timesheet' },
    ],
  },
  {
    title: 'F · Finance',
    note: 'Invoice, pembayaran, pengeluaran',
    screens: [
      { code: 'F1', title: 'Invoice — List', path: '/finance/invoices' },
      { code: 'F2', title: 'Invoice — Editor', path: '/finance/invoices/new' },
      { code: 'F3', title: 'Invoice — Detail', path: '/finance/invoices/inv-2026-0041' },
      { code: 'F4', title: 'Pembayaran', path: '/finance/payments' },
      { code: 'F5', title: 'Pengeluaran', path: '/finance/expenses' },
    ],
  },
  {
    title: 'G · Reports',
    note: 'Sales, Pipeline, Project, Tim, Keuangan',
    screens: [
      { code: 'G1', title: 'Reports · Sales', path: '/reports/sales' },
      { code: 'G1', title: 'Reports · Pipeline', path: '/reports/pipeline' },
      { code: 'G1', title: 'Reports · Project', path: '/reports/projects' },
      { code: 'G1', title: 'Reports · Tim', path: '/reports/team' },
      { code: 'G1', title: 'Reports · Keuangan', path: '/reports/finance' },
    ],
  },
  {
    title: 'H · Global',
    note: 'Notifikasi dan command palette (Ctrl K)',
    screens: [
      { code: 'H1', title: 'Notifikasi', path: '/notifications' },
      { code: 'H2', title: 'Command Palette', path: '/?cmdk=1' },
    ],
  },
  {
    title: 'I · Settings',
    note: 'Profil, workspace, tim, pipeline, template, API, import/export, audit log',
    screens: [
      { code: 'I1', title: 'Profil Saya', path: '/settings/profile' },
      { code: 'I2', title: 'Workspace', path: '/settings/workspace' },
      { code: 'I3', title: 'Tim & Role', path: '/settings/team' },
      { code: 'I4', title: 'Pipeline & Status', path: '/settings/pipeline' },
      { code: 'I5', title: 'Template', path: '/settings/templates' },
      { code: 'I6', title: 'API & Webhook', path: '/settings/api' },
      { code: 'I7', title: 'Import / Export', path: '/settings/import-export' },
      { code: 'I8', title: 'Audit Log', path: '/settings/audit-log' },
      { code: 'I8', title: 'Audit Log Detail (drawer)', path: '/settings/audit-log?entry=1' },
    ],
  },
  {
    title: 'J · Client Portal',
    note: 'Login, beranda, project, quotation, invoice, file',
    screens: [
      { code: 'J1', title: 'Portal Login', path: '/portal/login', mobile: true },
      { code: 'J2', title: 'Portal Beranda', path: '/portal', mobile: true },
      { code: 'J3', title: 'Portal Project', path: '/portal/projects', mobile: true },
      { code: 'J4', title: 'Portal Quotation', path: '/portal/quotations/quo-2026-0012', mobile: true },
      { code: 'M4', title: 'Setujui Quotation (modal)', path: '/portal/quotations/quo-2026-0012?approve=1', mobile: true },
      { code: 'J5', title: 'Portal Invoice', path: '/portal/invoices', mobile: true },
      { code: 'J6', title: 'Portal File', path: '/portal/files', mobile: true },
    ],
  },
  {
    title: 'K · Sistem & Modal',
    note: 'Halaman error dan modal utama',
    screens: [
      { code: 'K1', title: '404 Tidak Ditemukan', path: '/halaman-tidak-ada' },
      { code: 'K2', title: '403 Tanpa Akses', path: '/403' },
      { code: 'K3', title: '500 Error Server', path: '/500' },
      { code: 'K4', title: 'Maintenance', path: '/maintenance' },
      { code: 'K5', title: 'Link Kadaluarsa', path: '/link-expired' },
      { code: 'M1', title: 'Tambah Kontak', path: '/crm/contacts?new=1' },
      { code: 'M2', title: 'Alasan Deal Lost', path: '/crm/deals/redesain-website-corporate?lost=1' },
      { code: 'M3', title: 'Catat Pembayaran', path: '/finance/invoices/inv-2026-0041?pay=1' },
      { code: 'M5', title: 'Hapus Kontak?', path: '/crm/contacts/maya-kusuma?delete=1' },
    ],
  },
];
