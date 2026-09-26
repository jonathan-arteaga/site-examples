import { Metadata } from 'next';
import { PropertyContactPage } from '@hearthmere/ui';
import { ContactForm } from '@caldridge/components/forms/ContactForm';
import { CallButton } from '@caldridge/components/cta/CallButton';
import { propertyConfig } from '@caldridge/config/property';

export const metadata: Metadata = {
  title: 'Contact Flow Demo',
  description: `Preview the browser-only contact flow for fictional ${propertyConfig.name}. No message is sent.`,
  alternates: { canonical: '/caldridge/contact' },
};

export default function ContactPage() {
  return (
    <PropertyContactPage
      propertyName={propertyConfig.name}
      address={propertyConfig.address}
      email={propertyConfig.contact.email}
      officeHours={propertyConfig.contact.officeHours}
      tourHours={propertyConfig.contact.tourHours}
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
