const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

const pad = (n: number) => String(n).padStart(2, '0');

function parts(at: number) {
  const d = new Date(at);
  return {
    day: `${pad(d.getDate())} ${months[d.getMonth()]}`,
    year: d.getFullYear(),
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`,
  };
}

/** → "19 Nov 11:02:14" (audit log table) */
export function formatAuditTime(at: number): string {
  const p = parts(at);
  return `${p.day} ${p.time}`;
}

/** → "19 Nov 2026 · 11:02:14" (audit log drawer) */
export function formatAuditDateTime(at: number): string {
  const p = parts(at);
  return `${p.day} ${p.year} · ${p.time}`;
}

const thousands = new Intl.NumberFormat('id-ID');

/** 2418 → "2.418" */
export function formatCount(n: number): string {
  return thousands.format(n);
}
