// =====================================================
// TrailEase — Transport Routes to Ooty
// Train, Bus, Flight routes from major cities
// =====================================================

export const TRANSPORT_ROUTES = {
  cities: [
    {
      id: 'coimbatore',
      name: 'Coimbatore',
      distance: '85 km',
      routes: [
        {
          mode: 'car',
          icon: '🚗',
          duration: '3-4 hours',
          cost: '₹1,500-2,500 (taxi)',
          description: 'Scenic drive through Nilgiri ghat roads. Most popular route via Coonoor or Kalhatti.',
          frequency: 'Anytime',
          tips: 'Road can be foggy after 6 PM. Hairpin bends require experienced drivers.',
        },
        {
          mode: 'bus',
          icon: '🚌',
          duration: '3.5-4 hours',
          cost: '₹80-180',
          description: 'TNSTC government buses run every 30 min. Private Volvos also available.',
          frequency: 'Every 30 min',
          tips: 'First bus at 5:30 AM. Book window seat on the left for valley views.',
        },
        {
          mode: 'train',
          icon: '🚂',
          duration: '5 hours (Toy Train)',
          cost: '₹30-600',
          description: 'Nilgiri Mountain Railway (UNESCO Heritage) from Mettupalayam → Ooty via Coonoor.',
          frequency: '2-3 daily',
          tips: 'Book on IRCTC 2-3 months ahead. Right-side seats for best views. Don\'t miss it!',
          highlight: true,
        },
      ],
    },
    {
      id: 'bangalore',
      name: 'Bangalore',
      distance: '280 km',
      routes: [
        {
          mode: 'car',
          icon: '🚗',
          duration: '6-7 hours',
          cost: '₹4,000-6,000 (taxi)',
          description: 'Via Mysore-Bandipur-Gudalur route. Passes through Bandipur Tiger Reserve.',
          frequency: 'Anytime',
          tips: 'Bandipur forest gate closes 9 PM-6 AM. Plan timing accordingly.',
        },
        {
          mode: 'bus',
          icon: '🚌',
          duration: '7-8 hours',
          cost: '₹400-1,200',
          description: 'KSRTC and private sleeper buses. Overnight options available.',
          frequency: '10+ daily',
          tips: 'Overnight buses arrive early morning — great for maximizing your first day.',
        },
        {
          mode: 'flight',
          icon: '✈️',
          duration: '1 hr flight + 3 hr drive',
          cost: '₹2,500-5,000 (flight) + ₹1,500 (taxi)',
          description: 'Fly to Coimbatore (CJB) then taxi/bus to Ooty. Fastest overall option.',
          frequency: '15+ daily flights',
          tips: 'Book Coimbatore flights early. Pre-arrange taxi from airport.',
        },
      ],
    },
    {
      id: 'chennai',
      name: 'Chennai',
      distance: '560 km',
      routes: [
        {
          mode: 'train',
          icon: '🚂',
          duration: '7-8 hrs to Coimbatore + 4 hrs to Ooty',
          cost: '₹350-1,500 (train) + ₹80-180 (bus)',
          description: 'Shatabdi/Intercity Express to Coimbatore, then bus/taxi to Ooty.',
          frequency: '5+ daily trains',
          tips: 'Shatabdi Express departs 6:15 AM, reaches Coimbatore by 1:15 PM. Connect to Ooty bus.',
        },
        {
          mode: 'flight',
          icon: '✈️',
          duration: '1 hr flight + 3 hr drive',
          cost: '₹3,000-7,000 (flight) + ₹1,500 (taxi)',
          description: 'Fly to Coimbatore International Airport, then drive up to Ooty.',
          frequency: '20+ daily flights',
          tips: 'Morning flights let you reach Ooty by afternoon. Book return flights from CJB.',
        },
        {
          mode: 'bus',
          icon: '🚌',
          duration: '11-12 hours',
          cost: '₹600-1,500',
          description: 'Overnight sleeper buses. Comfortable but long journey.',
          frequency: '5+ daily',
          tips: 'Board the 8-9 PM bus — arrive early morning fresh in Ooty.',
        },
      ],
    },
    {
      id: 'mysore',
      name: 'Mysore',
      distance: '160 km',
      routes: [
        {
          mode: 'car',
          icon: '🚗',
          duration: '4-5 hours',
          cost: '₹2,500-4,000 (taxi)',
          description: 'Via Bandipur National Park. One of the most scenic drives in South India.',
          frequency: 'Anytime (forest gate timings apply)',
          tips: 'You might spot elephants and deer on the Bandipur stretch! Keep cameras ready.',
        },
        {
          mode: 'bus',
          icon: '🚌',
          duration: '5-6 hours',
          cost: '₹200-500',
          description: 'KSRTC buses via Gundlupet and Gudalur. Limited direct services.',
          frequency: '3-4 daily',
          tips: 'Morning buses are more reliable. The route passes through beautiful forest areas.',
        },
      ],
    },
  ],
};

export const NEAREST_AIRPORT = {
  name: 'Coimbatore International Airport',
  code: 'CJB',
  distance: '88 km from Ooty',
  driveTime: '3-3.5 hours',
};

export const NEAREST_RAILWAY = {
  name: 'Mettupalayam Railway Station',
  code: 'MTP',
  distance: '50 km from Ooty',
  connection: 'Nilgiri Mountain Railway (Toy Train)',
  mainJunction: 'Coimbatore Junction (CBE) — 35 km from MTP',
};
