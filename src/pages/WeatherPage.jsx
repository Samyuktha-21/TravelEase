import React from 'react';
import { MONTHLY_CLIMATE } from '../data/weather';
import './WeatherPage.css';

const WeatherPage = () => {
  const now = new Date();
  const currentMonth = MONTHLY_CLIMATE[now.getMonth()];

  const forecast = [
    { day: 'Today', tempH: 22, tempL: 14, condition: 'Partly Cloudy', icon: '⛅' },
    { day: 'Tomorrow', tempH: 21, tempL: 13, condition: 'Mist & Showers', icon: '🌧️' },
    { day: 'Wednesday', tempH: 19, tempL: 12, condition: 'Light Rain', icon: '🌧️' },
    { day: 'Thursday', tempH: 20, tempL: 12, condition: 'Passing Clouds', icon: '⛅' },
    { day: 'Friday', tempH: 22, tempL: 13, condition: 'Clear Sky', icon: '☀️' },
    { day: 'Saturday', tempH: 23, tempL: 14, condition: 'Sunny & Pleasant', icon: '☀️' },
    { day: 'Sunday', tempH: 24, tempL: 15, condition: 'Mild Breeze', icon: '⛅' },
  ];

  return (
    <div className="weather-page page-section">
      <div className="rail">
        <p className="eyebrow accent">01 / Mountain Meteorology</p>
        <h1 className="weather-heading">Ooty Climate & Seasons</h1>
        <p className="page-intro">
          Plan your Nilgiri journey around microclimate shifts, monsoon showers, and high-altitude mountain mist.
        </p>

        {/* Current Month Station Card */}
        <div className="weather-current-station tech-card">
          <div className="station-header">
            <div>
              <span className="eyebrow muted">Live Nilgiri Weather Station</span>
              <h2>{currentMonth.name} — Current Conditions</h2>
            </div>
            <span className="station-season-badge">{currentMonth.touristSeason} Season</span>
          </div>

          <div className="station-main-row">
            <div className="station-temp-display">
              <span className="station-high">{currentMonth.tempHigh}°</span>
              <span className="station-sep">/</span>
              <span className="station-low">{currentMonth.tempLow}°C</span>
            </div>

            <div className="station-metrics-grid">
              <div className="station-metric">
                <span className="eyebrow muted">Rainfall</span>
                <h4>{currentMonth.rainfallMm} mm</h4>
              </div>
              <div className="station-metric">
                <span className="eyebrow muted">Humidity</span>
                <h4>{currentMonth.humidity}%</h4>
              </div>
              <div className="station-metric">
                <span className="eyebrow muted">Cloud Cover</span>
                <h4>{currentMonth.cloudCover}%</h4>
              </div>
              <div className="station-metric">
                <span className="eyebrow muted">Rainy Days</span>
                <h4>{currentMonth.rainyDays} Days</h4>
              </div>
            </div>
          </div>

          <p className="station-description">{currentMonth.description}</p>
        </div>

        {/* 7-Day Forecast */}
        <div className="forecast-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow accent">02 / 7-Day Nilgiri Outlook</p>
              <h3>Upcoming Forecast</h3>
            </div>
            <span className="eyebrow muted">Station: Ooty Town (2,240m)</span>
          </div>

          <div className="forecast-grid">
            {forecast.map((d, i) => (
              <div key={i} className="forecast-day-card tech-card">
                <span className="forecast-day-label">{d.day}</span>
                <span className="forecast-icon">{d.icon}</span>
                <div className="forecast-temps">
                  <span className="f-high">{d.tempH}°</span>
                  <span className="f-low">{d.tempL}°</span>
                </div>
                <span className="forecast-cond">{d.condition}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Month-by-Month Guide */}
        <div className="annual-guide-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow accent">03 / Annual Matrix</p>
              <h3>12-Month Climate Guide</h3>
            </div>
            <span className="eyebrow muted">Historical Nilgiri Averages</span>
          </div>

          <div className="months-grid">
            {MONTHLY_CLIMATE.map((m, idx) => {
              const isCurrent = idx === now.getMonth();
              return (
                <div key={idx} className={`month-card tech-card ${isCurrent ? 'active-month' : ''}`}>
                  <div className="month-card-header">
                    <h4>{m.name}</h4>
                    <span className="month-season-tag">{m.season}</span>
                  </div>
                  <div className="month-temp-range">
                    <span className="m-high">{m.tempHigh}°</span>
                    <span className="m-sep">/</span>
                    <span className="m-low">{m.tempLow}°C</span>
                  </div>
                  <div className="month-data-points">
                    <span>💧 {m.rainfallMm}mm rain</span>
                    <span>☁️ {m.cloudCover}% cloud</span>
                  </div>
                  <p className="month-desc">{m.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;