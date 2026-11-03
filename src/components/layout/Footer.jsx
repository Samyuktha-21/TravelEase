import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="rail">
        {/* Trail Mail / Crowd Alerts Newsletter */}
        <div className="newsletter">
          <div>
            <p className="eyebrow accent">00 // Real-time Nilgiri Field Dispatch</p>
            <h2>Stay ahead of the surge.</h2>
            <p>
              Crowd surge advisories, morning mist updates, and hidden Nilgiri view trails. Know before you pack.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div className="newsletter-success">
                <span className="live-dot"></span>
                <span>You're subscribed to Ooty crowd advisories. Happy exploring!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="newsletter-input">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email for crowd alerts"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" aria-label="Subscribe to trail alerts">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <label className="checkbox-label">
                  <input type="checkbox" required defaultChecked />
                  <span>Receive hourly peak alerts & climate updates. No spam, ever.</span>
                </label>
              </form>
            )}
          </div>
        </div>

        {/* 3-Column Footer Matrix */}
        <div className="footer-columns">
          <div>
            <Link to="/" className="brand" aria-label="TravelEase Home">
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
            <p>
              Real data. Local know-how.<br />
              Intelligent predictive travel across the Nilgiris.
            </p>
          </div>

          <div>
            <h3>Explore Ooty</h3>
            <Link to="/explore">All 10 Monitored Spots</Link>
            <Link to="/explore">Live Crowd Density</Link>
            <Link to="/weather">Weather & Climate Guide</Link>
            <Link to="/transport">Transit & Toy Train</Link>
          </div>

          <div>
            <h3>Engineering & Data</h3>
            <span className="footer-meta-item">Algorithmic Crowd Engine</span>
            <span className="footer-meta-item">Geospatial Transit Mapping</span>
            <span className="footer-meta-item">UNESCO Railway Schedules</span>
            <span className="footer-meta-item">Microclimate Tracking</span>
          </div>
        </div>

        {/* Giant Watermark */}
        <div className="footer-wordmark" aria-hidden="true">
          TRAVELEASE.
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} TravelEase Smart Tourism.</span>
          <span>Ooty, Nilgiris // 11°24′ N • 76°42′ E</span>
          <span>Leave only footprints, beat the crowds.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;