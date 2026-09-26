import { ReactNode } from 'react';

interface PropertyHomePageProps {
  hero: ReactNode;
  floorPlanPreview: ReactNode;
  amenitiesHighlight: ReactNode;
  galleryPreview: ReactNode;
  neighborhoodPreview: ReactNode;
  ctaBanner: ReactNode;
}

export function PropertyHomePage({
  hero,
  floorPlanPreview,
  amenitiesHighlight,
  galleryPreview,
  neighborhoodPreview,
  ctaBanner,
}: PropertyHomePageProps) {
  return (
    <>
      {hero}
      {floorPlanPreview}
      {amenitiesHighlight}
      {galleryPreview}
      {neighborhoodPreview}
      {ctaBanner}
    </>
  );
}
