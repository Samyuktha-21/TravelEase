// =====================================================
// TrailEase — Crowd Prediction Engine
// Multi-factor weighted model combining:
// 1. Historical Popular Times patterns
// 2. Seasonal tourist volume
// 3. Weather conditions
// 4. Holidays & festivals
// 5. Day of week
// 6. Special Ooty events
// =====================================================

import { SPOTS } from './spots';
import { getHolidayMultiplier } from './holidays';
import { getSeasonalFactor, getWeatherCrowdImpact } from './weather';

// Weight configuration for the prediction model
const WEIGHTS = {
  popularTimes: 0.30,    // Historical hourly pattern
  seasonal: 0.25,        // Month-based seasonal factor
  weather: 0.15,         // Current/forecast weather
  holiday: 0.15,         // Holiday/festival multiplier
  dayOfWeek: 0.10,       // Weekday vs weekend
  specialEvent: 0.05,    // Ooty-specific events
};

// Day-of-week multipliers (baseline from Google Popular Times)
const DAY_MULTIPLIERS = {
  0: 1.35,  // Sunday — highest
  1: 0.75,  // Monday
  2: 0.65,  // Tuesday — lowest
  3: 0.70,  // Wednesday
  4: 0.72,  // Thursday
  5: 0.95,  // Friday — pre-weekend surge
  6: 1.30,  // Saturday
};

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

/**
 * Get the crowd score for a specific spot at a specific date & hour
 * Returns: { score: 0-100, level: 'low'|'moderate'|'high', factors: {} }
 */
export function getCrowdScore(spotId, date = new Date(), hour = null) {
  const spot = SPOTS.find(s => s.id === spotId);
  if (!spot) return { score: 0, level: 'low', factors: {} };

  const currentHour = hour !== null ? hour : date.getHours();
  const dayOfWeek = date.getDay();
  const dayName = DAY_NAMES[dayOfWeek];
  const month = date.getMonth() + 1;
  const dateStr = date.toISOString().split('T')[0];

  // === Factor 1: Historical Popular Times Pattern (0-100) ===
  const hourlyPattern = spot.hourlyPattern[dayName] || spot.hourlyPattern.monday;
  const popularTimesScore = hourlyPattern[currentHour] || 0;

  // === Factor 2: Seasonal Factor (0-1) ===
  const seasonalFactor = getSeasonalFactor(month);

  // === Factor 3: Weather Impact (0.3-1.3) ===
  // For now, use seasonal average; can be replaced with live API data
  const weatherImpact = getSimulatedWeatherImpact(month, currentHour);

  // === Factor 4: Holiday Multiplier (1.0-3.0) ===
  const { multiplier: holidayMultiplier, name: holidayName } = getHolidayMultiplier(dateStr);

  // === Factor 5: Day of Week Multiplier ===
  const dayMultiplier = DAY_MULTIPLIERS[dayOfWeek];

  // === Compute Weighted Score ===
  // Normalize each factor to 0-100 range, then weight
  const normalizedSeasonal = seasonalFactor * 100;
  const normalizedWeather = (weatherImpact / 1.3) * 100;
  const normalizedHoliday = Math.min(((holidayMultiplier - 1) / 2) * 100, 100);
  const normalizedDay = (dayMultiplier / 1.35) * 100;

  let rawScore =
    WEIGHTS.popularTimes * popularTimesScore +
    WEIGHTS.seasonal * normalizedSeasonal +
    WEIGHTS.weather * normalizedWeather +
    WEIGHTS.holiday * normalizedHoliday +
    WEIGHTS.dayOfWeek * normalizedDay;

  // Apply holiday multiplier as a boost on top
  if (holidayMultiplier > 1.0) {
    rawScore = rawScore * (1 + (holidayMultiplier - 1) * 0.5);
  }

  // Clamp to 0-100
  const score = Math.round(Math.min(100, Math.max(0, rawScore)));

  // Determine level
  let level = 'low';
  let color = '#2DD4BF'; // jungle mint
  let label = 'Low Crowd';
  if (score > 65) {
    level = 'high';
    color = '#FB7185'; // warm coral
    label = 'Very Crowded';
  } else if (score > 35) {
    level = 'moderate';
    color = '#FBBF24'; // amber
    label = 'Moderate';
  }

  return {
    score,
    level,
    color,
    label,
    factors: {
      popularTimes: Math.round(popularTimesScore),
      seasonal: Math.round(normalizedSeasonal),
      weather: Math.round(normalizedWeather),
      holiday: Math.round(normalizedHoliday),
      dayOfWeek: Math.round(normalizedDay),
      holidayName,
    },
  };
}

