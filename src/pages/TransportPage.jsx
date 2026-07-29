import React from 'react';
import { TRANSPORT_ROUTES, NEAREST_AIRPORT, NEAREST_RAILWAY } from '../data/transport';
import './TransportPage.css';

const TransportPage = () => {
  return (
    <div className="transport-page">
      <div className="transport-hero">
        <h1 className="transport-title">How to Reach Ooty</h1>
        <p className="transport-subtitle">Your comprehensive guide to traveling to the Queen of Hill Stations.</p>
      </div>

      <div className="transport-content">
        <div className="hubs-grid">
          <div className="hub-card">
            <div className="hub-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h3>Nearest Airport</h3>
            <p className="hub-name">{NEAREST_AIRPORT.name}</p>
            <p className="hub-dist">{NEAREST_AIRPORT.distance} km away</p>
          </div>
          
          <div className="hub-card">
            <div className="hub-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
            </div>
            <h3>Nearest Railway</h3>
            <p className="hub-name">{NEAREST_RAILWAY.name}</p>
            <p className="hub-dist">{NEAREST_RAILWAY.distance} km away</p>
          </div>
        </div>

        <div className="toy-train-banner">
          <div className="toy-train-content">
            <h2>Nilgiri Mountain Railway</h2>
            <p>Don't miss the UNESCO World Heritage toy train ride from Mettupalayam to Ooty. A breathtaking 5-hour journey through tunnels, bridges, and lush forests.</p>
          </div>
          <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
        </div>

        <h2 className="section-heading">Popular Routes</h2>
        <div className="routes-container">
          {TRANSPORT_ROUTES && TRANSPORT_ROUTES.cities.map((city, idx) => (
            <div key={idx} className="route-card">
              <div className="route-header">
                <h3>{city.name} to Ooty ({city.distance})</h3>
              </div>
              <div className="modes-list">
                {city.routes.map((route, mIdx) => (
                  <div key={mIdx} className={`mode-item ${route.highlight ? 'highlight' : ''}`}>
                    <div className="mode-type">
                      <span className="mode-icon">{route.icon}</span>
                      <span className="mode-label">By {route.mode}</span>
                    </div>
                    <div className="mode-details">
                      <span className="mode-duration">{route.duration}</span>
                      <span className="mode-cost">{route.cost}</span>
                    </div>
                    <p className="mode-desc">{route.description}</p>
                    <p className="mode-tip">💡 {route.tips}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportPage;
