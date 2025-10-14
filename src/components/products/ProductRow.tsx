import React from 'react';
import { Product } from '../../types/Product';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { deleteProduct } from '../../api/productService';

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onReload: () => void;
  toast: React.RefObject<Toast>;
}

export const ProductRow: React.FC<Props> = ({ product, onEdit, onReload, toast }) => {
  const handleDelete = async () => {
  if (window.confirm(`Delete ${product.name}?`)) {
      try {
        await deleteProduct(product._id!);
        toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: 'Producto eliminado' });
        onReload();
      } catch (err: any) {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: err.response?.data?.message || 'Error' });
      }
    }
  };

  return (
   <tr className="hover:bg-gray-50 transition-colors duration-200">
  <td className="px-4 py-2">{product.sku}</td>
  <td className="px-4 py-2 font-medium text-gray-800">{product.name}</td>
  <td className="px-4 py-2">{product.brand}</td>
  <td className="px-4 py-2">{product.category}</td>
  <td className="px-4 py-2 font-semibold text-gray-700">${product.price.toFixed(2)}</td>
  <td className="px-4 py-2">{product.quantity}</td>
  <td className="px-4 py-2 text-center">{product.isActive ? '✅' : '❌'}</td>
  <td className="px-4 py-2">
    <div className="flex gap-2 justify-center">
      <Button
        icon="pi pi-pencil"
        className="p-button-warning p-button-rounded p-button-sm"
        onClick={() => onEdit(product)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-danger p-button-rounded p-button-sm"
        onClick={handleDelete}
      />
    </div>
  </td>
</tr>

  );
};
