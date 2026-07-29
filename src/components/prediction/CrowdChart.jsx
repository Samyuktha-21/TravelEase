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
    if (d.score <= 30) return '#2DD4BF'; // Jungle Mint
    if (d.score <= 70) return '#F59E0B'; // Amber
    return '#FB7185'; // Warm Coral
  });

  const borderColors = hourlyData.map(d => {
    return d.hour === currentHour ? '#1E293B' : 'transparent';
  });

  const borderThickness = hourlyData.map(d => {
    return d.hour === currentHour ? 2 : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Crowd Level (%)',
        data: dataScores,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: borderThickness,
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll build a custom HTML legend instead
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleFont: { family: 'Outfit', size: 14 },
        bodyFont: { family: 'Outfit', size: 14 },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '%';
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#f1f5f9',
          drawBorder: false,
        },
        ticks: {
          font: { family: 'Outfit' },
          color: '#94a3b8'
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: 'Outfit' },
          color: '#94a3b8',
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return (
    <div className="crowd-chart-wrapper">
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{backgroundColor: '#2DD4BF'}}></span> Low
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{backgroundColor: '#F59E0B'}}></span> Moderate
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{backgroundColor: '#FB7185'}}></span> High
        </div>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CrowdChart;
