<div align="center">
  <h1>🏔️ TravelEase: Smart Tourism for Ooty</h1>
  <p><strong>A Predictive Smart City Platform to Alleviate Tourist Overcrowding</strong></p>
  <a href="https://travel-ease.vercel.app/">View Live Demo</a>
</div>

<br />

## 📖 Overview

Ooty (Udhagamandalam) is one of India's most iconic hill stations, attracting millions of tourists annually. However, this massive influx leads to severe traffic bottlenecks and overcrowding at popular spots like the Botanical Garden and Doddabetta Peak.

**TravelEase** is a Smart Tourism web application designed to solve this problem. By predicting crowd density in real-time and suggesting alternative, less-crowded destinations, TravelEase helps tourists skip the queues, discover hidden gems, and enjoy a seamless vacation while distributing the tourist load evenly across the city.

## ✨ Key Features

- 📊 **Real-Time Crowd Prediction:** Hourly crowd density forecasts for major tourist spots using a custom heuristic algorithm.
- 🗺️ **Smart Discovery & Filters:** Filter spots by category (Gardens, Lakes, Viewpoints) and sort by the least crowded locations right now.
- 🌤️ **Seasonal Weather Insights:** Monthly climate breakdowns to help tourists choose the best time to visit based on weather and crowd levels.
- 🚊 **Transport & Routing Guides:** Comprehensive guides on how to reach Ooty via Nearest Airports, Railways, and the famous Nilgiri Mountain Railway (Toy Train).
- 🎨 **Premium UI/UX:** A modern, highly responsive Glassmorphism interface with smooth animations and dynamic charts.

## 🧠 The Prediction Model

Because live GPS tracking APIs are private and prohibitively expensive, TravelEase utilizes a **Multi-Factor Heuristic Scoring Algorithm** to simulate highly accurate crowd densities (0-100 score). 

The algorithm calculates predictions in real-time based on 4 heavily weighted factors:
1. **Historical Popular Times (30%):** Baseline hourly patterns calibrated from historical footfall data.
2. **Seasonal Factor (25%):** Adjustments for peak tourist months (e.g., May Flower Show) and low seasons (Monsoon).
3. **Weather Impact (15%):** Crowd reduction logic during expected afternoon showers.
4. **Day of the Week (10%):** Mathematical surges applied to weekends (Saturday/Sunday).

## 🛠️ Tech Stack

This project was built entirely from scratch without heavy UI frameworks (like Bootstrap or Tailwind) to demonstrate complete control over custom styling and responsive design.

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

## 📁 Project Structure

```
├── public/
│   └── spots/           # Local tourist spot imagery
├── src/
│   ├── components/      # Reusable UI components (Navbar, SpotCards, Charts)
│   ├── config/          # Global application config
│   ├── data/            # Local JSON databases & the Crowd Prediction Algorithm
│   ├── pages/           # Main route views (Home, Explore, SpotPage, etc.)
│   ├── App.jsx          # Root component and Routing logic
│   └── index.css        # Global variables and base styling
└── package.json
```

## 📝 Acknowledgments

* Data points regarding entry fees, timings, and historical annual visitors were sourced from Tamil Nadu Tourism Development Corporation (TTDC) guidelines.
* Icons provided by Lucide / Feather Icons.

---
<div align="center">
  <i>Designed & Built by Samyuktha</i>
</div>
