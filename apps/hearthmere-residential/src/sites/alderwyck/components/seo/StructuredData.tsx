import { DemoWebsiteStructuredData } from '@hearthmere/ui';
import { propertyConfig } from '@alderwyck/config/property';
import { siteUrl } from '@alderwyck/config/site';

interface StructuredDataProps {
  type?: 'organization' | 'apartment' | 'floorPlans' | 'faq';
  nonce?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export function StructuredData({
  type = 'apartment',
  nonce,
}: StructuredDataProps) {
  if (type === 'faq' || type === 'floorPlans') return null;

  return (
    <DemoWebsiteStructuredData
      siteName={propertyConfig.name}
      siteUrl={siteUrl}
      nonce={nonce}
    />
  );
}
