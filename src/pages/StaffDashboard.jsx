import React, { useState } from "react";

const StaffDashboard = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", items: ["Burger", "Fries"], status: "Pending" },
    { id: 2, customer: "Jane Smith", items: ["Pizza"], status: "In Progress" },
  ]);

  const [reservations, setReservations] = useState([
    { id: 1, name: "Alice", date: "2025-08-20", time: "19:00", guests: 2 },
    { id: 2, name: "Bob", date: "2025-08-21", time: "20:30", guests: 4 },
  ]);

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="staff-dashboard">
      <h2>👨‍🍳 Staff Dashboard</h2>

      {/* Orders Section */}
      <section className="orders-section">
        <h3>Orders</h3>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.customer}</td>
                <td>{o.items.join(", ")}</td>
                <td>{o.status}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => updateOrderStatus(o.id, "In Progress")}>In Progress</button>
                  <button className="btn btn-success" onClick={() => updateOrderStatus(o.id, "Completed")}>Completed</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Reservations Section */}
      <section className="reservations-section">
        <h3>Reservations</h3>
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.guests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default StaffDashboard;
