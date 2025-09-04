import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const OrderHistory = () => {
  const { orders, clearOrders } = useContext(OrderContext);

  return (
    <div className="order-history container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📜 My Order History</h2>
        {orders.length > 0 && (
          <button className="btn btn-danger" onClick={clearOrders}>
            Clear All Orders
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          No past orders yet. Go to the menu and start ordering 🍔
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow-sm rounded">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Items</th>
                <th>Total (₦)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>
                   <ul className="list-unstyled mb-0">
  {order.items.map((item, i) => (
    <li key={i}>
      {item.quantity} × {item.name} — ₦
      {((Number(item.price) || 0) * (item.quantity || 0)).toFixed(2)}
    </li>
  ))}
</ul>
                  </td>
                 <td>
  <strong>₦{(Number(order.total) || 0).toFixed(2)}</strong>
</td>

                  <td>
                    <span
                      className={`badge ${
                        order.status === "Pending"
                          ? "bg-warning text-dark"
                          : order.status === "Delivered"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
