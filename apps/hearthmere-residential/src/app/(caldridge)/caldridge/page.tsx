import { PropertyHomePage } from '@hearthmere/ui';
import {
  Hero,
  FloorPlanPreview,
  AmenitiesHighlight,
  GalleryPreview,
  NeighborhoodPreview,
  CTABanner,
} from '@caldridge/components/sections';

export default function HomePage() {
  return (
    <PropertyHomePage
      hero={<Hero />}
      floorPlanPreview={<FloorPlanPreview />}
      amenitiesHighlight={<AmenitiesHighlight />}
      galleryPreview={<GalleryPreview />}
      neighborhoodPreview={<NeighborhoodPreview />}
      ctaBanner={<CTABanner variant="dark" />}
    />
  );
}
