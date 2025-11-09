import React, { useState } from "react";

export default function AddProduct({ onAddProduct }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    category: "", // now text input instead of dropdown
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.image) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: formData.title,
      price: parseFloat(formData.price),
      image: formData.image,
      category: formData.category || "Uncategorized",
    };

    onAddProduct(newProduct);
    setFormData({ title: "", price: "", image: "", category: "" });
  };

  return (
    <div className="add-product-container bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-yellow-400">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-400"
        />

        {/* ✅ Category as normal text input */}
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Men's Clothing, Electronics)"
          value={formData.category}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-400"
        />

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded transition-all duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
