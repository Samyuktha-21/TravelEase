import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../config/app';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`premium-navbar ${scrolled ? 'nav-scrolled glass-panel' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18L12 5L20 18H4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text">TravelEase</span>
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open glass-panel' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/explore" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
          <Link to="/weather" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Weather</Link>
          <Link to="/transport" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How to Reach</Link>
          
          <div className="nav-cta-wrapper">
            <Link to="/explore" className="btn btn-primary nav-cta">
              Check Crowds
            </Link>
          </div>
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
