import React from 'react';
import { MONTHLY_CLIMATE } from '../data/weather';
import './WeatherPage.css';

const WeatherPage = () => {
  const now = new Date();
  const currentMonth = MONTHLY_CLIMATE[now.getMonth()];

  return (
    <div className="weather-page">
      <div className="weather-hero">
        <h1 className="weather-title">Ooty Weather & Seasons</h1>
        <p className="weather-subtitle">Plan your visit according to Ooty's pleasant climate</p>
      </div>

      <div className="weather-content container">
        {/* Current Month */}
        <div className="current-weather-card glass-card">
          <div className="cw-header">
            <h2>{currentMonth.name} — Right Now</h2>
            <span className="cw-season-tag">{currentMonth.season}</span>
          </div>
          <div className="cw-temp-display">
            <span className="cw-high">{currentMonth.tempHigh}°</span>
            <span className="cw-sep">/</span>
            <span className="cw-low">{currentMonth.tempLow}°C</span>
          </div>
          <p className="cw-desc">{currentMonth.description}</p>
        </div>

        {/* Stats */}
        <div className="weather-stats-grid">
          <div className="weather-stat-card">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>
            <div>
              <h3>{currentMonth.rainfallMm}mm</h3>
              <p>Rainfall</p>
            </div>
          </div>
          <div className="weather-stat-card">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
            <div>
              <h3>{currentMonth.humidity}%</h3>
              <p>Humidity</p>
            </div>
          </div>
          <div className="weather-stat-card">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
            <div>
              <h3>{currentMonth.cloudCover}%</h3>
              <p>Cloud Cover</p>
            </div>
          </div>
          <div className="weather-stat-card">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <div>
              <h3>{currentMonth.rainyDays} days</h3>
              <p>Rainy Days</p>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <h2 className="section-heading">7-Day Forecast</h2>
        <div className="forecast-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '4rem'
        }}>
          {[
            { day: 'Today', tempH: 22, tempL: 14, icon: '⛅' },
            { day: 'Tomorrow', tempH: 21, tempL: 13, icon: '🌧️' },
            { day: 'Wed', tempH: 19, tempL: 12, icon: '🌧️' },
            { day: 'Thu', tempH: 20, tempL: 12, icon: '⛅' },
            { day: 'Fri', tempH: 22, tempL: 13, icon: '☀️' },
            { day: 'Sat', tempH: 23, tempL: 14, icon: '☀️' },
            { day: 'Sun', tempH: 24, tempL: 15, icon: '⛅' },
          ].map((d, i) => (
            <div key={i} className="glass-card" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--jungle-mint)' }}>{d.day}</h4>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{d.icon}</div>
              <div style={{ fontWeight: '600' }}>
                <span>{d.tempH}°</span> <span style={{ color: 'var(--sea-mist)', opacity: 0.6 }}>{d.tempL}°</span>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Grid */}
        <h2 className="section-heading">Month-by-Month Guide</h2>
        <div className="months-grid">
          {MONTHLY_CLIMATE.map((month, idx) => (
            <div key={idx} className={`month-card ${idx === now.getMonth() ? 'current' : ''}`}>
              <div className="month-header">
                <h3>{month.name.slice(0, 3)}</h3>
                <span className={`season-tag ${month.season}`}>{month.touristSeason}</span>
              </div>
              <div className="temp-display">
                <span className="high-temp">{month.tempHigh}°</span>
                <span className="temp-slash">/</span>
                <span className="low-temp">{month.tempLow}°</span>
              </div>
              <div className="crowd-bar-container">
                <span className="crowd-bar-label">Crowd</span>
                <div className="crowd-track">
                  <div
                    className="crowd-fill"
                    style={{
                      width: `${month.crowdFactor * 100}%`,
                      background: month.crowdFactor > 0.7 ? 'var(--warm-coral)' :
                                  month.crowdFactor > 0.4 ? '#FBBF24' :
                                  'var(--jungle-mint)',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Best Time */}
        <div className="best-time-section">
          <h2 className="section-heading">Best Time to Visit</h2>
          <div className="best-time-cards">
            <div className="bt-card bt-peak">
              <h3>Peak Season</h3>
              <p className="bt-months">March - May</p>
              <p>Ideal weather, Flower Show in May. Book well in advance. Expect heavy crowds especially on weekends.</p>
            </div>
            <div className="bt-card bt-off">
              <h3>Off Season</h3>
              <p className="bt-months">June - September</p>
              <p>Monsoon rains create lush green landscapes. Fewer tourists, great deals. Carry rain gear.</p>
            </div>
            <div className="bt-card bt-sweet">
              <h3>Sweet Spot</h3>
              <p className="bt-months">October - February</p>
              <p>Post-monsoon clarity, pleasant weather, moderate crowds. Best balance of experience and comfort.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
