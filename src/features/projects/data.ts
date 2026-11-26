import type { InvoiceStatus, Priority, ProjectStatus, QuotationStatus, Tone } from '@/lib/status';

/** "Today" in the demo workspace (matches the design). */
export const TODAY = '2026-11-19';

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  /** URL slug. */
  id: string;
  name: string;
  client: string;
  clientId: string;
  status: ProjectStatus;
  /** Task progress, 0–100. */
  progress: number;
  startDate: string;
  deadline: string;
  spent: number;
  budget: number;
  /** Team member ids; the first three are shown in avatar stacks. */
  team: string[];
  pmId: string;
  description: string;
  portalVisible: boolean;
};

export const projects: Project[] = [
  {
    id: 'website-corporate-v1',
    name: 'Website Corporate v1',
    client: 'PT Maju Bersama Digital',
    clientId: 'pt-maju-bersama-digital',
    status: 'Berjalan',
    progress: 64,
    startDate: '2026-11-01',
    deadline: '2027-02-28',
    spent: 38_000_000,
    budget: 62_000_000,
    team: ['ra', 'ns', 'la', 'dp'],
    pmId: 'la',
    description:
      'Redesain dan pengembangan website corporate PT Maju Bersama Digital: 8 halaman utama, CMS untuk berita dan karier, serta optimasi SEO dasar.',
    portalVisible: true,
  },
  {
    id: 'aplikasi-mobile-loyalty',
    name: 'Aplikasi Mobile Loyalty',
    client: 'PT Sinar Pangan Sejahtera',
    clientId: 'pt-sinar-pangan-sejahtera',
    status: 'Berjalan',
    progress: 42,
    startDate: '2026-08-03',
    deadline: '2026-11-24',
    spent: 96_000_000,
    budget: 180_000_000,
    team: ['ns', 'ra'],
    pmId: 'dp',
    description: 'Aplikasi loyalty untuk pelanggan ritel: poin, voucher, dan katalog promo di iOS dan Android.',
    portalVisible: true,
  },
  {
    id: 'dashboard-logistik',
    name: 'Dashboard Logistik',
    client: 'PT Karya Logistik Prima',
    clientId: 'pt-karya-logistik-prima',
    status: 'Berjalan',
    progress: 58,
    startDate: '2026-09-14',
    deadline: '2026-12-31',
    spent: 74_000_000,
    budget: 130_000_000,
    team: ['ns', 'la', 'ra'],
    pmId: 'la',
    description: 'Dashboard internal untuk memantau armada, status pengiriman, dan SLA gudang secara real-time.',
    portalVisible: false,
  },
  {
    id: 'katalog-digital-batik',
    name: 'Katalog Digital Batik',
    client: 'Batik Lestari Studio',
    clientId: 'batik-lestari-studio',
    status: 'Ditunda',
    progress: 35,
    startDate: '2026-10-05',
    deadline: '2026-12-15',
    spent: 9_000_000,
    budget: 28_000_000,
    team: ['ra'],
    pmId: 'dp',
    description: 'Katalog produk digital dengan foto koleksi dan integrasi pemesanan via WhatsApp.',
    portalVisible: false,
  },
  {
    id: 'portal-petani-mitra',
    name: 'Portal Petani Mitra',
    client: 'PT Bumi Agro Mandiri',
    clientId: 'pt-bumi-agro-mandiri',
    status: 'Selesai',
    progress: 100,
    startDate: '2026-06-01',
    deadline: '2026-10-30',
    spent: 92_000_000,
    budget: 98_000_000,
    team: ['ns', 'ra', 'la'],
    pmId: 'la',
    description: 'Portal web untuk petani mitra: jadwal panen, harga beli, dan riwayat pembayaran.',
    portalVisible: true,
  },
  {
    id: 'branding-kemasan',
    name: 'Branding & Kemasan',
    client: 'CV Kopi Senja',
    clientId: 'cv-kopi-senja',
    status: 'Belum Mulai',
    progress: 0,
    startDate: '2026-12-07',
    deadline: '2027-01-20',
    spent: 0,
    budget: 36_000_000,
    team: ['ra', 'la'],
    pmId: 'dp',
    description: 'Identitas visual baru dan desain kemasan untuk tiga varian produk kopi literan.',
    portalVisible: false,
  },
];

