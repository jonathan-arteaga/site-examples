export interface MockListing {
  id: string;
  unit: string;
  floorPlan: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  monthlyRent: number;
  availability: 'Demo availability: immediate' | 'Demo availability: upcoming';
}

export type MockListingCollection = Readonly<
  Record<string, readonly MockListing[]>
>;
