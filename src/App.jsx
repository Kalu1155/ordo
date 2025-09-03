import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './assets/styles/style.scss';
import './App.css'
import Navbar from "./component/Navbar";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import ReservationPage from "./pages/ReservationPage";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from './pages/AdminDashbord';
import MenuManagement from './pages/admin/MenuManagement';
import ReservationsManagement from './pages/admin/ReservationsManagement';
import OrdersManagement from './pages/admin/OrdersManagement';
import Reports from './pages/admin/Reports';
import StaffDashboard from './pages/StaffDashboard';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistory from './pages/OrderHistory';
import ProfilePage from './pages/ProfilePage';
import CustomerLayout from './layouts/CustomerLayout';
import StaffLayout from './layouts/StaffLayout';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from "./component/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import LocationPage from './pages/LocationPage';

function App() {
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/location" element={<LocationPage />} />

          {/* Customer Dashboard (Private) */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} /> {/* /customer */}
            <Route path="orders" element={<OrderHistory />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>


          {/* Staff Dashboard (Private) */}
          <Route
            path="/staff"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <StaffLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StaffDashboard />} />
            <Route path="orders" element={<StaffDashboard />} />
            <Route path="reservations" element={<StaffDashboard />} />
          </Route>

          {/* Admin Dashboard (Private) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="reservations" element={<ReservationsManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>

      </Router>
    </>
  );
}

export default App;
