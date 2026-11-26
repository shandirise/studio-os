import { Pagination } from '@/components/ui';

type LedgerPaginationProps = {
  page: number;
  onPageChange: (page: number) => void;
  total: number;
  pageSize: number;
  /** Plural noun in the summary, e.g. "pembayaran". */
  noun: string;
};

/** Table footer: "Menampilkan 1–7 dari 52 pembayaran" with page buttons. */
export function LedgerPagination({ page, onPageChange, total, pageSize, noun }: LedgerPaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <Pagination
      summary={`Menampilkan ${from}–${to} dari ${total} ${noun}`}
      page={page}
      pageCount={pageCount}
      onPageChange={onPageChange}
      className="py-[9px]"
    />
  );
}
