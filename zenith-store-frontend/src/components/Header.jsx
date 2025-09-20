import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">ZENITH</div>
      <nav>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      <div className="header-icons">
        <span>🛒</span>
        <span>👤</span>
      </div>
    </header>
  );
};

export default Header;