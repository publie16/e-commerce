import React, { useState } from 'react';

export default function AdminOrders(){
  const [orders] = useState(() => JSON.parse(localStorage.getItem('orders') || '[]'));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <div>No orders yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="border rounded p-4">
              <div className="flex justify-between">
                <div>Order #{o.id}</div>
                <div>{new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div className="mt-2">Items: {o.items.length}</div>
              <div className="mt-2 font-bold">Total: ${Number(o.total).toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
