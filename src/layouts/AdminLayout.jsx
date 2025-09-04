import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Footer from "../component/Footer";

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: "🏠" }, // 👈 added dashboard
    { path: "/admin/menu", label: "Menu", icon: "📋" },
    { path: "/admin/reservations", label: "Reservations", icon: "📅" },
    { path: "/admin/orders", label: "Orders", icon: "🧾" },
    { path: "/admin/reports", label: "Reports", icon: "📊" },
  ];

  return (
    <>
      <div className="admin-layout">
        {/* Sidebar */}
           <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                 <button className="close-btn" onClick={() => setSidebarOpen(false)}>
                   ✖
                 </button>
                 <h2 className="logo">RMS</h2>
                 <nav>
                   {navItems.map((item) => (
                     <NavLink
                       key={item.path}
                       to={item.path}
                       className={({ isActive }) =>
                         `nav-link ${isActive ? "active" : ""}`
                       }
                       onClick={() => setSidebarOpen(false)}
                       end
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
          </header>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
