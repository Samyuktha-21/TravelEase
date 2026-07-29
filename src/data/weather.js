// =====================================================
// TrailEase — Ooty Weather Data & Patterns
// Monthly climate data calibrated from WeatherSpark,
// IMD records, and tourism.gov.in reports
// =====================================================

// Month-wise average climate data for Ooty
export const MONTHLY_CLIMATE = [
  {
    month: 1, name: 'January',
    tempHigh: 19, tempLow: 5, avgTemp: 12,
    rainfallMm: 15, rainyDays: 2, humidity: 68,
    cloudCover: 40, uvIndex: 6,
    season: 'winter', touristSeason: 'moderate',
    crowdFactor: 0.55, // 0-1 seasonal crowd factor
    description: 'Crisp winter mornings with possible frost. Clear skies and stunning mountain views.',
    icon: '❄️',
  },
  {
    month: 2, name: 'February',
    tempHigh: 21, tempLow: 6, avgTemp: 13,
    rainfallMm: 10, rainyDays: 1, humidity: 62,
    cloudCover: 35, uvIndex: 7,
    season: 'winter', touristSeason: 'moderate',
    crowdFactor: 0.50,
    description: 'Pleasant and dry. Great for trekking and outdoor activities. Warming up gradually.',
    icon: '🌤️',
  },
  {
    month: 3, name: 'March',
    tempHigh: 23, tempLow: 9, avgTemp: 16,
    rainfallMm: 20, rainyDays: 3, humidity: 58,
    cloudCover: 38, uvIndex: 8,
    season: 'summer', touristSeason: 'high',
    crowdFactor: 0.70,
    description: 'The start of tourist season. Warm days, cool evenings. Flowers begin to bloom.',
    icon: '🌸',
  },
  {
    month: 4, name: 'April',
    tempHigh: 25, tempLow: 11, avgTemp: 18,
    rainfallMm: 55, rainyDays: 7, humidity: 65,
    cloudCover: 50, uvIndex: 9,
    season: 'summer', touristSeason: 'peak',
    crowdFactor: 0.88,
    description: 'Peak season begins! School vacations bring families. Book accommodations early.',
    icon: '☀️',
  },
  {
    month: 5, name: 'May',
    tempHigh: 24, tempLow: 12, avgTemp: 18,
    rainfallMm: 90, rainyDays: 10, humidity: 72,
    cloudCover: 58, uvIndex: 8,
    season: 'summer', touristSeason: 'peak',
    crowdFactor: 0.95, // Highest — Flower Show + Summer Festival + School Vacation
    description: 'BUSIEST month. Summer Festival & Flower Show draw massive crowds. Expect queues.',
    icon: '🌺',
  },
  {
    month: 6, name: 'June',
    tempHigh: 21, tempLow: 12, avgTemp: 16,
    rainfallMm: 120, rainyDays: 15, humidity: 82,
    cloudCover: 72, uvIndex: 5,
    season: 'monsoon', touristSeason: 'low',
    crowdFactor: 0.35,
    description: 'Monsoon arrives. Heavy rainfall but the landscape turns brilliantly green.',
    icon: '🌧️',
  },
  {
    month: 7, name: 'July',
    tempHigh: 19, tempLow: 11, avgTemp: 15,
    rainfallMm: 130, rainyDays: 18, humidity: 88,
    cloudCover: 80, uvIndex: 4,
    season: 'monsoon', touristSeason: 'low',
    crowdFactor: 0.25,
    description: 'Peak monsoon. Waterfalls at their best but outdoor activities limited.',
    icon: '⛈️',
  },
  {
    month: 8, name: 'August',
    tempHigh: 19, tempLow: 11, avgTemp: 15,
    rainfallMm: 110, rainyDays: 16, humidity: 86,
    cloudCover: 78, uvIndex: 4,
    season: 'monsoon', touristSeason: 'low',
    crowdFactor: 0.28,
    description: 'Continued rains. Misty atmosphere. Budget travelers can find great deals.',
    icon: '🌦️',
  },
  {
    month: 9, name: 'September',
    tempHigh: 20, tempLow: 11, avgTemp: 15,
    rainfallMm: 95, rainyDays: 12, humidity: 82,
    cloudCover: 68, uvIndex: 5,
    season: 'monsoon', touristSeason: 'low',
    crowdFactor: 0.32,
    description: 'Monsoon retreat begins. Occasional sunny spells between showers.',
    icon: '🌥️',
  },
  {
    month: 10, name: 'October',
    tempHigh: 21, tempLow: 10, avgTemp: 15,
    rainfallMm: 120, rainyDays: 14, humidity: 80,
    cloudCover: 65, uvIndex: 5,
    season: 'post-monsoon', touristSeason: 'moderate',
    crowdFactor: 0.50,
    description: 'Post-monsoon. Dussehra brings a moderate crowd surge. Lush green everywhere.',
    icon: '🍂',
  },
  {
    month: 11, name: 'November',
    tempHigh: 20, tempLow: 8, avgTemp: 14,
    rainfallMm: 55, rainyDays: 7, humidity: 74,
    cloudCover: 50, uvIndex: 5,
    season: 'post-monsoon', touristSeason: 'moderate',
    crowdFactor: 0.52,
    description: 'Cooling down. Misty mornings return. Diwali can cause a crowd spike.',
    icon: '🌫️',
  },
  {
    month: 12, name: 'December',
    tempHigh: 19, tempLow: 6, avgTemp: 12,
    rainfallMm: 25, rainyDays: 3, humidity: 70,
    cloudCover: 42, uvIndex: 5,
    season: 'winter', touristSeason: 'high',
    crowdFactor: 0.72,
    description: 'Christmas & New Year bring families. Cold mornings with clear, starry nights.',
    icon: '🎄',
  },
];

/**
 * Get weather impact on crowd: clear sunny day = more tourists, rainy = fewer
 * Returns a multiplier: 0.5 (heavy rain = half crowd) to 1.3 (perfect weather = 30% more)
 */
export function getWeatherCrowdImpact(weatherCondition, temperature) {
  const impacts = {
    'clear': 1.25,
    'sunny': 1.25,
    'partly-cloudy': 1.1,
    'cloudy': 0.95,
    'overcast': 0.85,
    'light-rain': 0.7,
    'rain': 0.55,
    'heavy-rain': 0.4,
    'thunderstorm': 0.3,
    'fog': 0.75,
    'mist': 0.8,
  };

  let impact = impacts[weatherCondition] || 1.0;

  // Temperature adjustment: ideal range is 15-22°C for Ooty
  if (temperature >= 15 && temperature <= 22) {
    impact *= 1.1; // Perfect weather bonus
  } else if (temperature < 8 || temperature > 28) {
    impact *= 0.85; // Extreme temp penalty
  }

  return Math.round(impact * 100) / 100;
}

/**
 * Get the seasonal crowd factor for a given date
 */
export function getSeasonalFactor(month) {
  return MONTHLY_CLIMATE[month - 1]?.crowdFactor || 0.5;
}

export function getMonthData(month) {
  return MONTHLY_CLIMATE[month - 1] || MONTHLY_CLIMATE[0];
}
