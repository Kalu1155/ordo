import React, { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";

const ReservationsPage = () => {
  const { reservations, updateReservationStatus } = useContext(OrderContext);

  return (
    <div className="reservations-page">
      <h2>📅 Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Update</th>
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
                  {["Confirmed", "Cancelled"].map(status => (
                    <button
                      key={status}
                      className={`btn btn-${status === "Cancelled" ? "danger" : "success"}`}
                      onClick={() => updateReservationStatus(r.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationsPage;