/** Looks up a project by slug, falling back to the main record from the design. */
export function getProject(id: string | undefined): Project {
  return projects.find((p) => p.id === id) ?? projects[0]!;
}

export type ProjectTab = 'Semua' | ProjectStatus;

/** Workspace-wide totals shown in the list tabs (the grid shows a sample). */
export const projectTabCounts: Record<ProjectTab, number> = {
  Semua: 34,
  Berjalan: 12,
  'Belum Mulai': 4,
  Ditunda: 2,
  Selesai: 15,
  Dibatalkan: 1,
};

export const projectTabs: ProjectTab[] = ['Semua', 'Berjalan', 'Belum Mulai', 'Ditunda', 'Selesai', 'Dibatalkan'];

export type ProjectView = 'grid' | 'table';

export const projectViewOptions: Array<{ value: ProjectView; label: string }> = [
  { value: 'grid', label: 'Grid' },
  { value: 'table', label: 'Tabel' },
];

export type DeadlineSort = 'nearest' | 'farthest';

export const deadlineSortLabel: Record<DeadlineSort, string> = {
  nearest: 'Deadline terdekat',
  farthest: 'Deadline terjauh',
};

/* ------------------------------------------------------------------ */
/* Tasks                                                               */
/* ------------------------------------------------------------------ */

/** Backlog tasks are not shown on the board. */
export type TaskStatus = 'Backlog' | 'To Do' | 'In Progress' | 'Review' | 'Done';

export const boardColumns: TaskStatus[] = ['To Do', 'In Progress', 'Review', 'Done'];

export const taskStatuses: TaskStatus[] = ['Backlog', ...boardColumns];

export const taskStatusTone: Record<TaskStatus, Tone> = {
  Backlog: 'dark',
  'To Do': 'gray',
  'In Progress': 'blue',
  Review: 'purple',
  Done: 'green',
};

export const priorities: Priority[] = ['Low', 'Medium', 'High', 'Urgent'];

export type Subtask = { id: string; title: string; done: boolean };

export type TaskComment = { id: string; authorId: string; time: string; body: string };

export type Task = {
  /** e.g. "TASK-142" */
  id: string;
  title: string;
  /** null = internal task without a project. */
  projectId: string | null;
  status: TaskStatus;
  labels: string[];
  priority: Priority;
  /** ISO date, null = no deadline. */
  deadline: string | null;
  assigneeId: string;
  /** Shown in My Tasks (assigned to the signed-in user). */
  mine: boolean;
  description: string;
  subtasks: Subtask[];
  comments: TaskComment[];
  attachments: number;
  loggedSeconds: number;
  visibleToClient: boolean;
};

const subtasks = (prefix: string, items: Array<[string, boolean]>): Subtask[] =>
  items.map(([title, done], i) => ({ id: `${prefix}-s${i + 1}`, title, done }));

