import { propertyConfig } from './property';
import { getPriceRange } from './floor-plans';
import { siteUrl } from './site';

const baseUrl = siteUrl;

export const seoConfig = {
  defaultTitle: `${propertyConfig.name} | Fictional Townhome Showcase`,
  defaultDescription: `Explore the fictional ${propertyConfig.name} portfolio showcase. Preview 1-4 bedroom townhome layouts, community features, and illustrative neighborhood details in ${propertyConfig.address.city}.`,
  keywords: [
    'fictional townhome showcase',
    'property website demo',
    `${propertyConfig.address.city.toLowerCase()} fictional setting`,
    `${propertyConfig.address.state.toLowerCase()} portfolio example`,
    'townhome interface demonstration',
    'synthetic townhome community',
    'illustrative amenity concepts',
    'one bedroom layout concept',
    'two bedroom layout concept',
    'three bedroom layout concept',
    'four bedroom layout concept',
    'fictional neighborhood demonstration',
    propertyConfig.name.toLowerCase(),
    `fictional townhomes in ${propertyConfig.address.city.toLowerCase()}`,
    `${propertyConfig.address.city.toLowerCase()} ${propertyConfig.address.state.toLowerCase()} interface demo`,
    'townhome portfolio showcase',
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
    description: `Explore fictional one- through four-bedroom floor plans at ${propertyConfig.name}. Synthetic monthly values begin at $${getPriceRange().min}.`,
    keywords: ['demo floor plans', 'illustrative layouts', 'one bedroom concept', 'two bedroom concept', 'three bedroom concept', 'synthetic pricing'],
  },
  amenities: {
    title: `Illustrative Amenities | ${propertyConfig.name}`,
    description: `Preview fictional amenity concepts at ${propertyConfig.name}; no feature, service, or policy represents a real property.`,
    keywords: ['demo amenities', 'illustrative townhome features', 'synthetic community features', 'portfolio showcase'],
  },
  gallery: {
    title: `Synthetic Photo Gallery | ${propertyConfig.name}`,
    description: `View synthetic showcase images of ${propertyConfig.name} townhomes, amenity concepts, and fictional community spaces.`,
    keywords: ['synthetic photos', 'demo gallery', 'generated townhome images', 'portfolio gallery'],
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
  scheduleTour: {
    title: `Tour Request Demo | ${propertyConfig.name}`,
    description: `Try the fictional tour-request experience for ${propertyConfig.name}. No appointment or message is submitted.`,
    keywords: ['tour request demo', 'browser-only form', 'simulated appointment', 'portfolio interaction'],
  },
};
