import { useState, type FormEvent } from 'react';
import { Button, Field, Input, Modal, Select } from '@/components/ui';
import { catalogTaxes, catalogUnits, type CatalogItem } from '../data';

type CatalogItemModalProps = {
  /** Item to edit; empty for a new service. */
  item: CatalogItem | null;
  onClose: () => void;
  onSave: (item: CatalogItem) => void;
};

const thousands = new Intl.NumberFormat('id-ID');

/** Add / edit a catalog service. Mount it fresh for every open so the fields start from `item`. */
export function CatalogItemModal({ item, onClose, onSave }: CatalogItemModalProps) {
  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [unit, setUnit] = useState(item?.unit ?? catalogUnits[0]!);
  const [price, setPrice] = useState(item?.price ?? 0);
  const [tax, setTax] = useState(item?.tax ?? catalogTaxes[0]!);
  const [submitted, setSubmitted] = useState(false);
  const nameError = name.trim() ? undefined : 'Nama jasa wajib diisi';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (nameError) return;
    onSave({ id: item?.id ?? `jasa-${Date.now()}`, name: name.trim(), description: description.trim(), unit, price, tax });
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={item ? 'Ubah jasa' : 'Tambah jasa'}
      subtitle="Dipakai di line-item editor quotation & invoice"
      footer={
        <>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="primary" type="submit" form="catalog-item">
            {item ? 'Simpan jasa' : 'Tambah jasa'}
          </Button>
        </>
      }
    >
      <form id="catalog-item" onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
        <Field label="Nama jasa" required error={submitted ? nameError : undefined} className="sm:col-span-2">
          {(id) => <Input id={id} value={name} invalid={submitted && !!nameError} onChange={(e) => setName(e.target.value)} autoFocus />}
        </Field>
        <Field label="Deskripsi" className="sm:col-span-2">
          {(id) => <Input id={id} value={description} placeholder="Riset, wireframe, hi-fi" onChange={(e) => setDescription(e.target.value)} />}
        </Field>
        <Field label="Harga">
          {(id) => (
            <Input
              id={id}
              inputMode="numeric"
              value={price ? thousands.format(price) : ''}
              placeholder="0"
              suffix="Rp"
              onChange={(e) => setPrice(Number(e.target.value.replace(/\D/g, '')))}
            />
          )}
        </Field>
        <Field label="Satuan">{(id) => <Select id={id} options={catalogUnits} value={unit} onChange={(e) => setUnit(e.target.value)} />}</Field>
        <Field label="Pajak">{(id) => <Select id={id} options={catalogTaxes} value={tax} onChange={(e) => setTax(e.target.value)} />}</Field>
      </form>
    </Modal>
  );
}
