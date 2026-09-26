import { PropertyNotFoundPage } from '@hearthmere/ui';
import { siteBasePath } from '@caldridge/config/site';

export default function NotFound() {
  return <PropertyNotFoundPage basePath={siteBasePath} />;
}
