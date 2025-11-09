import React from 'react';

export default function ProductForm({ form, setForm, onSave, onCancel }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-200">
      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
        className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* ✅ Category changed to normal text input */}
      <input
        placeholder="Category (e.g. Men's Clothing, Electronics)"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        placeholder="Image URL"
        value={form.image}
        onChange={e => setForm({ ...form, image: e.target.value })}
        className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-3">
        <button
          onClick={onSave}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-200 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
