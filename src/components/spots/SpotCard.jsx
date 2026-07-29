import React from 'react';
import { Link } from 'react-router-dom';
import CrowdBadge from './CrowdBadge';
import { getCrowdScore } from '../../data/crowdModel';
import './SpotCard.css';

const CategoryIcon = ({ category }) => {
  switch (category) {
    case 'garden':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" />
        </svg>
      );
    case 'lake':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C17.5 22 20 18 20 14C20 9 12 2 12 2C12 2 4 9 4 14C4 18 6.5 22 12 22Z" />
        </svg>
      );
    case 'viewpoint':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 20L16 8L12 16L8 10L2 20" /><line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    case 'waterfall':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14s1-1 4-1 5 2 8 2 4-1 4-1" /><path d="M4 10s1-1 4-1 5 2 8 2 4-1 4-1" /><path d="M4 18s1-1 4-1 5 2 8 2 4-1 4-1" />
        </svg>
      );
    case 'heritage':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="15" width="16" height="6" rx="2" /><path d="M12 15V3" /><path d="M8 7h8" /><circle cx="12" cy="3" r="1" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      );
  }
};

const SpotCard = ({ spot, index = 0 }) => {
  const crowdData = getCrowdScore(spot.id);

  return (
    <Link
      to={`/spot/${spot.id}`}
      className="spot-card animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="spot-card-img-wrapper">
        <img 
          src={spot.image}
          alt={spot.name} 
          className="spot-card-img" 
        />
        <div className="spot-card-gradient" style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, rgba(30,41,59,0.1) 0%, rgba(30,41,59,0.6) 100%)`,
        }}>
        </div>
        <div className="spot-category-label">
          <CategoryIcon category={spot.category} />
          <span>{spot.category}</span>
        </div>
        <div className="spot-crowd-overlay">
          <CrowdBadge level={crowdData.level} score={crowdData.score} size="sm" />
        </div>
      </div>

      <div className="spot-card-content">
        <h3 className="spot-title">{spot.shortName || spot.name}</h3>
        <p className="spot-desc">{spot.description?.slice(0, 95)}...</p>

        <div className="crowd-progress-wrapper">
          <div className="crowd-progress-labels">
            <span className="crowd-label-text">Crowd Level</span>
            <span className="crowd-value-text" style={{ color: crowdData.color }}>{crowdData.score}%</span>
          </div>
          <div className="crowd-progress-bar">
            <div
              className="crowd-progress-fill"
              style={{ width: `${crowdData.score}%`, background: `linear-gradient(90deg, var(--jungle-mint), ${crowdData.color})` }}
            ></div>
          </div>
        </div>

        <div className="spot-meta">
          <div className="meta-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{spot.avgVisitDuration}</span>
          </div>
          <div className="meta-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" />
            </svg>
            <span>{spot.entryFee?.indian === 0 ? 'Free' : `Rs.${spot.entryFee?.indian}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpotCard;
