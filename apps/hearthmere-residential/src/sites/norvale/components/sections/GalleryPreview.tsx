import { PropertyGalleryPreview } from '@hearthmere/ui';
import { getFeaturedImages } from '@norvale/config/gallery';
import { siteBasePath } from '@norvale/config/site';

export function GalleryPreview() {
  return (
    <PropertyGalleryPreview
      basePath={siteBasePath}
      featuredImages={getFeaturedImages()}
    />
  );
}
