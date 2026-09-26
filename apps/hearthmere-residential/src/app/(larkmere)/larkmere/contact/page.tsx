import { Metadata } from 'next';
import { PropertyContactPage } from '@hearthmere/ui';
import { ContactForm } from '@larkmere/components/forms/ContactForm';
import { CallButton } from '@larkmere/components/cta/CallButton';
import { propertyConfig } from '@larkmere/config/property';

export const metadata: Metadata = {
  title: 'Contact Form Demo',
  description: `Preview a browser-only contact interaction for ${propertyConfig.name}. Invented entries are neither sent nor saved.`,
  alternates: { canonical: '/larkmere/contact' },
};

export default function ContactPage() {
  return (
    <PropertyContactPage
      propertyName={propertyConfig.name}
      address={propertyConfig.address}
      email={propertyConfig.contact.email}
      officeHours={propertyConfig.contact.officeHours}
      contactForm={<ContactForm />}
      callButton={
        <CallButton
          variant="link"
          location="contact_sidebar"
          showNumber
          showIcon={false}
          className="mt-1"
        />
      }
    />
  );
}
