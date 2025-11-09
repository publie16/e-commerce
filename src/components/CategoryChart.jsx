// src/components/CategoryChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function CategoryChart({ data }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Category Sales Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
