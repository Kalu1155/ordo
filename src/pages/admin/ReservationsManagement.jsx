import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { toast } from "react-toastify";

const ReservationsManagementAdmin = () => {
  const { reservations, updateReservationStatus, pushNotification } = useContext(OrderContext);
  const [reply, setReply] = useState({}); // keyed by reservation id

  const handleApprove = (id) => {
    updateReservationStatus(id, "Confirmed");
    toast.success("Reservation confirmed");
  };

  const handleCancel = (id) => {
    // require explanation
    const message = reply[id];
    if (!message) return toast.error("Please include a message to the customer explaining why it's cancelled.");
    updateReservationStatus(id, "Cancelled");
    pushNotification({
      id: Date.now() + Math.random(),
      type: "reservation-cancel",
      title: `Reservation ${id} cancelled`,
      body: message,
      payload: { reservationId: id },
      read: false,
    });
    toast.info("Customer has been notified with your message");
    setReply(p => ({ ...p, [id]: "" }));
  };

  return (
    <div className="admin-reservations container">
      <h2>📅 Reservations (Admin)</h2>
      {reservations.length === 0 ? <p>No reservations</p> : (
        <div className="reservations-grid">
          {reservations.map(r => (
            <div key={r.id} className="res-card card">
              <div className="res-head">
                <strong>{r.name}</strong>
                <span className="date">{r.date} • {r.time}</span>
              </div>

              <div className="res-body">
                <div>{r.guests} guests</div>
                <div>Status: <span className={`pill pill-${(r.status||"pending").toLowerCase()}`}>{r.status}</span></div>
              </div>

              <div className="res-actions">
                <button className="btn btn-success" onClick={() => handleApprove(r.id)}>Approve</button>
                <div className="cancel-block">
                  <textarea placeholder="Explain to customer why you cancel..." value={reply[r.id] || ""} onChange={(e) => setReply(p => ({ ...p, [r.id]: e.target.value }))} />
                  <button className="btn btn-danger" onClick={() => handleCancel(r.id)}>Cancel & Notify</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsManagementAdmin;
