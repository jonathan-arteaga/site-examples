import { type ReactNode } from 'react';
import { Container } from './Container';
import { Card } from './Card';
import { DemoMapPanel } from './DemoMapPanel';
import { IconWrapper } from './IconWrapper';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '../icons';

interface OfficeHours {
  days: string;
  hours: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  formatted: string;
}

export interface PropertyContactPageProps {
  propertyName: string;
  address: Address;
  email: string;
  officeHours: OfficeHours[];
  tourHours?: string;
  contactForm: ReactNode;
  callButton: ReactNode;
}

export function PropertyContactPage({
  propertyName,
  address,
  email,
  officeHours,
  tourHours,
  contactForm,
  callButton,
}: PropertyContactPageProps) {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Try the Contact Demo</h1>
            <p className="mt-4 text-lg">
              <span className="font-semibold text-gray-900">
                Explore a complete browser-only contact flow.
              </span>{' '}
              <span className="text-gray-500">
                Try the browser-only form below to preview its validation and success state.
              </span>
            </p>

            <Card className="mt-8 p-6 lg:p-8">{contactForm}</Card>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-8">
            <Card className="p-6 lg:p-8 sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-900">Fictional Contact Details</h2>

              <div className="mt-6 space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <IconWrapper size="sm" variant="primary">
                    <MapPinIcon className="h-5 w-5" />
                  </IconWrapper>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Demo Address
                    </h3>
                    <address className="mt-1 not-italic text-gray-900">
                      {address.street}
                      <br />
                      {address.city}, {address.state} {address.zip}
                    </address>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <IconWrapper size="sm" variant="primary">
                    <PhoneIcon className="h-5 w-5" />
                  </IconWrapper>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Demo Phone
                    </h3>
                    {callButton}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <IconWrapper size="sm" variant="primary">
                    <EnvelopeIcon className="h-5 w-5" />
                  </IconWrapper>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Demo Email
                    </h3>
                    <button
                      type="button"
                      data-demo-action="email"
                      className="mt-1 text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]"
                    >
                      {email}
                    </button>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <IconWrapper size="sm" variant="primary">
                    <ClockIcon className="h-5 w-5" />
                  </IconWrapper>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Fictional Office Hours
                    </h3>
                    <ul className="mt-1 space-y-1 text-gray-900">
                      {officeHours.map((hours) => (
                        <li key={hours.days}>
                          <span className="font-medium">{hours.days}:</span> {hours.hours}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tour Hours */}
                {tourHours && (
                  <div className="flex items-start gap-4">
                    <IconWrapper size="sm" variant="primary">
                      <ClockIcon className="h-5 w-5" />
                    </IconWrapper>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Demo Tour Windows
                      </h3>
                      <p className="mt-1 text-gray-900">{tourHours}</p>
                    </div>
                  </div>
                )}
              </div>

              <DemoMapPanel
                propertyName={propertyName}
                address={address.formatted}
                className="mt-8 min-h-[200px]"
              />
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