export const initialTasks: Task[] = [
  {
    id: 'TASK-145',
    title: 'Wireframe halaman Layanan',
    projectId: 'website-corporate-v1',
    status: 'To Do',
    labels: ['Konten'],
    priority: 'Medium',
    deadline: '2026-11-24',
    assigneeId: 'ra',
    mine: false,
    description: 'Wireframe low-fi untuk halaman Layanan: daftar layanan, detail per layanan, dan CTA konsultasi.',
    subtasks: subtasks('t145', [
      ['Struktur konten', true],
      ['Wireframe desktop', false],
      ['Wireframe mobile', false],
      ['Review dengan klien', false],
    ]),
    comments: [
      { id: 'c145-1', authorId: 'la', time: '2 hari lalu', body: 'Urutan layanan ikuti dokumen brief terbaru ya.' },
      { id: 'c145-2', authorId: 'ra', time: '1 hari lalu', body: 'Siap, saya mulai setelah Home selesai.' },
    ],
    attachments: 0,
    loggedSeconds: 3_600,
    visibleToClient: false,
  },
  {
    id: 'TASK-146',
    title: 'Siapkan konten halaman Tentang',
    projectId: 'website-corporate-v1',
    status: 'To Do',
    labels: ['Konten'],
    priority: 'Low',
    deadline: '2026-11-21',
    assigneeId: 'la',
    mine: true,
    description: 'Kumpulkan copy profil perusahaan, visi-misi, dan foto tim dari klien.',
    subtasks: subtasks('t146', [
      ['Draft copy profil', false],
      ['Foto tim', false],
      ['Review copy', false],
    ]),
    comments: [{ id: 'c146-1', authorId: 'dp', time: '3 jam lalu', body: 'Foto tim dijadwalkan Senin depan.' }],
    attachments: 1,
    loggedSeconds: 0,
    visibleToClient: true,
  },
  {
    id: 'TASK-142',
    title: 'Desain Home hi-fi',
    projectId: 'website-corporate-v1',
    status: 'In Progress',
    labels: ['Desain', 'Web'],
    priority: 'High',
    deadline: '2026-11-19',
    assigneeId: 'ra',
    mine: true,
    description:
      'Desain halaman Home versi final: hero, layanan unggulan, studi kasus, testimoni, CTA. Gunakan grid 12 kolom dan komponen dari design system.',
    subtasks: subtasks('t142', [
      ['Hero & navigasi', true],
      ['Section layanan', true],
      ['Studi kasus', true],
      ['Testimoni & CTA', false],
      ['Footer & responsif', false],
    ]),
    comments: [
      { id: 'c142-1', authorId: 'la', time: '1 jam lalu', body: '@Rizky tolong tambahkan varian mobile untuk hero.' },
      { id: 'c142-2', authorId: 'ra', time: '45 mnt lalu', body: 'Oke, varian mobile hero sedang saya kerjakan.' },
      { id: 'c142-3', authorId: 'dp', time: '30 mnt lalu', body: 'Studi kasus pakai 3 project terbaru saja.' },
      { id: 'c142-4', authorId: 'ra', time: '10 mnt lalu', body: 'Noted, sudah saya update di Figma.' },
    ],
    attachments: 2,
    loggedSeconds: 23_400,
    visibleToClient: false,
  },
  {
    id: 'TASK-143',
    title: 'Setup repo & CI Next.js',
    projectId: 'website-corporate-v1',
    status: 'In Progress',
    labels: ['Dev'],
    priority: 'Urgent',
    deadline: '2026-11-20',
    assigneeId: 'ns',
    mine: false,
    description: 'Inisialisasi repo Next.js, lint, test, dan pipeline CI dengan deploy preview per pull request.',
    subtasks: subtasks('t143', [
      ['Inisialisasi repo', true],
      ['Pipeline CI', true],
      ['Deploy preview', false],
    ]),
    comments: [
      { id: 'c143-1', authorId: 'ns', time: '5 jam lalu', body: 'Pipeline CI sudah jalan, tinggal deploy preview.' },
      { id: 'c143-2', authorId: 'la', time: '2 jam lalu', body: 'Mantap, kabari kalau butuh akses hosting.' },
    ],
    attachments: 0,
    loggedSeconds: 14_400,
    visibleToClient: false,
  },
  {
    id: 'TASK-140',
    title: 'Komponen header & footer',
    projectId: 'website-corporate-v1',
    status: 'Review',
    labels: ['Desain'],
    priority: 'High',
    deadline: '2026-11-19',
    assigneeId: 'ns',
    mine: false,
    description: 'Komponen header (desktop + mobile) dan footer sesuai design system, siap dipakai di semua halaman.',
    subtasks: subtasks('t140', [
      ['Header desktop', true],
      ['Header mobile', true],
      ['Footer', true],
      ['Mega menu', true],
    ]),
    comments: [
      { id: 'c140-1', authorId: 'ra', time: '2 hari lalu', body: 'Spacing footer ikuti token baru ya.' },
      { id: 'c140-2', authorId: 'ns', time: '2 hari lalu', body: 'Siap, sudah disesuaikan.' },
      { id: 'c140-3', authorId: 'la', time: '1 hari lalu', body: 'Mega menu perlu state hover.' },
      { id: 'c140-4', authorId: 'ns', time: '1 hari lalu', body: 'State hover sudah ditambahkan.' },
      { id: 'c140-5', authorId: 'dp', time: '5 jam lalu', body: 'Klien minta logo sedikit lebih besar.' },
      { id: 'c140-6', authorId: 'ns', time: '2 jam lalu', body: 'Sudah diperbesar, siap direview.' },
    ],
    attachments: 1,
    loggedSeconds: 28_800,
    visibleToClient: true,
  },
  {
    id: 'TASK-138',
    title: 'Riset kompetitor',
    projectId: 'website-corporate-v1',
    status: 'Done',
    labels: ['Konten'],
    priority: 'Medium',
    deadline: '2026-11-10',
    assigneeId: 'ra',
    mine: false,
    description: 'Analisis 5 website kompetitor: struktur navigasi, konten utama, dan gaya visual.',
    subtasks: subtasks('t138', [
      ['Daftar kompetitor', true],
      ['Analisis navigasi', true],
      ['Analisis konten', true],
      ['Moodboard visual', true],
      ['Presentasi temuan', true],
    ]),
    comments: [
      { id: 'c138-1', authorId: 'la', time: '9 hari lalu', body: 'Tambahkan satu kompetitor regional.' },
      { id: 'c138-2', authorId: 'ra', time: '9 hari lalu', body: 'Sudah ditambahkan.' },
      { id: 'c138-3', authorId: 'dp', time: '8 hari lalu', body: 'Temuan sudah dipresentasikan ke klien.' },
    ],
    attachments: 2,
    loggedSeconds: 18_000,
    visibleToClient: true,
  },
  {
    id: 'TASK-137',
    title: 'Brief & scope disepakati',
    projectId: 'website-corporate-v1',
    status: 'Done',
    labels: ['Konten'],
    priority: 'Low',
    deadline: '2026-11-05',
    assigneeId: 'la',
    mine: false,
    description: 'Finalisasi brief, scope pekerjaan, dan timeline bersama klien.',
    subtasks: subtasks('t137', [
      ['Brief klien', true],
      ['Scope & timeline', true],
    ]),
    comments: [{ id: 'c137-1', authorId: 'la', time: '14 hari lalu', body: 'Scope ditandatangani klien.' }],
    attachments: 1,
    loggedSeconds: 7_200,
    visibleToClient: true,
  },
  {
    id: 'TASK-147',
    title: 'Review komponen header',
    projectId: 'website-corporate-v1',
    status: 'Backlog',
    labels: ['Desain'],
    priority: 'Medium',
    deadline: '2026-11-19',
    assigneeId: 'dp',
    mine: true,
    description: 'Review akhir komponen header sebelum diserahkan ke klien.',
    subtasks: subtasks('t147', [
      ['Cek konsistensi token', false],
      ['Cek aksesibilitas', false],
    ]),
    comments: [],
    attachments: 0,
    loggedSeconds: 0,
    visibleToClient: false,
  },
  {
    id: 'TASK-148',
    title: 'Testing lintas browser',
    projectId: 'website-corporate-v1',
    status: 'Backlog',
    labels: ['Dev'],
    priority: 'Medium',
    deadline: '2026-12-02',
    assigneeId: 'dp',
    mine: true,
    description: 'Uji tampilan dan fungsi di Chrome, Safari, Firefox, dan Edge (desktop + mobile).',
    subtasks: subtasks('t148', [
      ['Desktop browser', false],
      ['Mobile browser', false],
    ]),
    comments: [],
    attachments: 0,
    loggedSeconds: 0,
    visibleToClient: false,
  },
  {
    id: 'TASK-131',
    title: 'Revisi logo PT Sinar Pangan',
    projectId: 'aplikasi-mobile-loyalty',
    status: 'In Progress',
    labels: ['Desain'],
    priority: 'Urgent',
    deadline: '2026-11-17',
    assigneeId: 'dp',
    mine: true,
    description: 'Revisi logo aplikasi sesuai masukan klien: warna lebih hangat dan ikon lebih sederhana.',
    subtasks: subtasks('t131', [
      ['Eksplorasi warna', true],
      ['Ikon sederhana', false],
    ]),
    comments: [{ id: 'c131-1', authorId: 'la', time: '1 hari lalu', body: 'Klien menunggu revisi ini, mohon diprioritaskan.' }],
    attachments: 1,
    loggedSeconds: 5_400,
    visibleToClient: true,
  },
  {
    id: 'TASK-129',
    title: 'Kirim laporan mingguan',
    projectId: 'dashboard-logistik',
    status: 'To Do',
    labels: ['Konten'],
    priority: 'High',
    deadline: '2026-11-18',
    assigneeId: 'dp',
    mine: true,
    description: 'Laporan progres mingguan untuk PT Karya Logistik Prima.',
    subtasks: [],
    comments: [],
    attachments: 0,
    loggedSeconds: 0,
    visibleToClient: false,
  },
  {
    id: 'TASK-150',
    title: 'Integrasi API loyalty',
    projectId: 'aplikasi-mobile-loyalty',
    status: 'To Do',
    labels: ['Dev'],
    priority: 'High',
    deadline: '2026-11-22',
    assigneeId: 'dp',
    mine: true,
    description: 'Integrasi endpoint poin dan voucher dari sistem POS klien.',
    subtasks: subtasks('t150', [
      ['Endpoint poin', false],
      ['Endpoint voucher', false],
      ['Error handling', false],
    ]),
    comments: [{ id: 'c150-1', authorId: 'ns', time: '4 jam lalu', body: 'Dokumentasi API sudah saya share di folder project.' }],
    attachments: 1,
    loggedSeconds: 32_400,
    visibleToClient: false,
  },
  {
    id: 'TASK-151',
    title: 'Riset tren UI 2027',
    projectId: null,
    status: 'To Do',
    labels: ['Riset'],
    priority: 'Low',
    deadline: null,
    assigneeId: 'dp',
    mine: true,
    description: 'Kumpulkan referensi tren UI untuk bahan sharing internal tim.',
    subtasks: [],
    comments: [],
    attachments: 0,
    loggedSeconds: 0,
    visibleToClient: false,
  },
];

