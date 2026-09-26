import { type ReactNode } from 'react';
import { Container } from './Container';
import { Card } from './Card';
import { ClockIcon } from '../icons';

interface OfficeHours {
  days: string;
  hours: string;
}

export interface PropertyScheduleTourPageProps {
  propertyName: string;
  officeHours: OfficeHours[];
  tourHours?: string;
  scheduleTourForm: ReactNode;
}

export function PropertyScheduleTourPage({
  propertyName,
  officeHours,
  tourHours,
  scheduleTourForm,
}: PropertyScheduleTourPageProps) {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Preview Tour Scheduling</h1>
            <p className="mt-4 text-lg text-gray-600">
              Try the browser-only scheduling flow for {propertyName}. No appointment
              is created and no information leaves this page.
            </p>
          </div>

          <Card className="mt-8 p-6 lg:p-8">{scheduleTourForm}</Card>

          {/* Office Hours */}
          <div className="mt-8 text-center">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-2">
              <ClockIcon className="h-5 w-5 text-[var(--color-primary-500)]" />
              Fictional Office Hours
            </h2>
            <ul className="mt-4 space-y-1 text-gray-600">
              {officeHours.map((hours) => (
                <li key={hours.days}>
                  <span className="font-medium">{hours.days}:</span> {hours.hours}
                </li>
              ))}
            </ul>
            {tourHours && (
              <p className="mt-3 text-sm text-gray-500">Demo tour windows: {tourHours}</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
