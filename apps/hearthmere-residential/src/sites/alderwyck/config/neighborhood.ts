import { NeighborhoodSection } from '@hearthmere/config';

// All place names, distances, and mobility scores below are fictional and illustrative.
export const neighborhoodSections: NeighborhoodSection[] = [
  {
    id: 'shopping',
    name: 'Shopping & Dining',
    icon: 'utensils',
    description:
      'Illustrative everyday destinations along Lantern Walk and nearby neighborhood streets',
    pois: [
      {
        name: 'Lantern Walk Market Hall',
        distance: '0.8 mi',
        type: 'Shopping Center',
      },
      { name: 'Neighborhood Grocery', distance: '1.5 mi', type: 'Grocery' },
      { name: 'Lantern Cup Cafe', distance: '0.5 mi', type: 'Coffee' },
      { name: 'Courtyard Kitchen', distance: '1.0 mi', type: 'Dining' },
      { name: 'Lantern Walk Shops', distance: '0.2 mi', type: 'Shopping' },
    ],
  },
  {
    id: 'transit',
    name: 'Transportation',
    icon: 'bus',
    description:
      'Illustrative connections to local transit, neighborhood routes, and Example City destinations',
    pois: [
      {
        name: 'Lantern Walk Transit Stop',
        distance: '0.1 mi',
        type: 'Bus Stop',
      },
      { name: 'North Connector', distance: '0.3 mi', type: 'Local Route' },
      { name: 'Garden Parkway', distance: '0.5 mi', type: 'Parkway' },
      { name: 'Example City Center', distance: '4 mi', type: 'Destination' },
      { name: 'Regional Travel Hub', distance: '25 mi', type: 'Travel' },
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
        distance: '1.2 mi',
        type: 'Learning Center',
      },
      { name: 'Neighborhood Library', distance: '3.5 mi', type: 'Library' },
      {
        name: 'Skills Workshop',
        distance: '0.5 mi',
        type: 'Continuing Education',
      },
      { name: 'Youth Study Hub', distance: '3 mi', type: 'Study Center' },
    ],
  },
  {
    id: 'recreation',
    name: 'Parks & Recreation',
    icon: 'tree',
    description:
      'Illustrative green spaces and recreation destinations around Lantern Walk',
    pois: [
      { name: 'Lantern Green', distance: '0.8 mi', type: 'Park' },
      { name: 'Courtyard Park', distance: '1.5 mi', type: 'Park' },
      { name: 'Meadow Pocket Park', distance: '3 mi', type: 'Park' },
      { name: 'Community Recreation Hall', distance: '3.5 mi', type: 'Recreation' },
      { name: 'Garden Loop Trail', distance: '2 mi', type: 'Trail' },
    ],
  },
];

export const walkScore = {
  walk: 62,
  transit: 44,
  bike: 58,
};
