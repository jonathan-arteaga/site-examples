import { PropertyGalleryPreview } from '@hearthmere/ui';
import { getFeaturedImages } from '@larkmere/config/gallery';
import { siteBasePath } from '@larkmere/config/site';

export function GalleryPreview() {
  return (
    <PropertyGalleryPreview
      basePath={siteBasePath}
      featuredImages={getFeaturedImages()}
    />
  );
}
