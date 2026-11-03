import React from 'react';
import { TRANSPORT_ROUTES, NEAREST_AIRPORT, NEAREST_RAILWAY } from '../data/transport';
import './TransportPage.css';

const TransportPage = () => {
  return (
    <div className="transport-page page-section">
      <div className="rail">
        <p className="eyebrow accent">01 / High Altitude Transit</p>
        <h1 className="transport-heading">How to Reach Ooty</h1>
        <p className="page-intro">
          Road gradients, mountain rail schedules, and terminal connections to the Queen of Hill Stations (2,240m).
        </p>

        {/* Airport & Railway Station Hub Cards */}
        <div className="hubs-grid">
          <div className="hub-card tech-card">
            <span className="eyebrow muted">Primary Aviation Gateway</span>
            <div className="hub-icon-row">
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
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
              </svg>
              <h3>Nearest Airport</h3>
            </div>
            <h4>{NEAREST_AIRPORT.name} ({NEAREST_AIRPORT.code})</h4>
            <p className="hub-dist">{NEAREST_AIRPORT.distance} • {NEAREST_AIRPORT.driveTime} drive</p>
            <p className="hub-note">Direct flights from Delhi, Mumbai, Bengaluru, Chennai, and Hyderabad.</p>
          </div>

          <div className="hub-card tech-card">
            <span className="eyebrow muted">Railhead & Heritage Junction</span>
            <div className="hub-icon-row">
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
                <rect width="16" height="16" x="4" y="3" rx="2" />
                <path d="M4 11h16" />
                <path d="M12 3v8" />
                <path d="m8 19-2 3" />
                <path d="m18 22-2-3" />
                <path d="M8 15h0" />
                <path d="M16 15h0" />
              </svg>
              <h3>Nearest Railway</h3>
            </div>
            <h4>{NEAREST_RAILWAY.name} ({NEAREST_RAILWAY.code})</h4>
            <p className="hub-dist">{NEAREST_RAILWAY.distance} • 1.5–2 hrs drive</p>
            <p className="hub-note">{NEAREST_RAILWAY.connection}. Main junction: {NEAREST_RAILWAY.mainJunction}.</p>
          </div>
        </div>

        {/* UNESCO Toy Train Feature Banner */}
        <div className="toy-train-banner tech-card">
          <div className="toy-train-content">
            <span className="eyebrow accent">UNESCO World Heritage // NMR 56136</span>
            <h2>The Nilgiri Mountain Railway</h2>
            <p>
              Experience the historic rack-and-pinion steam locomotive climbing from Mettupalayam (325m) up to Udagamandalam (2,240m). A breathtaking 4.5-hour journey across 250 bridges, 16 mountain tunnels, and cliffside tea ravines.
            </p>
            <div className="train-stats-strip">
              <span>🚂 Daily Departure: 07:10 AM (MTP)</span>
              <span>•</span>
              <span>🎫 IRCTC Booking: Open 120 Days Ahead</span>
              <span>•</span>
              <span>⏱ Duration: 4 hrs 45 mins</span>
            </div>
          </div>
        </div>

        {/* City Routes */}
        <div className="routes-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow accent">02 / Transit Matrix</p>
              <h3>Intercity Approach Routes</h3>
            </div>
            <span className="eyebrow muted">Updated Ghat Road Conditions</span>
          </div>

          <div className="routes-list">
            {TRANSPORT_ROUTES &&
              TRANSPORT_ROUTES.cities.map((city, idx) => (
                <div key={idx} className="route-block tech-card">
                  <div className="route-block-header">
                    <div>
                      <span className="eyebrow muted">Approach #{String(idx + 1).padStart(2, '0')}</span>
                      <h3>{city.name} to Ooty</h3>
                    </div>
                    <span className="route-distance-pill">{city.distance}</span>
                  </div>

                  <div className="modes-grid">
                    {city.routes.map((route, mIdx) => (
                      <div key={mIdx} className={`mode-item ${route.highlight ? 'highlight-mode' : ''}`}>
                        <div className="mode-header">
                          <span className="mode-badge">By {route.mode}</span>
                          <span className="mode-cost">{route.cost}</span>
                        </div>
                        <div className="mode-time">⏱ {route.duration}</div>
                        <p className="mode-desc">{route.description}</p>
                        <p className="mode-tip">
                          <strong>Field Tip:</strong> {route.tips}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportPage;