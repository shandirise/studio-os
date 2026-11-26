import { Avatar, Button, Card, CardHeader, Table, TD, TH, THead, TR } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { timeLogs } from '../data';
import { formatDate, formatHours } from '../format';

const totalHours = timeLogs.reduce((sum, l) => sum + l.hours, 0);

/** Waktu tab: recent time entries logged on the project. */
export function ProjectTimeTab() {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Catatan waktu"
        subtitle={`Total ${formatHours(totalHours)} jam tercatat`}
        action={
          <Button size="sm" to="/timesheet">
            Buka timesheet
          </Button>
        }
      />
      <Table minWidth={720}>
        <THead>
          <TH>TANGGAL</TH>
          <TH>ANGGOTA</TH>
          <TH>TASK</TH>
          <TH>CATATAN</TH>
          <TH align="right">DURASI</TH>
        </THead>
        <tbody>
          {timeLogs.map((l) => {
            const member = memberById(l.memberId);
            return (
              <TR key={l.id}>
                <TD className="whitespace-nowrap text-muted">{formatDate(l.date)}</TD>
                <TD>
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <Avatar name={member.name} size="xs" />
                    {member.name}
                  </span>
                </TD>
                <TD className="font-medium">{l.task}</TD>
                <TD className="text-muted">{l.note}</TD>
                <TD align="right" className="font-semibold whitespace-nowrap">
                  {formatHours(l.hours)} jam
                </TD>
              </TR>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
}
