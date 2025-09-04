import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Footer from "../component/Footer";
import { FaUtensils } from "react-icons/fa";

const CustomerLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { path: "/customer", label: "Home", icon: "🏠" },
    { path: "/menu", label: "Menu", icon: "🍽️" },
    { path: "/reservations", label: "Reservations", icon: "📅" },
    { path: "/customer/cart", label: "Cart", icon: "🛒" },
    { path: "/customer/orders", label: "Order History", icon: "📜" },
    { path: "/customer/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <>
      <div className="customer-layout">
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
        <div className="main-area">
          {/* Top Navbar */}
         <header className="topbar">
  <div className="left-section">
    <Link to="/">
      <div className="logo">
        <FaUtensils size={24} color="var(--primary)" />
        <span>RestoManage</span>
      </div>
    </Link>

    <button
      className="menu-toggle"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      ☰
    </button>
  </div>

  {/* Right: User info */}
  <div
    className="user-info"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    {user ? (
      <span className="username">Welcome, {user.name} 👋</span>
    ) : (
      <span>Guest</span>
    )}

    {dropdownOpen && (
      <div className="dropdown">
        <button onClick={logout}>Logout</button>
      </div>
    )}
  </div>
</header>


          {/* Page Content */}
          <main className="content">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerLayout;
