import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const ProfilePage = () => {
  // Dummy data for now — later fetch from backend
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    preferences: "Vegetarian",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    toast.info("Profile updated ✅");
    // Later: send update to backend
  };

  return (
    <>
    <div className="profile-page container">
      <h2>👤 My Profile</h2>

      {!editMode ? (
        <div className="profile-card">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Preferences:</strong> {profile.preferences}</p>
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <div className="profile-form">
          <label>
            Name
            <input type="text" name="name" value={profile.name} onChange={handleChange} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={profile.email} onChange={handleChange} />
          </label>
          <label>
            Preferences
            <input type="text" name="preferences" value={profile.preferences} onChange={handleChange} />
          </label>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
          <button className="btn btn-danger" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}
    </div>
    </>
  );
};

export default ProfilePage;