/** The task whose timer is running when the demo loads (00:42:10 in the design). */
export const initialTimer = { taskId: 'TASK-142', elapsedSeconds: 42 * 60 + 10 };

/* ------------------------------------------------------------------ */
/* Project detail tabs                                                 */
/* ------------------------------------------------------------------ */

export type DetailTab = 'overview' | 'task' | 'file' | 'waktu' | 'keuangan' | 'aktivitas';

export const detailTabs: Array<{ value: DetailTab; label: string }> = [
  { value: 'overview', label: 'Overview' },
  { value: 'task', label: 'Task' },
  { value: 'file', label: 'File' },
  { value: 'waktu', label: 'Waktu' },
  { value: 'keuangan', label: 'Keuangan' },
  { value: 'aktivitas', label: 'Aktivitas' },
];

export type ProjectFile = { id: string; name: string; size: string; uploaderId: string; date: string; clientVisible: boolean };

export const projectFiles: ProjectFile[] = [
  { id: 'f1', name: 'Brief Website Corporate.pdf', size: '1,2 MB', uploaderId: 'la', date: '2026-11-02', clientVisible: true },
  { id: 'f2', name: 'Sitemap v2.pdf', size: '480 KB', uploaderId: 'la', date: '2026-11-04', clientVisible: true },
  { id: 'f3', name: 'Riset kompetitor.pdf', size: '3,4 MB', uploaderId: 'ra', date: '2026-11-10', clientVisible: true },
  { id: 'f4', name: 'Moodboard visual.png', size: '6,8 MB', uploaderId: 'ra', date: '2026-11-11', clientVisible: false },
  { id: 'f5', name: 'Home hi-fi — draft 2.fig', size: '12,5 MB', uploaderId: 'ra', date: '2026-11-18', clientVisible: false },
  { id: 'f6', name: 'Konten halaman Tentang.docx', size: '220 KB', uploaderId: 'dp', date: '2026-11-18', clientVisible: false },
];

