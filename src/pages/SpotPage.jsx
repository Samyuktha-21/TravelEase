import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpotById } from '../data/spots';
import { getCrowdScore, getAlternatives, getBestTimeToVisit } from '../data/crowdModel';
import CrowdChart from '../components/prediction/CrowdChart';
import './SpotPage.css';

// Using inline fallback if CrowdBadge is not found, or ideally importing it
const CrowdBadge = ({ score }) => {
  let colorClass = 'green';
  let label = 'Low Crowd';
  if (score > 30) { colorClass = 'amber'; label = 'Moderate'; }
  if (score > 70) { colorClass = 'red'; label = 'High Crowd'; }
  
  return (
    <span className={`crowd-badge badge-${colorClass}`}>
      {label} ({score}%)
    </span>
  );
};

const SpotPage = () => {
  const { spotId } = useParams();
  const id = spotId; // alias for the rest of the code
  const [spot, setSpot] = useState(null);
  const [crowdData, setCrowdData] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [bestTime, setBestTime] = useState('');

  useEffect(() => {
    const s = getSpotById(id);
    if (s) {
      setSpot(s);
      const crowdResult = getCrowdScore(id);
      setCrowdData(crowdResult);
      setAlternatives(getAlternatives(id));
      setBestTime(getBestTimeToVisit(id));
    }
  }, [id]);

  if (!spot) {
    return <div className="spot-not-found">Spot not found.</div>;
  }

  return (
    <div className="spot-page">
      <div className="spot-hero">
        <div className="spot-hero-content">
          <div className="spot-meta">
            <span className="spot-cat">{spot.category.toUpperCase()}</span>
            {crowdData && <CrowdBadge score={crowdData.score} />}
          </div>
          <h1 className="spot-title">{spot.name}</h1>
          <p className="spot-desc">{spot.description}</p>
        </div>
      </div>

      <div className="spot-layout">
        <div className="spot-main">
          
          <div className="quick-info-grid">
            <div className="info-card">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <div>
                <h4>Duration</h4>
                <p>{spot.avgVisitDuration}</p>
              </div>
            </div>
            <div className="info-card">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <div>
                <h4>Entry Fee</h4>
                <p>{spot.entryFee.indian === 0 ? 'Free' : `₹${spot.entryFee.indian}`}</p>
              </div>
            </div>
            <div className="info-card">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <div>
                <h4>Timings</h4>
                <p>{spot.timings.open} - {spot.timings.close}</p>
              </div>
            </div>
            <div className="info-card">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              <div>
                <h4>Best Time</h4>
                <p>{bestTime ? bestTime.timeLabel : 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="chart-section glass-container">
            <h3>Hourly Crowd Prediction</h3>
            <CrowdChart spotId={spot.id} />
          </div>

          <div className="tips-section">
            <h3>Visitor Tips</h3>
            <ul className="tips-list">
              <li>Plan your visit early morning to avoid rush.</li>
              <li>Carry a light jacket as weather can change.</li>
              <li>Book entry tickets online if available.</li>
            </ul>
          </div>
          
        </div>

        <div className="spot-sidebar">
          <div className="sidebar-card">
            <h3>Tags</h3>
            <div className="tags-container">
              {spot.tags && spot.tags.map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </div>

          {alternatives.length > 0 && (
            <div className="sidebar-card alternatives-card">
              <h3>Less Crowded Alternatives</h3>
              <div className="alt-list">
                {alternatives.map(alt => (
                  <Link key={alt.id} to={`/spot/${alt.id}`} className="alt-item">
                    <div className="alt-info">
                      <h4>{alt.name}</h4>
                      <CrowdBadge score={alt.crowd.score} />
                    </div>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotPage;
