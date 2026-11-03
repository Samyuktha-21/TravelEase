import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllSpotsWithCrowd, getBestTimeToVisit } from '../data/crowdModel';
import './LiveCrowds.css';

const LiveCrowds = () => {
  const [spots, setSpots] = useState([]);
  const [filterLevel, setFilterLevel] = useState('all');
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    window.scrollTo(0, 0);
    const crowdSpots = getAllSpotsWithCrowd();
    // Sort by crowd score ascending (least crowded first)
    const sorted = [...crowdSpots].sort((a, b) => a.crowd.score - b.crowd.score);
    setSpots(sorted);
  }, []);

  const allSpots = getAllSpotsWithCrowd();
  const avgCrowd = allSpots.length > 0
    ? Math.round(allSpots.reduce((acc, s) => acc + s.crowd.score, 0) / allSpots.length)
    : 32;

  const lowCrowd = allSpots.filter(s => s.crowd.score <= 30);
  const modCrowd = allSpots.filter(s => s.crowd.score > 30 && s.crowd.score <= 70);
  const highCrowd = allSpots.filter(s => s.crowd.score > 70);

  const filteredSpots = spots.filter(spot => {
    if (filterLevel === 'low') return spot.crowd.score <= 30;
    if (filterLevel === 'moderate') return spot.crowd.score > 30 && spot.crowd.score <= 70;
    if (filterLevel === 'high') return spot.crowd.score > 70;
    return true;
  });

  const calmestSpot = spots[0];
  const busiestSpot = spots[spots.length - 1];

  return (
    <div className="live-crowds-page page-section">
      <div className="rail">
        <p className="eyebrow accent">01 // Real-Time Nilgiri Predictive Radar</p>
        <h1 className="crowds-heading">Live Crowd Radar</h1>
        <p className="page-intro">
          Dynamic tourist density computed from time-of-day multipliers, weekend influx curves, and live Ooty microclimate data.
        </p>

        {/* TOP STATUS OVERVIEW CARDS */}
        <div className="crowds-stats-strip">
          <div className="crowd-stat-box tech-card">
            <span className="eyebrow muted">Nilgiris Average</span>
            <div className="crowd-stat-val" style={{ color: 'var(--crowd-low-glow)' }}>
              {avgCrowd}%
            </div>
            <p>Overall Tourist Density</p>
          </div>

          <div className="crowd-stat-box tech-card">
            <span className="eyebrow muted">Calmest Destination</span>
            <div className="crowd-stat-name">
              {calmestSpot ? calmestSpot.shortName || calmestSpot.name : 'Loading...'}
            </div>
            <p className="crowd-stat-meta" style={{ color: 'var(--crowd-low-glow)' }}>
              {calmestSpot ? `${calmestSpot.crowd.score}% Density • Best right now` : ''}
            </p>
          </div>

          <div className="crowd-stat-box tech-card">
            <span className="eyebrow muted">Highest Influx</span>
            <div className="crowd-stat-name">
              {busiestSpot ? busiestSpot.shortName || busiestSpot.name : 'Loading...'}
            </div>
            <p className="crowd-stat-meta" style={{ color: 'var(--crowd-mod-glow)' }}>
              {busiestSpot ? `${busiestSpot.crowd.score}% Density • Expect wait times` : ''}
            </p>
          </div>

          <div className="crowd-stat-box tech-card">
            <span className="eyebrow muted">Current Hour</span>
            <div className="crowd-stat-val">
              {String(currentHour).padStart(2, '0')}:00
            </div>
            <p>Hourly Model Window</p>
          </div>
        </div>

        {/* DENSITY LEVEL FILTER TABS */}
        <div className="crowd-filter-bar">
          <div className="crowd-pills-selector">
            <button
              className={`crowd-pill-btn ${filterLevel === 'all' ? 'active' : ''}`}
              onClick={() => setFilterLevel('all')}
            >
              All 10 Destinations ({allSpots.length})
            </button>
            <button
              className={`crowd-pill-btn low ${filterLevel === 'low' ? 'active' : ''}`}
              onClick={() => setFilterLevel('low')}
            >
              <span className="pulse-dot-mini" style={{ background: 'var(--crowd-low-glow)' }}></span>
              Low Crowd ({lowCrowd.length})
            </button>
            <button
              className={`crowd-pill-btn moderate ${filterLevel === 'moderate' ? 'active' : ''}`}
              onClick={() => setFilterLevel('moderate')}
            >
              <span className="pulse-dot-mini" style={{ background: 'var(--crowd-mod-glow)' }}></span>
              Moderate Influx ({modCrowd.length})
            </button>
            <button
              className={`crowd-pill-btn high ${filterLevel === 'high' ? 'active' : ''}`}
              onClick={() => setFilterLevel('high')}
            >
              <span className="pulse-dot-mini" style={{ background: 'var(--crowd-high-glow)' }}></span>
              Peak Surge ({highCrowd.length})
            </button>
          </div>

          <span className="radar-live-indicator">
            <span className="live-dot"></span> RADAR LIVE • UPDATES HOURLY
          </span>
        </div>

        {/* REAL-TIME DESTINATION LEADERBOARD */}
        <div className="crowd-leaderboard">
          <div className="leaderboard-header">
            <span># // SPOT NAME</span>
            <span>CATEGORY</span>
            <span>CROWD METER</span>
            <span>OPTIMAL WINDOW</span>
            <span>ACTION</span>
          </div>

          <div className="leaderboard-rows">
            {filteredSpots.map((spot, index) => {
              const bestTime = getBestTimeToVisit(spot.id);
              let statusGlow = 'var(--crowd-low-glow)';
              let statusLabel = 'LOW';
              if (spot.crowd.score > 30 && spot.crowd.score <= 70) {
                statusGlow = 'var(--crowd-mod-glow)';
                statusLabel = 'MODERATE';
              } else if (spot.crowd.score > 70) {
                statusGlow = 'var(--crowd-high-glow)';
                statusLabel = 'HIGH SURGE';
              }

              return (
                <div key={spot.id} className="leaderboard-row tech-card">
                  <div className="spot-primary-cell">
                    <span className="rank-num">{String(index + 1).padStart(2, '0')}</span>
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="spot-row-thumb"
                      onError={(e) => {
                        if (spot.fallbackImage && e.currentTarget.src !== spot.fallbackImage) {
                          e.currentTarget.src = spot.fallbackImage;
                        }
                      }}
                    />
                    <div>
                      <Link to={`/spot/${spot.id}`} className="spot-row-title">
                        {spot.shortName || spot.name}
                      </Link>
                      <span className="spot-row-timing">🕒 {spot.timings?.open} – {spot.timings?.close}</span>
                    </div>
                  </div>

                  <div className="category-cell">
                    <span className="tag">{spot.category}</span>
                  </div>

                  <div className="meter-cell">
                    <div className="meter-header">
                      <span className="meter-score" style={{ color: statusGlow }}>
                        {spot.crowd.score}% {statusLabel}
                      </span>
                      <span className="meter-fee">
                        {spot.entryFee?.indian === 0 ? 'FREE' : `₹${spot.entryFee?.indian}`}
                      </span>
                    </div>
                    <div className="meter-track">
                      <div
                        className="meter-fill"
                        style={{
                          width: `${spot.crowd.score}%`,
                          backgroundColor: statusGlow,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="window-cell">
                    <span className="window-time">{bestTime ? bestTime.timeLabel : 'Early morning'}</span>
                    <span className="window-hint">Best visit time</span>
                  </div>

                  <div className="action-cell">
                    <Link to={`/spot/${spot.id}`} className="row-action-link">
                      Hourly Chart ↗
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FIELD ADVISORY NOTES */}
        <div className="crowd-dispatch-box tech-card">
          <div className="section-heading" style={{ marginTop: 0, marginBottom: 16 }}>
            <div>
              <p className="eyebrow accent">02 // Nilgiri Field Dispatch</p>
              <h3>Smart Rerouting Protocol</h3>
            </div>
            <span className="tag">Crowd Advisory</span>
          </div>
          <div className="dispatch-grid">
            <div className="dispatch-item">
              <h4>Morning Window (07:00 – 10:30)</h4>
              <p>Ideal for <strong>Botanical Garden</strong>, <strong>Boat House</strong>, and <strong>Doddabetta Peak</strong> before tourist buses arrive from Coimbatore and Mysore.</p>
            </div>
            <div className="dispatch-item">
              <h4>Mid-Day Escape (11:00 – 15:00)</h4>
              <p>When town viewpoints hit maximum surge, head out to <strong>Emerald Lake</strong> or <strong>Pykara Falls</strong> for tranquil, uncrowded natural scenery.</p>
            </div>
            <div className="dispatch-item">
              <h4>Late Afternoon (15:30 – 18:30)</h4>
              <p>Opt for the <strong>Ooty Tea Factory & Museum</strong> or <strong>Thread Garden</strong> which offer comfortable, indoor viewing unaffected by sudden valley mist.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCrowds;
