import React, { useContext, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
// import logo from "../assets/img/logo.png"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);  // 👈 get logged in user

  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo">
          {/* <img src={logo} alt="" /> */}
          <FaUtensils size={24} color="var(--primary)" />
          <span>RestoManage</span>
        </div>
      </Link>

      <ul className="nav-links">
        <li><Link to="/">🏠Home</Link></li>
        <li><Link to="/menu">🍽️Menu</Link></li>
        <li><Link to="/reservations">📅Reservations</Link></li>
        <li><Link to="/location">📍Location</Link></li>

        {!user && <li><Link to="/auth">Login</Link></li>}
        {user && <li><Link to="/customer">🧑Dashboard</Link></li>}
      </ul>

      {/* mobile nav */}
      <nav
        id="site-navigator-mobile"
        className={`navigator-mobile ${menuOpen ? "active" : ""}`}
      >
        <button
          className="navigator-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <RiCloseLine size={28} /> : <RiMenu3Line size={28} />}
        </button>
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/location">Location</Link></li>

          {!user && <li><Link to="/auth">Login</Link></li>}
          {user && <li><Link to="/customer">Dashboard</Link></li>}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
