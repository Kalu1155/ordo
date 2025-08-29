import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const navItems = [
    { path: "/admin", label: "Dashboard", icon: "🏠" }, // 👈 added dashboard
    { path: "/admin/menu", label: "Menu", icon: "📋" },
    { path: "/admin/reservations", label: "Reservations", icon: "📅" },
    { path: "/admin/orders", label: "Orders", icon: "🧾" },
    { path: "/admin/reports", label: "Reports", icon: "📊" },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Admin</h2>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              end // 👈 ensures exact match for /admin
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Area */}
      <main className="content">
         <header className="topbar">
          <h1>Dashboard Overview</h1>
          <div className="profile">Admin 👤</div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
