import React from "react";
import { Link } from "react-router-dom";
import { FaConciergeBell } from "react-icons/fa";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <div className="landing">
      <header className="hero">
        <h1>Welcome to RestoManage 🍴</h1>
        <p>Delicious food, smart reservations, and seamless dining experience.</p>
      </header>
    <section className="sec-btn">
       <div className="cta-buttons">
          <Link to="/menu" className="btn btn-primary">View Menu</Link>
          <Link to="/reservation" className="btn btn-danger">Reserve Table</Link>
          <Link to="/auth" className="btn">Login / Register</Link>
        </div>
    </section>
    </div>
    <Footer/>
    </>
  );
};

export default LandingPage;
