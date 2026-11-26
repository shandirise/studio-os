import {
  ChartNoAxesColumn,
  Check,
  CreditCard,
  FileText,
  Landmark,
  Layers,
  LayoutGrid,
  ReceiptText,
  Target,
  Timer,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

export type NavItem = { label: string; to: string; icon: LucideIcon };
export type NavGroup = { label: string; items: NavItem[] };

/** Sidebar navigation, in the order shown in the design. */
export const navGroups: NavGroup[] = [
  { label: 'UTAMA', items: [{ label: 'Dashboard', to: '/', icon: LayoutGrid }] },
  {
    label: 'CRM',
    items: [
      { label: 'Kontak', to: '/crm/contacts', icon: Users },
      { label: 'Perusahaan', to: '/crm/companies', icon: Landmark },
      { label: 'Deals', to: '/crm/deals', icon: Target },
      { label: 'Aktivitas', to: '/crm/activities', icon: Check },
    ],
  },
  { label: 'SALES', items: [{ label: 'Quotation', to: '/sales/quotations', icon: FileText }] },
  {
    label: 'PROJECT',
    items: [
      { label: 'Project', to: '/projects', icon: Layers },
      { label: 'My Tasks', to: '/my-tasks', icon: Check },
      { label: 'Timesheet', to: '/timesheet', icon: Timer },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { label: 'Invoice', to: '/finance/invoices', icon: ReceiptText },
      { label: 'Pembayaran', to: '/finance/payments', icon: Wallet },
      { label: 'Pengeluaran', to: '/finance/expenses', icon: CreditCard },
    ],
  },
  { label: 'ANALISIS', items: [{ label: 'Reports', to: '/reports', icon: ChartNoAxesColumn }] },
];
