import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🚀 If already logged in, redirect based on role
  if (user) {
    if (user.role === "customer") navigate("/customer");
    if (user.role === "staff") navigate("/staff");
    if (user.role === "admin") navigate("/admin");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (isLogin) {
      // 👉 For login, role is not typed, we retrieve from backend later
      // For now, simulate fetching stored role
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === data.email) {
        login(storedUser);
        toast.success(`Welcome back ${storedUser.role} ✅`);

        if (storedUser.role === "customer") navigate("/customer");
        if (storedUser.role === "staff") navigate("/staff");
        if (storedUser.role === "admin") navigate("/admin");
      } else {
        toast.error("Invalid login credentials ❌");
      }
    } else {
      // 👉 Registration (store user with chosen role)
      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      // Save to localStorage for demo
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Registration successful ✅ Please login");
      setIsLogin(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth container">
        <div className="auth-box">
          {/* Tabs */}
          <div className="tabs">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <label>
                Name
                <input type="text" name="name" required />
              </label>
            )}

            <label>
              Email
              <input type="email" name="email" required />
            </label>
            {/* 🚀 Role Selection only for REGISTER */}
            {!isLogin && (
              <label>
                Role
                <select name="role" required>
                  <option value="customer">Customer</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
            )}
            <label>
              Password
              <input type="password" name="password" required />
            </label>



            {!isLogin && (
              <label>
                Confirm Password
                <input type="password" name="confirmPassword" required />
              </label>
            )}

            <button type="submit" className="btn btn-primary">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
