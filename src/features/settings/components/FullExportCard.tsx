import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button, Card, useToast } from '@/components/ui';
import { currentUser } from '@/data/workspace';

/** Whole-workspace ZIP export; the download link is emailed to the Owner. */
export function FullExportCard() {
  const toast = useToast();
  const [requested, setRequested] = useState(false);

  const request = () => {
    setRequested(true);
    toast('Export ZIP diminta', `Link unduhan akan dikirim ke ${currentUser.email}.`);
  };

  return (
    <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between lg:p-5">
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="text-[14.5px] leading-[1.2] font-semibold text-ink">Export seluruh workspace</h2>
        <p className="text-12-5 leading-[1.3] text-muted">
          Semua data dan file dalam satu arsip ZIP. Link unduhan dikirim ke email Owner.
        </p>
      </div>
      <Button variant="primary" icon={Download} onClick={request} disabled={requested} className="self-start sm:self-auto">
        {requested ? 'Export sedang diproses' : 'Minta export ZIP'}
      </Button>
    </Card>
  );
}
