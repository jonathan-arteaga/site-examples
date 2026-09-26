import { AmenityCategory, Amenity } from '@hearthmere/config';

export const amenityCategories: AmenityCategory[] = [
  {
    id: 'community',
    name: 'Illustrative Community Features',
    amenities: [
      {
        id: 'pool',
        name: 'Commons Pool',
        icon: 'pool',
        description: 'A synthetic shared-space feature for the portfolio interface',
      },
      {
        id: 'fitness',
        name: 'Movement Studio',
        icon: 'dumbbell',
        description: 'A fictional movement-space concept with no connected facility',
      },
      {
        id: 'playground',
        name: 'Play Lawn',
        icon: 'playground',
        description: 'An illustrative play-space concept for the fictional site',
      },
      {
        id: 'bbq',
        name: 'Picnic Terrace',
        icon: 'grill',
        description: 'A synthetic gathering-space feature for the portfolio demo',
      },
      {
        id: 'tennis',
        name: 'Sport Court',
        icon: 'tennis',
        description: 'A fictional recreation concept with no real court or access',
      },
      {
        id: 'pet-park',
        name: 'Pet Lawn',
        icon: 'paw',
        description: 'Illustrative pet-oriented copy; no pet policy or housing offer is provided',
      },
      {
        id: 'laundry',
        name: 'Community Laundry Room',
        icon: 'washer',
        description: 'A fictional shared-laundry concept with no connected facility',
      },
      {
        id: 'business-center',
        name: 'Resident Work Lounge',
        icon: 'computer',
        description: 'An illustrative work-lounge concept for the interface demo',
      },
      {
        id: 'parking',
        name: 'Resident & Guest Parking',
        icon: 'car',
        description: 'A synthetic parking feature with no real spaces, rules, or availability',
      },
      {
        id: 'wheelchair',
        name: 'Accessible Routes',
        icon: 'accessible',
        description: 'Illustrative accessibility content; no physical property or feature is verified',
      },
    ],
  },
  {
    id: 'apartment',
    name: 'Illustrative Home Features',
    amenities: [
      {
        id: 'stove',
        name: 'Electric Range',
        icon: 'flame',
        description: 'A synthetic kitchen-appliance concept for the interface demo',
      },
      {
        id: 'refrigerator',
        name: 'Full-Size Refrigerator',
        icon: 'refrigerator',
        description: 'A fictional appliance label used in the featured layout concepts',
      },
      {
        id: 'dishwasher',
        name: 'Dishwasher',
        icon: 'dishwasher',
        description: 'An illustrative appliance feature for the sample kitchen presentation',
      },
      {
        id: 'disposal',
        name: 'Kitchen Disposal',
        icon: 'disposal',
        description: 'A synthetic feature label with no real inclusion or specification',
      },
      {
        id: 'ac-heat',
        name: 'Central Climate Control',
        icon: 'thermometer',
        description: 'An illustrative systems label with no equipment or performance claim',
      },
      {
        id: 'thermostat',
        name: 'Programmable Thermostat',
        icon: 'thermostat',
        description: 'A fictional control concept for the sample home interface',
      },
      {
        id: 'ceiling-fans',
        name: 'Ceiling Fans',
        icon: 'fan',
        description: 'An illustrative fixture label for select layout concepts',
      },
      {
        id: 'fireplace',
        name: 'Decorative Hearth',
        icon: 'fireplace',
        description: 'A synthetic visual feature; no working fireplace is represented',
      },
      {
        id: 'carpet',
        name: 'Soft-Surface Flooring',
        icon: 'floor',
        description: 'An illustrative flooring concept for a sample bedroom scene',
      },
      {
        id: 'cable',
        name: 'Connectivity Ready',
        icon: 'tv',
        description: 'A fictional connectivity label; no service or wiring is represented',
      },
      {
        id: 'closets',
        name: 'Generous Closets',
        icon: 'closet',
        description: 'A synthetic storage concept used in select sample layouts',
      },
      {
        id: 'pantry',
        name: 'Kitchen Pantry',
        icon: 'pantry',
        description: 'An illustrative kitchen-storage label for featured layout concepts',
      },
      {
        id: 'patio',
        name: 'Private Patio or Balcony',
        icon: 'balcony',
        description: 'A synthetic outdoor-space feature shown in select sample layouts',
      },
      {
        id: 'wd-connections',
        name: 'Laundry Connections',
        icon: 'washer',
        description: 'A fictional utility feature used in select sample floor plans',
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
  allAmenities.find((a) => a.id === 'pool')!,
  allAmenities.find((a) => a.id === 'fitness')!,
  allAmenities.find((a) => a.id === 'pet-park')!,
  allAmenities.find((a) => a.id === 'ac-heat')!,
  allAmenities.find((a) => a.id === 'fireplace')!,
  allAmenities.find((a) => a.id === 'wd-connections')!,
];
