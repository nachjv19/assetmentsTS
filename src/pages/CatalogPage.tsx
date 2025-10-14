import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/productService';

/**
 * CatalogPage — shows a responsive grid of products.
 */
export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading catalog...</p>;
  if (!products.length) return <p>No products available.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
  {products.map((product) => (
    <div
      key={product._id}
      className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      <img
        src={product.imageUrl || 'https://via.placeholder.com/300x180?text=No+Image'}
        alt={product.name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
  <p className="text-sm text-gray-500">SKU: {product.sku}</p>
  <p className="text-sm text-gray-500">Brand: {product.brand}</p>
  <p className="text-sm text-gray-500">Category: {product.category}</p>
  <p className="text-sm font-bold text-gray-800">Price: ${product.price.toFixed(2)}</p>
  <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
      </div>
    </div>
  ))}
</div>

  );
};
