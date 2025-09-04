import React, { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";

const OrdersPage = () => {
  const { orders, updateOrderStatus } = useContext(OrderContext);

  return (
    <div className="orders-page">
      <h2>📦 Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.customer.name}</td>
                <td>{o.items.map(i => `${i.quantity}× ${i.name}`).join(", ")}</td>
                <td>₦{o.total.toFixed(2)}</td>
                <td>{o.status}</td>
                <td>
                  {["Preparing", "Ready", "Delivered", "Cancelled"].map(status => (
                    <button
                      key={status}
                      className={`btn btn-${status === "Cancelled" ? "danger" : status === "Delivered" ? "success" : "primary"}`}
                      onClick={() => updateOrderStatus(o.id, status)}
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

export default OrdersPage;
