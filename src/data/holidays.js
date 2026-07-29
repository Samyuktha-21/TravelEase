// =====================================================
// TrailEase — Holiday Calendar for Crowd Prediction
// National + Tamil Nadu State + School Vacations +
// Ooty-specific events with crowd multipliers
// =====================================================

// Crowd multiplier: how much this holiday inflates normal crowd
// 1.0 = normal day, 2.0 = double crowd, 3.0 = triple

export const HOLIDAYS_2025 = [
  // === NATIONAL HOLIDAYS ===
  { date: '2025-01-01', name: 'New Year\'s Day', type: 'national', multiplier: 1.5 },
  { date: '2025-01-14', name: 'Pongal (Day 1)', type: 'state', multiplier: 2.2 },
  { date: '2025-01-15', name: 'Pongal (Day 2 - Mattu Pongal)', type: 'state', multiplier: 2.5 },
  { date: '2025-01-16', name: 'Pongal (Day 3)', type: 'state', multiplier: 2.3 },
  { date: '2025-01-17', name: 'Pongal (Day 4)', type: 'state', multiplier: 2.0 },
  { date: '2025-01-26', name: 'Republic Day', type: 'national', multiplier: 2.0 },
  { date: '2025-02-26', name: 'Maha Shivaratri', type: 'national', multiplier: 1.3 },
  { date: '2025-03-14', name: 'Holi', type: 'national', multiplier: 1.8 },
  { date: '2025-03-31', name: 'Id-ul-Fitr', type: 'national', multiplier: 1.5 },
  { date: '2025-04-10', name: 'Mahavir Jayanti', type: 'national', multiplier: 1.3 },
  { date: '2025-04-14', name: 'Tamil New Year (Puthandu)', type: 'state', multiplier: 2.0 },
  { date: '2025-04-18', name: 'Good Friday', type: 'national', multiplier: 1.8 },
  { date: '2025-05-01', name: 'May Day', type: 'state', multiplier: 1.5 },
  { date: '2025-05-12', name: 'Buddha Purnima', type: 'national', multiplier: 1.3 },
  { date: '2025-08-15', name: 'Independence Day', type: 'national', multiplier: 2.2 },
  { date: '2025-10-02', name: 'Gandhi Jayanti / Dussehra', type: 'national', multiplier: 2.5 },
  { date: '2025-10-20', name: 'Diwali', type: 'national', multiplier: 2.8 },
  { date: '2025-10-21', name: 'Diwali (Day 2)', type: 'national', multiplier: 2.5 },
  { date: '2025-11-05', name: 'Guru Nanak Jayanti', type: 'national', multiplier: 1.3 },
  { date: '2025-12-25', name: 'Christmas', type: 'national', multiplier: 2.5 },
  { date: '2025-12-31', name: 'New Year\'s Eve', type: 'national', multiplier: 2.0 },
];

export const HOLIDAYS_2026 = [
  { date: '2026-01-01', name: 'New Year\'s Day', type: 'national', multiplier: 1.5 },
  { date: '2026-01-14', name: 'Pongal (Day 1)', type: 'state', multiplier: 2.2 },
  { date: '2026-01-15', name: 'Pongal (Day 2)', type: 'state', multiplier: 2.5 },
  { date: '2026-01-16', name: 'Pongal (Day 3)', type: 'state', multiplier: 2.3 },
  { date: '2026-01-17', name: 'Pongal (Day 4)', type: 'state', multiplier: 2.0 },
  { date: '2026-01-26', name: 'Republic Day', type: 'national', multiplier: 2.0 },
  { date: '2026-03-04', name: 'Holi', type: 'national', multiplier: 1.8 },
  { date: '2026-03-21', name: 'Id-ul-Fitr', type: 'national', multiplier: 1.5 },
  { date: '2026-03-26', name: 'Ram Navami', type: 'national', multiplier: 1.3 },
  { date: '2026-03-31', name: 'Mahavir Jayanti', type: 'national', multiplier: 1.3 },
  { date: '2026-04-03', name: 'Good Friday', type: 'national', multiplier: 1.8 },
  { date: '2026-04-14', name: 'Tamil New Year / Ambedkar Jayanti', type: 'state', multiplier: 2.0 },
  { date: '2026-05-01', name: 'May Day / Buddha Purnima', type: 'state', multiplier: 1.8 },
  { date: '2026-05-27', name: 'Id-ul-Zuha (Bakrid)', type: 'national', multiplier: 1.5 },
  { date: '2026-06-26', name: 'Muharram', type: 'national', multiplier: 1.2 },
  { date: '2026-08-15', name: 'Independence Day', type: 'national', multiplier: 2.2 },
  { date: '2026-10-02', name: 'Gandhi Jayanti', type: 'national', multiplier: 2.0 },
  { date: '2026-10-20', name: 'Dussehra', type: 'national', multiplier: 2.5 },
  { date: '2026-11-08', name: 'Diwali', type: 'national', multiplier: 2.8 },
  { date: '2026-11-09', name: 'Diwali (Day 2)', type: 'national', multiplier: 2.5 },
  { date: '2026-11-24', name: 'Guru Nanak Jayanti', type: 'national', multiplier: 1.3 },
  { date: '2026-12-25', name: 'Christmas', type: 'national', multiplier: 2.5 },
  { date: '2026-12-31', name: 'New Year\'s Eve', type: 'national', multiplier: 2.0 },
];

