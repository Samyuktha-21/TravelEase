import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import LiveCrowds from './pages/LiveCrowds';
import SpotPage from './pages/SpotPage';
import WeatherPage from './pages/WeatherPage';
import TransportPage from './pages/TransportPage';
import './index.css';

// Automatically scroll to top whenever navigation route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/crowds" element={<LiveCrowds />} />
          <Route path="/live-crowds" element={<LiveCrowds />} />
          <Route path="/spot/:spotId" element={<SpotPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/transport" element={<TransportPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
