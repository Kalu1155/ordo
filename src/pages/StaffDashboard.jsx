import React, { useContext, useMemo } from "react";
import { OrderContext } from "../context/OrderContext";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, className }) => (
  <div className={`stat-card ${className || ""}`}>
    <div className="title">{title}</div>
    <div className="value">{value}</div>
  </div>
);

const StaffDashboard = () => {
  const { orders, reservations } = useContext(OrderContext);

  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const preparingCount = orders.filter((o) => o.status === "Preparing").length;
  const readyCount = orders.filter((o) => o.status === "Ready").length;

  const revenue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0);

  return (
    <div className="staff-dashboard container">
      <h2>Staff Dashboard</h2>

      <div className="stats-grid">
        <StatCard title="Pending Orders" value={pendingCount} />
        <StatCard title="Preparing" value={preparingCount} />
        <StatCard title="Ready" value={readyCount} />
        <StatCard title="Reservations" value={reservations.length} />
        <StatCard title="Revenue (₦)" value={`₦${revenue.toFixed(2)}`} />
      </div>

      <section className="recent">
        <h3>Recent Orders</h3>
        <div className="recent-list">
          {orders.slice(0, 6).map((o) => (
            <div className="order-card" key={o.id}>
              <div className="head">
                <strong>#{o.id}</strong> <span className="status">{o.status}</span>
              </div>
              <div className="body">
                <div className="cust">{o.customer?.name}</div>
                <div className="items">{o.items.map(i => `${i.quantity}×${i.name}`).join(", ")}</div>
                <div className="total">₦{(Number(o.total) || 0).toFixed(2)}</div>
              </div>
              <div className="actions">
                <Link to={`/staff/orders`} className="btn">Manage</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StaffDashboard;
