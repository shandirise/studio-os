import { addDays, TODAY, type BillingTerm, type LineItem, type TimelineEvent } from '@/features/sales/components/document';
import { dealById, findQuotation, type Quotation } from '@/features/sales/data';
import { currentUser } from '@/data/workspace';
import type { InvoiceStatus } from '@/lib/status';

/* ------------------------------------------------------------------ */
/* Projects referenced by invoices                                     */
/* ------------------------------------------------------------------ */

export type InvoiceProject = { id: string; name: string; dealId: string };

export const invoiceProjects: InvoiceProject[] = [
  { id: 'website-corporate-v1', name: 'Website Corporate v1', dealId: 'redesain-website-corporate' },
  { id: 'aplikasi-mobile-loyalty', name: 'Aplikasi Mobile Loyalty', dealId: 'aplikasi-mobile-loyalty' },
  { id: 'dashboard-logistik', name: 'Dashboard Logistik', dealId: 'sistem-dashboard-logistik' },
  { id: 'katalog-digital-batik', name: 'Katalog Digital Batik', dealId: 'katalog-digital-batik' },
  { id: 'landing-page-promo', name: 'Landing Page Promo', dealId: 'landing-page-promo' },
  { id: 'portal-petani-mitra', name: 'Portal Petani Mitra', dealId: 'portal-petani-mitra' },
  { id: 'branding-kemasan', name: 'Branding & Kemasan', dealId: 'branding-kemasan' },
];

export function projectById(id: string): InvoiceProject {
  return invoiceProjects.find((p) => p.id === id) ?? invoiceProjects[0]!;
}

/* ------------------------------------------------------------------ */
/* Invoices                                                            */
/* ------------------------------------------------------------------ */

export const paymentMethods = ['Transfer bank', 'Virtual account', 'QRIS', 'Kartu kredit', 'Tunai'] as const;
export type PaymentMethod = (typeof paymentMethods)[number];

export type Payment = {
  id: string;
  /** ISO date. */
  date: string;
  amount: number;
  method: PaymentMethod;
  note: string;
  /** File name of the uploaded transfer proof. */
  proofName: string | null;
};

export type ReminderKey = 'before3' | 'onDue' | 'after7';

/** Lifecycle the user controls; paid / overdue states are derived from payments and dates. */
export type InvoiceStage = 'Draft' | 'Terkirim' | 'Batal';

export type Invoice = {
  /** Lower-case number, e.g. "inv-2026-0041". */
  id: string;
  number: string;
  clientId: string;
  projectId: string;
  sourceQuotationId: string | null;
  /** ISO dates. */
  issueDate: string;
  dueDate: string;
  subject: string;
  items: LineItem[];
  /** Overall discount in Rupiah. */
  discount: number;
  taxRate: number;
  /** Portion of the total billed, e.g. DP 50%; null bills the full total. */
  term: BillingTerm | null;
  /** "Instruksi pembayaran". */
  notes: string;
  stage: InvoiceStage;
  payments: Payment[];
  reminders: Record<ReminderKey, boolean>;
  recurring: boolean;
  timeline: TimelineEvent[];
};

/** The record shown in the design (F3); detail pages fall back to it. */
export const DESIGNED_INVOICE_ID = 'inv-2026-0041';

export const defaultPaymentInstructions =
  'Transfer ke BCA 123 456 7890 a.n. Kreasi Nusantara. Cantumkan nomor invoice pada berita transfer.';

const allReminders: Record<ReminderKey, boolean> = { before3: true, onDue: true, after7: true };

function line(id: string, name: string, description: string, price: number, qty = 1, unit = 'paket'): LineItem {
  return { id, name, description, qty, unit, price, discount: 0 };
}

function payment(id: string, date: string, amount: number, note: string): Payment {
  return { id, date, amount, method: 'Transfer bank', note, proofName: `bukti-${id}.pdf` };
}

