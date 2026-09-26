import type { MockListingCollection } from './types/listing';

/**
 * Local, fictional inventory used only to demonstrate listing-card behavior.
 * These values are never fetched, synchronized, or presented as real inventory.
 */
export const MOCK_LISTINGS = {
  'alderwyck-apartments': [
    {
      id: 'alderwyck-a101',
      unit: 'Demo A101',
      floorPlan: 'The Alder',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 720,
      monthlyRent: 1245,
      availability: 'Demo availability: immediate',
    },
    {
      id: 'alderwyck-b204',
      unit: 'Demo B204',
      floorPlan: 'The Wyck',
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 820,
      monthlyRent: 1495,
      availability: 'Demo availability: upcoming',
    },
  ],
  'caldridge-townhomes': [
    {
      id: 'caldridge-t12',
      unit: 'Demo T12',
      floorPlan: 'The Caldridge',
      bedrooms: 2,
      bathrooms: 1.5,
      squareFeet: 1280,
      monthlyRent: 1695,
      availability: 'Demo availability: immediate',
    },
    {
      id: 'caldridge-t18',
      unit: 'Demo T18',
      floorPlan: 'The Ridgeline',
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 1510,
      monthlyRent: 1995,
      availability: 'Demo availability: upcoming',
    },
  ],
  'larkmere-gardens': [
    {
      id: 'larkmere-c103',
      unit: 'Demo C103',
      floorPlan: 'The Lark',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 680,
      monthlyRent: 1045,
      availability: 'Demo availability: immediate',
    },
    {
      id: 'larkmere-d210',
      unit: 'Demo D210',
      floorPlan: 'The Garden',
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 910,
      monthlyRent: 1325,
      availability: 'Demo availability: upcoming',
    },
  ],
  'norvale-commons': [
    {
      id: 'norvale-e105',
      unit: 'Demo E105',
      floorPlan: 'The Norvale',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 745,
      monthlyRent: 1195,
      availability: 'Demo availability: immediate',
    },
    {
      id: 'norvale-f216',
      unit: 'Demo F216',
      floorPlan: 'The Commons',
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1015,
      monthlyRent: 1495,
      availability: 'Demo availability: upcoming',
    },
  ],
} as const satisfies MockListingCollection;

export function getMockListings(propertyId: string) {
  return MOCK_LISTINGS[propertyId as keyof typeof MOCK_LISTINGS] ?? [];
}
