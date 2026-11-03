import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpotById } from '../data/spots';
import { getCrowdScore, getAlternatives, getBestTimeToVisit } from '../data/crowdModel';
import CrowdChart from '../components/prediction/CrowdChart';
import CrowdBadge from '../components/spots/CrowdBadge';
import './SpotPage.css';

const SpotPage = () => {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [crowdData, setCrowdData] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [bestTime, setBestTime] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const s = getSpotById(spotId);
    if (s) {
      setSpot(s);
      const crowdResult = getCrowdScore(spotId);
      setCrowdData(crowdResult);
      setAlternatives(getAlternatives(spotId));
      setBestTime(getBestTimeToVisit(spotId));
    }
  }, [spotId]);

  if (!spot) {
    return (
      <div className="page-section">
        <div className="rail">
          <div className="empty-state">
            <h2>Destination Not Found</h2>
            <p>The requested Nilgiri tourist spot does not exist in our catalog.</p>
            <Link to="/explore" className="button button-orange">Back to Catalog</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="spot-page">
      {/* HERO SCENIC BANNER */}
      <section className="spot-hero-banner">
        <img
          src={spot.image}
          alt={spot.name}
          className="spot-banner-image"
          onError={(e) => {
            if (spot.fallbackImage && e.currentTarget.src !== spot.fallbackImage) {
              e.currentTarget.src = spot.fallbackImage;
            }
          }}
        />
        <div className="spot-banner-shade"></div>

        <div className="rail spot-banner-content">
          <Link to="/explore" className="back-link text-link">
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
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to all destinations
          </Link>

          <div className="spot-banner-meta">
            <span className="eyebrow accent">{spot.category} // 2,240M ELEVATION</span>
            {crowdData && <CrowdBadge level={crowdData.level} score={crowdData.score} />}
          </div>

          <h1 className="spot-banner-title">{spot.name}</h1>
          <p className="spot-banner-desc">{spot.description}</p>
        </div>
      </section>

      {/* TWO-COLUMN EDITORIAL DETAILS */}
      <div className="rail spot-layout">
        <main className="spot-main">
          {/* TECHNICAL QUICK INFO MATRIX */}
          <div className="quick-info-grid">
            <div className="info-card">
              <span className="eyebrow muted">Duration</span>
              <h4>{spot.avgVisitDuration}</h4>
              <p>Recommended visit pace</p>
            </div>

            <div className="info-card">
              <span className="eyebrow muted">Entry Fee</span>
              <h4>{spot.entryFee?.indian === 0 ? 'Free Entry' : `₹${spot.entryFee?.indian}`}</h4>
              <p>Per Indian citizen</p>
            </div>

            <div className="info-card">
              <span className="eyebrow muted">Gate Timings</span>
              <h4>{spot.timings?.open} – {spot.timings?.close}</h4>
              <p>Daily operating hours</p>
            </div>

            <div className="info-card">
              <span className="eyebrow muted">Optimal Window</span>
              <h4>{bestTime ? bestTime.timeLabel : 'Early Morning'}</h4>
              <p>Lowest expected density</p>
            </div>
          </div>

          {/* HOURLY CROWD RADAR CHART */}
          <div className="chart-section tech-card">
            <div className="section-heading" style={{ marginTop: 0, marginBottom: 18 }}>
              <div>
                <p className="eyebrow accent">01 // Hourly Radar</p>
                <h3 style={{ fontSize: 32, marginTop: 6 }}>Visitor Influx Prediction</h3>
              </div>
              <span className="tag">Dynamic Feed</span>
            </div>
            <p className="chart-explanation">
              Real-time projection based on time-of-day multipliers, weekend influx constants, and seasonal Nilgiri traffic patterns.
            </p>
            <CrowdChart spotId={spot.id} />
          </div>

          {/* FIELD NOTES / TIPS */}
          <div className="tips-section tech-card">
            <div className="section-heading" style={{ marginTop: 0, marginBottom: 16 }}>
              <div>
                <p className="eyebrow accent">02 // Field Dispatch</p>
                <h3 style={{ fontSize: 32, marginTop: 6 }}>Local Know-How</h3>
              </div>
              <span className="image-marker-inline">TE / Notes</span>
            </div>
            <ul className="tips-list">
              <li>
                <strong>Early Departure:</strong> Reach by {spot.timings?.open || '9:00 AM'} to beat the tourist bus arrivals and enjoy pristine mountain morning mist.
              </li>
              <li>
                <strong>Weather Vigilance:</strong> High-altitude wind gusts and sudden cloud drops occur past 2:00 PM; keep a light jacket and rain cover handy.
              </li>
              <li>
                <strong>Local Parking:</strong> Parking slots fill up rapidly on weekends between 11:30 AM and 3:30 PM. Utilize local transit when possible.
              </li>
            </ul>
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="spot-sidebar">
          {/* Coordinates & Category Box */}
          <div className="sidebar-card tech-card">
            <span className="eyebrow muted">Destination Meta</span>
            <div className="meta-pair-list">
              <div className="meta-pair">
                <span>Location</span>
                <strong>Ooty, Nilgiris</strong>
              </div>
              <div className="meta-pair">
                <span>Category</span>
                <strong>{spot.category?.toUpperCase()}</strong>
              </div>
              <div className="meta-pair">
                <span>Foreign Entry</span>
                <strong>{spot.entryFee?.foreigner ? `₹${spot.entryFee.foreigner}` : 'Standard'}</strong>
              </div>
            </div>

            <div className="tags-container">
              {spot.tags && spot.tags.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Less Crowded Alternatives */}
          {alternatives.length > 0 && (
            <div className="sidebar-card tech-card alternatives-box">
              <span className="eyebrow accent">Calmer Options</span>
              <h3 style={{ fontSize: 24, marginTop: 6, marginBottom: 14 }}>Reroute & Escape</h3>
              <p className="alt-intro">
                When {spot.shortName || spot.name} experiences heavy influx, these nearby spots offer serene vistas with fewer crowds:
              </p>

              <div className="alt-list">
                {alternatives.map(alt => (
                  <Link key={alt.id} to={`/spot/${alt.id}`} className="alt-item">
                    <div>
                      <h4>{alt.name}</h4>
                      <span className="alt-score">{alt.crowd?.score}% Crowd • {alt.crowd?.label}</span>
                    </div>
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
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default SpotPage;