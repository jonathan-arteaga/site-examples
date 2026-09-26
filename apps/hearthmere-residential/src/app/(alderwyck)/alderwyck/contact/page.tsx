import { Metadata } from 'next';
import { PropertyContactPage } from '@hearthmere/ui';
import { ContactForm } from '@alderwyck/components/forms/ContactForm';
import { CallButton } from '@alderwyck/components/cta/CallButton';
import { propertyConfig } from '@alderwyck/config/property';

export const metadata: Metadata = {
  title: 'Contact Flow Demo',
  description: `Preview the browser-only contact flow for fictional ${propertyConfig.name}. No message is sent.`,
  alternates: { canonical: '/alderwyck/contact' },
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
