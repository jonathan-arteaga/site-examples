import type { Metadata } from 'next';
import { Container } from '@hearthmere/ui';
import { Card } from '@hearthmere/ui';
import { ContactForm } from '@/components/forms/ContactForm';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@/components/icons';
import { companyConfig } from '@/config/company';
import { pageSeo } from '@/config/seo';

export const metadata: Metadata = {
  title: pageSeo.contact.title,
  description: pageSeo.contact.description,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    url: '/contact',
    title: pageSeo.contact.title,
    description: pageSeo.contact.description,
  },
  twitter: {
    title: pageSeo.contact.title,
    description: pageSeo.contact.description,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-primary-50)] py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow text-[var(--color-primary-600)] mb-4">
              Get In Touch
            </p>
            <h1 className="heading-display text-display-lg text-gray-900 mb-3">
              Contact Us
            </h1>
            <p className="text-body-lg text-gray-600">
              Preview the fictional contact details and browser-only form used across
              this portfolio demonstration.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)] flex items-center justify-center">
                    <PhoneIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Phone</p>
                    <button
                      type="button"
                      data-demo-action="phone"
                      className="text-gray-900 hover:text-[var(--color-primary-600)] transition-colors"
                    >
                      {companyConfig.contact.phoneDisplay}
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)] flex items-center justify-center">
                    <EnvelopeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                    <button
                      type="button"
                      data-demo-action="email"
                      className="text-gray-900 hover:text-[var(--color-primary-600)] transition-colors"
                    >
                      {companyConfig.contact.email}
                    </button>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)] flex items-center justify-center">
                    <MapPinIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                    <p className="text-gray-900">
                      {companyConfig.address.street}
                      <br />
                      {companyConfig.address.city}, {companyConfig.address.state}{' '}
                      {companyConfig.address.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Try the Local Demo Form
                </h2>
                <ContactForm />
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
