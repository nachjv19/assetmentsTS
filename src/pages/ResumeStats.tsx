// src/pages/AdminSummary.tsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productService';
import { getUsers } from '../api/userService';
import { Product } from '../types/Product';
import { User } from '../types/User';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';

/**
 * AdminSummary — admin dashboard overview for products and users.
 */
export const AdminSummary = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        const usersData = await getUsers();
        setProducts(productsData);
        setUsers(usersData);
      } catch (err) {
        console.error('Error cargando resumen', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProducts = products.length;
  const totalValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const totalEmployees = users.length;
  const lowStockCount = products.filter(p => p.quantity <= 5).length;
  const activeCount = products.filter(p => p.isActive).length;
  const percentActive = totalProducts ? Math.round((activeCount / totalProducts) * 100) : 0;
  const avgPrice = totalProducts ? totalValue / totalProducts : 0;

  if (loading) return <p className="p-4">Loading summary...</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Summary</h1>
          <p className="text-sm text-gray-500">Quick overview of products and users</p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
        <Card className="shadow-sm rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Products</p>
              <p className="text-2xl font-semibold text-gray-800">{totalProducts}</p>
            </div>
            <div className="text-3xl">📦</div>
          </div>
        </Card>

        <Card className="shadow-sm rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Inventory Value</p>
              <p className="text-2xl font-semibold text-gray-800">${totalValue.toLocaleString(undefined, {maximumFractionDigits:2})}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </Card>

        <Card className="shadow-sm rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Employees</p>
              <p className="text-2xl font-semibold text-gray-800">{totalEmployees}</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </Card>

        <Card className="shadow-sm rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Low stock (&le;5)</p>
              <p className="text-2xl font-semibold text-red-600">{lowStockCount}</p>
            </div>
            <div className="text-3xl">⚠️</div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white shadow-sm rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Inventory status</h3>
          <div className="mb-3">
            <p className="text-sm text-gray-600">Active products: <span className="font-medium text-gray-800">{activeCount}</span> of <span className="font-medium">{totalProducts}</span></p>
            <div className="mt-2">
              <ProgressBar value={percentActive} showValue={false} className="h-3 rounded-full overflow-hidden" />
              <div className="text-xs text-gray-500 mt-2">{percentActive}% active</div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Average price per product</p>
            <p className="text-xl font-semibold text-gray-800">${avgPrice.toFixed(2)}</p>
          </div>
        </Card>

        <Card className="bg-white shadow-sm rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Users</h3>
          {users.length === 0 ? (
            <p className="text-sm text-gray-500">No registered users.</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total users: <span className="font-medium text-gray-800">{totalEmployees}</span></p>
              <div className="mt-2 grid gap-2">
                {Object.entries(users.reduce((acc: Record<string, number>, u) => {
                  const role = (u.role ?? 'unknown') as string;
                  acc[role] = (acc[role] || 0) + 1;
                  return acc;
                }, {})).map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <div className="text-sm text-gray-700">{role}</div>
                    <div className="text-sm font-medium text-gray-800">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
};
