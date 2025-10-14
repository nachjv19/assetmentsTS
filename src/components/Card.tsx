import React from 'react'
import { Product } from '../types'
import { Button } from './Button'
import { Badge } from './Badge'

/**
 * Product Card — small product preview used in the catalog and dashboard.
 */
export const Card = ({ product, onEdit, onDelete }: { product: Product, onEdit: ()=>void, onDelete: ()=>void }) => {
  return (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4 w-60 sm:w-64 m-2 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
  <img
  src={product.imageUrl || 'https://via.placeholder.com/200x140?text=No+Image'}
    alt={product.name}
    className="w-full h-36 object-cover rounded-md"
  />
  <h3 className="mt-2 font-semibold text-gray-800">{product.name}</h3>
  <p className="text-gray-600 text-sm">{product.brand}</p>
  <p className="font-bold text-gray-800">${product.price.toFixed(2)}</p>

  <Badge color={product.isActive ? 'green' : 'red'}>
    {product.isActive ? 'Active' : 'Inactive'}
  </Badge>

  <div className="flex gap-2 mt-3">
    <Button onClick={onEdit}>
      <span className="flex items-center gap-2"><i className="pi pi-pencil"/> Edit</span>
    </Button>
    <Button variant="secondary" onClick={onDelete}>
      <span className="flex items-center gap-2"><i className="pi pi-trash"/> Delete</span>
    </Button>
  </div>
</div>

  )
}
