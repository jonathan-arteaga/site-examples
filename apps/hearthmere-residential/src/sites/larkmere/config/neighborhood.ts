import { NeighborhoodSection } from '@hearthmere/config';

// All place names, distances, and mobility scores below are fictional and illustrative.
export const neighborhoodSections: NeighborhoodSection[] = [
  {
    id: 'shopping',
    name: 'Shopping & Dining',
    icon: 'utensils',
    description:
      'Illustrative shopping, dining, and daily conveniences around Garden Terrace',
    pois: [
      { name: 'Garden Terrace Market', distance: '2.0 mi', type: 'Grocery' },
      {
        name: 'Neighborhood Grocery',
        distance: '2.5 mi',
        type: 'Grocery',
      },
      {
        name: 'Terrace Shops',
        distance: '4.5 mi',
        type: 'Shopping',
      },
      { name: 'Garden Cafe Row', distance: '1.5 mi', type: 'Dining' },
      { name: 'Corner Pantry', distance: '0.5 mi', type: 'Convenience' },
    ],
  },
  {
    id: 'transit',
    name: 'Transportation',
    icon: 'bus',
    description:
      'Illustrative connections to local transit, neighborhood routes, and Demo City destinations',
    pois: [
      {
        name: 'Garden Terrace Transit Stop',
        distance: '0.3 mi',
        type: 'Bus Stop',
      },
      { name: 'South Connector', distance: '2.0 mi', type: 'Local Route' },
      {
        name: 'Garden Parkway',
        distance: '2.5 mi',
        type: 'Parkway',
      },
      { name: 'Demo City Center', distance: '5 mi', type: 'Destination' },
      {
        name: 'Regional Travel Hub',
        distance: '10 mi',
        type: 'Travel',
      },
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
        name: 'Learning Commons',
        distance: '6 mi',
        type: 'Learning Center',
      },
      { name: 'Community Library', distance: '4 mi', type: 'Library' },
      {
        name: 'Skills Studio',
        distance: '0.5 mi',
        type: 'Continuing Education',
      },
      {
        name: 'Study Garden',
        distance: '2 mi',
        type: 'Community',
      },
    ],
  },
  {
    id: 'recreation',
    name: 'Parks & Recreation',
    icon: 'tree',
    description:
      'Illustrative parks, trails, and recreation destinations around Garden Terrace',
    pois: [
      { name: 'Terrace Green', distance: '1.5 mi', type: 'Park' },
      { name: 'Larkmere Meadow', distance: '3 mi', type: 'Park' },
      { name: 'Garden Recreation Hall', distance: '8 mi', type: 'Recreation' },
      { name: 'Creekside Trail', distance: '4 mi', type: 'Trail' },
      { name: 'Community Arts Pavilion', distance: '5 mi', type: 'Arts' },
    ],
  },
];

export const walkScore = {
  walk: 40,
  transit: 22,
  bike: 49,
};
