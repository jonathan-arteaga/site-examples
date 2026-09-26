import { NeighborhoodSection } from '@hearthmere/config';

// All place names, distances, and mobility scores below are fictional and illustrative.
export const neighborhoodSections: NeighborhoodSection[] = [
  {
    id: 'shopping',
    name: 'Shopping & Dining',
    icon: 'utensils',
    description:
      'Illustrative shopping, dining, and daily conveniences around Foundry Row',
    pois: [
      {
        name: 'Foundry Row Market Hall',
        distance: '0.5 mi',
        type: 'Shopping',
      },
      { name: 'Corner Pantry', distance: '0.3 mi', type: 'Grocery' },
      { name: 'Foundry Shops', distance: '0.5 mi', type: 'Shopping' },
      { name: 'Neighborhood Grocery', distance: '0.8 mi', type: 'Grocery' },
      { name: 'Rowhouse Cafe', distance: 'Nearby', type: 'Dining' },
    ],
  },
  {
    id: 'transit',
    name: 'Transportation',
    icon: 'bus',
    description:
      'Illustrative connections to neighborhood transit and Example Heights destinations',
    pois: [
      {
        name: 'Foundry Row Transit Stop',
        distance: '1.0 mi',
        type: 'Transit',
      },
      { name: 'East Connector', distance: '0.5 mi', type: 'Local Route' },
      { name: 'Heights Parkway', distance: '1.5 mi', type: 'Parkway' },
      { name: 'Example Heights Center', distance: '15 min', type: 'Destination' },
      { name: 'Regional Travel Hub', distance: '15 min', type: 'Travel' },
    ],
  },
  {
    id: 'education',
    name: 'Learning & Libraries',
    icon: 'book',
    description:
      'Fictional learning, library, and study destinations used for this portfolio showcase',
    pois: [
      {
        name: 'Community Learning Center',
        distance: '3 mi',
        type: 'Learning Center',
      },
      { name: 'Neighborhood Library', distance: '5 mi', type: 'Library' },
      { name: 'Skills Studio', distance: '4 mi', type: 'Continuing Education' },
      { name: 'Youth Study Hub', distance: 'Nearby', type: 'Study Center' },
    ],
  },
  {
    id: 'recreation',
    name: 'Parks & Recreation',
    icon: 'tree',
    description:
      'Illustrative parks, trails, and shared recreation spaces near Foundry Row',
    pois: [
      { name: 'Foundry Green', distance: '1.5 mi', type: 'Park' },
      { name: 'Rowhouse Park', distance: '1 mi', type: 'Park' },
      { name: 'Community Arts Hall', distance: '2 mi', type: 'Arts' },
      { name: 'Heights Meadow', distance: '10 min', type: 'Park' },
      { name: 'Garden Walk', distance: '3 mi', type: 'Trail' },
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'heart',
    description:
      'Illustrative wellness and care destinations for this fictional neighborhood',
    pois: [
      { name: 'Community Wellness Center', distance: '1.4 mi', type: 'Wellness' },
      { name: 'Neighborhood Clinic', distance: '3 mi', type: 'Clinic' },
      { name: 'Care Services Hub', distance: 'Nearby', type: 'Health Services' },
    ],
  },
];

export const walkScore = {
  walk: 55,
  transit: 31,
  bike: 46,
};