export type TimeLog = { id: string; date: string; memberId: string; task: string; note: string; hours: number };

export const timeLogs: TimeLog[] = [
  { id: 'l1', date: '2026-11-19', memberId: 'ra', task: 'Desain Home hi-fi', note: 'Section studi kasus', hours: 4 },
  { id: 'l2', date: '2026-11-19', memberId: 'ns', task: 'Komponen header & footer', note: 'Revisi ukuran logo', hours: 3 },
  { id: 'l3', date: '2026-11-18', memberId: 'ra', task: 'Desain Home hi-fi', note: 'Section layanan', hours: 2 },
  { id: 'l4', date: '2026-11-18', memberId: 'ns', task: 'Setup repo & CI Next.js', note: 'Pipeline CI', hours: 4 },
  { id: 'l5', date: '2026-11-17', memberId: 'ra', task: 'Desain Home hi-fi', note: 'Hero & navigasi', hours: 3.5 },
  { id: 'l6', date: '2026-11-17', memberId: 'la', task: 'Siapkan konten halaman Tentang', note: 'Koordinasi dengan klien', hours: 1.5 },
  { id: 'l7', date: '2026-11-16', memberId: 'ra', task: 'Desain Home hi-fi', note: 'Eksplorasi layout', hours: 2 },
  { id: 'l8', date: '2026-11-10', memberId: 'ra', task: 'Riset kompetitor', note: 'Presentasi temuan', hours: 5 },
];

