import {
  contactStageTone,
  dealStageTone,
  invoiceTone,
  memberStatusTone,
  priorityTone,
  projectTone,
  quotationTone,
  type DealStage,
  type Tone,
} from '@/lib/status';

/* ── Error pages ──────────────────────────────────────────── */

/** Reference shown on the 500 page so support can trace the request. */
export const errorReference = 'ERR-5F3A91';

export const maintenance = {
  eta: 'Hari ini, 14:00 WIB',
  statusLabel: 'status.studio.os',
  statusUrl: 'https://status.studio.os',
} as const;

/* ── Design system showcase ───────────────────────────────── */

/** Neutral tokens; `className` paints the chip with the real token. */
export const neutralSwatches: Array<{ name: string; hex: string; className: string }> = [
  { name: 'Ink', hex: '#161616', className: 'bg-ink' },
  { name: 'Ink 2', hex: '#262626', className: 'bg-ink-2' },
  { name: 'Muted', hex: '#6B6B67', className: 'bg-muted' },
  { name: 'Faint', hex: '#9B9B96', className: 'bg-faint' },
  { name: 'Line 2', hex: '#D2D2CF', className: 'bg-line-2' },
  { name: 'Line', hex: '#E5E5E3', className: 'bg-line' },
  { name: 'Subtle', hex: '#F0F0EE', className: 'bg-subtle' },
  { name: 'Canvas', hex: '#F5F5F4', className: 'bg-canvas' },
  { name: 'Surface', hex: '#FFFFFF', className: 'bg-surface' },
];

/** Status tones: soft background + strong text, with the hex pair as caption. */
export const toneSwatches: Array<{ tone: Tone; hex: string; className: string }> = [
  { tone: 'gray', hex: '#EDEDEB / #454542', className: 'bg-gray-soft text-gray-strong' },
  { tone: 'blue', hex: '#E4EEFB / #1B4B8F', className: 'bg-blue-soft text-blue-strong' },
  { tone: 'purple', hex: '#EDE8F9 / #58409C', className: 'bg-purple-soft text-purple-strong' },
  { tone: 'orange', hex: '#FDECD9 / #93440A', className: 'bg-orange-soft text-orange-strong' },
  { tone: 'green', hex: '#DDF2E4 / #14602F', className: 'bg-green-soft text-green-strong' },
  { tone: 'red', hex: '#FBE3E1 / #962020', className: 'bg-red-soft text-red-strong' },
  { tone: 'yellow', hex: '#FBF1CE / #735500', className: 'bg-yellow-soft text-yellow-strong' },
  { tone: 'dark', hex: '#D8D8D5 / #1F1F1F', className: 'bg-dark-soft text-dark-strong' },
];

export const typeScale: Array<{ spec: string; sample: string; className: string }> = [
  { spec: 'Display 34 / Bold', sample: 'Studio OS', className: 'text-34 leading-[1.2] font-bold' },
  { spec: 'Page title 22 / SemiBold', sample: 'Pipeline Penjualan', className: 'text-22 leading-[1.2] font-semibold' },
  { spec: 'Section 15 / SemiBold', sample: 'Invoice jatuh tempo', className: 'text-15 leading-[1.2] font-semibold' },
  { spec: 'Body 13 / Regular', sample: 'Rina Wulandari · PT Maju Bersama Digital', className: 'text-13 leading-[1.2]' },
  { spec: 'Caption 12 / Medium', sample: 'Diperbarui 2 jam lalu', className: 'text-12 leading-[1.2] font-medium' },
  { spec: 'Label 11 / SemiBold caps', sample: 'KOLOM TABEL', className: 'text-11 leading-[1.2] font-semibold' },
];

export const radii: Array<{ label: string; className: string }> = [
  { label: 'radius 3', className: 'rounded-badge' },
  { label: 'radius 4', className: 'rounded-control' },
  { label: 'radius 6', className: 'rounded-card' },
  { label: 'radius 8', className: 'rounded-modal' },
];

/** Spacing steps (multiples of 4) drawn as ink squares. */
export const spacingSteps: Array<{ value: number; className: string }> = [
  { value: 4, className: 'size-1' },
  { value: 8, className: 'size-2' },
  { value: 12, className: 'size-3' },
  { value: 16, className: 'size-4' },
  { value: 24, className: 'size-6' },
  { value: 32, className: 'size-8' },
];

type BadgeRow = { label: string; items: Array<[string, Tone]> };

const entries = (map: Record<string, Tone>) => Object.entries(map);

/** Every status badge in the app, straight from the tone maps in lib/status. */
export const badgeRows: BadgeRow[] = [
  { label: 'Deal stage', items: entries(dealStageTone) },
  { label: 'Quotation', items: entries(quotationTone) },
  { label: 'Invoice', items: entries(invoiceTone) },
  { label: 'Project', items: entries(projectTone) },
  { label: 'Prioritas', items: entries(priorityTone) },
  {
    label: 'Kontak & anggota',
    // "Nonaktif" shares the dark tone with "Tidak aktif", so the design lists it once.
    items: [...entries(contactStageTone), ...entries(memberStatusTone).filter(([status]) => status !== 'Nonaktif')],
  },
];

export const dealStageOptions: DealStage[] = Object.keys(dealStageTone) as DealStage[];

export type QuotationTab = 'all' | 'draft' | 'sent' | 'approved';

export const quotationTabs: Array<{ value: QuotationTab; label: string; count: number }> = [
  { value: 'all', label: 'Semua', count: 42 },
  { value: 'draft', label: 'Draft', count: 6 },
  { value: 'sent', label: 'Terkirim', count: 14 },
  { value: 'approved', label: 'Disetujui', count: 18 },
];

export type BoardView = 'kanban' | 'table';

export const boardViews: Array<{ value: BoardView; label: string }> = [
  { value: 'kanban', label: 'Kanban' },
  { value: 'table', label: 'Tabel' },
];

export const sampleDeal = {
  title: 'Redesain Website Corporate',
  company: 'PT Maju Bersama Digital',
  value: 85_000_000,
  owner: 'Laras Ayu',
  closing: 'Closing 30 Nov',
} as const;
