# Studio OS — Frontend

Clickable frontend for **Studio OS** (CRM → quotation → project → invoice for agencies), built from `StudioOS-UIUX.fig`.
All data is static mock data — there is no backend.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

Open **`/screens`** for a map of every designed screen, grouped like the Figma canvas.

## Stack

- React 19 + TypeScript, Vite
- React Router 7 (lazy route per screen)
- Tailwind CSS v4 with the design tokens in `src/styles/index.css`
- lucide-react icons

## Folder structure

```
src/
  app/               router.tsx (all routes), screens.ts (screen registry for /screens)
  components/
    ui/              design-system primitives (Button, Badge, Table, Modal…) — import from '@/components/ui'
    layout/          AppShell, Sidebar, Topbar, MobileNav, Page, PageMeta (breadcrumbs), Logo
    charts/          BarChart
  config/            navigation.ts (sidebar menu)
  data/              data shared by several features (workspace, current user, team)
  features/<area>/
    pages/           one file per route screen (named export, e.g. ContactsPage)
    components/      pieces used only by this feature
    data.ts          mock data + types for this feature
  lib/               cn (class merge), format (Rupiah, initials), status (status → tone maps)
  styles/index.css   Tailwind import + design tokens
```

Feature areas: `auth`, `dashboard`, `crm`, `sales`, `projects`, `finance`, `reports`, `global` (notifications, command palette), `settings`, `portal` (client portal), `system` (error pages, design system, screen map).

## Design tokens

Defined in `src/styles/index.css`. The default Tailwind palette is removed, so only design colors exist.

| Purpose | Classes |
| --- | --- |
| Neutrals | `ink` #161616 · `ink-2` #262626 · `muted` #6B6B67 · `faint` #9B9B96 · `line-2` #D2D2CF · `line` #E5E5E3 · `subtle` #F0F0EE · `canvas` #F5F5F4 · `white` |
| Status tones | `{gray,blue,purple,orange,green,red,yellow,dark}` (dot/accent), `-soft` (badge bg), `-strong` (badge text) — e.g. `bg-green-soft text-green-strong` |
| Other | `danger` (red text #B42318), `danger-line`, `avatar` (#E3E3E0), `overlay` |
| Radius | `rounded-badge` 3 · `rounded-control` 4 · `rounded-card` 6 · `rounded-modal` 8 |
| Font size (px) | `text-9 … text-44`; half sizes use a dash: `text-10-5`, `text-11-5`, `text-12-5`, `text-13-5` |

Body default is Inter 13px / 1.3 / ink on canvas. Uppercase labels (table headers, group labels) are written in caps in the copy itself.

## Conventions

- **Compose from `@/components/ui`** first; feature-only pieces live in `features/<area>/components`.
- **`cn()`** merges classes with tailwind-merge, so a `className` prop always overrides the component default.
- **Every app page** starts with `useBreadcrumbs([...])` and wraps its body in `<Page>` (24/32px padding desktop, 16px mobile).
- **Status badges** use the tone maps in `lib/status.ts`: `<Badge tone={invoiceTone[status]}>{status}</Badge>`.
- **Money** uses `formatRupiah()` → `Rp 24.500.000`.
- **Modals and drawers** open from local state, and can also be opened by a query param on their host page so they are linkable (`/crm/contacts?new=1`, `?task=TASK-142`, …).
- **Detail pages** look up the record by route id and fall back to the main record from the design, so every link works.
- **Responsive**: `lg` (1024px) is the desktop breakpoint. Screens with a mobile design follow it below `lg`; others stack columns and scroll tables horizontally.
- Copy is Indonesian, exactly as in the design. Code identifiers are English.

### Icons

Icons are lucide-react, with defaults set once in `main.tsx` (16px, 1.75px stroke). Design icon → lucide name:

`dash` LayoutGrid · `users` Users · `user` User · `building` Landmark · `target` Target · `check` Check · `file` FileText · `layers` Layers · `timer` Timer · `receipt` ReceiptText · `wallet` Wallet · `card` CreditCard · `chart` ChartNoAxesColumn · `sliders` SlidersVertical · `help` CircleHelp · `logout` LogOut · `chev` ChevronDown · `chevU` ChevronUp · `chevL` ChevronLeft · `chevR` ChevronRight · `plus` Plus · `bell` Bell · `search` Search · `download` Download · `upload` Upload · `mail` Mail · `phone` Phone · `more` Ellipsis · `menu` Menu · `x` X · `eye` Eye · `edit` Pencil · `trash` Trash2 · `copy` Copy · `link` Link (import as `Link as LinkIcon`) · `lock` Lock · `globe` Globe · `shield` ShieldCheck · `briefcase` Briefcase · `cal` Calendar · `clock` Clock · `alert` TriangleAlert · `flag` Flag · `folder` Folder · `grip` GripVertical · `msg` MessageSquare · `pin` MapPin · `send` Send · `video` Video · `clip` Paperclip · `arrow` ArrowRight
