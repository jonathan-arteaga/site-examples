import { PropertyNotFoundPage } from '@hearthmere/ui';
import { siteBasePath } from '@alderwyck/config/site';

export default function NotFound() {
  return <PropertyNotFoundPage basePath={siteBasePath} />;
}
