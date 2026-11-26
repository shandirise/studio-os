import { useState, type FormEvent } from 'react';
import { Field, Input, Select } from '@/components/ui';
import { currentUser } from '@/data/workspace';
import { formatRupiah } from '@/lib/format';
import { expenseCategories, expenseProjects, type Expense, type ExpenseCategory } from '../../ledgerData';
import { ReceiptDropzone } from './ReceiptDropzone';

type ExpenseFormProps = {
  /** Lets an external submit button (modal footer) target this form. */
  id: string;
  onSubmit: (expense: Expense) => void;
};

/** Fields for a new expense. Mounted fresh each time the modal opens. */
export function ExpenseForm({ id, onSubmit }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('2026-11-19');
  const [category, setCategory] = useState<ExpenseCategory>('Software');
  const [project, setProject] = useState('Internal');
  const [receipt, setReceipt] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const descriptionError = submitted && !description.trim() ? 'Deskripsi wajib diisi' : undefined;
  const amountError = submitted && !Number(amount) ? 'Jumlah wajib diisi' : undefined;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!description.trim() || !Number(amount)) return;
    onSubmit({
      id: `exp-${Date.now()}`,
      date,
      category,
      description: description.trim(),
      project,
      amount: Number(amount),
      recordedBy: currentUser.name,
    });
  };

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
      <Field label="Deskripsi" required error={descriptionError}>
        {(fieldId) => (
          <Input
            id={fieldId}
            autoFocus
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="mis. Lisensi Figma Organization"
            invalid={Boolean(descriptionError)}
          />
        )}
      </Field>
      <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-3">
        <Field label="Jumlah" required error={amountError}>
          {(fieldId) => (
            <Input
              id={fieldId}
              inputMode="numeric"
              value={amount ? formatRupiah(Number(amount)) : ''}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
              placeholder="Rp 0"
              invalid={Boolean(amountError)}
            />
          )}
        </Field>
        <Field label="Tanggal">
          {(fieldId) => <Input id={fieldId} type="date" value={date} onChange={(e) => setDate(e.target.value)} />}
        </Field>
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-3">
        <Field label="Kategori">
          {(fieldId) => (
            <Select
              id={fieldId}
              options={expenseCategories}
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            />
          )}
        </Field>
        <Field label="Project">
          {(fieldId) => <Select id={fieldId} options={expenseProjects} value={project} onChange={(e) => setProject(e.target.value)} />}
        </Field>
      </div>
      <ReceiptDropzone fileName={receipt} onFileChange={setReceipt} />
    </form>
  );
}
