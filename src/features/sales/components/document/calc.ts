import type { BillingTerm, DocumentTotals, LineItem } from './types';

/** PPN rate used by default on new documents. */
const DEFAULT_TAX_RATE = 0.11;

/** qty × price, minus the line discount. */
export function lineAmount(item: Pick<LineItem, 'qty' | 'price' | 'discount'>): number {
  return Math.round(item.qty * item.price * (1 - item.discount / 100));
}

/** Subtotal → overall discount → PPN → total. The discount never exceeds the subtotal. */
export function computeTotals(items: LineItem[], discount = 0, taxRate = DEFAULT_TAX_RATE): DocumentTotals {
  const subtotal = items.reduce((sum, item) => sum + lineAmount(item), 0);
  const appliedDiscount = Math.min(Math.max(discount, 0), subtotal);
  const tax = Math.round((subtotal - appliedDiscount) * taxRate);
  return { subtotal, discount: appliedDiscount, tax, total: subtotal - appliedDiscount + tax };
}

/** Amount billed for a term (e.g. DP 50% of the total); the full total without a term. */
export function termAmount(total: number, term: BillingTerm | null): number {
  return term ? Math.round((total * term.percent) / 100) : total;
}

/** 0.11 → "PPN 11%" */
export function taxLabel(rate: number): string {
  return `PPN ${Math.round(rate * 100)}%`;
}
