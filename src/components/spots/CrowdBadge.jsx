import React from 'react';
import './CrowdBadge.css';

const CrowdBadge = ({ level = 'low', size = 'sm', score }) => {
  const isLarge = size === 'lg';
  
  const getLevelConfig = () => {
    switch (level?.toLowerCase()) {
      case 'high':
        return { text: 'High', className: 'badge-high', color: 'var(--warm-coral)' };
      case 'moderate':
        return { text: 'Moderate', className: 'badge-moderate', color: '#F59E0B' };
      case 'low':
      default:
        return { text: 'Low', className: 'badge-low', color: 'var(--jungle-mint)' };
    }
  };

  const config = getLevelConfig();

  if (isLarge) {
    return (
      <div className={`crowd-badge-lg ${config.className}`}>
        <div className="badge-lg-ring" style={{ borderColor: config.color }}>
          <div className="badge-lg-content">
            <span className="badge-lg-score">{score}%</span>
            <span className="badge-lg-label">{config.text}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`crowd-badge-sm ${config.className}`}>
      <span className="pulse-dot"></span>
      <span className="badge-text">{config.text}</span>
    </div>
  );
};

export default CrowdBadge;
