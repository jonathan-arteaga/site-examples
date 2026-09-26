import { PropertyConfig } from '@hearthmere/config';

export const propertyConfig: PropertyConfig = {
  id: 'alderwyck-apartments',
  name: 'Alderwyck Apartments',
  tagline: 'Bright Spaces Along Lantern Walk',

  address: {
    street: '1420 Lantern Walk',
    city: 'Example City',
    state: 'TX',
    zip: '00000',
    formatted: '1420 Lantern Walk, Example City, TX 00000',
  },

  contact: {
    phone: '+16825550111',
    phoneDisplay: '(682) 555-0111',
    email: 'alderwyck-apartments@hearthmere.example',
    officeHours: [
      { days: 'Monday - Friday', hours: '9:30 AM - 5:30 PM' },
      { days: 'Saturday', hours: 'By appointment' },
      { days: 'Sunday', hours: 'Closed' },
    ],
  },

  social: {},

  residentPortalPath: '/resident-portal',

  coordinates: null,

  features: {
    petFriendly: true,
    parking: 'Open resident and guest parking',
    unitCount: 148,
    yearBuilt: 2008,
  },
};
