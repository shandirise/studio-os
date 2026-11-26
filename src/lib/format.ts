const rupiah = new Intl.NumberFormat('id-ID');

/** 24500000 → "Rp 24.500.000" */
export function formatRupiah(value: number): string {
  return `Rp ${rupiah.format(value)}`;
}

/** 148200000 → "Rp 148,2 jt" */
export function formatRupiahShort(value: number): string {
  const juta = value / 1_000_000;
  const text = juta.toLocaleString('id-ID', { maximumFractionDigits: 1 });
  return `Rp ${text} jt`;
}

/** Returns up to two uppercase initials: "Rina Wulandari" → "RW" */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}
