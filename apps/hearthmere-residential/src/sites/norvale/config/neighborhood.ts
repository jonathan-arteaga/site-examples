import { NeighborhoodSection, WalkScore } from '@hearthmere/config';

// All place names, distances, and mobility scores below are fictional and illustrative.
export const neighborhoodSections: NeighborhoodSection[] = [
  {
    id: 'shopping',
    name: 'Shopping & Dining',
    icon: 'utensils',
    description:
      'Illustrative shopping, dining, and daily conveniences around Juniper Loop',
    pois: [
      {
        name: 'Juniper Market Hall',
        distance: '0.5 mi',
        type: 'Shopping Center',
      },
      { name: 'Corner Pantry', distance: '1.0 mi', type: 'Grocery' },
      { name: 'Commons Grocery', distance: '1.5 mi', type: 'Grocery' },
      { name: 'Loopside Cafe Row', distance: '0.3 mi', type: 'Dining' },
      { name: 'Juniper Shops', distance: '2.0 mi', type: 'Shopping' },
    ],
  },
  {
    id: 'transit',
    name: 'Transportation',
    icon: 'bus',
    description:
      'Illustrative connections to neighborhood transit and Sample City destinations',
    pois: [
      {
        name: 'Juniper Loop Transit Stop',
        distance: '0.3 mi',
        type: 'Bus Stop',
      },
      { name: 'East Connector', distance: '1.0 mi', type: 'Local Route' },
      { name: 'Commons Parkway', distance: '0.5 mi', type: 'Parkway' },
      { name: 'Regional Travel Hub', distance: '5 mi', type: 'Travel' },
      { name: 'Sample City Center', distance: '14 mi', type: 'Destination' },
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
        name: 'Commons Learning Center',
        distance: '6 mi',
        type: 'Learning Center',
      },
      { name: 'Community Library', distance: '4 mi', type: 'Library' },
      {
        name: 'Skills Studio',
        distance: '0.5 mi',
        type: 'Continuing Education',
      },
      { name: 'Study Commons', distance: '8 mi', type: 'Study Center' },
    ],
  },
  {
    id: 'recreation',
    name: 'Parks & Recreation',
    icon: 'tree',
    description:
      'Illustrative parks, trails, and shared outdoor spaces near Juniper Loop',
    pois: [
      { name: 'Juniper Meadow', distance: '4 mi', type: 'Park' },
      { name: 'Commons Recreation Field', distance: '3 mi', type: 'Sports' },
      { name: 'Loopside Park', distance: '2 mi', type: 'Park' },
      { name: 'Community Garden', distance: '6 mi', type: 'Garden' },
      { name: 'Greenway Trailhead', distance: '5 mi', type: 'Trail' },
    ],
  },
];

export const walkScore: WalkScore = {
  walk: 47,
  transit: 29,
  bike: 53,
};
