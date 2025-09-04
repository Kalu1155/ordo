import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, updateUser, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(user || {});
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const navigate = useNavigate();

  // ✅ Update input fields
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Save profile
 const handleSave = () => {
  if (!profile.name || !profile.email) {
    toast.error("Name and Email are required ❌");
    return;
  }

  updateUser(profile); 
  setEditMode(false); 
  toast.success("Profile updated ✅");
};

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imgURL = URL.createObjectURL(file);
    setProfile({ ...profile, avatar: imgURL });
    toast.info("Avatar updated (local only) 📸");
  };

  // ✅ Change password (dummy handler)
  const handlePasswordChange = (e) => {
    e.preventDefault();
    toast.success("Password changed 🔒 (simulate API)");
    setShowPasswordModal(false);
  };

  // ✅ Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
    toast.info(`Dark Mode ${!darkMode ? "Enabled" : "Disabled"} 🌙`);
  };

  return (
    <div className="profile-page container">
      {/* Header */}
      <div className="profile-header">
        <img
          src={profile.avatar || "https://i.pravatar.cc/150"}
          alt="Profile Avatar"
          className="profile-avatar"
        />
        <input
          type="file"
          accept="image/*"
          id="avatar-upload"
          style={{ display: "none" }}
          onChange={handleAvatarUpload}
        />
        <label htmlFor="avatar-upload" className="btn btn-sm btn-outline-secondary mt-2">
          Upload Photo
        </label>
        <h2>{profile.name}</h2>
        <p className="text-muted">{profile.email}</p>
      </div>

    {!editMode ? (
  <div className="profile-card">
    <p><strong>Name:</strong> {profile.name}</p>
    <p><strong>Email:</strong> {profile.email}</p>
    <p><strong>Preferences:</strong> {profile.preferences || "Not set"}</p>
    <button className="btn btn-primary" onClick={() => setEditMode(true)}>
      Edit Profile
    </button>
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
    <div className="d-flex gap-2">
      <button className="btn btn-success" onClick={handleSave}>Save</button>
      <button className="btn btn-danger" onClick={() => setEditMode(false)}>Cancel</button>
    </div>
  </div>
)}

      {/* Extra Actions */}
      <div className="extra-actions mt-4">
        <button className="btn btn-outline-warning" onClick={() => setShowPasswordModal(true)}>
          Change Password
        </button>
        <Link to="/customer/orders" className="btn btn-outline-info">
          My Orders
        </Link>
        {/* <button className="btn btn-outline-dark" onClick={toggleDarkMode}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button> */}
        <button className="btn btn-outline-secondary" onClick={() => { logout(); navigate("/login"); }}>
          Logout
        </button>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h4>🔒 Change Password</h4>
            <form onSubmit={handlePasswordChange}>
              <label>
                Current Password
                <input type="password" required />
              </label>
              <label>
                New Password
                <input type="password" required />
              </label>
              <label>
                Confirm New Password
                <input type="password" required />
              </label>
              <div className="modal-actions">
                <button type="submit" className="btn btn-success">Save</button>
                <button type="button" className="btn btn-danger" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
