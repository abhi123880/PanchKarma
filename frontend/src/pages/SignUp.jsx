import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ScrollToTopButton from "../components/ScrollToTopButton";
import "../styles/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    rememberMe: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [id]: checked });
    } else {
      let newValue = value;
      if (id === 'phone') {
        // Remove spaces from phone input
        newValue = value.replace(/\s+/g, '');
      }
      setFormData({ ...formData, [id]: newValue });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate phone number format: 10 to 15 digits, optional leading +
    const phonePattern = /^\+?\d{10,15}$/;
    if (!phonePattern.test(formData.phone)) {
      setError("Phone number should be 10 to 15 digits, optionally starting with +");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { ...submitData } = formData; // exclude confirmPassword from submission
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Signup failed');
      } else {
        navigate('/sign-in');
      }
    } catch (err) {
      setError('Server error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup-container">
        <h1 className="signup-title">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="signup-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            id="phone"
            placeholder="Phone Number"
            className="signup-input"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="signup-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe" className="checkbox-label">Remember Me</label>
          </div>

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-footer">
          Already have an account?{' '}
          <Link to="/sign-in" className="signup-link">
            Sign In
          </Link>
        </div>

        {error && (
          <p className="signup-error">{error}</p>
        )}
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default SignUp;
