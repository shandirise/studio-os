import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { workspace } from '@/data/workspace';
import { formatRupiah } from '@/lib/format';
import { invoiceTone } from '@/lib/status';
import { ActiveProjectsCard } from '../components/ActiveProjectsCard';
import { ContactCard } from '../components/ContactCard';
import { HomeActionCard } from '../components/HomeActionCard';
import { PortalPage } from '../components/PortalPage';
import { RecentFilesCard } from '../components/RecentFilesCard';
import { portalClient, portalInvoice, portalQuotationTone, portalQuotations, recentFiles } from '../data';

/** J2 · Portal Beranda: what needs the client's attention, project progress and their PIC. */
export function PortalHomePage() {
  const quotation = portalQuotations[0]!;
  const invoice = portalInvoice;

  return (
    <PortalPage className="gap-3.5 px-4 py-5 lg:gap-6 lg:px-8 lg:pt-9 lg:pb-8">
      <div className="flex flex-col gap-1 lg:gap-[5px]">
        <h1 className="text-22 leading-[1.2] font-semibold tracking-[-0.01em] text-ink lg:text-[26px] lg:tracking-[-0.015em]">
          Halo, {portalClient.firstName}
        </h1>
        <p className="text-13 leading-[1.3] text-muted lg:text-14">
          <span className="lg:hidden">Ringkasan project dan tagihan Anda.</span>
          <span className="max-lg:hidden">Ringkasan project, penawaran, dan tagihan Anda bersama {workspace.name}.</span>
        </p>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-2 lg:gap-4">
        <HomeActionCard
          label="Menunggu persetujuan"
          badge={{ label: 'Quotation', tone: portalQuotationTone.Menunggu }}
          value={quotation.number}
          description={
            <>
              <span className="max-lg:hidden">{quotation.projectName} · </span>
              {formatRupiah(quotation.total)} · berlaku sampai {quotation.validUntilShort}
            </>
          }
          action={
            <Button variant="primary" iconRight={ArrowRight} to={`/portal/quotations/${quotation.id}`}>
              Tinjau quotation
            </Button>
          }
        />
        <HomeActionCard
          label="Belum dibayar"
          badge={{ label: 'Invoice', tone: invoiceTone.Terkirim }}
          value={formatRupiah(invoice.amountDue)}
          description={
            <>
              {invoice.number} · jatuh tempo <span className="lg:hidden">{invoice.dueDateShort}</span>
              <span className="max-lg:hidden">
                {invoice.dueDate} ({invoice.daysLeft} hari lagi)
              </span>
            </>
          }
          action={
            <Button to="/portal/invoices" className="max-lg:[&>svg]:hidden" iconRight={ArrowRight}>
              Lihat &amp; bayar
            </Button>
          }
        />
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-4">
        <ActiveProjectsCard />
        <div className="flex flex-col gap-3.5 lg:gap-4">
          <ContactCard />
          <RecentFilesCard title="File terbaru" files={recentFiles} className="max-lg:hidden" />
        </div>
      </div>
    </PortalPage>
  );
}
