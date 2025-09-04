import React, { useContext, useMemo, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ReportsAdmin = () => {
  const { orders } = useContext(OrderContext);
  const [rangeType, setRangeType] = useState("7"); // 7 days default
  // rangeType: "7" days, "30" days, "90", "365" etc.

  const data = useMemo(() => {
    const days = Number(rangeType);
    const now = Date.now();
    const buckets = {}; // date -> aggregates

    for (let i = 0; i < days; i++) {
      const d = new Date(now - (days - 1 - i) * 24 * 60 * 60 * 1000);
      const key = d.toISOString().split("T")[0];
      buckets[key] = { date: key, orders: 0, revenue: 0 };
    }

    orders.forEach(o => {
      const key = (new Date(o.date)).toISOString().split("T")[0];
      if (buckets[key]) {
        buckets[key].orders += 1;
        buckets[key].revenue += Number(o.total) || 0;
      }
    });

    return Object.values(buckets);
  }, [orders, rangeType]);

  return (
    <div className="admin-reports container">
      <h2>📊 Reports</h2>

      <div className="reports-controls">
        <label>Range:
          <select value={rangeType} onChange={e => setRangeType(e.target.value)}>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </label>
      </div>

      <div className="chart-card card">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" name="Orders" />
            <Bar dataKey="revenue" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportsAdmin;
