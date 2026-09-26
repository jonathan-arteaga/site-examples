import { DemoWebsiteStructuredData } from '@hearthmere/ui';
import { companyConfig } from '@/config/company';

interface JsonLdProps {
  nonce?: string;
}

export function JsonLd({ nonce }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hearthmere.example';

  return (
    <DemoWebsiteStructuredData
      siteName={companyConfig.name}
      siteUrl={baseUrl}
      nonce={nonce}
    />
  );
}
