import { FloorPlan } from '@hearthmere/config';
import { withBasePath } from './site';

export const floorPlans: FloorPlan[] = ([
  {
    id: '1br-1ba',
    name: '1 Bedroom / 1 Bath',
    bedrooms: 1,
    bathrooms: 1,
    sqft: { min: 680, max: 760 },
    price: { min: 1045, max: 1195 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Ceiling Fans', 'Generous Closets', 'Connectivity Ready'],
    images: {
      floorPlan: '/images/floor-plans/1br-1ba.jpg',
      photos: [
        '/images/interior/kitchen.jpg',
        '/images/interior/living-room-fireplace.jpg',
      ],
    },
  },
  {
    id: '2br-1ba',
    name: '2 Bedroom / 1 Bath',
    bedrooms: 2,
    bathrooms: 1,
    sqft: { min: 890, max: 950 },
    price: { min: 1215, max: 1395 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Ceiling Fans', 'Generous Closets', 'Connectivity Ready'],
    images: {
      floorPlan: '/images/floor-plans/2br-1ba.jpg',
      photos: [
        '/images/interior/master-bedroom.jpg',
        '/images/interior/kitchen.jpg',
        '/images/interior/bathroom.jpg',
      ],
    },
  },
  {
    id: '2br-1.5ba',
    name: '2 Bedroom / 1.5 Bath',
    bedrooms: 2,
    bathrooms: 1.5,
    sqft: { min: 965, max: 1025 },
    price: { min: 1340, max: 1495 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Ceiling Fans', 'Generous Closets', 'Connectivity Ready', 'Laundry Connections'],
    images: {
      floorPlan: '/images/floor-plans/2br-1.5ba.jpg',
      photos: [
        '/images/interior/dining-area.jpg',
        '/images/interior/master-bedroom-2.jpg',
        '/images/interior/bedroom-closet.jpg',
      ],
    },
  },
  {
    id: '2br-2ba',
    name: '2 Bedroom / 2 Bath',
    bedrooms: 2,
    bathrooms: 2,
    sqft: { min: 1040, max: 1135 },
    price: { min: 1455, max: 1640 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Ceiling Fans', 'Generous Closets', 'Connectivity Ready', 'Laundry Connections', 'Two Full Baths'],
    images: {
      floorPlan: '/images/floor-plans/2br-2ba.jpg',
      photos: [
        '/images/interior/living-room-fireplace.jpg',
        '/images/interior/kids-bedroom.jpg',
        '/images/interior/bathroom.jpg',
      ],
    },
  },
  {
    id: '3br-2ba-flat',
    name: '3 Bedroom / 2 Bath Flat',
    bedrooms: 3,
    bathrooms: 2,
    sqft: { min: 1180, max: 1285 },
    price: { min: 1625, max: 1765 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Ceiling Fans', 'Generous Closets', 'Connectivity Ready', 'Laundry Connections', 'Two Full Baths'],
    images: {
      floorPlan: '/images/floor-plans/3br-2ba-flat.jpg',
      photos: [
        '/images/interior/kitchen.jpg',
        '/images/interior/master-bedroom.jpg',
        '/images/interior/dining-area.jpg',
      ],
    },
  },
  {
    id: '3br-2.5ba-townhome',
    name: '3 Bedroom / 2.5 Bath Townhome',
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: { min: 1310, max: 1395 },
    price: { min: 1715, max: 1840 },
    available: false,
    availableDate: 'Demo only',
    features: ['Townhome Style', 'Two Stories', 'Ceiling Fans', 'Soft-Surface Flooring', 'Generous Closets', 'Laundry Connections'],
    images: {
      floorPlan: '/images/floor-plans/3br-2.5ba-townhome.jpg',
      photos: [
        '/images/interior/living-room-fireplace.jpg',
        '/images/interior/master-bedroom-2.jpg',
        '/images/interior/kids-bedroom.jpg',
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
