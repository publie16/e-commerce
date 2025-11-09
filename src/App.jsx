import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// User pages
import Home from './pages/User/Home';
import ProductDetail from './pages/User/ProductDetail';
import Cart from './pages/User/Cart';
import Checkout from './pages/User/Checkout';

// Admin pages
import AdminDashboard from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/Product';
import AdminOrders from './pages/Admin/Orders';

// Auth
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

export default function App() {
  // Shared state for products and orders
  const [products, setProducts] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    return stored;
  });
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('orders') || '[]'));

  // Fetch fake store API products and merge with admin-added products
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(apiProducts => {
        const stored = JSON.parse(localStorage.getItem('products') || '[]');
        const combined = [...apiProducts, ...stored];
        setProducts(combined);
      })
      .catch(() => {
        const stored = JSON.parse(localStorage.getItem('products') || '[]');
        setProducts(stored);
      });
  }, []);

  // Sync products and orders with localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products.filter(p => p.id > 20)));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          {/* User */}
          <Route path="/" element={<Home products={products} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} />} />
          <Route path="/cart" element={<Cart orders={orders} setOrders={setOrders} />} />
          <Route path="/checkout" element={<Checkout orders={orders} setOrders={setOrders} />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard products={products} orders={orders} />} />
          <Route path="/admin/products" element={<AdminProducts products={products} setProducts={setProducts} />} />
          <Route path="/admin/orders" element={<AdminOrders orders={orders} setOrders={setOrders} />} />

          {/* Fallback */}
          <Route path="*" element={<div className="p-8 text-gray-400">Page not found</div>} />
        </Routes>
      </main>

      <footer className="text-center text-sm text-gray-400 py-6 border-t border-gray-700">
        Built with React + Tailwind — Demo
      </footer>
    </div>
  );
}
