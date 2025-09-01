import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Footer from "../component/Footer";

const StaffLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();

  const navItems = [
    { path: "/staff", label: "Dashboard", icon: "👨‍🍳" },
    { path: "/staff/orders", label: "Orders", icon: "🧾" },
    { path: "/staff/reservations", label: "Reservations", icon: "📅" },
  ];

  return (
    <>
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
        <div className="main-area">
          <header className="topbar">
            {/* Left: Toggle (only mobile) */}
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            {/* Right: User info */}
            <div
              className="user-info"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user ? (
                <span className="username">
                  Welcome, {user.name} 👋
                </span>
              ) : (
                <span>Guest</span>
              )}

              {/* Dropdown (mobile) */}
              {dropdownOpen && (
                <div className="dropdown">
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>

            {/* Desktop Logout button */}
            {user && (
              <button className="btn btn-danger desktop-only" onClick={logout}>
                Logout
              </button>
            )}
          </header>
          <main className="content">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StaffLayout;
