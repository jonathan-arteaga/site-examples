interface DemoWebsiteStructuredDataProps {
  siteName: string;
  siteUrl: string;
  nonce?: string;
}

export function DemoWebsiteStructuredData({
  siteName,
  siteUrl,
  nonce,
}: DemoWebsiteStructuredDataProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteName} — Portfolio Demonstration`,
    description:
      'Fictional property-management website created solely as a portfolio demonstration.',
    url: siteUrl,
  };

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
