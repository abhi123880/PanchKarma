import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ScrollToTopButton from "../components/ScrollToTopButton";
import '../styles/Profile.css';

const Profile = ({ currentUser, setCurrentUser }) => {
  const { signout } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    phone: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const navigate = useNavigate();

  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const handleSignout = () => {
    signout();
    setCurrentUser(null);
    navigate('/');
  };

  useEffect(() => {
    console.log("Profile.jsx useEffect currentUser:", currentUser);
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
        avatar: currentUser.avatar || "",
        phone: currentUser.phone || "",
      });
      console.log("Profile.jsx formData set to:", {
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
        avatar: currentUser.avatar || "",
        phone: currentUser.phone || "",
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
        setFileUploadError(false);
        setFilePerc(100); // Simulated upload
      };
      reader.onerror = () => {
        setFileUploadError(true);
        setFilePerc(0);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  if (!currentUser) {
    return <p className="profile-no-user">No user data available</p>;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(null);
    setError(null);

    if (!currentUser || !currentUser.id) {
      setError("User ID is missing. Please sign in again.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://remedy-panchkarma.onrender.com/api/user/update/${currentUser.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update profile");
      } else {
        setMessage("Profile updated successfully!");
        setFormData((prev) => ({ ...prev, password: "" }));

        if (typeof setCurrentUser === "function") {
          setCurrentUser(data.user);
        }
      }
    } catch {
      setError("An unexpected error occurred.");
    }
  };

  const handleDeleteAccount = async () => {
    setMessage(null);
    setError(null);

    if (!currentUser || !currentUser.id) {
      setError("User ID is missing. Please sign in again.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://remedy-panchkarma.onrender.com/api/user/delete/${currentUser.id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete account");
        setError(data.message || "Failed to delete account");
      } else {
        alert("Account deleted successfully.");
        setMessage("Account deleted successfully.");
        if (typeof setCurrentUser === "function") {
          setCurrentUser(null);
        }
      }
    } catch {
      alert("An unexpected error occurred.");
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Profile</h1>

      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          className="profile-file-input"
          hidden
        />

        <div className="profile-avatar-wrapper">
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || "/assets/avatar.png"}
            alt="profile"
            className="profile-avatar"
          />
          <p className="profile-avatar-status">
            {fileUploadError ? (
              <span className="profile-error">Image upload failed (max 5MB)</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="profile-uploading">Uploading {filePerc}%...</span>
            ) : filePerc === 100 ? (
              <span className="profile-uploaded">Image uploaded!</span>
            ) : null}
          </p>
        </div>

        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="profile-input"
          required
        />

        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="profile-input"
          required
        />
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="profile-input"
        />

        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          className="profile-input"
        />

        <button
          type="submit"
          className="profile-btn"
        >
          Update Profile
        </button>
      </form>
      <div className="profile-actions">
        <span className="profile-delete" onClick={handleDeleteAccount}>Delete account</span>
        <span className="profile-signout" onClick={handleSignout}>Sign Out</span>
      </div>
      {message && <p className="profile-message">{message}</p>}
      {error && <p className="profile-error">{error}</p>}
      <ScrollToTopButton />
    </div>
    
  );
};

export default Profile;
