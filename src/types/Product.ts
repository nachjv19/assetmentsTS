export interface Product {
  _id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  isActive: boolean;
  imageUrl?: string;
  createdAt?: string;
}
