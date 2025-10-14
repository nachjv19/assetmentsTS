import React from 'react';
import { Product } from '../../types/Product';
import { Button } from 'primereact/button';
import { deleteProduct } from '../../api/productService';
import { Toast } from 'primereact/toast';

/**
 * Props for ProductTable
 */
interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onReload: () => void;
  toast: React.RefObject<Toast | null>;
}

export const ProductTable = ({ products, onEdit, onReload, toast }: Props) => {
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete product?')) return;
    try {
      await deleteProduct(id);
      toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: 'Producto eliminado' });
      onReload();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.response?.data?.message || err.message });
    }
  };

  return (
    <div className="overflow-x-auto mt-4">
  <table className="min-w-full border-collapse border border-gray-200">
    <thead className="bg-gray-200">
      <tr>
        <th className="px-4 py-2 text-left text-gray-700 font-medium">SKU</th>
        <th className="px-4 py-2 text-left text-gray-700 font-medium">Name</th>
        <th className="px-4 py-2 text-left text-gray-700 font-medium">Price</th>
        <th className="px-4 py-2 text-left text-gray-700 font-medium">Quantity</th>
        <th className="px-4 py-2 text-center text-gray-700 font-medium">Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p._id} className="border-t hover:bg-gray-50 transition-colors duration-200">
          <td className="px-4 py-2">{p.sku}</td>
          <td className="px-4 py-2 font-medium text-gray-800">{p.name}</td>
          <td className="px-4 py-2 font-semibold text-gray-700">${p.price.toFixed(2)}</td>
          <td className="px-4 py-2">{p.quantity}</td>
          <td className="px-4 py-2 flex gap-2 justify-center">
            <Button
              icon="pi pi-pencil"
              className="p-button-warning p-button-sm p-button-rounded"
              onClick={() => onEdit(p)}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-danger p-button-sm p-button-rounded"
              onClick={() => handleDelete(p._id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};
