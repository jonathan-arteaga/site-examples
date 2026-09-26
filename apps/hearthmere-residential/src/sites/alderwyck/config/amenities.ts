import { AmenityCategory, Amenity } from '@hearthmere/config';

export const amenityCategories: AmenityCategory[] = [
  {
    id: 'community',
    name: 'Illustrative Community Features',
    amenities: [
      {
        id: 'pool',
        name: 'Courtyard Pool',
        icon: 'pool',
        description: 'A synthetic shared-space feature for the portfolio interface',
      },
      {
        id: 'gated',
        name: 'Keyed Community Entry',
        icon: 'lock',
        description: 'An illustrative access-control label with no real security claim',
      },
      {
        id: 'laundry',
        name: 'Laundry Studio',
        icon: 'washer',
        description: 'A fictional shared-laundry concept with no connected facility',
      },
      {
        id: 'office',
        name: 'Demo Welcome Desk',
        icon: 'building',
        description: 'An interface example of how a community desk could be described',
      },
      {
        id: 'spanish-staff',
        name: 'Multilingual Resident Service',
        icon: 'chat',
        description: 'Illustrative multilingual-service copy with no connected support team',
      },
      {
        id: 'maintenance',
        name: 'After-Hours Service Line',
        icon: 'wrench',
        description: 'A fictional service-workflow concept with no active request channel',
      },
      {
        id: 'parking',
        name: 'Open Resident Parking',
        icon: 'car',
        description: 'A synthetic parking feature with no real spaces, rules, or availability',
      },
      {
        id: 'pet-friendly',
        name: 'Pet-Friendly Design Concept',
        icon: 'paw',
        description: 'Illustrative pet-oriented copy; no pet policy or housing offer is provided',
      },
      {
        id: 'transit',
        name: 'Neighborhood Transit Access',
        icon: 'bus',
        description: 'A fictional transit-access concept with no real route or distance claim',
      },
    ],
  },
  {
    id: 'apartment',
    name: 'Illustrative Home Features',
    amenities: [
      {
        id: 'utilities',
        name: 'Utility-Setup Example',
        icon: 'bolt',
        description: 'A demonstration label only; there are no utilities, homes, or lease terms',
      },
      {
        id: 'remodeled',
        name: 'Refreshed Interiors',
        icon: 'sparkles',
        description: 'A synthetic finishes concept used in select sample layouts',
      },
      {
        id: 'ac-heat',
        name: 'Central Climate Control',
        icon: 'thermometer',
        description: 'An illustrative systems label with no equipment or performance claim',
      },
      {
        id: 'refrigerator',
        name: 'Energy-Efficient Refrigerator',
        icon: 'refrigerator',
        description: 'A fictional appliance label used in the featured layout concepts',
      },
      {
        id: 'stove',
        name: 'Electric Range / Oven',
        icon: 'flame',
        description: 'A synthetic kitchen-appliance concept for the interface demo',
      },
      {
        id: 'backsplash',
        name: 'Tile Kitchen Accent',
        icon: 'counter',
        description: 'An illustrative finish description for a sample kitchen scene',
      },
      {
        id: 'vinyl-flooring',
        name: 'Wood-Style Flooring',
        icon: 'floor',
        description: 'A fictional flooring concept shown in select sample scenes',
      },
      {
        id: 'painted',
        name: 'Neutral Paint Palette',
        icon: 'paintbrush',
        description: 'A synthetic palette description for the visual showcase',
      },
      {
        id: 'ceiling-fans',
        name: 'Ceiling Fans',
        icon: 'fan',
        description: 'An illustrative fixture label for select layout concepts',
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
  allAmenities.find((a) => a.id === 'gated')!,
  allAmenities.find((a) => a.id === 'utilities')!,
  allAmenities.find((a) => a.id === 'maintenance')!,
  allAmenities.find((a) => a.id === 'pet-friendly')!,
  allAmenities.find((a) => a.id === 'ac-heat')!,
];
