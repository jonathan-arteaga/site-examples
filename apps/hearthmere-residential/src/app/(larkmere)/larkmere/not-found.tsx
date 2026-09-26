import { PropertyNotFoundPage } from '@hearthmere/ui';
import { siteBasePath } from '@larkmere/config/site';

export default function NotFound() {
  return <PropertyNotFoundPage basePath={siteBasePath} />;
}
