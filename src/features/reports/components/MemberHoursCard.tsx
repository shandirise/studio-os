import { Avatar, Card, CardHeader, Table, TD, TH, THead, TR } from '@/components/ui';
import { memberHours } from '../data';

export function MemberHoursCard() {
  return (
    <Card className="min-w-0 self-start overflow-hidden">
      <CardHeader title="Jam per anggota · November" />
      <Table minWidth={440} className="border-t border-line">
        <THead>
          <TH>ANGGOTA</TH>
          <TH align="right" className="w-[90px]">
            BILLABLE
          </TH>
          <TH align="right" className="w-[90px]">
            NON-BILL.
          </TH>
          <TH align="right" className="w-20">
            TOTAL
          </TH>
        </THead>
        <tbody>
          {memberHours.map((m) => (
            <TR key={m.name} className="h-12">
              <TD className="py-2">
                <div className="flex items-center gap-2">
                  <Avatar name={m.name} className="size-7" />
                  <div className="flex min-w-0 flex-col gap-px">
                    <span className="truncate font-medium">{m.name}</span>
                    {m.role && <span className="text-11-5 leading-[15px] text-muted">{m.role}</span>}
                  </div>
                </div>
              </TD>
              <TD align="right">{m.billable} j</TD>
              <TD align="right">{m.nonBillable} j</TD>
              <TD align="right" className="font-semibold whitespace-nowrap">
                {m.billable + m.nonBillable} j
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
