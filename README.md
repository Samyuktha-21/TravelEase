<div align="center">
  <h1>🏔️ TravelEase: Smart Tourism Platform</h1>
  <p><strong>A Predictive Smart City Platform to Alleviate Tourist Overcrowding Across Major Destinations</strong></p>
  <a href="https://travel-ease.vercel.app/">View Live Demo</a>
</div>

<br />

## 📖 Overview

Popular tourist destinations—ranging from coastal beaches to iconic hill stations and heritage cities—attract millions of tourists annually. However, this massive influx frequently leads to severe traffic bottlenecks, long queues, and unsustainable overcrowding at major hotspots.

**TravelEase** is a scalable Smart Tourism web application designed to solve this universal problem. By predicting crowd density in real-time and suggesting alternative, less-crowded destinations, TravelEase helps tourists skip the queues, discover hidden gems, and enjoy a seamless vacation. The platform is designed to distribute the tourist load evenly across various locations, starting with our **pilot city: Ooty (Udhagamandalam)**.

## ✨ Key Features

- 📊 **Real-Time Crowd Prediction:** Hourly crowd density forecasts for major tourist spots using a custom heuristic algorithm.
- 🗺️ **Smart Discovery & Filters:** Filter spots by category (Gardens, Beaches, Viewpoints, Heritage) and sort by the least crowded locations right now.
- 🌤️ **Seasonal Weather Insights:** Monthly climate breakdowns to help tourists choose the best time to visit based on weather and historical crowd levels.
- 🚊 **Transport & Routing Guides:** Comprehensive guides on how to reach various destinations via Nearest Airports, Railways, and local transit.
- 🎨 **Premium UI/UX:** A modern, highly responsive Glassmorphism interface with smooth animations and dynamic charts.

## 🧠 The Prediction Model

Because live GPS tracking APIs are private and prohibitively expensive, TravelEase utilizes a **Multi-Factor Heuristic Scoring Algorithm** to simulate highly accurate crowd densities (0-100 score) for any mapped city. 

The algorithm calculates predictions in real-time based on 4 heavily weighted factors:
1. **Historical Popular Times (30%):** Baseline hourly patterns calibrated from historical footfall data of a location.
2. **Seasonal Factor (25%):** Adjustments for peak tourist months (e.g., Summer vacations, local festivals) and low seasons.
3. **Weather Impact (15%):** Crowd reduction logic during expected harsh weather (like heavy rainfall or extreme heat).
4. **Day of the Week (10%):** Mathematical surges applied to weekends and public holidays.

## 🛠️ Tech Stack

This project was built entirely from scratch without heavy UI frameworks to demonstrate complete control over custom styling and responsive design.

- **Frontend Core:** React 18, JavaScript (ES6+), HTML5
- **Styling:** Vanilla CSS3 (CSS Variables, Flexbox/Grid, Glassmorphism)
- **Build Tool:** Vite
- **Routing:** React Router DOM v7
- **Data Visualization:** Chart.js & react-chartjs-2

## 🚀 Getting Started

To run this project locally on your machine:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/Samyuktha-21/TravelEase.git
   cd "Smart cities"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **View the app**
   Open `http://localhost:5173` (or the port provided by Vite) in your browser.

## 📝 Acknowledgments

* Pilot data points regarding entry fees, timings, and historical annual visitors were sourced from regional tourism development boards (like TTDC).
* Icons provided by Lucide / Feather Icons.

---
<div align="center">
  <i>Designed & Built by Samyuktha</i>
</div>
