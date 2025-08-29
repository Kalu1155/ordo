import React, { useState } from "react";

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([
    { id: 1, name: "John Doe", date: "2025-08-20", time: "19:00", guests: 4, status: "Pending" },
    { id: 2, name: "Jane Smith", date: "2025-08-21", time: "20:30", guests: 2, status: "Approved" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setReservations(reservations.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="reservations-management">
      <h2>📅 Reservations Management</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.date}</td>
              <td>{r.time}</td>
              <td>{r.guests}</td>
              <td>{r.status}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleStatusChange(r.id, "Approved")}>Approve</button>
                <button className="btn btn-danger" onClick={() => handleStatusChange(r.id, "Cancelled")}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsManagement;