const initialInvoices: Invoice[] = [
  {
    id: 'inv-2026-0043',
    number: 'INV-2026-0043',
    clientId: 'pt-bumi-agro-mandiri',
    projectId: 'portal-petani-mitra',
    sourceQuotationId: 'quo-2026-0008',
    issueDate: '2026-11-15',
    dueDate: '2026-11-30',
    subject: 'Portal kemitraan petani PT Bumi Agro Mandiri — termin 2',
    items: [line('i43-1', 'Pengembangan Portal Web', 'Termin 2 · sprint 3–4', 18_600_000)],
    discount: 0,
    taxRate: 0,
    term: null,
    notes: defaultPaymentInstructions,
    stage: 'Terkirim',
    payments: [],
    reminders: allReminders,
    recurring: false,
    timeline: [
      { id: 'sent', icon: 'send', actor: 'Laras Ayu', action: 'mengirim invoice', time: '4 hari lalu' },
      { id: 'created', icon: 'file', actor: 'Laras Ayu', action: 'membuat invoice', time: '4 hari lalu' },
    ],
  },
  {
    id: 'inv-2026-0042',
    number: 'INV-2026-0042',
    clientId: 'tokoku-indonesia',
    projectId: 'landing-page-promo',
    sourceQuotationId: null,
    issueDate: '2026-11-10',
    dueDate: '2026-11-25',
    subject: 'Landing page dan kampanye promo akhir tahun Tokoku Indonesia',
    items: [
      line('i42-1', 'Desain & Pengembangan Landing Page', 'Responsif, form leads, analytics', 16_000_000),
      line('i42-2', 'Kampanye Iklan Digital', 'Setup & optimasi 1 bulan', 8_000_000),
    ],
    discount: 0,
    taxRate: 0,
    term: null,
    notes: defaultPaymentInstructions,
    stage: 'Terkirim',
    payments: [payment('p42-1', '2026-11-12', 12_000_000, 'DP 50% via BCA.')],
    reminders: allReminders,
    recurring: false,
    timeline: [
      { id: 'paid', icon: 'wallet', actor: 'Dimas Prakoso', action: 'mencatat pembayaran Rp 12.000.000', time: '7 hari lalu' },
      { id: 'sent', icon: 'send', actor: 'Laras Ayu', action: 'mengirim invoice', time: '9 hari lalu' },
      { id: 'created', icon: 'file', actor: 'Laras Ayu', action: 'membuat invoice', time: '9 hari lalu' },
    ],
  },
  {
    id: 'inv-2026-0041',
    number: 'INV-2026-0041',
    clientId: 'pt-maju-bersama-digital',
    projectId: 'website-corporate-v1',
    sourceQuotationId: 'quo-2026-0012',
    issueDate: '2026-11-07',
    dueDate: '2026-11-21',
    subject: 'Redesain dan pengembangan website corporate PT Maju Bersama Digital',
    items: [
      line('i41-1', 'Desain UI/UX Website', 'Riset, wireframe, 12 halaman hi-fi', 28_000_000),
      line('i41-2', 'Pengembangan Frontend', 'Next.js, responsif, animasi dasar', 42_000_000),
      line('i41-3', 'Integrasi CMS & SEO dasar', 'Headless CMS, meta, sitemap', 15_000_000),
    ],
    discount: 0,
    taxRate: 0.11,
    term: { label: 'DP 50%', percent: 50 },
    notes: defaultPaymentInstructions,
    stage: 'Terkirim',
    payments: [],
    reminders: allReminders,
    recurring: false,
    timeline: [
      { id: 'opened', icon: 'eye', actor: 'Rina Wulandari', action: 'membuka invoice', time: '1 jam lalu' },
      { id: 'sent', icon: 'send', actor: 'Laras Ayu', action: 'mengirim invoice', time: '12 hari lalu' },
      { id: 'created', icon: 'file', actor: 'Laras Ayu', action: 'membuat dari quotation', time: '12 hari lalu' },
    ],
  },
  {
    id: 'inv-2026-0038',
    number: 'INV-2026-0038',
    clientId: 'batik-lestari-studio',
    projectId: 'katalog-digital-batik',
    sourceQuotationId: null,
    issueDate: '2026-10-27',
    dueDate: '2026-11-10',
    subject: 'Katalog digital koleksi Batik Lestari Studio — termin 1',
    items: [line('i38-1', 'Desain Katalog Digital', 'Termin 1 · art direction & 20 halaman', 8_200_000)],
    discount: 0,
    taxRate: 0,
    term: null,
    notes: defaultPaymentInstructions,
    stage: 'Terkirim',
    payments: [],
    reminders: allReminders,
    recurring: false,
    timeline: [
      { id: 'reminded', icon: 'send', actor: 'Studio OS', action: 'mengirim reminder H+7', time: '2 hari lalu' },
      { id: 'sent', icon: 'send', actor: 'Laras Ayu', action: 'mengirim invoice', time: '23 hari lalu' },
      { id: 'created', icon: 'file', actor: 'Laras Ayu', action: 'membuat invoice', time: '23 hari lalu' },
    ],
  },
  {
    id: 'inv-2026-0036',
    number: 'INV-2026-0036',
    clientId: 'pt-karya-logistik-prima',
    projectId: 'dashboard-logistik',
    sourceQuotationId: 'quo-2026-0011',
    issueDate: '2026-10-19',
    dueDate: '2026-11-02',
    subject: 'Sistem dashboard monitoring armada — termin 2',
    items: [line('i36-1', 'Pengembangan Dashboard Web', 'Termin 2 · modul peta armada', 24_500_000)],
    discount: 0,
    taxRate: 0,
    term: null,
    notes: defaultPaymentInstructions,
    stage: 'Terkirim',
    payments: [],
    reminders: allReminders,
    recurring: false,
    timeline: [
      { id: 'reminded', icon: 'send', actor: 'Studio OS', action: 'mengirim reminder H+7', time: '10 hari lalu' },
      { id: 'sent', icon: 'send', actor: 'Dimas Prakoso', action: 'mengirim invoice', time: '1 bulan lalu' },
      { id: 'created', icon: 'file', actor: 'Dimas Prakoso', action: 'membuat invoice', time: '1 bulan lalu' },
    ],
  },
  {
    id: 'inv-2026-0035',
    number: 'INV-2026-0035',
    clientId: 'pt-bumi-agro-mandiri',
    projectId: 'portal-petani-mitra',
    sourceQuotationId: 'quo-2026-0008',
    issueDate: '2026-10-02',
    dueDate: '2026-10-16',
    subject: 'Portal kemitraan petani PT Bumi Agro Mandiri — termin 1',
    items: [
      line('i35-1', 'Desain UI/UX Portal', 'Riset lapangan, 20 layar hi-fi', 32_000_000),
      line('i35-2', 'Setup Infrastruktur Cloud', 'Server, domain, CI/CD', 17_000_000),
    ],
    discount: 0,
    taxRate: 0,
    term: null,
    notes: defaultPaymentInstructions,
    stage: 'Terkirim',
    payments: [payment('p35-1', '2026-10-14', 49_000_000, 'Pelunasan termin 1 via BCA.')],
    reminders: allReminders,
    recurring: false,
    timeline: [
      { id: 'paid', icon: 'wallet', actor: 'Dimas Prakoso', action: 'mencatat pembayaran Rp 49.000.000', time: '1 bulan lalu' },
      { id: 'sent', icon: 'send', actor: 'Dimas Prakoso', action: 'mengirim invoice', time: '1 bulan lalu' },
      { id: 'created', icon: 'file', actor: 'Dimas Prakoso', action: 'membuat dari quotation', time: '1 bulan lalu' },
    ],
  },
  {
    id: 'inv-2026-0034',
    number: 'INV-2026-0034',
    clientId: 'pt-sinar-pangan-sejahtera',
    projectId: 'aplikasi-mobile-loyalty',
    sourceQuotationId: null,
    issueDate: '2026-09-28',
    dueDate: '2026-10-12',
    subject: 'Aplikasi mobile loyalty PT Sinar Pangan Sejahtera — termin 1',
    items: [line('i34-1', 'Aplikasi Mobile', 'Termin 1 · iOS & Android', 45_000_000, 2, 'platform')],
    discount: 0,
    taxRate: 0,
    term: null,
    notes: defaultPaymentInstructions,
    stage: 'Terkirim',
    payments: [payment('p34-1', '2026-10-10', 90_000_000, 'Pelunasan termin 1 via BCA.')],
    reminders: allReminders,
    recurring: false,
    timeline: [
      { id: 'paid', icon: 'wallet', actor: 'Dimas Prakoso', action: 'mencatat pembayaran Rp 90.000.000', time: '1 bulan lalu' },
      { id: 'sent', icon: 'send', actor: 'Laras Ayu', action: 'mengirim invoice', time: '2 bulan lalu' },
      { id: 'created', icon: 'file', actor: 'Laras Ayu', action: 'membuat invoice', time: '2 bulan lalu' },
    ],
  },
];

