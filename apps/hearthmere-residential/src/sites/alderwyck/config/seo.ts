import { propertyConfig } from './property';
import { getPriceRange } from './floor-plans';
import { siteUrl } from './site';

const baseUrl = siteUrl;

export const seoConfig = {
  defaultTitle: `${propertyConfig.name} | Fictional Apartment Showcase`,
  defaultDescription: `Explore the fictional ${propertyConfig.name} portfolio showcase. Preview 1 and 2 bedroom layouts, community features, and illustrative neighborhood details in ${propertyConfig.address.city}.`,
  keywords: [
    'fictional apartment showcase',
    `${propertyConfig.address.city.toLowerCase()} fictional setting`,
    `${propertyConfig.address.state.toLowerCase()} portfolio example`,
    'apartment interface demonstration',
    'fictional apartment community',
    'one bedroom layout concept',
    'two bedroom layout concept',
    'illustrative neighborhood',
    propertyConfig.name.toLowerCase(),
    `fictional apartments in ${propertyConfig.address.city.toLowerCase()}`,
    `${propertyConfig.address.city.toLowerCase()} ${propertyConfig.address.state.toLowerCase()} interface demo`,
    'apartment portfolio showcase',
  ],

  // Canonical URL configuration
  canonicalUrl: baseUrl,

  // Open Graph meta tags
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: propertyConfig.name,
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `Synthetic social preview for ${propertyConfig.name}`,
      },
    ],
  },

  // Twitter card meta tags
  twitter: {
    card: 'summary_large_image' as const,
    site: propertyConfig.social?.twitter ? `@${propertyConfig.social.twitter.split('/').pop()}` : undefined,
    creator: propertyConfig.social?.twitter ? `@${propertyConfig.social.twitter.split('/').pop()}` : undefined,
  },

  // This fictional showcase intentionally omits geographic coordinates.
  geo: null,

  // Robots meta directives
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },

  verification: {
    google: undefined,
    bing: undefined,
  },
};

// Per-page SEO configurations
export const pageSeoConfig = {
  home: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
  floorPlans: {
    title: `Illustrative Floor Plans & Pricing | ${propertyConfig.name}`,
    description: `Explore fictional one- and two-bedroom floor plans at ${propertyConfig.name}. Synthetic monthly values begin at $${getPriceRange().min}.`,
    keywords: ['demo floor plans', 'illustrative layouts', 'one bedroom concept', 'two bedroom concept', 'synthetic pricing'],
  },
  amenities: {
    title: `Illustrative Amenities | ${propertyConfig.name}`,
    description: `Preview fictional amenities at ${propertyConfig.name}, including a courtyard pool, laundry studio, resident parking, and refreshed interiors.`,
    keywords: ['amenities', 'apartment features', 'community amenities', 'portfolio showcase'],
  },
  gallery: {
    title: `Synthetic Photo Gallery | ${propertyConfig.name}`,
    description: `View synthetic showcase images of ${propertyConfig.name} apartments, amenity concepts, and fictional community spaces.`,
    keywords: ['synthetic photos', 'demo gallery', 'generated apartment images', 'portfolio gallery'],
  },
  neighborhood: {
    title: `Illustrative Neighborhood | ${propertyConfig.name}`,
    description: `Explore the fictional ${propertyConfig.address.city}, ${propertyConfig.address.state} neighborhood around ${propertyConfig.name}, including illustrative destinations and mobility scores.`,
    keywords: ['fictional location', 'illustrative neighborhood', propertyConfig.address.city.toLowerCase(), 'synthetic nearby places'],
  },
  contact: {
    title: `Contact Flow Demo | ${propertyConfig.name}`,
    description: `Try the ${propertyConfig.name} contact and tour-request demo using fictional contact details.`,
    keywords: ['contact demo', 'phone demo', 'email demo', 'tour request demo', 'portfolio form'],
  },
  listings: {
    title: `Demo Listings | ${propertyConfig.name}`,
    description: `Browse illustrative apartment listings and pricing at the fictional ${propertyConfig.name} community.`,
    keywords: ['demo listings', 'illustrative pricing', 'portfolio showcase', 'apartment layouts'],
  },
  scheduleTour: {
    title: `Tour Request Demo | ${propertyConfig.name}`,
    description: `Try the fictional tour-request experience for ${propertyConfig.name}. No appointment or message is submitted.`,
    keywords: ['tour request demo', 'browser-only form', 'simulated appointment', 'portfolio interaction'],
  },
};
