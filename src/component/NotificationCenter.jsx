import React, { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import { FaBell } from "react-icons/fa";

const NotificationCenter = () => {
  const { notifications, markNotificationRead, clearNotifications } = useContext(OrderContext);
  const [open, setOpen] = useState(false);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="notification-center">
      <button className="notif-btn" onClick={() => setOpen(!open)}>
        <FaBell />
        {unread > 0 && <span className="badge">{unread}</span>}
      </button>

      {open && (
        <div className="notif-panel">
          <div className="panel-header">
            <strong>Notifications</strong>
            <button className="btn btn-primary  m-2 p-1 clear position-absolute left-9" onClick={clearNotifications}>Clear</button>
          </div>
          <ul className="notif-list">
            {notifications.length === 0 && <li className="empty">No notifications</li>}
            {notifications.map((n) => (
              <li key={n.id} className={n.read ? "read" : "unread"}>
                <div className="title">{n.title}</div>
                <div className="body">{n.body}</div>
                <div className="meta">
                  <button className="btn btn-primary p-1 m-1 " onClick={() => markNotificationRead(n.id)}>Mark read</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
