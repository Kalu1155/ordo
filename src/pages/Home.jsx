import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import food from "../assets/img/food_3.jpeg";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [recentOrders, setRecentOrders] = useState([]);

  // Simulate fetching recent orders (replace with API call later)
  useEffect(() => {
    setRecentOrders([
      { id: 1, item: "Grilled Chicken", status: "Delivered", date: "2025-09-01" },
      { id: 2, item: "Pasta Alfredo", status: "In Progress", date: "2025-09-03" },
    ]);
  }, []);

  return (
    <div className="dashboard-home container">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <h2>
          👋 Welcome back, {user ? user.name : "Guest"}!
        </h2>
        <p>Discover new dishes, track your orders, and make reservations easily.</p>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions grid">
        <Link to="/menu" className="card action-card">
          🍽️ <h4>Browse Menu</h4>
        </Link>
        <Link to="/customer/cart" className="card action-card">
          🛒 <h4>Cart ({cart.length})</h4>
        </Link>
        <Link to="/reservations" className="card action-card">
          📅 <h4>Reservations</h4>
        </Link>
        <Link to="/customer/orders" className="card action-card">
          📜 <h4>Order History</h4>
        </Link>
      </section>

      {/* Specials / Promotions */}
      <section className="specials">
        <h3>🔥 Today’s Specials</h3>
        <div className="grid specials-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card special-card">
              <img src={food} alt="Special Dish" />
              <h5>Chef’s Dish {i}</h5>
              <p>Deliciously made for you.</p>
              <button className="btn btn-primary">Order Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Orders */}
      <section className="recent-orders">
        <h3>📦 Your Recent Orders</h3>
        {recentOrders.length > 0 ? (
          <ul>
            {recentOrders.map((order) => (
              <li key={order.id}>
                <strong>{order.item}</strong> — {order.status} <small>({order.date})</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent orders. Start ordering now! 🍴</p>
        )}
      </section>
    </div>
  );
};

export default Home;
