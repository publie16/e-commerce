import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Loader from '../../components/Loader';
import formatPrice from '../../utils/formatPrice';

export default function ProductDetail({ products: propProducts }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    if (propProducts && propProducts.length) {
      const found = propProducts.find(p => p.id.toString() === id);
      if (found) {
        setProduct(found);
        setLoading(false);
        return;
      }
    }

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => { setProduct(null); setLoading(false); });
  }, [id, propProducts]);

  if (loading) return <Loader />;

  if (!product)
    return (
      <div className="p-6 text-center bg-gray-900 min-h-screen text-gray-400">
        Product not found
      </div>
    );

  return (
    <div className="p-6 md:p-12 flex flex-col md:flex-row gap-8 bg-gray-800 rounded-lg shadow-lg text-gray-200 min-h-screen">
      <img
        src={product.image || 'https://via.placeholder.com/300'}
        alt={product.title}
        className="w-full md:w-72 h-72 object-contain rounded-lg bg-gray-700 p-2"
      />
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <div className="text-gray-400 mb-2">{product.category}</div>
        <div className="text-2xl font-semibold text-blue-400 mb-4">{formatPrice(product.price)}</div>
        {product.description && <p className="text-gray-300 mb-6">{product.description}</p>}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={() => { addToCart(product); alert('Added to cart'); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
