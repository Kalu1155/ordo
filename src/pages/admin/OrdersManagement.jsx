import React, { useState } from "react";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", items: ["Burger", "Fries"], total: 25.5, status: "Pending" },
    { id: 2, customer: "Jane Smith", items: ["Pizza"], total: 15.0, status: "Completed" },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="orders-management">
      <h2>🧾 Orders Management</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Items</th>
            <th>Total ($)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.customer}</td>
              <td>{o.items.join(", ")}</td>
              <td>{o.total.toFixed(2)}</td>
              <td>{o.status}</td>
              <td>
                <button className="btn btn-primary" onClick={() => updateStatus(o.id, "In Progress")}>In Progress</button>
                <button className="btn btn-success" onClick={() => updateStatus(o.id, "Completed")}>Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersManagement;
