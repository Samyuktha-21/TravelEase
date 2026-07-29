import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../config/app';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="premium-footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L48 105C96 90 192 60 288 45C384 30 480 30 576 40C672 50 768 70 864 75C960 80 1056 70 1152 55C1248 40 1344 20 1392 10L1440 0V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="currentColor"/>
        </svg>
      </div>
      
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18L12 5L20 18H4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="logo-text">TravelEase</span>
            </Link>
            <p className="footer-desc">
              Your intelligent companion for crowd-free travel experiences. Discover the world's most beautiful spots with real-time insights.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore">Explore Spots</Link></li>
              <li><Link to="/weather">Weather Forecast</Link></li>
              <li><Link to="/transport">How to Reach</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Data Sources</h4>
            <ul className="footer-list">
              <li><a href="#" target="_blank" rel="noreferrer">Local Tourism Board</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">Live Traffic APIs</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">Weather Data</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">Community Reports</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Connect</h4>
            <ul className="footer-list">
              <li><a href="#">Support</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
