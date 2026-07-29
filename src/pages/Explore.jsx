import React, { useState, useEffect } from 'react';
import { SPOTS, SPOT_CATEGORIES } from '../data/spots';
import { getAllSpotsWithCrowd } from '../data/crowdModel';
import SpotCard from '../components/spots/SpotCard';
import './Explore.css';

const Explore = () => {
  const [spots, setSpots] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('crowd_asc');

  useEffect(() => {
    let currentSpots = getAllSpotsWithCrowd();

    if (categoryFilter !== 'all') {
      currentSpots = currentSpots.filter(spot => spot.category === categoryFilter);
    }

    if (sortOption === 'crowd_asc') {
      currentSpots.sort((a, b) => a.crowd.score - b.crowd.score);
    } else if (sortOption === 'crowd_desc') {
      currentSpots.sort((a, b) => b.crowd.score - a.crowd.score);
    }

    setSpots(currentSpots);
  }, [categoryFilter, sortOption]);

  const allSpots = getAllSpotsWithCrowd();
  const lowCrowdCount = allSpots.filter(s => s.crowd.score <= 30).length;
  const modCrowdCount = allSpots.filter(s => s.crowd.score > 30 && s.crowd.score <= 70).length;
  const highCrowdCount = allSpots.filter(s => s.crowd.score > 70).length;

  return (
    <div className="explore-page">
      <div className="explore-hero">
        <h1 className="explore-title">Explore <span className="text-gradient">Ooty</span></h1>
        
        <div className="crowd-summary-pills">
          <div className="summary-pill green">
            <span className="pulse-dot green-dot"></span>
            {lowCrowdCount} Low Crowd
          </div>
          <div className="summary-pill amber">
            <span className="pulse-dot amber-dot"></span>
            {modCrowdCount} Moderate
          </div>
          <div className="summary-pill red">
            <span className="pulse-dot red-dot"></span>
            {highCrowdCount} Crowded
          </div>
        </div>
      </div>

      <div className="explore-controls">
        <div className="filters">
          {SPOT_CATEGORIES.map(cat => (
            <button 
              key={cat.id} 
              className={`filter-pill ${categoryFilter === cat.id ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        <div className="sort-control">
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="crowd_asc">Sort: Least Crowded First</option>
            <option value="crowd_desc">Sort: Most Crowded First</option>
          </select>
        </div>
      </div>

      <div className="explore-grid">
        {spots.map(spot => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
        {spots.length === 0 && (
          <div className="no-spots-msg">
            <p>No spots found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
