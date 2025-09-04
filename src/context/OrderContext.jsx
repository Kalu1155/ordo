// context/OrderContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Allowed order statuses
export const ORDER_STATUSES = ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"];

export const OrderContext = createContext();

export const OrderProvider = ({ children, demo = true }) => {
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("staff_orders") || "[]");
    } catch {
      return [];
    }
  });

  const [reservations, setReservations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("staff_reservations") || "[]");
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState([]);

  // Persist orders & reservations
  useEffect(() => {
    localStorage.setItem("staff_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("staff_reservations", JSON.stringify(reservations));
  }, [reservations]);

  // Add new order
  const addOrder = (order) => {
    const normalizedItems = (order.items || []).map((i) => ({
      ...i,
      price: Number(i.price) || 0,
      quantity: Number(i.quantity) || 1,
    }));

    const total = normalizedItems.reduce((s, it) => s + it.price * it.quantity, 0);

    const newOrder = {
      id: order.id ?? Date.now(),
      date: order.date ?? new Date().toISOString(),
      customer: order.customer ?? { name: "Guest", phone: "" },
      items: normalizedItems,
      total,
      status: order.status ?? "Pending",
    };

    setOrders((p) => [newOrder, ...p]);

    pushNotification({
      id: Date.now() + Math.random(),
      type: "order",
      title: `New Order — ${newOrder.customer.name}`,
      body: `₦${newOrder.total.toFixed(2)} • ${newOrder.items.length} items`,
      payload: { orderId: newOrder.id },
      read: false,
    });

    toast.info(`New order from ${newOrder.customer.name}`);
  };

  // Add new reservation
  const addReservation = (res) => {
    const newRes = {
      id: res.id ?? Date.now(),
      name: res.name,
      date: res.date,
      time: res.time,
      guests: Number(res.guests) || 1,
      status: res.status ?? "Pending",
    };

    setReservations((p) => [newRes, ...p]);

    pushNotification({
      id: Date.now() + Math.random(),
      type: "reservation",
      title: `New Reservation — ${newRes.name}`,
      body: `${newRes.date} • ${newRes.time} • ${newRes.guests} guests`,
      payload: { reservationId: newRes.id },
      read: false,
    });

    toast.info(`New reservation by ${newRes.name}`);
  };

  // Update order status (staff or admin)
  const updateOrderStatus = (orderId, newStatus, actor = { role: "staff" }) => {
    if (!ORDER_STATUSES.includes(newStatus)) return;

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    pushNotification({
      id: Date.now() + Math.random(),
      type: "status",
      title: `Order ${orderId} — ${newStatus}`,
      body: `Status updated to ${newStatus} by ${actor.role}`,
      payload: { orderId },
      read: false,
    });

    toast.success(`Order ${orderId} → ${newStatus}`);
  };

  // Update reservation status
  const updateReservationStatus = (resId, status) => {
    setReservations((p) =>
      p.map((r) => (r.id === resId ? { ...r, status } : r))
    );

    pushNotification({
      id: Date.now() + Math.random(),
      type: "reservation-update",
      title: `Reservation ${resId} — ${status}`,
      body: `Reservation ${status}`,
      payload: { resId },
      read: false,
    });
  };

  // Notifications
  const pushNotification = (note) => {
    setNotifications((n) => [note, ...n].slice(0, 50));
  };

  const markNotificationRead = (id) => {
    setNotifications((n) => n.map((x) => (x.id === id ? { ...x, read: true } : x)));
  };

  const clearNotifications = () => setNotifications([]);
  const clearOrders = () => setOrders([]);
  const clearReservations = () => setReservations([]);

  // Demo simulation for dev
  useEffect(() => {
    if (!demo) return;

    let t1 = setTimeout(() => {
      addOrder({
        id: Date.now() + 1,
        date: new Date().toISOString(),
        customer: { name: "Demo Customer", phone: "080***" },
        items: [
          { id: "d1", name: "Demo Pizza", price: 2500, quantity: 2 },
          { id: "d2", name: "Demo Soda", price: 300, quantity: 1 },
        ],
      });
    }, 4000);

    let t2 = setTimeout(() => {
      addReservation({
        name: "Demo Guest",
        date: new Date().toISOString().split("T")[0],
        time: "19:00",
        guests: 3,
      });
    }, 8000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        reservations,
        notifications,
        addOrder,
        addReservation,
        updateOrderStatus,
        updateReservationStatus,
        pushNotification,
        markNotificationRead,
        clearNotifications,
        clearOrders,
        clearReservations,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
