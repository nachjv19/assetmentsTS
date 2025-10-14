import axios from './axios';
import { Product } from '../types';

const getToken = () => localStorage.getItem('token'); // asumimos que guardamos token al login

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get('/products', {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const createProduct = async (product: Partial<Product>): Promise<Product> => {
  const res = await axios.post('/products', product, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  const res = await axios.patch(`/products/${id}`, updates, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};
