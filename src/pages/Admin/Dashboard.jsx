import React from 'react';
import StatsCard from '../../components/StatsCard';
import CategoryChart from '../../components/CategoryChart';

export default function AdminDashboard() {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  // Total revenue
  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);

  // Prepare category-wise revenue data
  const categoryRevenue = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      const category = item.category || 'Other';
      const total = (item.price || 0) * (item.qty || 1);
      categoryRevenue[category] = (categoryRevenue[category] || 0) + total;
    });
  });

  // Convert to array format for CategoryChart
  const chartData = Object.keys(categoryRevenue).map(cat => ({
    name: cat,
    revenue: Number(categoryRevenue[cat].toFixed(2)),
  }));

  return (
    <div className="p-6 md:p-12 min-h-screen bg-gray-900 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Products" value={products.length} dark />
        <StatsCard title="Orders" value={orders.length} dark />
        <StatsCard title="Revenue" value={`$${revenue.toFixed(2)}`} dark />
      </div>

      {/* Category-wise Revenue Chart */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Category Revenue</h2>
        <CategoryChart data={chartData} dark />
      </div>

      {/* Category Revenue Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Object.keys(categoryRevenue).map(cat => (
          <div
            key={cat}
            className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="text-gray-400 text-sm mb-2">{cat}</div>
            <div className="text-2xl font-bold text-blue-400">${categoryRevenue[cat].toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
