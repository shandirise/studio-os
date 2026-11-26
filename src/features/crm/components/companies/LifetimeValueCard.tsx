import { Card, SectionLabel } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import type { Company } from '../../contactData';

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between gap-3 text-12-5 leading-[13px]">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}

/** Lifetime value summary in the right column of the company page. */
export function LifetimeValueCard({ company, activeDeals }: { company: Company; activeDeals: number }) {
  return (
    <Card className="flex flex-col gap-2 p-4">
      <SectionLabel className="text-10">Lifetime value</SectionLabel>
      <p className="text-24 leading-[26px] font-bold tracking-[-0.01em] text-ink">{formatRupiah(company.revenue)}</p>
      <p className="text-12 leading-4 text-muted">
        Dari {company.dealsWon} deal Won dan {company.paidInvoices} invoice lunas
      </p>
      <div className="h-px bg-line" />
      <Row label="Deal aktif" value={activeDeals} />
      <Row label="Invoice outstanding" value={formatRupiah(company.outstanding)} />
      <Row label="Project berjalan" value={company.activeProjects} />
    </Card>
  );
}
