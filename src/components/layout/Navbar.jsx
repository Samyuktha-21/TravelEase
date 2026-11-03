import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllSpotsWithCrowd } from '../../data/crowdModel';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avgCrowd, setAvgCrowd] = useState(32);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const all = getAllSpotsWithCrowd();
    if (all.length > 0) {
      const avg = Math.round(all.reduce((acc, s) => acc + s.crowd.score, 0) / all.length);
      setAvgCrowd(avg);
    }
  }, []);

  const isHome = location.pathname === '/';

  return (
    <header className={`site-header ${isHome && !scrolled ? 'over-hero' : ''}`}>
      <Link to="/" className="brand" aria-label="TravelEase Ooty Home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
        <span>
          TRAVELEASE
          <small>SMART TOURISM / OOTY</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        <Link to="/explore" className={location.pathname === '/explore' ? 'active' : ''}>
          Explore Spots
        </Link>
        <Link to="/crowds" className={location.pathname === '/crowds' ? 'active' : ''}>
          Live Crowds
        </Link>
        <Link to="/weather" className={location.pathname === '/weather' ? 'active' : ''}>
          Weather
        </Link>
        <Link to="/transport" className={location.pathname === '/transport' ? 'active' : ''}>
          Transit Guide
        </Link>
      </nav>

      <div className="header-actions">
        <Link to="/crowds" className="nav-live-pill" title="Current Nilgiris Average Tourist Density">
          <span className="live-dot"></span>
          <span>{avgCrowd}% AVG CROWD</span>
        </Link>

        <Link to="/explore" className="icon-button search-link" aria-label="Search spots">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </Link>

        <button
          className="icon-button menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <span>Home</span>
            <span>↗</span>
          </Link>
          <Link to="/explore" onClick={() => setMobileMenuOpen(false)}>
            <span>Explore Spots</span>
            <span>↗</span>
          </Link>
          <Link to="/crowds" onClick={() => setMobileMenuOpen(false)}>
            <span>Live Crowds Radar</span>
            <span>↗</span>
          </Link>
          <Link to="/weather" onClick={() => setMobileMenuOpen(false)}>
            <span>Weather & Climate</span>
            <span>↗</span>
          </Link>
          <Link to="/transport" onClick={() => setMobileMenuOpen(false)}>
            <span>Transit & Toy Train</span>
            <span>↗</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;