export interface FloorPlan {
  id: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  sqft: Range;
  price: Range;
  available: boolean;
  availableDate: string;
  features: string[];
  images: FloorPlanImages;
}

export interface Range {
  min: number;
  max: number;
}

export interface FloorPlanImages {
  floorPlan?: string;
  photos: string[];
}

export type BedroomFilter = 'all' | 1 | 2 | 3;
