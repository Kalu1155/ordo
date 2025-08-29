import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    if (role === "admin") navigate("/admin/menu");
    else if (role === "staff") navigate("/staff");
    else navigate("/");
  };

  return (
    <div className="login-page container">
      <h2>🔑 Login</h2>
      <p>Select a role to login (demo only):</p>
      <button className="btn btn-primary" onClick={() => handleLogin("customer")}>
        Login as Customer
      </button>
      <button className="btn btn-secondary" onClick={() => handleLogin("staff")}>
        Login as Staff
      </button>
      <button className="btn btn-danger" onClick={() => handleLogin("admin")}>
        Login as Admin
      </button>
    </div>
  );
};

export default LoginPage;
