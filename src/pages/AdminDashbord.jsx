import React, { useContext, useMemo } from "react";
import { OrderContext } from "../context/OrderContext";
import { Link } from "react-router-dom";

const StatCard = ({ title, value }) => (
  <div className="card stat-card">
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
  </div>
);

const AdminDashboard = () => {
  const { orders, reservations } = useContext(OrderContext);

  const totals = useMemo(() => {
    const revenue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0);
    const pending = orders.filter(o => o.status === "Pending").length;
    const preparing = orders.filter(o => o.status === "Preparing").length;
    const delivered = orders.filter(o => o.status === "Delivered").length;
    return { revenue, pending, preparing, delivered };
  }, [orders]);

  return (
    <div className="admin-dashboard container">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-grid">
        <StatCard title="Total Revenue (₦)" value={`₦${totals.revenue.toFixed(2)}`} />
        <StatCard title="Pending Orders" value={totals.pending} />
        <StatCard title="Preparing" value={totals.preparing} />
        <StatCard title="Delivered" value={totals.delivered} />
        <StatCard title="Reservations" value={reservations.length} />
        <StatCard title="Total Orders" value={orders.length} />
      </div>

      <section className="recent-section">
        <h3>Recent Orders</h3>
        <div className="recent-list">
          {orders.slice(0, 6).map(o => (
            <div key={o.id} className="order-card">
              <div className="order-head">
                <strong>#{o.id}</strong>
                <span className={`pill pill-${o.status.toLowerCase()}`}>{o.status}</span>
              </div>
              <div className="order-body">
                <div className="customer">{o.customer?.name}</div>
                <div className="items">{o.items.map(i => `${i.quantity}× ${i.name}`).join(", ")}</div>
                <div className="total">₦{(Number(o.total)||0).toFixed(2)}</div>
              </div>
              <div className="order-actions">
                <Link to="/admin/orders" className="btn btn-outline">Manage</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
