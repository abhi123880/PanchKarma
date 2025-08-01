import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">Panchkarma</h2>
          <p className="footer-description">
            Embrace natural healing through Ayurvedic wisdom. Your journey to balance and wellness begins here.
          </p>
        </div>
        <div className="footer-links">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-link-list">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/profile" className="footer-link">My Account</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3 className="footer-title">Contact Us</h3>
          <p>Email: panchkarma@gmail.com </p>
          <p>Phone: +91 98798 00000</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Panchkarma. All rights reserved. | Terms & Conditions apply.
      </div>
    </footer>
  );
};

export default Footer;
