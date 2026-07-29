import { TRANSPORT_ROUTES, NEAREST_AIRPORT, NEAREST_RAILWAY } from '../../data/transport';
import './TransportRoutes.css';

export default function TransportRoutes() {
  return (
    <div className="transport-section" id="transport">
      <div className="transport-quick-info">
        <div className="tqi-card">
          <span className="tqi-icon">✈️</span>
          <div>
            <strong>{NEAREST_AIRPORT.name}</strong>
            <p>{NEAREST_AIRPORT.code} — {NEAREST_AIRPORT.distance}</p>
          </div>
        </div>
        <div className="tqi-card">
          <span className="tqi-icon">🚂</span>
          <div>
            <strong>{NEAREST_RAILWAY.name}</strong>
            <p>{NEAREST_RAILWAY.code} — {NEAREST_RAILWAY.distance}</p>
          </div>
        </div>
      </div>

      <div className="transport-cities">
        {TRANSPORT_ROUTES.cities.map(city => (
          <div key={city.id} className="transport-city-card card">
            <div className="tc-header">
              <h3>From {city.name}</h3>
              <span className="tc-distance">{city.distance}</span>
            </div>
            <div className="tc-routes">
              {city.routes.map((route, i) => (
                <div key={i} className={`tc-route ${route.highlight ? 'highlighted' : ''}`}>
                  <div className="tc-route-icon">{route.icon}</div>
                  <div className="tc-route-info">
                    <div className="tc-route-top">
                      <span className="tc-mode">{route.mode === 'car' ? 'By Road' : route.mode === 'bus' ? 'By Bus' : route.mode === 'train' ? 'By Train' : 'By Flight'}</span>
                      <span className="tc-duration">{route.duration}</span>
                    </div>
                    <p className="tc-desc">{route.description}</p>
                    <div className="tc-meta">
                      <span className="tc-cost">{route.cost}</span>
                      <span className="tc-freq">{route.frequency}</span>
                    </div>
                    <p className="tc-tip">💡 {route.tips}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
