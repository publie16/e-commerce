import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import formatPrice from '../../utils/formatPrice';

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0)
    return (
      <div className="p-6 text-center bg-gray-900 min-h-screen text-gray-200">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-400">Your cart is empty.</p>
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          Continue shopping
        </Link>
      </div>
    );

  return (
    <div className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Cart Items */}
      <div className="md:col-span-2 flex flex-col gap-4">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b border-gray-700 py-4"
          >
            <img
              src={item.image}
              className="w-20 h-20 object-contain bg-gray-800 p-1 rounded"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-200">{item.title}</div>
              <div className="text-sm text-gray-400">{formatPrice(item.price)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                className="px-2 py-1 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
              >
                -
              </button>
              <div>{item.qty}</div>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="px-2 py-1 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="px-2 py-1 text-red-500 font-semibold hover:text-red-400 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="border border-gray-700 rounded-lg p-6 bg-gray-800 shadow-lg flex flex-col">
        <div className="text-lg font-semibold text-gray-200">Order Summary</div>
        <div className="mt-3 text-gray-400">Items: {cart.length}</div>
        <div className="mt-2 text-xl font-bold text-blue-400">{formatPrice(subtotal)}</div>
        <button
          onClick={() => navigate('/checkout')}
          className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
        >
          Proceed to Checkout
        </button>
        <button
          onClick={() => { if (window.confirm('Clear cart?')) clearCart(); }}
          className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition text-gray-200"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
