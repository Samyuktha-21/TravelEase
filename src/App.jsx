import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import SpotPage from './pages/SpotPage';
import WeatherPage from './pages/WeatherPage';
import TransportPage from './pages/TransportPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/spot/:spotId" element={<SpotPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/transport" element={<TransportPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
