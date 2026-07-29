import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../config/app';
import { SPOTS } from '../data/spots';
import { getAllSpotsWithCrowd } from '../data/crowdModel';
import DoodleDecor from '../components/layout/DoodleDecor';
import SpotCard from '../components/spots/SpotCard';
import './Home.css';

const Home = () => {
  const [spots, setSpots] = useState([]);
  const [leastCrowded, setLeastCrowded] = useState(null);

  useEffect(() => {
    const crowdSpots = getAllSpotsWithCrowd();
    setSpots(crowdSpots.slice(0, 6));
    const sorted = [...crowdSpots].sort((a, b) => a.crowd.score - b.crowd.score);
    if (sorted.length > 0) setLeastCrowded(sorted[0]);
  }, []);

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-orb orb-teal"></div>
        <div className="hero-orb orb-coral"></div>
        <DoodleDecor variant="hero" />

        <div className="hero-content">
          <h1 className="hero-title">Travel<span className="text-gradient">Ease</span></h1>
          <p className="hero-tagline">{APP_CONFIG.tagline}</p>
          <p className="hero-subtitle">Real-time crowd predictions for Ooty's top tourist spots. Know before you go.</p>

          <div className="hero-search-bar">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search spots, viewpoints, gardens..." />
            <Link to="/explore" className="btn-search">Explore</Link>
          </div>
        </div>

        {leastCrowded && (
          <div className="live-crowd-card glass-card">
            <div className="live-indicator">
              <span className="live-pulse-dot"></span>
              <span>Live Crowd Status</span>
            </div>
            <p className="lc-label">Least crowded right now</p>
            <h4 className="lc-name">{leastCrowded.shortName || leastCrowded.name}</h4>
            <p className="lc-score" style={{ color: leastCrowded.crowd?.color }}>
              {leastCrowded.crowd?.score}% - {leastCrowded.crowd?.label}
            </p>
            <Link to="/explore" className="btn btn-primary btn-sm" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>View All Spots</Link>
          </div>
        )}

        <div className="hero-wave-bottom">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z" fill="var(--sea-mist)" />
          </svg>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="container">
          <h2 className="section-title">How <span className="text-gradient">TravelEase</span> Works</h2>
          <p className="section-subtitle">Three simple steps to a crowd-free vacation</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3>Check Crowds</h3>
              <p>See real-time crowd predictions for every tourist spot, powered by historical data and weather patterns.</p>
              <span className="step-number">01</span>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h3>Pick Smart</h3>
              <p>Get alternative suggestions for less-crowded spots. Our model recommends the best time windows to visit.</p>
              <span className="step-number">02</span>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h3>Explore Happy</h3>
              <p>Skip the queues, discover hidden gems, and enjoy Ooty like a local - not a tourist caught in traffic.</p>
              <span className="step-number">03</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAMOUS SPOTS */}
      <section className="spots-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-subtitle">Crowd predictions updated hourly</p>
            </div>
            <Link to="/explore" className="btn btn-outline">View All Spots</Link>
          </div>
          <div className="spots-grid">
            {spots.map((spot, i) => (
              <SpotCard key={spot.id} spot={spot} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              { icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>, value: '2,240m', label: 'Elevation' },
              { icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>, value: '12-25 C', label: 'Temperature Range' },
              { icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, value: '28+ Lakh', label: 'Annual Visitors (GBG)' },
              { icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>, value: '10', label: 'Spots Tracked' },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
