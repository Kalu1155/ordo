import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} RestoManage. All Rights Reserved.</p>
        <ul className="footer-links">
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/location">Location</Link></li>
          <li><Link to="/auth">Login</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
