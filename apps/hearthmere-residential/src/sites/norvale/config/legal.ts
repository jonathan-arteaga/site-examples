import { propertyConfig } from './property';

export const legalConfig = {
  fairHousing: {
    disclaimer: `${propertyConfig.name} is a fictional portfolio community. This inclusive-housing statement demonstrates how a future production site could present equal-housing principles; it is not a landlord policy, legal representation, or offer of housing.`,
    shortDisclaimer: 'Fictional equal-housing showcase; not a real housing offer or applicant policy.',
    logoAlt: 'Illustrative equal-housing symbol',
  },

  accessibility: {
    conformanceLevel: 'Demonstration target: WCAG 2.2 Level AA patterns',
    lastReviewed: '2026-07-25',
    contactEmail: propertyConfig.contact.email,
    contactPhone: propertyConfig.contact.phone,
  },

  termsOfService: {
    effectiveDate: '2026-07-25',
    governingLaw: 'Illustrative legal label; no governing law selected',
    jurisdiction: 'Fictional portfolio demonstration; no legal venue selected',
  },

  privacy: {
    dataRetentionPeriod: 'No submitted data',
    ccpaApplies: false,
    gdprApplies: false,
  },

  cookies: {
    categories: [
      {
        name: 'Essential',
        description: 'Supports core same-origin site behavior without tracking visitors.',
        required: true,
      },
      {
        name: 'Local Preference',
        description: 'Remembers one notice-dismissal choice in this browser only.',
        required: false,
      },
      {
        name: 'Demo Forms',
        description: 'Form values stay in browser memory during the local simulation and are not submitted.',
        required: false,
      },
    ],
  },
};
