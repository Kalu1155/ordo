import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const OrderHistory = () => {
  const { orders, clearOrders } = useContext(OrderContext);

  return (
    <div className="order-history container">
      <h2>📜 My Order History</h2>

      {orders.length === 0 ? (
        <p>No past orders yet. Go to the menu and start ordering 🍔</p>
      ) : (
        <>
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Items</th>
                <th>Total ($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>{order.items.join(", ")}</td>
                  <td>{order.total.toFixed(2)}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-danger" onClick={clearOrders}>
            Clear Order History
          </button>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
