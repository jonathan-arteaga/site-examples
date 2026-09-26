import { AmenityCategory, Amenity } from '@hearthmere/config';

export const amenityCategories: AmenityCategory[] = [
  {
    id: 'community',
    name: 'Illustrative Community Features',
    amenities: [
      {
        id: 'pet-play-area',
        name: 'Foundry Pet-Lawn Concept',
        icon: 'paw',
        description: 'A fictional outdoor feature shown to demonstrate pet-oriented amenity content',
      },
      {
        id: 'internet',
        name: 'Connectivity-Ready Concept',
        icon: 'wifi',
        description: 'An illustrative connectivity label; no internet service or wiring is represented',
      },
      {
        id: 'parking',
        name: 'Sample On-Site Parking',
        icon: 'car',
        description: 'A fictional parking feature with no real spaces, rules, or availability',
      },
      {
        id: 'office',
        name: 'Demo Welcome Desk',
        icon: 'building',
        description: 'An interface example of how a community desk could be described',
      },
      {
        id: 'maintenance',
        name: 'Service-Workflow Example',
        icon: 'wrench',
        description: 'A fictional maintenance-workflow concept with no connected service team',
      },
      {
        id: 'pet-friendly',
        name: 'Pet-Friendly Design Concept',
        icon: 'paw',
        description:
          'Illustrative copy for a future pet-oriented housing presentation; no pet policy is offered',
      },
    ],
  },
  {
    id: 'apartment',
    name: 'Illustrative Home Features',
    amenities: [
      {
        id: 'stove',
        name: 'Electric Range Example',
        icon: 'flame',
        description: 'A synthetic kitchen feature used in the layout demonstration',
      },
      {
        id: 'refrigerator',
        name: 'Refrigerator Example',
        icon: 'refrigerator',
        description: 'A fictional appliance label; no real home or appliance is represented',
      },
      {
        id: 'dishwasher',
        name: 'Dishwasher Example',
        icon: 'dishwasher',
        description: 'An illustrative appliance feature for the sample kitchen presentation',
      },
      {
        id: 'disposal',
        name: 'Kitchen-Disposal Example',
        icon: 'disposal',
        description: 'A synthetic feature label with no real inclusion or specification',
      },
      {
        id: 'dining',
        name: 'Defined Dining-Area Concept',
        icon: 'dining',
        description: 'A fictional layout feature used to demonstrate room-description content',
      },
      {
        id: 'ac-heat',
        name: 'Climate-Control Concept',
        icon: 'thermometer',
        description: 'An illustrative systems label with no equipment or performance claim',
      },
      {
        id: 'balcony',
        name: 'Private-Balcony Concept',
        icon: 'balcony',
        description: 'A synthetic outdoor-space feature shown in select sample layouts',
      },
      {
        id: 'fireplace',
        name: 'Fireplace Design Feature',
        icon: 'fire',
        description: 'An illustrative visual feature; no working fireplace is represented',
      },
      {
        id: 'wd-connections',
        name: 'Laundry-Connection Concept',
        icon: 'washer',
        description: 'A fictional utility feature used in the sample floor-plan content',
      },
      {
        id: 'utilities',
        name: 'Utility-Setup Example',
        icon: 'bolt',
        description: 'A demonstration label only; there are no utilities, homes, or lease terms',
      },
    ],
  },
];

// Flatten for simple listing
export const allAmenities: Amenity[] = amenityCategories.flatMap(
  (cat) => cat.amenities
);

// Get featured amenities for home page
export const featuredAmenities: Amenity[] = [
  allAmenities.find((a) => a.id === 'pet-play-area')!,
  allAmenities.find((a) => a.id === 'internet')!,
  allAmenities.find((a) => a.id === 'ac-heat')!,
  allAmenities.find((a) => a.id === 'fireplace')!,
  allAmenities.find((a) => a.id === 'pet-friendly')!,
  allAmenities.find((a) => a.id === 'wd-connections')!,
];
