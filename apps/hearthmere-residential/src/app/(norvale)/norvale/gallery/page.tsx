'use client';

import { PropertyGalleryPage } from '@hearthmere/ui';
import { propertyConfig } from '@norvale/config/property';
import { galleryCategories, getImagesByCategory } from '@norvale/config/gallery';

export default function GalleryPage() {
  return (
    <PropertyGalleryPage
      propertyName={propertyConfig.name}
      categories={galleryCategories}
      getImagesByCategory={getImagesByCategory}
    />
  );
}
