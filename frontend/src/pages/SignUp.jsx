import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import ScrollToTopButton from "../components/ScrollToTopButton";
import "../styles/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
            type="password"
            id="password"
            placeholder="Password"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-divider">
          <hr className="signup-hr" />
          <span className="signup-or">OR</span>
          <hr className="signup-hr" />
        </div>

        <OAuth label="Continue with Google" />

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
