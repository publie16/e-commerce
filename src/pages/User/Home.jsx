import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';

export default function Home({ products: propProducts }) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);

    fetch('https://fakestoreapi.com/products')
      .then(r => r.json())
      .then(data => {
        const stored = JSON.parse(localStorage.getItem('products') || '[]');
        setProducts([...data, ...stored]);
        setLoading(false);
      })
      .catch(() => {
        const stored = JSON.parse(localStorage.getItem('products') || '[]');
        setProducts(stored);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (propProducts && propProducts.length) {
      setProducts(prev => {
        const ids = new Set(prev.map(p => p.id));
        const newProducts = propProducts.filter(p => !ids.has(p.id));
        return [...prev, ...newProducts];
      });
    }
  }, [propProducts]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    if (category !== 'all' && p.category !== category) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  });

  if (loading) return <Loader />;

  return (
    <div className="p-6 md:p-12 bg-gray-900 min-h-screen">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {categories.map(c => (
            <option key={c} value={c} className="bg-gray-800 text-gray-200">
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">
            No products available.
          </div>
        ) : (
          filtered.map(p => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))
        )}
      </div>
    </div>
  );
}
