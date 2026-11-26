import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';
import { AppShell } from '@/components/layout/AppShell';

/**
 * Route table. Every screen is lazy-loaded so each feature ships as its own chunk.
 * Modals and drawers open from query params on their host page (e.g. /crm/contacts?new=1).
 */

const authRoutes: RouteObject[] = [
  { path: '/login', lazy: () => import('@/features/auth/pages/LoginPage').then((m) => ({ Component: m.LoginPage })) },
  { path: '/register', lazy: () => import('@/features/auth/pages/RegisterPage').then((m) => ({ Component: m.RegisterPage })) },
  { path: '/verify-email', lazy: () => import('@/features/auth/pages/VerifyEmailPage').then((m) => ({ Component: m.VerifyEmailPage })) },
  { path: '/forgot-password', lazy: () => import('@/features/auth/pages/ForgotPasswordPage').then((m) => ({ Component: m.ForgotPasswordPage })) },
  { path: '/reset-password', lazy: () => import('@/features/auth/pages/ResetPasswordPage').then((m) => ({ Component: m.ResetPasswordPage })) },
  { path: '/invite', lazy: () => import('@/features/auth/pages/AcceptInvitePage').then((m) => ({ Component: m.AcceptInvitePage })) },
  { path: '/onboarding', lazy: () => import('@/features/auth/pages/OnboardingPage').then((m) => ({ Component: m.OnboardingPage })) },
];

const crmRoutes: RouteObject[] = [
  { path: 'crm', element: <Navigate to="/crm/contacts" replace /> },
  { path: 'crm/contacts', lazy: () => import('@/features/crm/pages/ContactsPage').then((m) => ({ Component: m.ContactsPage })) },
  { path: 'crm/contacts/:contactId', lazy: () => import('@/features/crm/pages/ContactDetailPage').then((m) => ({ Component: m.ContactDetailPage })) },
  { path: 'crm/companies', lazy: () => import('@/features/crm/pages/CompaniesPage').then((m) => ({ Component: m.CompaniesPage })) },
  { path: 'crm/companies/:companyId', lazy: () => import('@/features/crm/pages/CompanyDetailPage').then((m) => ({ Component: m.CompanyDetailPage })) },
  { path: 'crm/deals', lazy: () => import('@/features/crm/pages/DealsPage').then((m) => ({ Component: m.DealsPage })) },
  { path: 'crm/deals/:dealId', lazy: () => import('@/features/crm/pages/DealDetailPage').then((m) => ({ Component: m.DealDetailPage })) },
  { path: 'crm/activities', lazy: () => import('@/features/crm/pages/ActivitiesPage').then((m) => ({ Component: m.ActivitiesPage })) },
  { path: 'crm/import', lazy: () => import('@/features/crm/pages/ImportContactsPage').then((m) => ({ Component: m.ImportContactsPage })) },
];

const salesRoutes: RouteObject[] = [
  { path: 'sales', element: <Navigate to="/sales/quotations" replace /> },
  { path: 'sales/quotations', lazy: () => import('@/features/sales/pages/QuotationsPage').then((m) => ({ Component: m.QuotationsPage })) },
  { path: 'sales/quotations/new', lazy: () => import('@/features/sales/pages/QuotationEditorPage').then((m) => ({ Component: m.QuotationEditorPage })) },
  { path: 'sales/quotations/:quotationId/edit', lazy: () => import('@/features/sales/pages/QuotationEditorPage').then((m) => ({ Component: m.QuotationEditorPage })) },
  { path: 'sales/quotations/:quotationId', lazy: () => import('@/features/sales/pages/QuotationDetailPage').then((m) => ({ Component: m.QuotationDetailPage })) },
];

const projectRoutes: RouteObject[] = [
  { path: 'projects', lazy: () => import('@/features/projects/pages/ProjectsPage').then((m) => ({ Component: m.ProjectsPage })) },
  { path: 'projects/:projectId', lazy: () => import('@/features/projects/pages/ProjectDetailPage').then((m) => ({ Component: m.ProjectDetailPage })) },
  { path: 'my-tasks', lazy: () => import('@/features/projects/pages/MyTasksPage').then((m) => ({ Component: m.MyTasksPage })) },
  { path: 'timesheet', lazy: () => import('@/features/projects/pages/TimesheetPage').then((m) => ({ Component: m.TimesheetPage })) },
];

const financeRoutes: RouteObject[] = [
  { path: 'finance', element: <Navigate to="/finance/invoices" replace /> },
  { path: 'finance/invoices', lazy: () => import('@/features/finance/pages/InvoicesPage').then((m) => ({ Component: m.InvoicesPage })) },
  { path: 'finance/invoices/new', lazy: () => import('@/features/finance/pages/InvoiceEditorPage').then((m) => ({ Component: m.InvoiceEditorPage })) },
  { path: 'finance/invoices/:invoiceId/edit', lazy: () => import('@/features/finance/pages/InvoiceEditorPage').then((m) => ({ Component: m.InvoiceEditorPage })) },
  { path: 'finance/invoices/:invoiceId', lazy: () => import('@/features/finance/pages/InvoiceDetailPage').then((m) => ({ Component: m.InvoiceDetailPage })) },
  { path: 'finance/payments', lazy: () => import('@/features/finance/pages/PaymentsPage').then((m) => ({ Component: m.PaymentsPage })) },
  { path: 'finance/expenses', lazy: () => import('@/features/finance/pages/ExpensesPage').then((m) => ({ Component: m.ExpensesPage })) },
];

