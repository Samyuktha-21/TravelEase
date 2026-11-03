import React from 'react';
import { Link } from 'react-router-dom';
import { getCrowdScore } from '../../data/crowdModel';
import './SpotCard.css';

const SpotCard = ({ spot, index = 0 }) => {
  const crowdData = getCrowdScore(spot.id);

  let crowdColor = 'var(--crowd-low-glow)';
  let crowdClass = 'low';
  if (crowdData.score > 30 && crowdData.score <= 70) {
    crowdColor = 'var(--crowd-mod-glow)';
    crowdClass = 'moderate';
  } else if (crowdData.score > 70) {
    crowdColor = 'var(--crowd-high-glow)';
    crowdClass = 'high';
  }

  const indexStr = String(index + 1).padStart(2, '0');

  return (
    <article className="product-card">
      <Link to={`/spot/${spot.id}`} className="product-image" aria-label={`View details for ${spot.name}`}>
        <img
          src={spot.image}
          alt={spot.name}
          loading="lazy"
          onError={(e) => {
            if (spot.fallbackImage && e.currentTarget.src !== spot.fallbackImage) {
              e.currentTarget.src = spot.fallbackImage;
            }
          }}
        />
        <span className="product-ribbon">{spot.category}</span>
        <span className="product-image-action">
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
        </span>
      </Link>

      <div className="product-card-meta">
        <span className="eyebrow muted">{indexStr} // {spot.category}</span>
        <span className="product-price">
          {spot.entryFee?.indian === 0 ? 'FREE ENTRY' : `₹${spot.entryFee?.indian}`}
        </span>
      </div>

      <Link to={`/spot/${spot.id}`} className="product-title">
        {spot.shortName || spot.name}
      </Link>

      <p className="product-card-desc">
        {spot.description?.slice(0, 85)}...
      </p>

      {/* Live Crowd Level Meter */}
      <div className="product-crowd-meter">
        <div className="crowd-meter-header">
          <div className="crowd-status-indicator">
            <span className="status-dot" style={{ backgroundColor: crowdColor }}></span>
            <span className="status-label">{crowdData.score}% {crowdData.level} Crowd</span>
          </div>
          <span className="crowd-tag">{crowdClass}</span>
        </div>
        <div className="crowd-bar-bg">
          <div
            className="crowd-bar-fill"
            style={{
              width: `${crowdData.score}%`,
              backgroundColor: crowdColor,
            }}
          ></div>
        </div>
      </div>

      <div className="product-card-details">
        <span>⏱ {spot.avgVisitDuration}</span>
        <span>•</span>
        <span>🕒 {spot.timings?.open} - {spot.timings?.close}</span>
      </div>
    </article>
  );
};

export default SpotCard;