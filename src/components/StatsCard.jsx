import React from 'react';

export default function StatsCard({ title, value }) {
  return (
    <div className="border rounded p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}