// src/pages/Admin/Product.jsx
import React, { useEffect, useState } from 'react';
import ProductForm from '../../components/ProductForm';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title:'', price:'', category:'', image:'', description:'' });

  // Load API products + localStorage products
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(apiProducts => {
        const stored = JSON.parse(localStorage.getItem('products') || '[]');
        setProducts([...apiProducts, ...stored]);
      })
      .catch(() => {
        const stored = JSON.parse(localStorage.getItem('products') || '[]');
        setProducts(stored);
      });
  }, []);

  // Update form when editing
  useEffect(() => {
    if(editing) setForm(editing);
    else setForm({ title:'', price:'', category:'', image:'', description:'' });
  }, [editing]);

  const save = () => {
    if (!form.title || !form.price) { alert('Title & price required'); return; }

    if (editing) {
      const newProducts = products.map(p =>
        p.id === editing.id ? { ...p, ...form, price: Number(form.price) } : p
      );
      setProducts(newProducts);
      // Save only admin-added products
      const adminProducts = newProducts.filter(p => p.id > 20);
      localStorage.setItem('products', JSON.stringify(adminProducts));
    } else {
      const id = Date.now();
      const newProduct = { id, ...form, price: Number(form.price) };
      const newProducts = [...products, newProduct];
      setProducts(newProducts);
      // Save admin products
      const adminProducts = newProducts.filter(p => p.id > 20);
      localStorage.setItem('products', JSON.stringify(adminProducts));
    }

    setEditing(null);
  };

  const remove = (id) => {
    const product = products.find(p => p.id === id);
    if (id <= 20) { // prevent deletion of API products
      alert('Cannot delete default products!');
      return;
    }
    if (!window.confirm('Delete product?')) return;

    const newProducts = products.filter(p => p.id !== id);
    setProducts(newProducts);
    // Save only admin-added products
    const adminProducts = newProducts.filter(p => p.id > 20);
    localStorage.setItem('products', JSON.stringify(adminProducts));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(p => (
              <div key={p.id} className="border rounded p-3">
                <img src={p.image || 'https://via.placeholder.com/150'} className="h-28 object-contain mx-auto" alt={p.title} />
                <div className="mt-2 font-semibold text-sm">{p.title}</div>
                <div className="text-xs text-gray-600">${p.price} • {p.category}</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={()=> setEditing(p)} className="px-2 py-1 border rounded text-sm">Edit</button>
                  <button onClick={()=> remove(p.id)} className="px-2 py-1 border rounded text-sm text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ProductForm form={form} setForm={setForm} onSave={save} onCancel={() => setEditing(null)} />
        </div>
      </div>
    </div>
  );
}