/** Design counts per tab (the list only holds the first page of 58 invoices). */
export const invoiceTabCounts: Record<InvoiceStatus | 'all', number> = {
  all: 58,
  Draft: 3,
  Terkirim: 7,
  'Dibayar Sebagian': 2,
  Lunas: 44,
  Overdue: 2,
  Batal: 0,
};

export const INVOICE_TOTAL_COUNT = 58;

/** Headline figures of F1 (whole archive, not just the visible page). */
export const invoiceSummary = [
  { label: 'Total outstanding', value: 'Rp 62,5 jt', caption: 'Dari 7 invoice' },
  { label: 'Overdue', value: 'Rp 32,7 jt', caption: '2 invoice · perlu tindakan', danger: true },
  { label: 'Dibayar bulan ini', value: 'Rp 148,2 jt', caption: '+12,4% vs Oktober' },
  { label: 'Draft', value: '3', caption: 'Belum dikirim' },
];

/* ------------------------------------------------------------------ */
/* In-memory store: edits survive navigation until the page reloads.   */
/* ------------------------------------------------------------------ */

const store = new Map(initialInvoices.map((inv) => [inv.id, inv]));

export function listInvoices(): Invoice[] {
  return [...store.values()];
}

/** Looks an invoice up by id and falls back to the designed record. */
export function findInvoice(id: string | undefined): Invoice {
  return (id && store.get(id)) || store.get(DESIGNED_INVOICE_ID)!;
}