type FinanceDocBase = { id: string; number: string; title: string; amount: number; date: string; to: string };

export type FinanceDoc = FinanceDocBase &
  ({ kind: 'Quotation'; status: QuotationStatus } | { kind: 'Invoice'; status: InvoiceStatus });

export const financeDocs: FinanceDoc[] = [
  {
    id: 'quo-2026-0012',
    kind: 'Quotation',
    number: 'QUO-2026-0012',
    title: 'Website Corporate v1',
    amount: 62_000_000,
    date: '2026-10-21',
    status: 'Disetujui',
    to: '/sales/quotations/quo-2026-0012',
  },
  {
    id: 'inv-2026-0029',
    kind: 'Invoice',
    number: 'INV-2026-0029',
    title: 'DP 30% Website Corporate v1',
    amount: 18_600_000,
    date: '2026-11-02',
    status: 'Lunas',
    to: '/finance/invoices/inv-2026-0029',
  },
  {
    id: 'inv-2026-0041',
    kind: 'Invoice',
    number: 'INV-2026-0041',
    title: 'Termin 2 Website Corporate v1',
    amount: 47_175_000,
    date: '2026-11-14',
    status: 'Terkirim',
    to: '/finance/invoices/inv-2026-0041',
  },
];

export type ProjectExpense = { id: string; label: string; date: string; amount: number };

