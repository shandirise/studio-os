import type { Tone } from '@/lib/status';

/** One billable row of a quotation or invoice. */
export type LineItem = {
  id: string;
  name: string;
  description: string;
  qty: number;
  unit: string;
  /** Unit price in Rupiah. */
  price: number;
  /** Line discount in percent (0–100). */
  discount: number;
};

/** A reusable service from the catalog ("Pilih dari katalog jasa"). */
export type CatalogItem = Pick<LineItem, 'name' | 'description' | 'unit' | 'price'> & { id: string };

export type Recipient = {
  contactName: string;
  company: string;
  address: string;
};

export type MetaRow = { label: string; value: string };

export type DocumentTotals = {
  subtotal: number;
  /** Overall discount in Rupiah ("Diskon keseluruhan"). */
  discount: number;
  tax: number;
  total: number;
};

/** Part of the total billed on an invoice, e.g. "DP 50%". */
export type BillingTerm = { label: string; percent: number };

/** Everything the document "paper" renders. Built from a quotation or an invoice. */
export type PaperContent = {
  /** "PENAWARAN" or "INVOICE". */
  heading: string;
  number: string;
  status: { label: string; tone: Tone };
  recipient: Recipient;
  meta: MetaRow[];
  subject: string;
  items: LineItem[];
  totals: DocumentTotals;
  taxRate: number;
  /** Label + amount of the black total chip ("TOTAL" or "DP 50%"). */
  due: { label: string; amount: number };
  notes: { label: string; text: string };
};

export type TimelineIcon = 'eye' | 'send' | 'file' | 'wallet' | 'check' | 'x' | 'copy';

export type TimelineEvent = {
  id: string;
  icon: TimelineIcon;
  actor: string;
  action: string;
  time: string;
};