/**
 * Get crowd scores for all hours of a given day at a spot
 */
export function getHourlyCrowdScores(spotId, date = new Date()) {
  const scores = [];
  for (let hour = 0; hour < 24; hour++) {
    const result = getCrowdScore(spotId, date, hour);
    scores.push({
      hour,
      timeLabel: `${hour.toString().padStart(2, '0')}:00`,
      ...result,
    });
  }
  return scores;
}

/**
 * Get crowd scores for each day of the current week
 */
export function getWeeklyCrowdScores(spotId, peakHour = 11) {
  const today = new Date();
  const scores = [];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const result = getCrowdScore(spotId, day, peakHour);
    scores.push({
      day: DAY_NAMES[i].charAt(0).toUpperCase() + DAY_NAMES[i].slice(1, 3),
      fullDay: DAY_NAMES[i],
      date: day.toISOString().split('T')[0],
      isToday: day.toDateString() === today.toDateString(),
      ...result,
    });
  }
  return scores;
}

/**
 * Get the best time to visit a spot today
 */
export function getBestTimeToVisit(spotId, date = new Date()) {
  const hourlyScores = getHourlyCrowdScores(spotId, date);
  // Filter to only operating hours (6 AM - 8 PM)
  const operatingHours = hourlyScores.filter(s => s.hour >= 6 && s.hour <= 20 && s.score > 0);
  
  if (operatingHours.length === 0) return null;
  
  // Find the hour with the lowest crowd score
  const bestHour = operatingHours.reduce((min, s) => s.score < min.score ? s : min);
  return bestHour;
}

/**
 * Get alternative spots sorted by current crowd level (lowest first)
 */
export function getAlternatives(currentSpotId, date = new Date(), hour = null) {
  const currentHour = hour !== null ? hour : date.getHours();
  return SPOTS
    .filter(s => s.id !== currentSpotId)
    .map(s => ({
      ...s,
      crowd: getCrowdScore(s.id, date, currentHour),
    }))
    .sort((a, b) => a.crowd.score - b.crowd.score)
    .slice(0, 4);
}

/**
 * Get all spots with current crowd levels, sorted by crowd
 */
export function getAllSpotsWithCrowd(date = new Date(), hour = null) {
  const currentHour = hour !== null ? hour : date.getHours();
  return SPOTS.map(s => ({
    ...s,
    crowd: getCrowdScore(s.id, date, currentHour),
  }));
}

/**
 * Simulated weather impact based on monthly averages
 * In production, this would call OpenWeatherMap API
 */
function getSimulatedWeatherImpact(month, hour) {
  // Monsoon months get rain penalty
  const monthlyRainChance = [0.1, 0.08, 0.15, 0.3, 0.4, 0.55, 0.65, 0.6, 0.5, 0.5, 0.3, 0.12];
  const rainChance = monthlyRainChance[month - 1] || 0.2;

  // Afternoon rain is more common in hills
  const hourAdjust = (hour >= 14 && hour <= 18) ? 1.3 : 1.0;
  const effectiveRainChance = Math.min(rainChance * hourAdjust, 0.8);

  // If rain is likely, reduce crowd impact
  if (effectiveRainChance > 0.5) return 0.6;
  if (effectiveRainChance > 0.3) return 0.85;
  return 1.15; // Clear weather boosts crowd
}
