import { PropertyConfig } from '@hearthmere/config';

export const propertyConfig: PropertyConfig = {
  id: 'norvale-commons',
  name: 'Norvale Commons',
  tagline: 'Room to Settle In at Juniper Loop',

  address: {
    street: '2875 Juniper Loop',
    city: 'Sample City',
    state: 'TN',
    zip: '00000',
    formatted: '2875 Juniper Loop, Sample City, TN 00000',
  },

  contact: {
    phone: '+16155550122',
    phoneDisplay: '(615) 555-0122',
    email: 'norvale-commons@hearthmere.example',
    officeHours: [
      { days: 'Monday - Friday', hours: '8:30 AM - 5:30 PM' },
      { days: 'Saturday', hours: '10:00 AM - 2:00 PM' },
      { days: 'Sunday', hours: 'Closed' },
    ],
  },

  social: {
    // Update with actual social links when available
  },

  residentPortalPath: '/resident-portal',

  coordinates: null,

  features: {
    petFriendly: true,
    parking: 'On-site resident and guest parking',
    unitCount: 112,
    yearBuilt: 2012,
  },
};
