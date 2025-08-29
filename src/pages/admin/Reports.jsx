import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", orders: 20, revenue: 200 },
  { name: "Tue", orders: 35, revenue: 300 },
  { name: "Wed", orders: 25, revenue: 180 },
  { name: "Thu", orders: 40, revenue: 450 },
  { name: "Fri", orders: 60, revenue: 700 },
];

const Reports = () => {
  return (
    <div className="reports">
      <h2>📊 Reports & Analytics</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#4CAF50" />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
