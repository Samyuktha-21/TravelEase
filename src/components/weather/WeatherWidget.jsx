import { MONTHLY_CLIMATE } from '../../data/weather';
import './WeatherWidget.css';

export default function WeatherWidget() {
  const now = new Date();
  const currentMonth = MONTHLY_CLIMATE[now.getMonth()];
  const nextMonth = MONTHLY_CLIMATE[(now.getMonth() + 1) % 12];

  return (
    <div className="weather-widget card-glass" id="weather">
      <div className="weather-current">
        <div className="weather-icon-large">{currentMonth.icon}</div>
        <div className="weather-info">
          <h3>Ooty Weather — {currentMonth.name}</h3>
          <p className="weather-temp">
            <span className="temp-high">{currentMonth.tempHigh}°</span>
            <span className="temp-divider">/</span>
            <span className="temp-low">{currentMonth.tempLow}°C</span>
          </p>
          <p className="weather-desc">{currentMonth.description}</p>
        </div>
      </div>

      <div className="weather-stats">
        <div className="weather-stat">
          <span className="ws-icon">🌧️</span>
          <span className="ws-value">{currentMonth.rainfallMm}mm</span>
          <span className="ws-label">Rainfall</span>
        </div>
        <div className="weather-stat">
          <span className="ws-icon">💧</span>
          <span className="ws-value">{currentMonth.humidity}%</span>
          <span className="ws-label">Humidity</span>
        </div>
        <div className="weather-stat">
          <span className="ws-icon">☁️</span>
          <span className="ws-value">{currentMonth.cloudCover}%</span>
          <span className="ws-label">Cloud Cover</span>
        </div>
        <div className="weather-stat">
          <span className="ws-icon">🌤️</span>
          <span className="ws-value">{currentMonth.rainyDays}d</span>
          <span className="ws-label">Rainy Days</span>
        </div>
      </div>

      <div className="weather-monthly">
        <h4>📅 Month-by-Month Guide</h4>
        <div className="weather-months-grid">
          {MONTHLY_CLIMATE.map((m, i) => (
            <div key={m.month} className={`weather-month-cell ${i === now.getMonth() ? 'current' : ''}`}>
              <span className="wm-name">{m.name.slice(0, 3)}</span>
              <span className="wm-icon">{m.icon}</span>
              <span className="wm-temp">{m.avgTemp}°</span>
              <div className="wm-crowd-bar">
                <div className="wm-crowd-fill" style={{
                  width: `${m.crowdFactor * 100}%`,
                  background: m.crowdFactor > 0.7 ? 'var(--warm-coral)' :
                              m.crowdFactor > 0.4 ? 'var(--crowd-moderate)' :
                              'var(--jungle-mint)',
                }}></div>
              </div>
              <span className="wm-season">{m.touristSeason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