const reportRoutes: RouteObject = {
  path: 'reports',
  lazy: () => import('@/features/reports/pages/ReportsLayout').then((m) => ({ Component: m.ReportsLayout })),
  children: [
    { index: true, element: <Navigate to="/reports/sales" replace /> },
    { path: 'sales', lazy: () => import('@/features/reports/pages/SalesReportPage').then((m) => ({ Component: m.SalesReportPage })) },
    { path: 'pipeline', lazy: () => import('@/features/reports/pages/PipelineReportPage').then((m) => ({ Component: m.PipelineReportPage })) },
    { path: 'projects', lazy: () => import('@/features/reports/pages/ProjectReportPage').then((m) => ({ Component: m.ProjectReportPage })) },
    { path: 'team', lazy: () => import('@/features/reports/pages/TeamReportPage').then((m) => ({ Component: m.TeamReportPage })) },
    { path: 'finance', lazy: () => import('@/features/reports/pages/FinanceReportPage').then((m) => ({ Component: m.FinanceReportPage })) },
  ],
};

const settingsRoutes: RouteObject = {
  path: 'settings',
  lazy: () => import('@/features/settings/pages/SettingsLayout').then((m) => ({ Component: m.SettingsLayout })),
  children: [
    { index: true, element: <Navigate to="/settings/profile" replace /> },
    { path: 'profile', lazy: () => import('@/features/settings/pages/ProfileSettingsPage').then((m) => ({ Component: m.ProfileSettingsPage })) },
    { path: 'workspace', lazy: () => import('@/features/settings/pages/WorkspaceSettingsPage').then((m) => ({ Component: m.WorkspaceSettingsPage })) },
    { path: 'team', lazy: () => import('@/features/settings/pages/TeamSettingsPage').then((m) => ({ Component: m.TeamSettingsPage })) },
    { path: 'pipeline', lazy: () => import('@/features/settings/pages/PipelineSettingsPage').then((m) => ({ Component: m.PipelineSettingsPage })) },
    { path: 'templates', lazy: () => import('@/features/settings/pages/TemplatesSettingsPage').then((m) => ({ Component: m.TemplatesSettingsPage })) },
    { path: 'api', lazy: () => import('@/features/settings/pages/ApiSettingsPage').then((m) => ({ Component: m.ApiSettingsPage })) },
    { path: 'import-export', lazy: () => import('@/features/settings/pages/ImportExportSettingsPage').then((m) => ({ Component: m.ImportExportSettingsPage })) },
    { path: 'audit-log', lazy: () => import('@/features/settings/pages/AuditLogPage').then((m) => ({ Component: m.AuditLogPage })) },
  ],
};

const portalRoutes: RouteObject[] = [
  { path: '/portal/login', lazy: () => import('@/features/portal/pages/PortalLoginPage').then((m) => ({ Component: m.PortalLoginPage })) },
  {
    path: '/portal',
    lazy: () => import('@/features/portal/pages/PortalLayout').then((m) => ({ Component: m.PortalLayout })),
    children: [
      { index: true, lazy: () => import('@/features/portal/pages/PortalHomePage').then((m) => ({ Component: m.PortalHomePage })) },
      { path: 'projects', lazy: () => import('@/features/portal/pages/PortalProjectsPage').then((m) => ({ Component: m.PortalProjectsPage })) },
      { path: 'quotations', element: <Navigate to="/portal/quotations/quo-2026-0012" replace /> },
      { path: 'quotations/:quotationId', lazy: () => import('@/features/portal/pages/PortalQuotationPage').then((m) => ({ Component: m.PortalQuotationPage })) },
      { path: 'invoices', lazy: () => import('@/features/portal/pages/PortalInvoicesPage').then((m) => ({ Component: m.PortalInvoicesPage })) },
      { path: 'files', lazy: () => import('@/features/portal/pages/PortalFilesPage').then((m) => ({ Component: m.PortalFilesPage })) },
    ],
  },
];

const systemRoutes: RouteObject[] = [
  { path: '/screens', lazy: () => import('@/features/system/pages/ScreensPage').then((m) => ({ Component: m.ScreensPage })) },
  { path: '/design-system', lazy: () => import('@/features/system/pages/DesignSystemPage').then((m) => ({ Component: m.DesignSystemPage })) },
  { path: '/403', lazy: () => import('@/features/system/pages/ForbiddenPage').then((m) => ({ Component: m.ForbiddenPage })) },
  { path: '/500', lazy: () => import('@/features/system/pages/ServerErrorPage').then((m) => ({ Component: m.ServerErrorPage })) },
  { path: '/maintenance', lazy: () => import('@/features/system/pages/MaintenancePage').then((m) => ({ Component: m.MaintenancePage })) },
  { path: '/link-expired', lazy: () => import('@/features/system/pages/LinkExpiredPage').then((m) => ({ Component: m.LinkExpiredPage })) },
  { path: '*', lazy: () => import('@/features/system/pages/NotFoundPage').then((m) => ({ Component: m.NotFoundPage })) },
];

const appRoutes: RouteObject = {
  path: '/',
  element: <AppShell />,
  children: [
    { index: true, lazy: () => import('@/features/dashboard/pages/DashboardPage').then((m) => ({ Component: m.DashboardPage })) },
    { path: 'notifications', lazy: () => import('@/features/global/pages/NotificationsPage').then((m) => ({ Component: m.NotificationsPage })) },
    ...crmRoutes,
    ...salesRoutes,
    ...projectRoutes,
    ...financeRoutes,
    reportRoutes,
    settingsRoutes,
  ],
};

export const router = createBrowserRouter([
  {
    // Blank canvas while the first lazy screen loads.
    hydrateFallbackElement: <div className="min-h-dvh bg-canvas" />,
    children: [...authRoutes, ...portalRoutes, appRoutes, ...systemRoutes],
  },
]);