export const projectExpenses: ProjectExpense[] = [
  { id: 'e1', label: 'Lisensi font Inter Display', date: '2026-11-06', amount: 1_450_000 },
  { id: 'e2', label: 'Stok foto (12 gambar)', date: '2026-11-12', amount: 2_100_000 },
  { id: 'e3', label: 'Hosting staging (3 bulan)', date: '2026-11-15', amount: 900_000 },
];

export type ProjectActivity = { id: string; memberId: string; action: string; when: string };

export const projectActivity: ProjectActivity[] = [
  { id: 'a1', memberId: 'ra', action: 'memindahkan task Desain Home hi-fi ke In Progress', when: '1 jam lalu' },
  { id: 'a2', memberId: 'la', action: 'mengomentari Desain Home hi-fi', when: '1 jam lalu' },
  { id: 'a3', memberId: 'ns', action: 'memindahkan Komponen header & footer ke Review', when: '2 jam lalu' },
  { id: 'a4', memberId: 'dp', action: 'mengunggah Konten halaman Tentang.docx', when: 'Kemarin' },
  { id: 'a5', memberId: 'la', action: 'mengirim invoice INV-2026-0041 ke klien', when: '14 Nov' },
  { id: 'a6', memberId: 'ra', action: 'menyelesaikan task Riset kompetitor', when: '10 Nov' },
  { id: 'a7', memberId: 'la', action: 'membuat project dari quotation QUO-2026-0012', when: '01 Nov' },
];

/* ------------------------------------------------------------------ */
/* My Tasks                                                            */
/* ------------------------------------------------------------------ */

export type MyTasksGrouping = 'time' | 'project';

export const myTasksGroupingOptions: Array<{ value: MyTasksGrouping; label: string }> = [
  { value: 'time', label: 'Waktu' },
  { value: 'project', label: 'Project' },
];

export type TimeBucket = 'late' | 'today' | 'week' | 'later' | 'none';

export const timeBuckets: Array<{ key: TimeBucket; label: string }> = [
  { key: 'late', label: 'Terlambat' },
  { key: 'today', label: 'Hari ini' },
  { key: 'week', label: 'Minggu ini' },
  { key: 'later', label: 'Nanti' },
  { key: 'none', label: 'Tanpa deadline' },
];

/** Last day of the current week (Sunday). */
export const END_OF_WEEK = '2026-11-22';

/* ------------------------------------------------------------------ */
/* Timesheet                                                           */
/* ------------------------------------------------------------------ */

/** Monday of the designed week. */
export const TIMESHEET_WEEK_START = '2026-11-16';

export type TimesheetRow = {
  id: string;
  task: string;
  project: string;
  /** Hours per day, Monday → Sunday; null = no entry. */
  hours: Array<number | null>;
};

export type TimesheetStatus = 'Belum disubmit' | 'Disubmit';

export const timesheetStatusTone: Record<TimesheetStatus, Tone> = {
  'Belum disubmit': 'yellow',
  Disubmit: 'blue',
};

export const designedTimesheet = {
  memberId: 'ra',
  rows: [
    { id: 'r1', task: 'Desain Home hi-fi', project: 'Website Corporate v1', hours: [2, 3.5, 2, 4, null, null, null] },
    { id: 'r2', task: 'Komponen header & footer', project: 'Website Corporate v1', hours: [null, 1, null, 3, null, null, null] },
    { id: 'r3', task: 'Integrasi API loyalty', project: 'Aplikasi Mobile Loyalty', hours: [4, 2, 3, null, null, null, null] },
    { id: 'r4', task: 'Rapat mingguan', project: 'Dashboard Logistik', hours: [1, null, 1, null, null, null, null] },
    { id: 'r5', task: 'Administrasi', project: 'Internal', hours: [0.5, 0.5, 0.5, 0.5, null, null, null] },
  ] satisfies TimesheetRow[],
};

/** Internal (non-project) entries that can be added with "+ Entri" besides project tasks. */
export const internalTimesheetEntries = ['Administrasi', 'Rapat internal'];
