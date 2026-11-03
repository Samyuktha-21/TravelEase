import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllSpotsWithCrowd } from '../data/crowdModel';
import SpotCard from '../components/spots/SpotCard';
import './Home.css';

const Home = () => {
  const [spots, setSpots] = useState([]);
  const [leastCrowded, setLeastCrowded] = useState(null);

  useEffect(() => {
    const crowdSpots = getAllSpotsWithCrowd();
    setSpots(crowdSpots.slice(0, 6));
    const sorted = [...crowdSpots].sort((a, b) => a.crowd.score - b.crowd.score);
    if (sorted.length > 0) {
      setLeastCrowded(sorted[0]);
    }
  }, []);

  return (
    <div className="home-page">
      {/* HERO SECTION — TRAILHEAD AESTHETIC */}
      <section className="hero">
        <img
          className="hero-image"
          src="/hero-ooty.jpg"
          alt="Rolling Nilgiri tea hills under dramatic misty mountain skies in Ooty"
          fetchPriority="high"
        />
        <div className="hero-shade"></div>

        <div className="hero-content">
          <div className="hero-heading">
            <p className="eyebrow">
              <span className="tiny-line"></span> Built for the Nilgiris
            </p>
            <h1>
              Out there.<br />
              Starts here.
            </h1>
            <p className="hero-subtitle">
              Real-time crowd predictions. Local know-how. Serene Nilgiri trails.
            </p>
          </div>

          <div className="hero-bottom">
            <div className="hero-coordinate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>
                Rooted in Ooty.<br />
                <strong>Ready for anywhere.</strong>
              </span>
            </div>

            <a href="#how-it-works" className="hero-explore">
              <span className="outlined-text">
                Find your<br />
                calm spots.
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </a>

            <div className="hero-buttons">
              <Link className="button button-orange" to="/explore">
                Explore the spots{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
              <Link className="button button-outline" to="/crowds">
                Check Live Crowds{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <span className="hero-side-note">
          Nilgiris, Tamil Nadu / 11°24′ N • 76°42′ E
        </span>

        {/* Floating Live Crowd Indicator */}
        {leastCrowded && (
          <div className="hero-floating-status">
            <div className="floating-status-header">
              <span className="live-dot"></span>
              <span className="floating-title">LIVE CROWD RADAR</span>
            </div>
            <p className="floating-subtitle">LEAST CROWDED RIGHT NOW</p>
            <h4 className="floating-spot-name">{leastCrowded.shortName || leastCrowded.name}</h4>
            <div className="floating-score-row">
              <span className="floating-score" style={{ color: 'var(--crowd-low-glow)' }}>
                {leastCrowded.crowd?.score}% DENSITY
              </span>
              <span className="floating-label">({leastCrowded.crowd?.label?.toUpperCase()})</span>
            </div>
            <Link to="/crowds" className="floating-link">
              Open Live Radar ↗
            </Link>
          </div>
        )}
      </section>

      {/* SECTION 01: HOW TRAVELEASE WORKS (ACTIVITY LIST) */}
      <section id="how-it-works" className="section activity-section">
        <div className="rail">
          <p className="eyebrow accent">01 / Choose your pace</p>
          <div className="section-heading">
            <h2>
              Good plans.<br />
              No guesswork.
            </h2>
            <p>
              A misty switchback. A quiet tea trail. An open lake.<br />
              TravelEase predicts crowd surges so you experience Ooty at peace.
            </p>
          </div>

          <div className="activity-list">
            <Link className="activity-row" to="/crowds">
              <span className="row-index">01</span>
              <h3>Check Crowds</h3>
              <span className="activity-note">Hourly Radar</span>
              <span className="activity-equipment">Historical Trends · Weather Shifts</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>

            <Link className="activity-row" to="/crowds">
              <span className="row-index">02</span>
              <h3>Pick Smart Hours</h3>
              <span className="activity-note">Optimal Windows</span>
              <span className="activity-equipment">Early Mornings · Golden Hours</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>

            <Link className="activity-row" to="/explore">
              <span className="row-index">03</span>
              <h3>Explore Quiet Paths</h3>
              <span className="activity-note">Smart Reroutes</span>
              <span className="activity-equipment">Emerald Lake · Pykara Falls</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>

          <div className="activity-footnote">
            <span className="eyebrow muted">Different paths. The same peace.</span>
            <Link className="text-link" to="/explore">
              Explore all spots{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 02: FEATURED DESTINATIONS (PRODUCT GRID) */}
      <section className="section featured-section">
        <div className="rail">
          <p className="eyebrow accent">02 / Popular destinations</p>
          <div className="section-heading">
            <h2>Ooty at a glance.</h2>
            <Link className="text-link" to="/explore">
              View all 10 spots{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>
          <p className="section-intro">
            Dynamic crowd predictions updated for Ooty's most famous botanical gardens, misty peaks, and serene lakes.
          </p>

          <div className="product-grid">
            {spots.map((spot, i) => (
              <SpotCard key={spot.id} spot={spot} index={i} />
            ))}
          </div>

          {/* Service Strip */}
          <div className="service-strip">
            <span>
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
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>{' '}
              2,240m Elevation
            </span>
            <span>
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
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>{' '}
              12–25°C Pleasant Climate
            </span>
            <span>
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>{' '}
              28+ Lakh Annual Travelers
            </span>
            <Link to="/transport">
              Transit & toy train guide{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 03: FIELD EXPERIENCE & PHILOSOPHY */}
      <section className="section experience-section">
        <div className="rail">
          <p className="eyebrow accent">03 / A tranquil escape</p>
          <h2>
            Not stuck in traffic.<br />
            Inspired by the hills.
          </h2>

          <div className="experience-copy">
            <p>
              We built TravelEase for early risers, tea plantation wanderers, and mountain travelers. By computing live visitor influx, holiday schedules, and microclimate rain metrics, we replace guesswork with calmness.
            </p>
            <p className="eyebrow muted">
              Eucalyptus-scented air.<br />
              Dew on Nilgiri tea leaves.<br />
              A holiday worth remembering.
            </p>
          </div>

          <figure className="field-image">
            <img
              src="/spots/doddabetta.jpg"
              alt="Panoramic view from Doddabetta peak over the Nilgiri mountain ridges"
              loading="lazy"
            />
            <span className="image-marker">TE / FIELD NOTES — 2,637M</span>
            <figcaption className="eyebrow muted">
              Doddabetta Peak. Highest vantage point in South India.
            </figcaption>
          </figure>

          <div className="brand-band">
            <span className="eyebrow muted">Trusted Data Feeds</span>
            <span className="brand-meta">Nilgiri Tourism Board</span>
            <span className="brand-meta">UNESCO Mountain Railway</span>
            <span className="brand-meta">Indian Meteorological Dept</span>
            <span className="brand-meta">Local Transit Hubs</span>
          </div>
        </div>
      </section>

      {/* SECTION 04: FIELD GUIDES (KNOW BEFORE YOU GO) */}
      <section className="section guides-section">
        <div className="rail">
          <p className="eyebrow accent">04 / Know before you go</p>
          <div className="section-heading">
            <h2>
              A little know-how<br />
              goes a long way.
            </h2>
            <Link className="text-link" to="/transport">
              All field guides{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>

          <div className="guide-list">
            <Link className="guide-row" to="/transport">
              <span className="eyebrow muted">Transit / 5 min read</span>
              <div>
                <h3>Nilgiri Mountain Railway (Toy Train) Guide</h3>
                <p>
                  How to book the UNESCO steam train from Mettupalayam, tunnel highlights, and morning seat tips.
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>

            <Link className="guide-row" to="/weather">
              <span className="eyebrow muted">Climate / 4 min read</span>
              <div>
                <h3>Monsoon & Winter Layering in Ooty</h3>
                <p>
                  Pack smart for swift temperature drops, afternoon mountain mist, and sudden valley showers.
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>

            <Link className="guide-row" to="/explore">
              <span className="eyebrow muted">Routing / 6 min read</span>
              <div>
                <h3>Doddabetta vs. Emerald Lake: When to Reroute</h3>
                <p>
                  Why swapping crowded noon spots for pristine lakeside trails gives you a 10x better trip.
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>

          <Link className="fit-link" to="/explore">
            <span>Find low-crowd destinations right now.</span>
            <span className="text-link">
              Explore live catalog{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;