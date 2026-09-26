import { PropertyNotFoundPage } from '@hearthmere/ui';
import { siteBasePath } from '@norvale/config/site';

export default function NotFound() {
  return <PropertyNotFoundPage basePath={siteBasePath} />;
}
