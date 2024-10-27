// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Create styles specifically for the footer if needed

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a> | 
          <a href="/terms">Terms of Service</a> | 
          <a href="/contact">Contact Us</a>
        </div>
        <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
