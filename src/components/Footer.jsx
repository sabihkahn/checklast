import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="small-footer">
      <div className="small-footer-top">
        <h3 className="footer-brand">Bracelet Bazar</h3>
        <p className="footer-tagline">Shine everyday ✨</p>
      </div>

      <div className="small-footer-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="small-footer-contact">
        <a href="mailto:braceletbazar918@gmail.com">📧</a>
        <a href="https://www.tiktok.com/@braceletbazar1" target="_blank" rel="noreferrer">🎵</a>
        <a href="tel:03354093009">📞</a>
      </div>

      <div className="small-footer-bottom">
        &copy; {new Date().getFullYear()} Bracelet Bazar
      </div>
    </footer>
  );
};

export default Footer;
