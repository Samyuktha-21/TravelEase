import React from 'react';
import './CrowdBadge.css';

const CrowdBadge = ({ level = 'low', size = 'sm', score }) => {
  const isLarge = size === 'lg';
  
  const getLevelConfig = () => {
    switch (level?.toLowerCase()) {
      case 'high':
        return { text: 'HIGH CROWD', className: 'badge-high', color: 'var(--crowd-high-glow)' };
      case 'moderate':
        return { text: 'MODERATE', className: 'badge-moderate', color: 'var(--crowd-mod-glow)' };
      case 'low':
      default:
        return { text: 'LOW CROWD', className: 'badge-low', color: 'var(--crowd-low-glow)' };
    }
  };

  const config = getLevelConfig();

  if (isLarge) {
    return (
      <div className={`crowd-badge-lg ${config.className}`}>
        <div className="badge-lg-ring">
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
      <span className="badge-pulse-dot" style={{ backgroundColor: config.color }}></span>
      <span className="badge-text">{config.text} {score !== undefined ? `• ${score}%` : ''}</span>
    </div>
  );
};

export default CrowdBadge;