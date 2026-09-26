import { z } from 'zod';

// Demo forms validate shape only. They intentionally accept fictional contact details.
const phoneRegex = /^(\+1)?[\s.-]?\(?[0-9]{3}\)?[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;

const phoneField = z.string().regex(phoneRegex, 'Enter a fictional ten-digit phone number');
const emailField = z.string().email('Enter a correctly formatted demo email address');

// --- Form schemas ---

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Add a fictional first name')
    .max(50, 'Keep the demo first name under 50 characters'),
  lastName: z
    .string()
    .min(1, 'Add a fictional last name')
    .max(50, 'Keep the demo last name under 50 characters'),
  email: emailField,
  phone: phoneField,
  floorPlanInterest: z.string().optional(),
  message: z
    .string()
    .min(10, 'Use at least 10 characters in the fictional message')
    .max(1000, 'Keep the fictional message under 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
/** Pre-parse shape used by react-hook-form before Zod validation. */
export type ContactFormInput = z.input<typeof contactFormSchema>;

export const corporateContactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Add a fictional first name')
    .max(50, 'Keep the demo first name under 50 characters'),
  lastName: z
    .string()
    .min(1, 'Add a fictional last name')
    .max(50, 'Keep the demo last name under 50 characters'),
  email: emailField,
  phone: phoneField,
  subject: z.string().min(1, 'Choose a demo message subject'),
  propertyInterest: z.string().optional(),
  message: z
    .string()
    .min(10, 'Use at least 10 characters in the fictional message')
    .max(1000, 'Keep the fictional message under 1000 characters'),
});

export type CorporateContactFormData = z.infer<typeof corporateContactFormSchema>;
/** Pre-parse shape used by react-hook-form before Zod validation. */
export type CorporateContactFormInput = z.input<typeof corporateContactFormSchema>;

export const scheduleTourFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Add a fictional first name')
    .max(50, 'Keep the demo first name under 50 characters'),
  lastName: z
    .string()
    .min(1, 'Add a fictional last name')
    .max(50, 'Keep the demo last name under 50 characters'),
  email: emailField,
  phone: phoneField,
  preferredDate: z.string().min(1, 'Choose a date for the local tour simulation'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening'], {
    message: 'Choose a time window for the local tour simulation',
  }),
  floorPlanInterest: z.string().optional(),
  moveInDate: z.string().optional(),
  message: z.string().max(500, 'Keep the fictional note under 500 characters').optional(),
});

export type ScheduleTourFormData = z.infer<typeof scheduleTourFormSchema>;
/** Pre-parse shape used by react-hook-form before Zod validation. */
export type ScheduleTourFormInput = z.input<typeof scheduleTourFormSchema>;
