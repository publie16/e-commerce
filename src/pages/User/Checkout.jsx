import React from 'react';
import { useCart } from '../../context/CartContext';
import formatPrice from '../../utils/formatPrice';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const handlePlaceOrder = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = { id: Date.now(), items: cart, total, createdAt: new Date().toISOString() };
    localStorage.setItem('orders', JSON.stringify([order, ...orders]));
    clearCart();
    alert('Order placed (simulated)');
  };

  if (cart.length === 0)
    return (
      <div className="p-6 text-center bg-gray-900 min-h-screen text-gray-200">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-400">No items to checkout.</p>
      </div>
    );

  return (
    <div className="p-6 md:p-12 max-w-3xl mx-auto bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="border border-gray-700 rounded-lg p-6 bg-gray-800 shadow-lg flex flex-col gap-4">
        {cart.map(i => (
          <div key={i.id} className="flex justify-between py-2 border-b border-gray-700">
            <div>{i.title} x {i.qty}</div>
            <div>{formatPrice(i.price * i.qty)}</div>
          </div>
        ))}

        <div className="flex justify-between mt-4 font-bold text-xl text-blue-400">
          <div>Total</div>
          <div>{formatPrice(total)}</div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          Place Order (Simulated)
        </button>
      </div>
    </div>
  );
}
