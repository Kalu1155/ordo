import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation submitted:", formData);
    toast.success("Reservation request submitted ✅");
  };

  return (
    <>
  <Navbar/>
    <div className="reservation container">
      <h2>Reserve a Table 🪑</h2>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </label>

        <label>
          Time
          <input
            type="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
          />
        </label>

        <label>
          Number of Guests
          <input
            type="number"
            name="guests"
            min="1"
            max="20"
            value={formData.guests}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="btn btn-primary">Book Table</button>
      </form>
    </div>
    <Footer/>
  </>
  );
};

export default ReservationPage;
