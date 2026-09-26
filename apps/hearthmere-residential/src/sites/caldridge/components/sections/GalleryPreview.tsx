import { PropertyGalleryPreview } from '@hearthmere/ui';
import { getFeaturedImages } from '@caldridge/config/gallery';
import { siteBasePath } from '@caldridge/config/site';

export function GalleryPreview() {
  return (
    <PropertyGalleryPreview
      basePath={siteBasePath}
      featuredImages={getFeaturedImages()}
    />
  );
}