// School vacations create SUSTAINED high crowd over weeks
export const SCHOOL_VACATIONS = [
  { start: '2025-04-17', end: '2025-06-01', name: 'TN Summer Vacation', multiplier: 2.0 },
  { start: '2025-10-18', end: '2025-10-26', name: 'Diwali Break', multiplier: 2.2 },
  { start: '2025-12-20', end: '2026-01-02', name: 'Christmas/Winter Break', multiplier: 2.0 },
  { start: '2026-04-17', end: '2026-06-01', name: 'TN Summer Vacation', multiplier: 2.0 },
  { start: '2026-10-05', end: '2026-10-12', name: 'Dussehra Break', multiplier: 1.8 },
  { start: '2026-11-06', end: '2026-11-15', name: 'Diwali Break', multiplier: 2.2 },
  { start: '2026-12-20', end: '2027-01-02', name: 'Christmas/Winter Break', multiplier: 2.0 },
];

// Ooty-specific events that draw extra crowds
export const OOTY_EVENTS = [
  { start: '2025-05-15', end: '2025-05-30', name: 'Ooty Summer Festival', multiplier: 2.5 },
  { start: '2025-05-18', end: '2025-05-22', name: 'Annual Flower Show', multiplier: 3.0 },
  { start: '2026-05-15', end: '2026-05-30', name: 'Ooty Summer Festival', multiplier: 2.5 },
  { start: '2026-05-18', end: '2026-05-22', name: 'Annual Flower Show', multiplier: 3.0 },
  { start: '2025-01-18', end: '2025-01-26', name: 'Tea & Tourism Festival', multiplier: 1.8 },
  { start: '2026-01-18', end: '2026-01-26', name: 'Tea & Tourism Festival', multiplier: 1.8 },
];

/**
 * Get the holiday multiplier for a specific date
 * Returns the highest applicable multiplier (holidays stack to max, not sum)
 */
export function getHolidayMultiplier(dateStr) {
  const allHolidays = [...HOLIDAYS_2025, ...HOLIDAYS_2026];
  let maxMultiplier = 1.0;
  let holidayName = null;

  // Check specific date holidays
  for (const h of allHolidays) {
    if (h.date === dateStr && h.multiplier > maxMultiplier) {
      maxMultiplier = h.multiplier;
      holidayName = h.name;
    }
  }

  // Check school vacations
  for (const v of SCHOOL_VACATIONS) {
    if (dateStr >= v.start && dateStr <= v.end && v.multiplier > maxMultiplier) {
      maxMultiplier = v.multiplier;
      holidayName = v.name;
    }
  }

  // Check Ooty events
  for (const e of OOTY_EVENTS) {
    if (dateStr >= e.start && dateStr <= e.end && e.multiplier > maxMultiplier) {
      maxMultiplier = e.multiplier;
      holidayName = e.name;
    }
  }

  return { multiplier: maxMultiplier, name: holidayName };
}

/**
 * Get all holidays/events for a specific month
 */
export function getMonthEvents(year, month) {
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const allHolidays = [...HOLIDAYS_2025, ...HOLIDAYS_2026];
  const events = [];

  for (const h of allHolidays) {
    if (h.date.startsWith(prefix)) {
      events.push(h);
    }
  }

  for (const v of SCHOOL_VACATIONS) {
    if (v.start.startsWith(prefix) || v.end.startsWith(prefix)) {
      events.push({ ...v, type: 'vacation' });
    }
  }

  for (const e of OOTY_EVENTS) {
    if (e.start.startsWith(prefix) || e.end.startsWith(prefix)) {
      events.push({ ...e, type: 'event' });
    }
  }

  return events;
}
