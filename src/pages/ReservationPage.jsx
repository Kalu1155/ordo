import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    specialRequest: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // send to backend
      const res = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Reservation submitted ✅ We’ll confirm shortly!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: 1,
          specialRequest: "",
        });
      } else {
        toast.error("Failed to submit reservation ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />
      <section className="reservation">
        <div className="reservation-hero">
          <h1>Book Your Table 🍽️</h1>
          <p>Reserve a spot and enjoy an unforgettable dining experience.</p>
        </div>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              placeholder="John Doe"
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
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              name="phone"
              placeholder="+234 801 234 5678"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </label>

          <div className="flex-group">
            <label>
              Date
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
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
          </div>

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

          <label>
            Special Request
            <textarea
              name="specialRequest"
              placeholder="Any allergies or preferences?"
              value={formData.specialRequest}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Reserve Now
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default ReservationPage;
