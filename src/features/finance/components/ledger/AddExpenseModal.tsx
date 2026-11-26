import { Button, Modal } from '@/components/ui';
import type { Expense } from '../../ledgerData';
import { ExpenseForm } from './ExpenseForm';

const FORM_ID = 'add-expense-form';

type AddExpenseModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
};

/** "+ Pengeluaran" dialog, styled after M3 · Catat Pembayaran. */
export function AddExpenseModal({ open, onClose, onSave }: AddExpenseModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Catat Pengeluaran"
      subtitle="Masuk ke arus kas dan profit project"
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" type="submit" form={FORM_ID}>
            Simpan pengeluaran
          </Button>
        </>
      }
    >
      <ExpenseForm id={FORM_ID} onSubmit={onSave} />
    </Modal>
  );
}
