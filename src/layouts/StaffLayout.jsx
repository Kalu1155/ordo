// src/layouts/StaffLayout.jsx
import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NotificationCenter from "../component/NotificationCenter";
import Footer from "../component/Footer";
import { FaBars } from "react-icons/fa";

const StaffLayout = () => {
  const { user, logout } = useContext(AuthContext);

  // sidebar (mobile) state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // notification dropdown open/close
  const [notifOpen, setNotifOpen] = useState(false);

  // user menu dropdown (logout etc)
  const [dropdownOpen, setDropdownOpen] = useState(false); // <-- fixed: define state

  const nav = [
    { to: "/staff", label: "Dashboard" },
    { to: "/staff/orders", label: "📦Orders" },
    { to: "/staff/reservations", label: "📅 Reservations" },
  ];

  return (
    <>
      <div className={`staff-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
        <aside className="sidebar">
          <div className="sidebar-top">
            <h2 className="brand">RMS Staff</h2>
            <button className="close" onClick={() => setSidebarOpen(false)}>✖</button>
          </div>

          <nav>
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="main-area">
          <header className="topbar">
            <div className="left">
              <button
                className="hamburger"
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="Toggle sidebar"
              >
                <FaBars />
              </button>

              <Link to="/staff" className="logo">
                RestoManage <small style={{ display: "block", fontSize: 11 }}>Staff</small>
              </Link>
            </div>

            <div className="right">
              {/* Notification bell (keeps own open state internally, but we provide a wrapper hook for extra control) */}
              <div style={{ marginRight: 12 }}>
                <NotificationCenter />
              </div>

              {/* user area */}
              <div className="user-area" style={{ position: "relative" }}>
                <button
                  className="user-btn"
                  onClick={() => {
                    setDropdownOpen((v) => !v);
                    // close notifications when opening user dropdown
                    setNotifOpen(false);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  {user?.name ? `Welcome, ${user.name}` : "Guest"}
                </button>

                {dropdownOpen && (
                  <div className="dropdown" style={{
                    position: "absolute",
                    right: 0,
                    top: "110%",
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    padding: 8,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    zIndex: 2000,
                    minWidth: 160
                  }}>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout && logout();
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        padding: "8px 10px",
                        cursor: "pointer",
                        color: "#d9534f",
                        fontWeight: 600
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop logout quick button */}
              <button
                className="btn btn-danger desktop-only"
                onClick={() => logout && logout()}
                style={{ marginLeft: 12 }}
              >
                Logout
              </button>
            </div>
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
