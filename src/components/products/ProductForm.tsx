import React, { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { createProduct, updateProduct } from '../../api/productService';

/**
 * ProductForm — modal dialog for creating or editing a product.
 */
interface Props {
  product: Product | null;
  onHide: () => void;
  onReload: () => void;
  toast: React.RefObject<Toast | null>;
}

export const ProductForm: React.FC<Props> = ({ product, onHide, onReload, toast }) => {
  const [form, setForm] = useState<Product>({
    _id: '',
    sku: '',
    name: '',
    brand: '',
    category: '',
    price: 0,
    quantity: 0,
    isActive: true,
    imageUrl: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) setForm(product);
    else setForm({ _id: '', sku: '', name: '', brand: '', category: '', price: 0, quantity: 0, isActive: true, imageUrl: '' });
  }, [product]);

  const saveProduct = async () => {
    if (!form.sku.trim() || !form.name.trim()) {
      toast.current?.show({ severity: 'warn', summary: 'Validation', detail: 'SKU and Name are required' });
      return;
    }

    setSaving(true);
    try {
      if (form._id) {
        await updateProduct(form._id, form);
        toast.current?.show({ severity: 'success', summary: 'Actualizado', detail: 'Producto actualizado' });
      } else {
        await createProduct(form);
        toast.current?.show({ severity: 'success', summary: 'Creado', detail: 'Producto creado' });
      }
      onReload();
      onHide();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.response?.data?.message || 'Error al guardar producto' });
    } finally {
      setSaving(false);
    }
  };

  const footer = (
  <>
    <Button
      label="Cancelar"
      icon="pi pi-times"
      onClick={onHide}
      className="p-button-text"
      disabled={saving}
    />
    <Button
      label={saving ? 'Guardando...' : 'Guardar'}
      icon="pi pi-check"
      onClick={saveProduct}
      disabled={saving}
      className="p-button-primary"
    />
  </>
);

return (
  <Dialog
    visible={true}
    onHide={onHide}
    modal
  header={product ? 'Edit Product' : 'New Product'}
    footer={footer}
    className="w-full max-w-lg rounded-2xl shadow-xl"
  >
    <div className="p-fluid flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="sku" className="font-medium text-gray-700">SKU</label>
        <InputText
          id="sku"
          value={form.sku}
          onChange={e => setForm({ ...form, sku: e.target.value })}
          className="hover:shadow-md focus:shadow-outline transition-shadow duration-200"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="name" className="font-medium text-gray-700">Nombre</label>
        <InputText
          id="name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="hover:shadow-md focus:shadow-outline transition-shadow duration-200"
        />
      </div>

      <div className="flex flex-col">
  <label htmlFor="brand" className="font-medium text-gray-700">Brand</label>
        <InputText
          id="brand"
          value={form.brand}
          onChange={e => setForm({ ...form, brand: e.target.value })}
          className="hover:shadow-md focus:shadow-outline transition-shadow duration-200"
        />
      </div>

      <div className="flex flex-col">
  <label htmlFor="category" className="font-medium text-gray-700">Category</label>
        <InputText
          id="category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="hover:shadow-md focus:shadow-outline transition-shadow duration-200"
        />
      </div>

      <div className="flex flex-col">
  <label htmlFor="price" className="font-medium text-gray-700">Price</label>
        <InputNumber
          id="price"
          value={form.price}
          onValueChange={e => setForm({ ...form, price: e.value ?? 0 })}
          mode="currency"
          currency="USD"
          className="hover:shadow-md focus:shadow-outline transition-shadow duration-200"
        />
      </div>

      <div className="flex flex-col">
  <label htmlFor="quantity" className="font-medium text-gray-700">Quantity</label>
        <InputNumber
          id="quantity"
          value={form.quantity}
          onValueChange={e => setForm({ ...form, quantity: e.value ?? 0 })}
          min={0}
          className="hover:shadow-md focus:shadow-outline transition-shadow duration-200"
        />
      </div>

      <div className="flex flex-col">
  <label htmlFor="imageUrl" className="font-medium text-gray-700">Image URL</label>
        <InputText
          id="imageUrl"
          value={form.imageUrl}
          onChange={e => setForm({ ...form, imageUrl: e.target.value })}
          className="hover:shadow-md focus:shadow-outline transition-shadow duration-200"
        />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Checkbox
          checked={form.isActive}
          onChange={e => setForm({ ...form, isActive: e.checked ?? true })}
        />
  <span className="font-medium text-gray-700">Active</span>
      </div>
    </div>
    </Dialog>
    );

};
