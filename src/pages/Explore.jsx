import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SPOT_CATEGORIES } from '../data/spots';
import { getAllSpotsWithCrowd } from '../data/crowdModel';
import SpotCard from '../components/spots/SpotCard';
import './Explore.css';

const Explore = () => {
  const [spots, setSpots] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [crowdFilter, setCrowdFilter] = useState('all');
  const [sortOption, setSortOption] = useState('crowd_asc');
  const [searchQuery, setSearchQuery] = useState('');

  const allSpots = getAllSpotsWithCrowd();

  useEffect(() => {
    let currentSpots = getAllSpotsWithCrowd();

    if (categoryFilter !== 'all') {
      currentSpots = currentSpots.filter(spot => spot.category === categoryFilter);
    }

    if (crowdFilter === 'low') {
      currentSpots = currentSpots.filter(spot => spot.crowd.score <= 30);
    } else if (crowdFilter === 'moderate') {
      currentSpots = currentSpots.filter(spot => spot.crowd.score > 30 && spot.crowd.score <= 70);
    } else if (crowdFilter === 'high') {
      currentSpots = currentSpots.filter(spot => spot.crowd.score > 70);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      currentSpots = currentSpots.filter(
        spot =>
          spot.name.toLowerCase().includes(q) ||
          (spot.shortName && spot.shortName.toLowerCase().includes(q)) ||
          spot.category.toLowerCase().includes(q) ||
          (spot.tags && spot.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (sortOption === 'crowd_asc') {
      currentSpots.sort((a, b) => a.crowd.score - b.crowd.score);
    } else if (sortOption === 'crowd_desc') {
      currentSpots.sort((a, b) => b.crowd.score - a.crowd.score);
    } else if (sortOption === 'name_asc') {
      currentSpots.sort((a, b) => (a.shortName || a.name).localeCompare(b.shortName || b.name));
    }

    setSpots(currentSpots);
  }, [categoryFilter, crowdFilter, sortOption, searchQuery]);

  const lowCrowdCount = allSpots.filter(s => s.crowd.score <= 30).length;
  const modCrowdCount = allSpots.filter(s => s.crowd.score > 30 && s.crowd.score <= 70).length;
  const highCrowdCount = allSpots.filter(s => s.crowd.score > 70).length;

  return (
    <div className="explore-page page-section">
      <div className="rail">
        <p className="eyebrow accent">01 / Nilgiri Field Catalog</p>
        <div className="section-heading" style={{ marginTop: 12, marginBottom: 0 }}>
          <h1 className="catalog-heading" style={{ margin: 0 }}>Monitored Destinations</h1>
          <Link to="/crowds" className="text-link" style={{ fontSize: 11 }}>
            Open Live Crowd Radar ↗
          </Link>
        </div>
        <p className="page-intro">
          Dynamic crowd radar, hourly influx scores, and optimal travel windows across 10 top Ooty locations.
        </p>

        {/* Live Density Summary Indicators / Quick Filter Buttons */}
        <div className="crowd-summary-strip">
          <button
            className={`summary-pill low ${crowdFilter === 'low' ? 'active-filter' : ''}`}
            onClick={() => setCrowdFilter(crowdFilter === 'low' ? 'all' : 'low')}
            title="Click to filter low crowd destinations"
          >
            <span className="summary-dot" style={{ backgroundColor: 'var(--crowd-low-glow)' }}></span>
            <span>{lowCrowdCount} Low Crowd {crowdFilter === 'low' ? '✓' : ''}</span>
          </button>

          <button
            className={`summary-pill moderate ${crowdFilter === 'moderate' ? 'active-filter' : ''}`}
            onClick={() => setCrowdFilter(crowdFilter === 'moderate' ? 'all' : 'moderate')}
            title="Click to filter moderate density destinations"
          >
            <span className="summary-dot" style={{ backgroundColor: 'var(--crowd-mod-glow)' }}></span>
            <span>{modCrowdCount} Moderate Density {crowdFilter === 'moderate' ? '✓' : ''}</span>
          </button>

          <button
            className={`summary-pill high ${crowdFilter === 'high' ? 'active-filter' : ''}`}
            onClick={() => setCrowdFilter(crowdFilter === 'high' ? 'all' : 'high')}
            title="Click to filter high surge destinations"
          >
            <span className="summary-dot" style={{ backgroundColor: 'var(--crowd-high-glow)' }}></span>
            <span>{highCrowdCount} High Surge {crowdFilter === 'high' ? '✓' : ''}</span>
          </button>

          {crowdFilter !== 'all' && (
            <button className="text-link" onClick={() => setCrowdFilter('all')} style={{ fontSize: 10, cursor: 'pointer', background: 'none', border: 'none' }}>
              Clear Density Filter ✕
            </button>
          )}
        </div>

        {/* Catalog Filter Controls */}
        <div className="catalog-filters">
          <div className="filter-tabs no-scrollbar">
            {SPOT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`filter-tab ${categoryFilter === cat.id ? 'selected' : ''}`}
                onClick={() => setCategoryFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="catalog-controls-right">
            <div className="catalog-search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Filter by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="catalog-sort"
            >
              <option value="crowd_asc">Least Crowded First</option>
              <option value="crowd_desc">Most Crowded First</option>
              <option value="name_asc">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="catalog-count">
          Showing {spots.length} of {allSpots.length} monitored spots in the Nilgiris
        </div>

        {/* Destinations Product Grid */}
        <div className="product-grid">
          {spots.map((spot, i) => (
            <SpotCard key={spot.id} spot={spot} index={i} />
          ))}
        </div>

        {spots.length === 0 && (
          <div className="empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m4.93 4.93 14.14 14.14" />
            </svg>
            <h2>No destinations found</h2>
            <p>Try resetting your search query or selecting "All" categories.</p>
            <button
              className="button button-orange button-small"
              onClick={() => {
                setCategoryFilter('all');
                setCrowdFilter('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;