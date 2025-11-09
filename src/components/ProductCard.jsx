import React from 'react';
import { Link } from 'react-router-dom';
import formatPrice from '../utils/formatPrice';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-gray-800 text-gray-200 border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300 flex flex-col">
      <img
        src={product.image || 'https://via.placeholder.com/150'}
        className="h-48 object-contain mx-auto mb-4"
        alt={product.title}
      />
      <div className="text-gray-400 text-xs mb-1">{product.category}</div>
      <div className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</div>
      <div className="text-blue-400 font-bold mb-3">{formatPrice(product.price)}</div>
      <div className="mt-auto flex gap-2">
        <Link
          to={`/product/${product.id}`}
          className="flex-1 px-3 py-2 border border-gray-600 rounded-lg text-center text-sm hover:bg-gray-700 transition"
        >
          View
        </Link>
        <button
          onClick={() => onAdd(product)}
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}
