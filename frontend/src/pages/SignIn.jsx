import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ScrollToTopButton from "../components/ScrollToTopButton";
import "../styles/SignIn.css";

const SignIn = ({ setCurrentUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', rememberMe: false });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { ...submitData } = formData;
      const res = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        await signin(formData.email, formData.password);
        navigate('/');
      }
    } catch (err) {
      setError('Server error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="signin-container">
        <h1 className="signin-title">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="signin-form">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="signin-input"
            required
          />
      <input
        type="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="signin-input"
        required
      />
      <input
        type="password"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="signin-input"
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
        className="signin-btn"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
        </form>

        <div className="signin-footer">
          Don’t have an account?{' '}
          <Link to="/sign-up" className="signin-link">
            Sign Up
          </Link>
        </div>

        {error && (
          <p className="signin-error">{error}</p>
        )}
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default SignIn;