export function saveInvoice(invoice: Invoice): void {
  store.set(invoice.id, invoice);
}

function nextInvoiceNumber(): string {
  const last = Math.max(...listInvoices().map((inv) => Number(inv.number.slice(-4))));
  return `INV-2026-${String(last + 1).padStart(4, '0')}`;
}

/** Project created from the quotation's deal (falls back to the designed project). */
function projectForQuotation(quotation: Quotation): InvoiceProject {
  const deal = dealById(quotation.dealId);
  return invoiceProjects.find((p) => p.dealId === deal?.id) ?? invoiceProjects[0]!;
}

/** New draft invoice billing DP 50% of a quotation (QUO-2026-0012 by default, as in the design). */
export function createInvoiceDraft(quotationId?: string): Invoice {
  const quotation = findQuotation(quotationId);
  const number = nextInvoiceNumber();
  return {
    id: number.toLowerCase(),
    number,
    clientId: quotation.clientId,
    projectId: projectForQuotation(quotation).id,
    sourceQuotationId: quotation.id,
    issueDate: TODAY,
    dueDate: addDays(TODAY, 14),
    subject: quotation.subject,
    items: quotation.items.map((item) => ({ ...item, id: `${number}-${item.id}` })),
    discount: quotation.discount,
    taxRate: quotation.taxRate,
    term: { label: 'DP 50%', percent: 50 },
    notes: defaultPaymentInstructions,
    stage: 'Draft',
    payments: [],
    reminders: { before3: true, onDue: true, after7: false },
    recurring: false,
    timeline: [{ id: 'created', icon: 'file', actor: currentUser.name, action: 'membuat dari quotation', time: 'baru saja' }],
  };
}
