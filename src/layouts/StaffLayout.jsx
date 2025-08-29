import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const StaffLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: "/staff", label: "Dashboard", icon: "👨‍🍳" },
    { path: "/staff/orders", label: "Orders", icon: "🧾" },
    { path: "/staff/reservations", label: "Reservations", icon: "📅" },
  ];

  return (
    <div className="staff-layout">
      <aside className="sidebar">
        <h2 className="logo">Staff</h2>
        <nav>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;
