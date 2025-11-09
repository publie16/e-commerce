import React, { useState, useEffect } from 'react';

export default function DeleteProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch API products
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(apiProducts => {
        const stored = JSON.parse(localStorage.getItem('products') || '[]');
        // Merge API + localStorage products
        setProducts([...apiProducts, ...stored]);
      })
      .catch(() => {
        // fallback: only localStorage products
        const stored = JSON.parse(localStorage.getItem('products') || '[]');
        setProducts(stored);
      });
  }, []);

  const removeProduct = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const newProducts = products.filter(p => p.id !== id);
    setProducts(newProducts);

    // Only save admin-added products to localStorage
    const adminProducts = newProducts.filter(p => p.id > 20);
    localStorage.setItem('products', JSON.stringify(adminProducts));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products (Delete)</h1>
      {products.length === 0 ? (
        <div>No products available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} className="border rounded p-3">
              <img
                src={p.image || 'https://via.placeholder.com/150'}
                className="h-28 object-contain mx-auto"
                alt={p.title}
              />
              <div className="mt-2 font-semibold text-sm">{p.title}</div>
              <div className="text-xs text-gray-600">${p.price} • {p.category}</div>
              <button
                onClick={() => removeProduct(p.id)}
                className="mt-2 px-2 py-1 border rounded text-red-600 text-sm w-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
