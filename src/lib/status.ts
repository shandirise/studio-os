/**
 * Status → color tone maps. Every status in the design is shown as a Badge
 * (text + colored dot), so color is never the only signal.
 */
export type Tone = 'gray' | 'blue' | 'purple' | 'orange' | 'green' | 'red' | 'yellow' | 'dark';

export type DealStage = 'Lead Masuk' | 'Kualifikasi' | 'Proposal Dikirim' | 'Negosiasi' | 'Won' | 'Lost';
export type QuotationStatus = 'Draft' | 'Terkirim' | 'Dilihat' | 'Disetujui' | 'Ditolak' | 'Kadaluarsa';
export type InvoiceStatus = 'Draft' | 'Terkirim' | 'Dibayar Sebagian' | 'Lunas' | 'Overdue' | 'Batal';
export type ProjectStatus = 'Belum Mulai' | 'Berjalan' | 'Ditunda' | 'Selesai' | 'Dibatalkan';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type ContactStage = 'Lead' | 'Prospek' | 'Klien' | 'Tidak aktif';
export type MemberStatus = 'Aktif' | 'Undangan tertunda' | 'Nonaktif';

export const dealStageTone: Record<DealStage, Tone> = {
  'Lead Masuk': 'gray',
  Kualifikasi: 'blue',
  'Proposal Dikirim': 'purple',
  Negosiasi: 'orange',
  Won: 'green',
  Lost: 'red',
};

export const quotationTone: Record<QuotationStatus, Tone> = {
  Draft: 'gray',
  Terkirim: 'blue',
  Dilihat: 'purple',
  Disetujui: 'green',
  Ditolak: 'red',
  Kadaluarsa: 'yellow',
};

export const invoiceTone: Record<InvoiceStatus, Tone> = {
  Draft: 'gray',
  Terkirim: 'blue',
  'Dibayar Sebagian': 'yellow',
  Lunas: 'green',
  Overdue: 'red',
  Batal: 'dark',
};

export const projectTone: Record<ProjectStatus, Tone> = {
  'Belum Mulai': 'gray',
  Berjalan: 'blue',
  Ditunda: 'yellow',
  Selesai: 'green',
  Dibatalkan: 'red',
};

export const priorityTone: Record<Priority, Tone> = {
  Low: 'gray',
  Medium: 'blue',
  High: 'orange',
  Urgent: 'red',
};

export const contactStageTone: Record<ContactStage, Tone> = {
  Lead: 'gray',
  Prospek: 'blue',
  Klien: 'green',
  'Tidak aktif': 'dark',
};

export const memberStatusTone: Record<MemberStatus, Tone> = {
  Aktif: 'green',
  'Undangan tertunda': 'yellow',
  Nonaktif: 'dark',
};
