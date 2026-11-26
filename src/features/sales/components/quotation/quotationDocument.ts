import { formatRupiah } from '@/lib/format';
import { quotationTone, type QuotationStatus } from '@/lib/status';
import {
  computeTotals,
  formatDate,
  inDateRange,
  issuer,
  type DateRange,
  type DocumentTotals,
  type PaperContent,
  type SortState,
} from '../document';
import { clientById, dealById, type Quotation } from '../../data';

export function quotationTotals(q: Pick<Quotation, 'items' | 'discount' | 'taxRate'>): DocumentTotals {
  return computeTotals(q.items, q.discount, q.taxRate);
}

/** Payment terms printed on the paper; the DP amount follows the live total. */
export function paymentTermsText(total: number): string {
  return `DP 50% (${formatRupiah(Math.round(total / 2))}) saat persetujuan, pelunasan 50% saat serah terima. Transfer ke ${issuer.bankAccount}.`;
}

/** Header badge copy: "Dilihat" reads "Dilihat klien" next to the title. */
export function quotationHeaderStatus(status: QuotationStatus): string {
  return status === 'Dilihat' ? 'Dilihat klien' : status;
}

/** Validity is only relevant while the client still has to decide. */
export function showsValidity(status: QuotationStatus): boolean {
  return status === 'Terkirim' || status === 'Dilihat' || status === 'Kadaluarsa';
}

export function quotationPaper(q: Quotation): PaperContent {
  const client = clientById(q.clientId);
  const deal = dealById(q.dealId);
  const totals = quotationTotals(q);
  return {
    heading: 'PENAWARAN',
    number: q.number,
    status: { label: q.status, tone: quotationTone[q.status] },
    recipient: { contactName: client.contactName, company: client.company, address: client.address },
    meta: [
      { label: 'Tanggal', value: formatDate(q.issueDate) },
      { label: 'Berlaku sampai', value: formatDate(q.validUntil) },
      { label: 'Referensi', value: deal ? `Deal #${deal.ref}` : '–' },
    ],
    subject: q.subject,
    items: q.items,
    totals,
    taxRate: q.taxRate,
    due: { label: 'TOTAL', amount: totals.total },
    notes: { label: 'TERMIN PEMBAYARAN', text: paymentTermsText(totals.total) },
  };
}

/* ------------------------------------------------------------------ */
/* List filtering                                                      */
/* ------------------------------------------------------------------ */

export type QuotationTab = QuotationStatus | 'all';
export type QuotationSortKey = 'number' | 'total';

export type QuotationFilters = {
  tab: QuotationTab;
  query: string;
  clientId: string | null;
  createdBy: string | null;
  dateRange: DateRange | null;
};

export function filterQuotations(rows: Quotation[], f: QuotationFilters, sort: SortState<QuotationSortKey>): Quotation[] {
  const q = f.query.trim().toLowerCase();
  const filtered = rows.filter((row) => {
    const client = clientById(row.clientId);
    if (f.tab !== 'all' && row.status !== f.tab) return false;
    if (q && !`${row.number} ${client.company}`.toLowerCase().includes(q)) return false;
    if (f.clientId && row.clientId !== f.clientId) return false;
    if (f.createdBy && row.createdBy !== f.createdBy) return false;
    if (!inDateRange(row.issueDate, f.dateRange)) return false;
    return true;
  });
  const value = (row: Quotation) => (sort.key === 'total' ? quotationTotals(row).total : Number(row.number.slice(-4)));
  const factor = sort.direction === 'asc' ? 1 : -1;
  return filtered.sort((a, b) => (value(a) - value(b)) * factor);
}
