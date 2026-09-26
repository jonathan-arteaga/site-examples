'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Input,
  Select,
  Textarea,
  Spinner,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useToast,
} from '@hearthmere/ui';
import { FormSuccess } from './FormSuccess';
import {
  corporateContactFormSchema,
  type CorporateContactFormInput,
} from '@hearthmere/utils/client';
import { getPropertyOptions } from '@/config/properties';

const subjectOptions = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'leasing', label: 'Leasing Information' },
  { value: 'maintenance', label: 'Maintenance Request' },
  { value: 'other', label: 'Other' },
];

const propertyOptions = [
  { value: '', label: 'Choose a fictional property (optional)' },
  ...getPropertyOptions(),
];

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success'
  >('idle');
  const { addToast } = useToast();

  const form = useForm<CorporateContactFormInput>({
    resolver: zodResolver(corporateContactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      propertyInterest: '',
      message: '',
    },
  });

  const onSubmit = async () => {
    setStatus('submitting');
    await new Promise<void>((resolve) => window.setTimeout(resolve, 600));
    form.reset();
    setStatus('success');
    addToast('Demo complete. Your information was not sent or saved.', 'success');
  };

  if (status === 'success') {
    return (
      <FormSuccess
        title="Demo Complete"
        message="This portfolio form is a browser-only simulation. Your information was not sent or saved."
        onReset={() => setStatus('idle')}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative" aria-label="Contact form">
        {/* Live region for form status announcements */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {status === 'submitting' && 'Simulating a local form submission...'}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
                <FormControl>
                  <Input autoComplete="given-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
                <FormControl>
                  <Input autoComplete="family-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <FormControl>
                <Input type="tel" autoComplete="tel" placeholder="(555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
                <FormControl>
                  <Select options={subjectOptions} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="propertyInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Community Demo</FormLabel>
                <FormControl>
                  <Select options={propertyOptions} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Enter a fictional message to test validation." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-xs text-gray-500">
          Portfolio demo: validation runs in your browser, and entered values are discarded.
        </p>

        <Button
          type="submit"
          className="w-full"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Simulating...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </Form>
  );
}
