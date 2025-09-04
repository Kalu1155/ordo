import React, { useContext, useState } from "react";
import { OrderContext, ORDER_STATUSES } from "../../context/OrderContext";

/**
 * Admin can:
 * - change status (all statuses)
 * - edit order total / item prices
 * - add admin note
 * - export orders CSV
 */

const OrdersManagementAdmin = () => {
  const { orders, updateOrderStatus, pushNotification } = useContext(OrderContext);
  const [editingOrder, setEditingOrder] = useState(null);
  const [localEdits, setLocalEdits] = useState({});

  const startEdit = (order) => {
    setEditingOrder(order.id);
    setLocalEdits({
      items: order.items.map(it => ({ ...it })), // copy
      adminNote: order.adminNote || "",
    });
  };

  const commitEdit = (orderId) => {
    // For demo we only allow updating adminNote and per-item price locally via updateOrderStatus pushNotification
    // In real app call API to persist edits
    pushNotification({
      id: Date.now() + Math.random(),
      type: "admin-action",
      title: `Order ${orderId} updated`,
      body: `Admin updated order ${orderId}`,
      payload: { orderId },
      read: false,
    });
    setEditingOrder(null);
  };

  const exportCSV = () => {
    const header = ["id,date,customer,total,status"].join(",");
    const rows = orders.map(o => `${o.id},${o.date},${o.customer?.name || ""},${(Number(o.total)||0).toFixed(2)},${o.status}`);
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-orders container">
      <h2>🧾 Orders Management</h2>

      <div className="orders-actions">
        <button className="btn btn-outline" onClick={exportCSV}>Export CSV</button>
      </div>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map(o => (
            <div key={o.id} className="order-item card">
              <div className="order-head">
                <div><strong>#{o.id}</strong> • {o.customer?.name}</div>
                <div>₦{(Number(o.total)||0).toFixed(2)}</div>
              </div>

              <div className="order-body">
                {o.items.map(it => (
                  <div key={it.id} className="item-row">
                    <div className="item-name">{it.quantity} × {it.name}</div>
                    <div className="item-price">₦{((Number(it.price)||0) * (Number(it.quantity)||0)).toFixed(2)}</div>
                  </div>
                ))}
                <div className="admin-note"><strong>Admin note:</strong> {o.adminNote || "—"}</div>
              </div>

              <div className="order-controls">
                <div className="status-controls">
                  {ORDER_STATUSES.map(s => (
                    <button
                      key={s}
                      className={`btn ${s === "Cancelled" ? "btn-danger" : "btn-primary"}`}
                      onClick={() => updateOrderStatus(o.id, s, { role: "admin" })}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {editingOrder === o.id ? (
                  <div className="edit-actions">
                    <button className="btn btn-success" onClick={() => commitEdit(o.id)}>Save</button>
                    <button className="btn" onClick={() => setEditingOrder(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="edit-actions">
                    <button className="btn" onClick={() => startEdit(o)}>Edit</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersManagementAdmin;
