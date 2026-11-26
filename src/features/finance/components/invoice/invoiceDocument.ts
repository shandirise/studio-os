import {
  computeTotals,
  daysBetween,
  formatDate,
  formatDayMonth,
  inDateRange,
  termAmount,
  TODAY,
  addDays,
  type DateRange,
  type DocumentTotals,
  type PaperContent,
  type SortState,
} from '@/features/sales/components/document';
import { clientById, findQuotation } from '@/features/sales/data';
import { invoiceTone, type InvoiceStatus, type Tone } from '@/lib/status';
import type { Invoice, ReminderKey } from '../../invoiceData';

export function invoiceTotals(inv: Pick<Invoice, 'items' | 'discount' | 'taxRate'>): DocumentTotals {
  return computeTotals(inv.items, inv.discount, inv.taxRate);
}

/** Amount billed by this invoice (the term share of the total, e.g. DP 50%). */
export function invoiceAmount(inv: Invoice): number {
  return termAmount(invoiceTotals(inv).total, inv.term);
}

export function paidAmount(inv: Invoice): number {
  return inv.payments.reduce((sum, p) => sum + p.amount, 0);
}

export function invoiceBalance(inv: Invoice): number {
  return Math.max(0, invoiceAmount(inv) - paidAmount(inv));
}

/** Status shown in badges: paid / partial / overdue are derived from payments and the due date. */
export function invoiceStatus(inv: Invoice): InvoiceStatus {
  if (inv.stage !== 'Terkirim') return inv.stage;
  const paid = paidAmount(inv);
  if (paid >= invoiceAmount(inv)) return 'Lunas';
  if (paid > 0) return 'Dibayar Sebagian';
  return inv.dueDate < TODAY ? 'Overdue' : 'Terkirim';
}

/** "Jatuh tempo 21 Nov 2026 (2 hari lagi)" */
export function dueText(inv: Invoice): string {
  const base = `Jatuh tempo ${formatDate(inv.dueDate)}`;
  if (invoiceStatus(inv) === 'Lunas') return `${base} · lunas`;
  const days = daysBetween(TODAY, inv.dueDate);
  if (days > 0) return `${base} (${days} hari lagi)`;
  if (days === 0) return `${base} (hari ini)`;
  return `${base} (terlambat ${-days} hari)`;
}

export function sourceQuotationNumber(inv: Pick<Invoice, 'sourceQuotationId'>): string | null {
  return inv.sourceQuotationId ? findQuotation(inv.sourceQuotationId).number : null;
}

export function invoicePaper(inv: Invoice): PaperContent {
  const client = clientById(inv.clientId);
  const totals = invoiceTotals(inv);
  const status = invoiceStatus(inv);
  return {
    heading: 'INVOICE',
    number: inv.number,
    status: { label: status, tone: invoiceTone[status] },
    recipient: { contactName: client.contactName, company: client.company, address: client.address },
    meta: [
      { label: 'Tanggal terbit', value: formatDate(inv.issueDate) },
      { label: 'Jatuh tempo', value: formatDate(inv.dueDate) },
      { label: 'Referensi', value: sourceQuotationNumber(inv) ?? '–' },
    ],
    subject: inv.subject,
    items: inv.items,
    totals,
    taxRate: inv.taxRate,
    due: { label: inv.term?.label ?? 'TOTAL', amount: termAmount(totals.total, inv.term) },
    notes: { label: 'INSTRUKSI PEMBAYARAN', text: inv.notes },
  };
}

/* ------------------------------------------------------------------ */
/* Reminders                                                           */
/* ------------------------------------------------------------------ */

export const reminderDefs: Record<ReminderKey, { short: string; label: string; offset: number }> = {
  before3: { short: 'H-3', label: 'H-3 sebelum jatuh tempo', offset: -3 },
  onDue: { short: 'Saat jatuh tempo', label: 'Saat jatuh tempo', offset: 0 },
  after7: { short: 'H+7', label: 'H+7 setelah jatuh tempo', offset: 7 },
};

export const reminderKeys = Object.keys(reminderDefs) as ReminderKey[];

export type ScheduledReminder = { key: ReminderKey; label: string; status: string; tone: Tone };

/** Enabled reminders with their date and state ("H-3 · 18 Nov" · Terkirim / Terjadwal / Dibatalkan). */
export function reminderSchedule(inv: Invoice): ScheduledReminder[] {
  const settled = ['Lunas', 'Batal'].includes(invoiceStatus(inv));
  return reminderKeys
    .filter((key) => inv.reminders[key])
    .map((key) => {
      const def = reminderDefs[key];
      const date = addDays(inv.dueDate, def.offset);
      const label = `${def.short} · ${formatDayMonth(date)}`;
      if (date < TODAY) return { key, label, status: 'Terkirim', tone: 'green' };
      if (settled) return { key, label, status: 'Dibatalkan', tone: 'gray' };
      return { key, label, status: 'Terjadwal', tone: 'blue' };
    });
}

/* ------------------------------------------------------------------ */
/* List filtering                                                      */
/* ------------------------------------------------------------------ */

export type InvoiceTab = InvoiceStatus | 'all';
export type InvoiceSortKey = 'number' | 'total';

export type InvoiceFilters = {
  tab: InvoiceTab;
  query: string;
  clientId: string | null;
  projectId: string | null;
  dateRange: DateRange | null;
};

export function filterInvoices(rows: Invoice[], f: InvoiceFilters, sort: SortState<InvoiceSortKey>): Invoice[] {
  const q = f.query.trim().toLowerCase();
  const filtered = rows.filter((inv) => {
    if (f.tab !== 'all' && invoiceStatus(inv) !== f.tab) return false;
    if (q && !`${inv.number} ${clientById(inv.clientId).company}`.toLowerCase().includes(q)) return false;
    if (f.clientId && inv.clientId !== f.clientId) return false;
    if (f.projectId && inv.projectId !== f.projectId) return false;
    return inDateRange(inv.issueDate, f.dateRange);
  });
  const value = (inv: Invoice) => (sort.key === 'total' ? invoiceAmount(inv) : Number(inv.number.slice(-4)));
  const factor = sort.direction === 'asc' ? 1 : -1;
  return filtered.sort((a, b) => (value(a) - value(b)) * factor);
}
