'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactFormSchema,
  type ContactFormInput,
} from '@hearthmere/utils/client';
import { Button } from './Button';
import { Input } from './Input';
import { Select, type SelectOption } from './Select';
import { Textarea } from './Textarea';
import { Spinner } from './Spinner';
import { FormSuccess } from './FormSuccess';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './Form';
import { useToast } from '../contexts/ToastContext';

export interface PropertyContactFormProps {
  floorPlanOptions: SelectOption[];
  phonePlaceholder?: string;
  formDisclosure?: string;
}

export function PropertyContactForm({
  floorPlanOptions,
  phonePlaceholder = '(555) 123-4567',
  formDisclosure,
}: PropertyContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { addToast } = useToast();

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      floorPlanInterest: '',
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative" aria-label="Contact flow demo form">
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {status === 'submitting' && 'Simulating a local form submission...'}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-destructive" aria-hidden="true">*</span>
                </FormLabel>
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
                <FormLabel>
                  Last Name <span className="text-destructive" aria-hidden="true">*</span>
                </FormLabel>
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
              <FormLabel>
                Email <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" inputMode="email" {...field} />
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
              <FormLabel>
                Phone <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={phonePlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="floorPlanInterest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Demo Plan Interest</FormLabel>
              <FormControl>
                <Select
                  options={[{ value: '', label: 'Choose a fictional plan (optional)' }, ...floorPlanOptions]}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Message <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Enter a fictional message to test this form." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formDisclosure && <p className="text-xs text-muted-foreground">{formDisclosure}</p>}

        <p className="text-xs text-muted-foreground">
          Portfolio demo: validation runs in your browser, and entered values are discarded.
        </p>

        <Button type="submit" className="w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Simulating...
            </>
          ) : (
            'Run Contact Demo'
          )}
        </Button>
      </form>
    </Form>
  );
}
