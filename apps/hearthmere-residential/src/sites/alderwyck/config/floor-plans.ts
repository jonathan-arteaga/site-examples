import { FloorPlan } from '@hearthmere/config';
import { withBasePath } from './site';

export const floorPlans: FloorPlan[] = ([
  {
    id: '1br',
    name: '1 Bedroom Apartments',
    bedrooms: 1,
    bathrooms: 1,
    sqft: { min: 575, max: 650 },
    price: { min: 1245, max: 1345 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Ceiling Fans', 'Generous Closets'],
    images: {
      floorPlan: '/images/floor-plans/1br-1ba.jpg',
      photos: [
        '/images/interior/kitchen.jpg',
        '/images/interior/bedroom.jpg',
      ],
    },
  },
  {
    id: '2br',
    name: '2 Bedroom Apartments',
    bedrooms: 2,
    bathrooms: 1,
    sqft: { min: 740, max: 820 },
    price: { min: 1395, max: 1495 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Ceiling Fans', 'Generous Closets', 'Kitchen Pantry'],
    images: {
      floorPlan: '/images/floor-plans/2br-1ba.jpg',
      photos: [
        '/images/interior/kitchen.jpg',
        '/images/interior/bathroom.jpg',
        '/images/interior/bedroom.jpg',
      ],
    },
  },
] satisfies FloorPlan[]).map((plan) => ({
  ...plan,
  images: {
    floorPlan: plan.images.floorPlan
      ? withBasePath(plan.images.floorPlan)
      : undefined,
    photos: plan.images.photos.map(withBasePath),
  },
}));

export const getPriceRange = (): { min: number; max: number } => ({
  min: Math.min(...floorPlans.map((fp) => fp.price.min)),
  max: Math.max(...floorPlans.map((fp) => fp.price.max)),
});

export const getBedroomOptions = (): number[] => {
  const bedrooms = [...new Set(floorPlans.map((fp) => fp.bedrooms))];
  return bedrooms.sort((a, b) => a - b);
};
