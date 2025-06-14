import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();

    // Listen for localStorage changes across the app
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <header className="navbar">
      <div className="nav-logo">BRACELET BAZAR</div>
      <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">login</Link>
      </nav>
      
      <div style={{ position: "absolute", top: "10px", right: "60px" }}>
        <Link to="/Cart" style={{ textDecoration: "none", fontSize: "38px" }}>
          🛒 
        </Link>
      </div>
    </header>
  );
};

export default Header;
