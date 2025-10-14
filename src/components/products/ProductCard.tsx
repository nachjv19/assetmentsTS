import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Product } from '../../types';

interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void; // Opcional, por si quieres carrito
}

export const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  const footer = (
    <div className="flex justify-content-between">
      {onAddToCart && (
        <Button
          label="Agregar al carrito"
          icon="pi pi-shopping-cart"
          onClick={() => onAddToCart(product)}
        />
      )}
      <span style={{ fontWeight: 600 }}>${product.price.toFixed(2)}</span>
    </div>
  );

  return (
    <Card
  title={product.name}
  subTitle={product.brand}
  footer={footer}
  className="product-card bg-white rounded-xl shadow-lg overflow-hidden m-2 w-60 sm:w-64 transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
>
  <img
    src={product.imageUrl || 'https://via.placeholder.com/200x150?text=Sin+Imagen'}
    alt={product.name}
    className="w-full h-36 object-cover"
  />
  <p className="mt-2 text-gray-600 text-sm">{product.category}</p>
</Card>

  );
};
