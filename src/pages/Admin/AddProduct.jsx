// src/pages/Admin/AddProduct.jsx
import React, { useState } from 'react';
import ProductForm from '../../components/ProductForm';

export default function AddProduct() {
  const [products, setProducts] = useState(() =>
    JSON.parse(localStorage.getItem('products') || '[]')
  );

  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });

  const saveProduct = () => {
    if (!form.title || !form.price) {
      alert('Title and price required');
      return;
    }
    const id = Date.now();
    const newProducts = [{ id, ...form, price: Number(form.price) }, ...products];
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
    setForm({ title: '', price: '', category: '', image: '', description: '' });
    alert('Product added successfully!');
  };

  return (
    <div className="p-6 md:p-12 min-h-screen bg-gray-900 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">Add Product</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <ProductForm 
          form={form} 
          setForm={setForm} 
          onSave={saveProduct} 
          onCancel={() => setForm({ title: '', price: '', category: '', image: '', description: '' })}
          categories={["Men's Clothing", "Women's Clothing", "Jewellery", "Electronics"]}
        />
      </div>
    </div>
  );
}
