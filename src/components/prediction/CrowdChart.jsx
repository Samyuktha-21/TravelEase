import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getHourlyCrowdScores } from '../../data/crowdModel';
import './CrowdChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CrowdChart = ({ spotId }) => {
  const hourlyData = getHourlyCrowdScores(spotId);
  const currentHour = new Date().getHours();

  const labels = hourlyData.map(d => `${d.hour}:00`);
  const dataScores = hourlyData.map(d => d.score);

  const backgroundColors = hourlyData.map(d => {
    if (d.score <= 30) return '#4ADE80'; // Low crowd green
    if (d.score <= 70) return '#F59E0B'; // Moderate amber
    return '#D2691E'; // Trailhead signature terracotta surge
  });

  const borderColors = hourlyData.map(d => {
    return d.hour === currentHour ? '#EFEDE6' : 'transparent';
  });

  const borderThickness = hourlyData.map(d => {
    return d.hour === currentHour ? 2 : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Crowd Density (%)',
        data: dataScores,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: borderThickness,
        borderRadius: 2,
        barPercentage: 0.75,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1C1C1C',
        borderColor: 'rgba(216, 211, 200, 0.25)',
        borderWidth: 1,
        titleFont: { family: 'IBM Plex Mono', size: 12 },
        bodyFont: { family: 'IBM Plex Mono', size: 12 },
        titleColor: '#EFEDE6',
        bodyColor: '#A5A59A',
        padding: 10,
        cornerRadius: 2,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Density: ${context.parsed.y}%`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(216, 211, 200, 0.08)',
          drawBorder: false,
        },
        ticks: {
          font: { family: 'IBM Plex Mono', size: 10 },
          color: '#A5A59A',
          callback: (value) => `${value}%`
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: 'IBM Plex Mono', size: 10 },
          color: '#A5A59A',
        }
      }
    }
  };

  return (
    <div className="crowd-chart-wrapper">
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#4ADE80' }}></span>
          <span>Low (0–30%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#F59E0B' }}></span>
          <span>Moderate (31–70%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#D2691E' }}></span>
          <span>Peak Surge (&gt;70%)</span>
        </div>
        <div className="legend-item" style={{ marginLeft: 'auto' }}>
          <span className="current-hour-indicator">CURRENT HOUR</span>
        </div>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CrowdChart;