import React, { useEffect, useState, useRef } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/productService';
import { ProductTable } from '../components/products/ProductTable';
import { ProductForm } from '../components/products/ProductForm';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useAuth } from '../context/AuthContext';
import { CatalogPage } from './CatalogPage';
// Navbar is rendered globally in App, avoid local renders here

export const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const toast = useRef<Toast>(null);
  const { user } = useAuth();

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
  toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not load products' });
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  // Función auxiliar para mostrar toast desde cualquier componente hijo
  const showToast = (severity: 'success' | 'error', summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail });
  };

  // Renderizado condicional según rol
  if (!user) return null;

  return (
    <div className="p-4">
      <Toast ref={toast} />

      {user.role === 'admin' ? (
        <>
          <div className="p-2 flex justify-between items-center">
            <h2>Dashboard Admin</h2>
            <Button label="New Product" icon="pi pi-plus" onClick={handleNew} />
          </div>

          <ProductTable
            products={products}
            onEdit={handleEdit}
            onReload={loadProducts}
            toast={toast}
            showToast={showToast}
          />

          {showForm && (
            <ProductForm
              product={selectedProduct}
              onHide={() => setShowForm(false)}
              onReload={loadProducts}
              toast={toast}
              showToast={showToast}
            />
          )}
        </>
      ) : (
        <>
          <h2>Inventory</h2>
          <CatalogPage products={products} />
        </>
      )}
    </div>
  );
};
